import os
import json
import decimal
import requests
import base64
import random
import math
import logging
from urllib3.exceptions import InsecureRequestWarning
from kubernetes import client, config

# getting the saved environment variables
mock_cluster_count = int(os.environ['MOCK_CLUSTERS'])
namespace_is_hidden = os.environ['NAMESPACE_IS_HIDDEN']

# setting up logger
logging.basicConfig(filename='elotl.log', filemode='w', level=logging.DEBUG)
logger = logging.getLogger(__name__)

# loading the configuration file
try:
    config.load_kube_config()
    logger.info("kube config loaded")
except TypeError:
    try:
        config.load_incluster_config()
        logger.info('incluster_config loaded')
    except config.config_exception.ConfigException:
        logger.error("Could not configure kubernetes python client")


def get_node_data(cluster_id):
    """
    Fetch node data using k8s API
    :param cluster_id:
    :return:
    """
    try:
        # fetching the token from secret of the namespace 'dashboard'
        _TOKEN = [base64.b64decode(secret_item.data['token']).decode('UTF-8') for secret_item in client.CoreV1Api(
        ).list_namespaced_secret('dashboard').items if base64.b64decode(secret_item.data['namespace']).decode(
            'UTF-8') == 'dashboard'][0]

        # generating User Agent
        version_detail = client.VersionApi().get_code()
        _USER_AGENT = 'kubectl/' + version_detail.git_version + ' (' + version_detail.platform + ') ' + 'kubernetes/' + \
                      version_detail.git_commit[0:7]
        _HEADERS = {'User-Agent': _USER_AGENT, 'Accept': 'application/json',
                    'Authorization': f"Bearer {_TOKEN}"}

        # generating url for node listing
        _URL = client.Configuration().host + '/api/v1/nodes'
        requests.packages.urllib3.disable_warnings(category=InsecureRequestWarning)
        return requests.get(url=_URL, headers=_HEADERS, verify=False).json()['items']
    except Exception as e:
        logger.error(e)


def get_namespace_data(cluster_id, namespace_id=None):
    """
    Fetch namespace listing and detail
    :param namespace_id:
    :param cluster_id:
    :return:
    """
    # namespace detail
    if namespace_id:
        resource_count = get_resource_count(cluster_id, namespace_id)
        resource_info = get_resource_info(cluster_id, 'pods', namespace_id)
        return {'resources': resource_count, 'resource_info': resource_info}
    # namespace listing
    else:
        namespace_data = client.CoreV1Api().list_namespace().items
        if namespace_is_hidden == 'true':
            namespace_list = [{'value': namespace_item.metadata.name, 'label': namespace_item.metadata.name}
                              for namespace_item in namespace_data if
                              namespace_item.metadata.name != 'dashboard']
        else:
            namespace_list = [{'value': namespace_item.metadata.name, 'label': namespace_item.metadata.name}
                              for namespace_item in namespace_data]
        return namespace_list


def get_deployment_data(cluster_id, namespace_id=None, deployment_id=None):
    """
    Fetch deployment listing and detail
    :param deployment_id:
    :param namespace_id:
    :param cluster_id
    :return:
    """
    # global pods_for_resource_calculation
    # deployment detail
    if deployment_id and namespace_id is not None:
        # creating cell-pod mapping for getting cell details
        cell_pod_map = get_cell_pod_map(cluster_id)
        # getting pod count
        pods_data = [pod for pod in get_pod_data(cluster_id, namespace_id, deployment_id)]
        core_api = client.CoreV1Api()
        apps_api = client.AppsV1Api()
        deployment_cell_list = list()
        deployment_pod_list = list()
        for pod_name in pods_data:
            if pod_name['name'] in cell_pod_map:
                namespaced_pod_info = core_api.read_namespaced_pod(pod_name['name'], namespace_id).metadata.owner_references[0]
                if namespaced_pod_info.kind == 'ReplicaSet':
                    replica_set = apps_api.read_namespaced_replica_set(core_api.read_namespaced_pod(
                        pod_name['name'], namespace_id).metadata.owner_references[0].name, namespace_id)
                    if replica_set.metadata.owner_references[0].name == deployment_id and pod_name['name'] in cell_pod_map \
                            and pod_name['status']=='Running':
                        # fetching pods based on deployment
                        deployment_pod_list.append(pod_name['name'])
                        # fetching cells based on pods and deployment
                        deployment_cell_list.append(cell_pod_map[pod_name['name']]['cell_name'])
                else:
                    continue
            else:
                continue
        # if there are no pods for the passed deployment
        if len(deployment_pod_list) == 0:
            pods_for_resource_calculation = 'no_pod_resource'
        else:
            pods_for_resource_calculation = deployment_pod_list

        deployments_info = {
            'resource_count': {
                'cells': len(deployment_cell_list),
                'pods': len(deployment_pod_list)
            },
            'resource_info': get_resource_info(cluster_id, 'pods', namespace_id, pods_for_resource_calculation)
        }

    # deployment listing
    else:
        if namespace_id:
            deployments_info = [{'value': deployment_item.metadata.name, 'label': deployment_item.metadata.name}
                                for deployment_item in
                                client.AppsV1beta2Api().list_namespaced_deployment(namespace_id).items]
        else:
            deployments_info = [{'value': deployment_item.metadata.name, 'label': deployment_item.metadata.name}
                                for deployment_item in
                                client.AppsV1beta2Api().list_deployment_for_all_namespaces().items]
    return deployments_info


def get_pod_data(cluster_id, namespace_id=None, deployment_id=None):
    """
    Fetch pod data
    :param cluster_id:
    :param namespace_id:
    :param deployment_id:
    :return:
    """
    pods = dict()
    pods_list = list()
    if namespace_id:
        pods_data = client.CoreV1Api().list_namespaced_pod(namespace_id)
    else:
        pods_data = client.CoreV1Api().list_pod_for_all_namespaces()
    for pod_item in pods_data.items:
        pods_data = {
            "name":pod_item.metadata.name,
            "status":pod_item.status.phase
        }
        pods_list.append(pods_data)
    return pods_list


def get_compute_cell_data(cluster_id=None, namespace_id=None):
    """
    Fetch compute cell data
    :param cluster_id:
    :param namespace_id:
    :return:
    """
    cells_info = client.CustomObjectsApi().list_cluster_custom_object('kiyot.elotl.co', 'v1beta1', 'cells')
    return cells_info


def get_resource_count(cluster_id, namespace_id=None):
    """
    Get count of resources for requested cluster and namespace
    :param cluster_id:
    :param namespace_id:
    :return:
    """
    # fetching namespaced resource count
    if namespace_id:
        # Deployment count
        deployment_count = len(client.AppsV1beta2Api().list_namespaced_deployment(namespace_id).items)
        # Pod count
        pod_items = client.CoreV1Api().list_namespaced_pod(namespace_id).items
        pod_count = len([pod_item for pod_item in pod_items if pod_item.status.phase == 'Running'])
        # Cell count
        cell_pod_map = get_cell_pod_map(cluster_id)
        pods_list = [pod_item.metadata.name for pod_item in pod_items]
        cell_count = len([cell_pod_map[pods] for pods in pods_list if pods in cell_pod_map])
    # fetching resource count for entire cluster
    else:
        # Deployment count
        deployment_count = len(client.AppsV1beta2Api().list_deployment_for_all_namespaces().items)
        # Pod count
        pod_count = len(client.CoreV1Api().list_pod_for_all_namespaces().items)
        # Cell count
        cell_count = len(get_compute_cell_data()['items'])
        # Removing resources related to the excluded namespace
        if namespace_is_hidden == 'true':
            resources_to_hide = get_hidden_namespace_resources(cluster_id, 'dashboard')
            deployment_count = 0 if deployment_count == 0 else deployment_count - resources_to_hide['deployments']
            pod_count = 0 if pod_count == 0 else pod_count - resources_to_hide['pods']
            cell_count = 0 if cell_count == 0 else cell_count - resources_to_hide['cells']
    return {"deployments": deployment_count,
            "pods": pod_count,
            'cells': cell_count}


def get_hidden_namespace_resources(cluster_id, namespace_id):
    """
    Get the resource details for the namespace to be excluded
    :param cluster_id:
    :param namespace_id:
    :return:
    """
    # Deployment count
    deployment_count = len(client.AppsV1beta2Api().list_namespaced_deployment(namespace_id).items)
    # Pod count
    pod_items = client.CoreV1Api().list_namespaced_pod(namespace_id).items
    pod_count = len(pod_items)
    # Cell count
    cell_pod_map = get_cell_pod_map(cluster_id)
    pods_list = [pod_item.metadata.name for pod_item in pod_items]
    cell_count = len([cell_pod_map[pods] for pods in pods_list])
    return {'deployments': deployment_count,
            'pods': pod_count,
            'cells': cell_count
    }


def unit_conversion(value, unit):
    """
    Unit Conversion module
    :param unit:
    :param value:
    :return:
    """
    # global result
    if value != 0:
        if 'Ki' in unit or 'ki' in unit:
            result = math.ceil(decimal.Decimal(value / 976563))
        elif unit == 'Ti' or unit == 'ti':
            result = math.ceil((decimal.Decimal(value) * 1099.51))
        elif 'Mi' in unit or 'mi' in unit:
            result = math.ceil((decimal.Decimal(value) / 954))
        elif unit == 'n':
            result = math.ceil((decimal.Decimal(value) / 1000000000))
        elif unit == 'm':
            result = math.ceil((decimal.Decimal(value) / 1000))
        else:
            result = value
    else:
        result = 0
    return float(result)


def get_resource_info(cluster_id, kind, namespace_id=None, pods_list=None):
    """
    calculating capacity and usage for requested resources
    :param pods_list:
    :param namespace_id:
    :param cluster_id:
    :param kind:
    :return:
    """
    if pods_list is None:
        pods_list = []
    capacity = get_cluster_capacity_info(cluster_id),
    usage = get_cluster_usage_info(cluster_id, kind, namespace_id, pods_list)
    if capacity[0]['cpu'] != 0 and capacity[0]['memory'] != 0:
        resource_info = {
            "capacity": capacity[0],
            "usage": {
                "cpu": usage['cpu'],
                "cpu_percentage": float(round(decimal.Decimal(usage['cpu'] / capacity[0]['cpu'])*100, 2)),
                "memory": usage['memory'],
                "memory_percentage": float(round(decimal.Decimal(usage['memory'] / capacity[0]['memory'])*100, 2))
            }
        }
    else:
        resource_info = {
            "capacity": capacity[0],
            "usage": {
                "cpu": usage['cpu'],
                "cpu_percentage": 0.0,
                "memory": usage['memory'],
                "memory_percentage": 0.0
            }
        }

    return resource_info


def get_cluster_capacity_info(cluster_id):
    """
    Get cluster capacity from node detail
    :param cluster_id:
    :return:
    """
    # global item
    cpu_capacity_info = get_node_data(cluster_id)
    cpu_capacity_in_cores = round(unit_conversion(sum([int(''.join(filter(
        str.isdigit, str(item['status']['allocatable']['cpu'])))) for item in cpu_capacity_info]), 'm'), 2)
    memory_capacity_in_gib = round(sum(
        [unit_conversion(int(''.join(filter(str.isdigit, str(item['status']['allocatable']['memory'])))),
                         ''.join(filter(str.isalpha, str(item['status']['allocatable']['memory']))))
         for item in cpu_capacity_info]), 2)
    return {'cpu': cpu_capacity_in_cores, 'memory': memory_capacity_in_gib}


def get_cluster_usage_info(cluster_id, kind, namespace_id=None, pods_list=None):
    """
    get resource usage information from pods usage
    :param pods_list: only pods in this pods list will used for calculation if passed.
    :param namespace_id:
    :param kind:
    :param cluster_id:
    :return:
    """
    if pods_list is None:
        pods_list = []
    else:
        logger.info('pod list not none')
    if pods_list == 'no_pod_resource':
        return {'cpu': 0,
            'memory': 0}
    else:
        logger.info('resources no 0')
    # global cpu_usage_in_cores, memory_usage, cpu_usage_in_percentage
    # node usage stats if needed
    if kind == 'nodes':
        cpu_usage_info = client.CustomObjectsApi().list_cluster_custom_object('metrics.k8s.io', 'v1beta1', kind)
        cpu_usage_in_cores = sum([int(''.join(filter(
            str.isdigit, str(cpu_usage_item['usage']['cpu'].encode(
                'utf-8'))))) for cpu_usage_item in cpu_usage_info['items']])
        cpu_usage_in_percentage = round(cpu_usage_in_cores / 10000000, 0)
        memory_usage = sum([unit_conversion(int(''.join(filter(
            str.isdigit, str(memory_usage_item['usage']['memory'].encode(
                'utf-8'))))), ''.join(filter(str.isalpha, str(memory_usage_item['usage']['memory'].encode('utf-8')))))
            for memory_usage_item in cpu_usage_info['items']])
    # pods usage stats
    elif kind == 'pods':
        if namespace_id:
            cpu_usage_info = client.CustomObjectsApi().list_namespaced_custom_object('metrics.k8s.io', 'v1beta1',
                                                                                     namespace_id, kind)
        else:
            cpu_usage_info = client.CustomObjectsApi().list_cluster_custom_object('metrics.k8s.io', 'v1beta1', kind)
        if len(pods_list) != 0:
            cpu_usage_in_cores = round(unit_conversion(sum([int(''.join(filter(
                str.isdigit, str(cpu_usage_item['containers'][0]['usage']['cpu'].encode(
                    'utf-8'))))) for cpu_usage_item in cpu_usage_info['items'] if cpu_usage_item['metadata']['name']
                                                                                  in pods_list]), 'n'), 2)
            memory_usage = round(sum([unit_conversion(int(''.join(filter(
                str.isdigit, str(memory_usage_item['containers'][0]['usage']['memory'].encode(
                    'utf-8'))))),
                ''.join(
                    filter(str.isalpha, str(memory_usage_item['containers'][0]['usage']['memory'].encode('utf-8')))))
                for memory_usage_item in cpu_usage_info['items'] if memory_usage_item['metadata']['name']
                                                                                  in pods_list]), 2)
        else:
            cpu_usage_in_cores = round(unit_conversion(sum([int(''.join(filter(
                str.isdigit, str(cpu_usage_item['containers'][0]['usage']['cpu'].encode(
                    'utf-8'))))) for cpu_usage_item in cpu_usage_info['items']]), 'n'), 2)
            memory_usage = round(sum([unit_conversion(int(''.join(filter(
                str.isdigit, str(memory_usage_item['containers'][0]['usage']['memory'].encode(
                    'utf-8'))))),
                ''.join(filter(str.isalpha, str(memory_usage_item['containers'][0]['usage']['memory'].encode('utf-8')))))
                for memory_usage_item in cpu_usage_info['items']]), 2)
    return {'cpu': cpu_usage_in_cores,
            'memory': memory_usage}


def get_cluster_detail(cluster_id):
    """
    Fetch cluster details
    :param cluster_id:
    :return:
    """
    node_count = len(get_node_data(cluster_id))
    return {'name': cluster_id,
            'is_healthy': get_cluster_health(cluster_id),
            'provider': 'AWS',
            'cluster_id': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
            'worker_node_count': 1 if node_count == 1 else node_count - 1
            }


def get_cell_pod_map(cluster_id):
    """
    Creating a cell-pod mapping
    :param cluster_id:
    :return:
    """
    # creating a pod-cell mapping
    cell_pod_map = dict()
    for cell_info in get_compute_cell_data(cluster_id)['items']:
        cell_pod_map[cell_info['status']['podName']] = {'cell_name': cell_info['metadata']['name'],
                                                        'podNamespace': cell_info['status']['podNamespace']
                                                        }
    return cell_pod_map


def get_cluster_health(cluster_id):
    """
    fetch cluster health
    :param cluster_id:
    :return:
    """
    return True if len(list(set([True if component.conditions[0].type == 'Healthy'
                                 else False for component in client.CoreV1Api(
    ).list_component_status().items]))) == 1 else False


def get_cluster_info():
    """
    Get cluster information
    :return:
    """
    # global contexts
    cluster = 'elotl-cluster'
    cluster_info = {
        'name': cluster,
        'is_healthy': get_cluster_health(cluster),
        'provider': 'AWS',
        'resources': get_resource_count(cluster),
        'resource_info': get_resource_info(cluster, 'pods', namespace_id=None),
        'is_mock': False
    }
    with open('mock_data.json', 'r') as f:
        cluster_info_list = [randomise(mock_item) for mock_item in json.loads(f.read())[:mock_cluster_count]]
    cluster_info_list.insert(0, cluster_info)
    return cluster_info_list


def randomise(mock_info):
    """
    Providing random mock values for resource capacity and usage.
    :param mock_info:
    :return:
    """
    mock_info["resource_info"]["usage"]["cpu"] = round(random.uniform(0, 1), 2)
    mock_info["resource_info"]["usage"]["cpu_percentage"] = round(random.uniform(0, 1), 2)
    mock_info["resource_info"]["usage"]["memory"] = round(random.uniform(0, 1), 2)
    mock_info["resource_info"]["usage"]["memory_percentage"] = round(random.uniform(0, 1), 2)
    return mock_info

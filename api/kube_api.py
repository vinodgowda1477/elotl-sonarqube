import os
import json
import logging
from flask_cors import CORS
from kubernetes import client, config
from flask import Flask, send_from_directory, request
from utilities import get_cluster_info, \
    get_node_data, get_namespace_data, get_deployment_data, get_pod_data, \
    get_compute_cell_data, get_cluster_detail

# getting the saved environment variables
mock_cluster_count = os.environ['MOCK_CLUSTERS']
namespace_is_hidden = os.environ['NAMESPACE_IS_HIDDEN']

# setting up logger
logging.basicConfig(filename='elotl.log', filemode='w', level=logging.DEBUG)
logger = logging.getLogger(__name__)

# setting up flask app and static folder for react build
app = Flask(__name__, static_folder='../elotl-dashboard-UI/build')

# allowing Cross Origin Resource Sharing for flask
CORS(app)

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


# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    """
    Function to serve the react app.
    :param path:
    :return:
    """
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/clusters', methods=["GET"])
def get_clusters():
    """
    Function to fetch Kubernetes Cluster details
    gets list of clusters and their info
    :return:
    """
    try:
        return json.dumps(get_cluster_info())
    except Exception as e:
        logger.error(str(e))
        return json.dumps({'message': str(e)})


@app.route('/clusters/<path:cluster_id>', methods=["GET"])
def get_cluster(cluster_id):
    """
    gives individual cluster data
    Function to fetch Kubernetes Cluster details
    :param cluster_id:
    :return:
    """
    try:
        return json.dumps(get_cluster_detail(cluster_id))
    except Exception as e:
        logger.error(e)
        return json.dumps({'message': str(e)})


@app.route('/clusters/<path:cluster_id>/namespaces', methods=["GET"])
def list_namespaces(cluster_id):
    """
    Function to fetch namespaces of a kubernetes cluster
    list of namespace names along with id
    :param cluster_id:
    :return:
    """
    try:
        return json.dumps(get_namespace_data(cluster_id))
    except Exception as e:
        logger.error(e)
        return json.dumps({'message': str(e)})


@app.route('/clusters/<path:cluster_id>/namespaces/<path:namespace_id>', methods=["GET"])
def get_namespace(cluster_id, namespace_id):
    """
    Function to fetch namespace detail of a kubernetes cluster
    resource count, cpu and memory stats
    :param cluster_id:
    :param namespace_id:
    :return:
    """
    try:
        return json.dumps(get_namespace_data(cluster_id, namespace_id))
    except Exception as e:
        logger.error(e)
        return json.dumps({'message': str(e)})


@app.route('/clusters/<path:cluster_id>/namespaces/<path:namespace_id>/deployments', methods=["GET"])
def list_deployments(cluster_id, namespace_id):
    """
    Function to fetch deployments list for a kubernetes cluster
    :param cluster_id:
    :param namespace_id:
    :return:
    """
    try:
        return json.dumps(get_deployment_data(cluster_id, namespace_id))
    except Exception as e:
        logger.error(e)
        return json.dumps({'message': str(e)})


@app.route('/clusters/<path:cluster_id>/namespaces/<path:namespace_id>/deployments/<path:deployment_id>',
           methods=["GET"])
def get_deployment(cluster_id, namespace_id, deployment_id):
    """
    Function to fetch deployments detail for a kubernetes cluster
    resource count , cpu and memory stats
    :param deployment_id:
    :param cluster_id:
    :param namespace_id:
    :return:
    """
    try:
        return json.dumps(get_deployment_data(cluster_id, namespace_id, deployment_id))
    except Exception as e:
        logger.error(e)
        return json.dumps({'message': str(e)})


@app.route('/clusters/<path:cluster_id>/namespaces/<path:namespace_id>/deployments/<path:deployment_id>/pods',
           methods=["GET"])
def list_pods(cluster_id, namespace_id, deployment_id):
    """
    Function to fetch pods of a kubernetes cluster
    :param deployment_id:
    :param cluster_id:
    :param namespace_id:
    :return:
    """
    try:
        return json.dumps(get_pod_data(cluster_id, namespace_id, deployment_id))
    except Exception as e:
        logger.error(e)
        return json.dumps({'message': str(e)})


@app.route('/clusters/<path:cluster_id>/namespaces/<path:namespace_id>/deployments/<path:deployment_id>/pods/<pod_id>',
           methods=["GET"])
def get_pod(cluster_id, namespace_id, deployment_id, pod_id):
    """
    Function to fetch pods detail for a kubernetes cluster
    :param pod_id:
    :param deployment_id:
    :param cluster_id:
    :param namespace_id:
    :return:
    """
    try:
        return json.dumps(get_pod_data(cluster_id, namespace_id))
    except Exception as e:
        logger.error(e)
        return json.dumps({'message': str(e)})


@app.route('/clusters/<path:cluster_id>/cells', methods=["GET"])
def list_cells(cluster_id):
    """
    Function to fetch the cells for a kubernetes cluster
    :param cluster_id:
    :return:
    """
    try:
        return json.dumps(get_compute_cell_data(cluster_id))
    except Exception as e:
        logger.error(e)
        return json.dumps({'message': str(e)})


@app.route('/clusters/<path:cluster_id>/cells/<path:cell_id>', methods=["GET"])
def get_cell(cluster_id, cell_id):
    """
    function to fetch cells detail for a kubernetes cluster
    :param cluster_id:
    :param cell_id:
    :return:
    """
    try:
        return json.dumps(str(get_compute_cell_data(cluster_id, cell_id)))
    except Exception as e:
        logger.error(e)
        return json.dumps({'message': str(e)})


@app.route('/clusters/<path:cluster_id>/nodes', methods=["GET"])
def get_nodes(cluster_id):
    """
    Function to fetch node details for a kubernetes cluster
    :param cluster_id:
    :return:
    """
    try:
        node_count = len(get_node_data(cluster_id))
        worker_node_count = 1 if node_count == 1 else node_count - 1
        return json.dumps({'worker_nodes': worker_node_count})
    except Exception as e:
        logger.error(e)
        return json.dumps({'message': str(e)})


@app.route('/cluster/<path:cluster_id>/nodes/<path:node_id>', methods=["GET"])
def get_node(cluster_id, node_id):
    """
    Function to fetch node details for a kubernetes cluster
    :return:
    """
    try:
        return json.dumps(get_node_data(cluster))
    except Exception as e:
        logger.error(e)
        return json.dumps({'message': str(e)})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', use_reloader=True, port=4000, threaded=True)

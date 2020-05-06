#Deployment steps

Prerequisites:
- Ansible 2.8+ 
- Python3 
- Configure aws eks cluster 
- Using awscli configure aws user with ecr, eks, ec2 service access  
- Create ecr repository to push updated image

####Assuming that above prerequisites are satisfied. Below steps needs to be followed to deploy application over ecr cluster.

#####Before deploying, please replace the placeholders in files inside deployment/groups_vars, deployment/inventory and deployment/scripts folders

Host group IP's needs to replace based on the environment. ie, to deploy on dev Ip's of host vars `builder_dev` and `cluster_machine_dev` inside `inventory/servers.ini` needs to be changed as follows:

######[builder_dev]                                      
builder_dev ansible_connection=local `used in case of local deployment`       
or                    
builder ansible_ssh_host="remote ip goes here" `used in case of remote machine deployment`   

######[cluster_machine_dev]                        
cluster_machine_dev ansible_connection=local `used in case of local deployment`             
or                                           
builder ansible_ssh_host="remote ip goes here" `used in case of remote machine deployment`                     
 
Corresponding variables inside `group_vars/builder_dev` and `group_vars/cluster_machine_dev` needs be replaced:

`Note: The group var file should match with host var to pick variables automatically`
ecr_image_base_uri: replace ecr repository base url where image needs to be pushed
image_tag: replace with image tag value
git_repo: replace with git repo url
branch: github branch name from which latest code needs to be pulled to build docker image 
region: aws region where ecr and eks cluster exists

Replace the host vars value in files inside `deployment/scrips`

Replace `deployer_host` and `cluster_host` values inside deployment/scripts/deploy_dev.sh and deployment/scripts/provision_dev.sh

####provision cluster machine and builder machine.
 
 cd deployment
 ./scripts/provision_dev.sh
 
####deploy app on cluster 
  
  cd deployment
 ./scripts/deploy_dev.sh
 
 
 ####Playbooks description
 
 deployment/provision.yml:- Used to provision cluster machine and builder machine with appropriate requirements. Also create required namespace, roles and role-bindings required for application deployment on clusters.

 deployment/deployment.yml:- Create an docker image and push to aws ecr by pulling latest code. Also deploy application on cluster as a pod by pulling mentioned image from aws ecr.
 
 deployment/kubernetes-manifests/dashboard-role.yml:- Kubernetes manifest which creates a role to provide permission to application to access kubernetes resources.
 
 deployment/kubernetes-manifests/dashboard-roleBinding.yml:- Kubernetes manifest which creates a role binding of role to service account.
 
 deployment/kubernetes-manifests/elotl-pod-deployment.yml:- Kubernetes manifest which deploys app as a pod and create service.
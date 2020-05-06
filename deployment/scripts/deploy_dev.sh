#!/usr/bin/env bash

set -x
sudo ansible-playbook -i inventory/servers.ini deployment.yml --extra-vars '{"deployer_host":"builder_dev","cluster_host":"cluster_machine_dev"}';

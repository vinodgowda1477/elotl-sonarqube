#!/usr/bin/env bash

set -x
sudo ansible-playbook -i inventory/servers.ini provision.yml --extra-vars '{"cluster_host":"cluster_machine_dev"}';

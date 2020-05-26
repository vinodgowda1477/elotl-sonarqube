#!/usr/bin/env bash
set -e
virtualenv -p python3 scoutsuite
source scoutsuite/bin/activate
pip3 install scoutsuite
scout aws --profile default 

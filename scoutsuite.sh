#!/usr/bin/env bash
set -e
AWS_ACCESS_KEY_ID=$1
AWS_SECRET_ACCESS_KEY=$2
virtualenv -p python3 scoutsuite
source scoutsuite/bin/activate
pip3 install scoutsuite
scout aws --access-key-id $AWS_ACCESS_KEY_ID --secret-access-key $AWS_SECRET_ACCESS_KEY --report-name scout-suite -f


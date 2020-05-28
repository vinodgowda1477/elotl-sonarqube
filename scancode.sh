#!/usr/bin/env bash
set -e
virtualenv --no-site-packages -p python3 scancode
source scancode/bin/activate
pip3 install scancode-toolkit
mkdir -p scancode/app-packages
pip3 install -r api/requirements.txt --target=scancode/app-packages/
scancode -cl --html compliance-report.html -n 10 --timeout 300 scancode/app-packages/ --only-findings --include "*LICENSE*" --include "*version*" --include "*copyright*" --include "*__init__*" 

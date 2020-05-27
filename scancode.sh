#!/usr/bin/env bash
set -e
virtualenv -p python3 scancode
source scancode/bin/activate
pip3 install scancode-toolkit
pip3 install -r api/requirements.txt
scancode -clp --html compliance-report.html scancode/lib/python3.6/site-packages/

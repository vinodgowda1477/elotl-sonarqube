#!/usr/bin/env bash
set -e
virtualenv -p python3 ossaudit
source ossaudit/bin/activate
pip3 install ossaudit
ossaudit -i


#!/usr/bin/env bash
set -e
virtualenv -p python3 scancode
source scancode/bin/activate
pip3 install scancode-toolkit
scancode -clpieu --json-pp compliance-report.html elotl-dashboard-UI

#!/usr/bin/env bash

gunicorn -w 4 -b 0.0.0.0:4000  wsgi:app


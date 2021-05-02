#!/usr/bin/env bash
#!/bin/bash

set -e

#docker build -t edgify:0.1.0 ./base
npm run build
docker build -t privacy-policy-tree .

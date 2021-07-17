#!/bin/sh
echo '~~~~~~ Starting build dockerfile ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
ENV=dev
HOST=026111650332.dkr.ecr.us-east-1.amazonaws.com
IMAGE=btb-admin-webapp

# Build source
yarn install && yarn build:$ENV

# Build image
cd ../ && docker build --cache-from=$HOST/$IMAGE:$ENV -t $HOST/$IMAGE:$ENV -f .docker/$ENV.dockerfile .

echo '~~~~~~ Ending build dockerfile ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'

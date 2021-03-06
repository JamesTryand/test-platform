#!/usr/bin/env bash

npm install
./vf-os.sh dev

cd assetA
docker build . -t asset-a

cd ../assetB
docker build . -t asset-b

cd ../assetC
docker build . -t asset-c

cd ../
mkdir -p ./testImages
cd ./testImages

../label2manifest.js asset-a true
docker image rm asset-a
docker image rm localhost:5000/asset-a

../label2manifest.js asset-b true
docker image rm asset-b
docker image rm localhost:5000/asset-b

../label2manifest.js asset-c true
docker image rm asset-c
docker image rm localhost:5000/asset-c

cd ../executionManager
cp ../installAsset.js ./
docker build . -t vfos/exec-manager
docker tag vfos/exec-manager localhost:5000/vfos/exec-manager
docker push localhost:5000/vfos/exec-manager

cd ../testServer
docker build . -t vfos/test-server
docker tag vfos/test-server localhost:5000/vfos/test-server
docker push localhost:5000/vfos/test-server

cd ../deployment
cp ../manifest2label.js ./
docker build . -t vfos/deploy
docker tag vfos/deploy localhost:5000/vfos/deploy
docker push localhost:5000/vfos/deploy

cd ../portal
docker build . -t vfos/portal
docker tag vfos/portal localhost:5000/vfos/portal
docker push localhost:5000/vfos/portal

cd ../systemDashboard
docker build . -t vfos/system-dashboard
docker tag vfos/system-dashboard localhost:5000/vfos/system-dashboard
docker push localhost:5000/vfos/system-dashboard

cd ../aim
docker build . -t vfos/aim
docker tag vfos/aim localhost:5000/vfos/aim
docker push localhost:5000/vfos/aim

cd ../

./stop.sh

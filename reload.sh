#!/bin/sh

./assignNetwork.js
docker exec vf_os_platform_exec_control docker-compose up --no-recreate --remove-orphans -d


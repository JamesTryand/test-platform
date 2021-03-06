# vf-OS Platform setup

This code represents the Platform deliverable for the vf-OS project. 

## Overview

![Deployment of assets overview][overview]

[overview]: doc/deployment.png "Deployment of assets overview"

#### Pre-requisites:

- Ubuntu 16.04+ although it’s best to use the latest LTS version 18.04.1.
- Node 8+, install through: [https://github.com/nodesource/distributions](https://github.com/nodesource/distributions)
- Docker 18+, install through: [https://docs.docker.com/install/linux/docker-ce/ubuntu/](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

## Installation

Two options: binary distribution or based on the platform source

#### Binary distribution

The binary distribution consist of a large zip file `vfosPlatform.zip`, which includes a copy of the quarantine local Docker registry, which stores the binary images of the platform assets.

To start with the binary distribution, you'll have to unzip the file. Next you can skip the "From Source" section below, and go directly to the [common](#Common) section. You can download the zipfile from the github releases page: (https://github.com/almende/test-platform/releases/download/1.0.0/vfosPlatform.zip)

#### From Source

First step is to build the docker images for the platform itself. This build process will start a reduced version of the platform to provide access to the vf-OS quarantine local Docker registry in which the assets will be stored before installation. See overview above.

``` shell
user@host:~/platform$ ./build.sh
npm WARN platform-build@1.0.0 No repository field.
npm WARN platform-build@1.0.0 No license field.

audited 48 packages in 1.26s
found 0 vulnerabilities

67b1b27baf7389de1ed7b169dcaeda228508d5d6989a3f4434eef393cfc3a630
Creating network "vfos_default" with the default driver
Creating network "vfos_execution-manager-net" with driver "bridge"
Creating network "vfos_system-dashboard-net" with driver "bridge"
Creating network "vfos_asset-net-00" with driver "bridge"
Creating network "vfos_asset-net-01" with driver "bridge"
Creating network "vfos_asset-net-02" with driver "bridge"
Creating network "vfos_asset-net-03" with driver "bridge"
Creating network "vfos_asset-net-04" with driver "bridge"
Creating network "vfos_asset-net-05" with driver "bridge"
Creating network "vfos_asset-net-06" with driver "bridge"
Creating network "vfos_asset-net-07" with driver "bridge"
Creating network "vfos_asset-net-08" with driver "bridge"
Creating network "vfos_asset-net-09" with driver "bridge"
Creating network "vfos_asset-net-10" with driver "bridge"
Creating network "vfos_asset-net-11" with driver "bridge"
Creating vfos_registry_1 ... done
Started registry.
Sending build context to Docker daemon  146.4kB
Step 1/24 : FROM node:alpine

   .... This will take a couple of minutes ....

Stopping vfos_registry_1 ... done
Removing vfos_registry_1 ... done
Removing network vfos_default
Removing network vfos_execution-manager-net
Removing network vfos_system-dashboard-net
Removing network vfos_asset-net-00
Removing network vfos_asset-net-01
Removing network vfos_asset-net-02
Removing network vfos_asset-net-03
Removing network vfos_asset-net-04
Removing network vfos_asset-net-05
Removing network vfos_asset-net-06
Removing network vfos_asset-net-07
Removing network vfos_asset-net-08
Removing network vfos_asset-net-09
Removing network vfos_asset-net-10
Removing network vfos_asset-net-11
vf_os_platform_exec_control

```

After this script has finished, you can start the platform through the main startup script, following the common steps below.

#### <a name="Common"></a>Common

To start the platform you need to run the start.sh script. The first time you run this script it will install runtime dependencies, including the platform assets themselves from the local quarantine repository.

``` shell
user@host:~/platform$ ./start.sh
48071984db7f5ea86ed09403d2cf0e3744494e7b34efd875a092b68d4b494b6c
Creating network "vfos_default" with the default driver
Creating network "vfos_execution-manager-net" with driver "bridge"
Creating network "vfos_system-dashboard-net" with driver "bridge"
Creating network "vfos_asset-net-00" with driver "bridge"
Creating network "vfos_asset-net-01" with driver "bridge"
Creating network "vfos_asset-net-02" with driver "bridge"
Creating network "vfos_asset-net-03" with driver "bridge"
Creating network "vfos_asset-net-04" with driver "bridge"
Creating network "vfos_asset-net-05" with driver "bridge"
Creating network "vfos_asset-net-06" with driver "bridge"
Creating network "vfos_asset-net-07" with driver "bridge"
Creating network "vfos_asset-net-08" with driver "bridge"
Creating network "vfos_asset-net-09" with driver "bridge"
Creating network "vfos_asset-net-10" with driver "bridge"
Creating network "vfos_asset-net-11" with driver "bridge"
Creating vfos_registry_1 ... done
Starting vfos_registry_1 ... done
Creating vfos_reverse-proxy_1     ... done
Creating vfos_dashboard_1         ... done
Creating vfos_deployment_1        ... done
Creating vfos_portal_1            ... done
Creating vfos_execution-manager_1 ... done
Creating vfos_aim_1               ... done
Creating vfos_testserver_1        ... done
```

*usefull links:*

1. You can check if the platform started correctly through the Portal WebGUI: [http://localhost](http://localhost)
2. The reverseproxy has a dashboard where you can check the URL mapping: [http://localhost:8080/dashboard/](http://localhost:8080/dashboard/)
3. For interacting with the various REST api's I would advice to use the [Advanced REST Client Chrome addon](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo)
4. Our main documentation of the meta-information, used for asset deployment (see below) is found at: [vf-OS MetaData format](https://docs.google.com/document/d/1SnfLrZ7bi8S2BTyfZFnDYWB4GRX7L9uqp9Baz0orWlY)

## Asset deployment

Now for the good part: How to add your own assets to the running platform?

#### Useful scripts

The platform provides a couple of tools to facilitate the development, distribution and installation of assets. See image below for an overview of these scripts and each function they provide. In the next few paragraphs each script is decribed with some examples.

![Scripts][cookbook]

[cookbook]: doc/Cookbook.png "Usefull scripts"

In the image the following scripts and commands are shown:

- Docker build
- label2manifest.js
- manifest2label.js
- installAsset.js
- reload.js

#### Create asset code

You can just create you component(s) through any development process you'll like, including using the vf-OS Studio. The only vf-OS specific requirement is how to add the correct meta-information for your component. This is documented in [vf-OS MetaData format](https://docs.google.com/document/d/1SnfLrZ7bi8S2BTyfZFnDYWB4GRX7L9uqp9Baz0orWlY)

Before creating the zipfile, you need to build your docker image with the correct labels on them.

***
*note: You can install this docker image directly as an asset into the platform, bypassing the whole quarantine registry. This is a good way to test the labels. Skip directly to [Install asset locally](#installLocally) for this.
***


#### Create asset zipfile

To facilitate the creation of the zipfile for distributing the assets, the platform provides a tool, called `label2manifest.js`, which you can find in the root folder of the source distribution and/or in the *tools* folder of the binary distribution.

This script will take the image from your local running docker daemon, so you need to run the script on the same machine as where you created the asset code.

The script is written for node.js, and has some external dependencies. There is a *package.json* file in the same folder as the script, which you need to install.

``` shell
user@host:~/platform$ ls package.json label2manifest.js
label2manifest.js  package.json
user@host:~/platform$ npm install
npm WARN platform-build@1.0.0 No repository field.
npm WARN platform-build@1.0.0 No license field.

audited 48 packages in 1.212s
found 0 vulnerabilities

user@host:~/platform$
```
After installing these dependencies, you can run the script to create the zipfile. Below is an example for a dockerimage called *asset-c*.

``` shell
user@host:~/platform$ label2manifest.js asset-c true
Exported docker image: asset-c
Got metadata from docker image: asset-c
{ 'vf-OS': 'true',
  'vf-OS.depends': 'asset-b',
  'vf-OS.icon': 'img/3.png' } { binaryFile: 'asset-c',
  'vf-OS': 'true',
  depends: 'asset-b',
  icon: 'img/3.png' } 'asset-c'
done, deleting artifacts

```
There are three parameters to this script:
``` shell
label2manifest <imageid> [<deleteArtifacts>] [<additionalImages>]
```
* imageid: The name of the main Docker image itself, the one with the labels inside.
* deleteArtifacts: Should the script cleanup the exported image and the new manifest.json file it created after putting them into the zipfile? Simple *true* or *false* parameter, defaults to *false*.
* additionalImages: quoted string containing a space separated list of other docker images you like to include into the asset zipfile. e.g. `"asset-c-backend asset-c-config"`

Through the additional images you can create a multiple image asset, but the meta-information should be placed as labels only in the first image of the set. For these cases it is expected that those labels contain a series of: _vf-OS.compose.1.*_ labels to configure these extra images. (and _vf-OS.compose.2.*_ for the second extra image, etc.)

The script will create a zipfile in the folder where you run the script, called *imageid.zip*, e.g. *asset-c.zip*.

#### Deploy asset to local quarantine registry
In the final setup of the platform, all assets will be installed from the vf-OS Store, by downloading, checking, intermediate storing in the quarantine registry, and installation of the asset into the local docker environment. This is a complex, multi-step process that is annoying and slow during development testing. 
To ease this for developers, a script is provided that bypasses many of these steps and can deploy the asset from the zipfile, directly into the quarantine repository. This script is called *manifest2label.js* to mimic it's mirror counterpart. This script is provided in the tools folder of the binary distribution, and requires running *npm install* for it's dependencies.

```shell
user@host:~/platform$ manifest2label.js $PWD/asset-c.zip true true
Read manifest: { binaryFile: 'asset-c',
  'vf-OS': 'true',
  depends: 'asset-b',
  icon: 'img/3.png' }
Images: [ [ 'asset-c:latest' ] ]
Labels from:asset-c:latest { 'vf-OS': 'true',
  'vf-OS.depends': 'asset-b',
  'vf-OS.icon': 'img/3.png' }
Cleaning up behind me.
Done cleanup.
Also cleaned images. 
```
There are four parameters to this script:
``` shell
manifest2label <fullPath2zipfile> [<deleteArtifacts>] [<push2Repos>] [<registryHost>]
```
* fullPath2zipfile: The zipfile to unpack, NOTE: Must be a full path at this time. (see example to use the current working dir.)
* deleteArtifacts: Should the script cleanup the unpackaged image and manifest.json file it created after uploading? Simple *true* or *false* parameter, defaults to *false*.
* push2Repos: Should the script push the image from the local Docker daemon to the quarantine registry as well? Simple *true* or *false* parameter, defaults to *false*.
* registryHost: The hostname of the quarantine registry, defaults to *localhost* which never needs to change.

#### Deploy asset to vf-OS Store
TODO

#### <a name="installLocally"></a>Install asset locally

To get the asset from the local quarantine registry into the actual running platform, requires the generation of the docker-compose file for this asset. This can be done through the REST API of the platform, but to simplify this a script *installAsset.js* is provided that does this. This script is provided in the tools folder of the binary distribution, and requires running *npm install* for it's dependencies.

***
*note: You can also install an Asset directly from your local docker daemon, bypassing the whole quarantine registry. In the example below, you don't include the 'localhost:5000/' part for such images. (Just use the local imageid)
***

Before running the script the platform should be running, to provide access to the registry. Run the script like:

```shell
user@host:~/platform$ installAsset.js localhost:5000/asset-a true
Got metadata from docker image: localhost:5000/asset-c
Platform reloaded. 
user@host:~/platform$ ls .compose
0_platform_compose.yml  1_networks_compose.yml  3_asset-c_compose.yml  docker-compose
user@host:~/platform$ docker container list
CONTAINER ID        IMAGE                                  COMMAND                  CREATED             STATUS              PORTS                                        NAMES
ccb18f1062d8        localhost:5000/vfos/deploy             "/usr/src/app/entryp…"   23 seconds ago      Up 19 seconds       9000/tcp                                     vfos_deployment_1
7cda48ac56a4        localhost:5000/vfos/system-dashboard   "npm start"              23 seconds ago      Up 18 seconds       9000/tcp                                     vfos_dashboard_1
067dd4ec6b0a        localhost:5000/vfos/test-server        "npm start"              23 seconds ago      Up 15 seconds       9000/tcp                                     vfos_testserver_1
0afa60d16778        localhost:5000/vfos/exec-manager       "npm start"              23 seconds ago      Up 17 seconds       9000/tcp                                     vfos_execution-manager_1
f16f1a26a87c        localhost:5000/asset-c                 "npm start"              23 seconds ago      Up 15 seconds       9001/tcp                                     vfos_asset-c_1
789b38d393a8        localhost:5000/vfos/aim                "/opt/jboss/tools/do…"   23 seconds ago      Up 20 seconds       8080/tcp                                     vfos_aim_1
91187164867b        localhost:5000/vfos/portal             "npm start"              23 seconds ago      Up 21 seconds       9000/tcp                                     vfos_portal_1
c06837648ca6        traefik:latest                         "/traefik --api --do…"   23 seconds ago      Up 12 seconds       0.0.0.0:80->80/tcp, 0.0.0.0:8080->8080/tcp   vfos_reverse-proxy_1
f53130f4f819        registry:2                             "/entrypoint.sh /etc…"   About an hour ago   Up About an hour    0.0.0.0:5000->5000/tcp                       vfos_registry_1
2bfa81621399        docker/compose:1.22.0                  "/bin/sh -c 'cat /de…"   About an hour ago   Up About an hour                                                 vf_os_platform_exec_control
```
As you can see in the example, the script creates a docker-compose file, called *3_assetId_compose.yml* which is included by the reload of the platform.

There are four parameters to this script:
``` shell
installAsset.js <imageUrl> [<reload>] [<targetFolder>] [<volumesFolder>]
```
* imageUrl: The imageId or url to the registry imageId.
* reload: Should the platform reload its configfiles? (Basically running *docker-compose up*) Simple *true* or *false* parameter, defaults to *false*.
* targetFolder: Path to the folder where the compose file needs to be generated. Defaults to $PWD/.compose.
* volumesFolder: Absolute path in the host to the folder where the host side of volume mounts needs to be placed. Defaults to $PWD/.persist.

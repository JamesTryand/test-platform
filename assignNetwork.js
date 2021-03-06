#!/usr/bin/env node
'use strict'

const exec = require('child_process').exec
const fs = require('fs')

const COMPOSE_FOLDER = process.argv[2] ? process.argv[2] : '.compose/'
const NETWORK_COMPOSE_FILE = process.argv[3] ? process.argv[3] : '1_networks_compose.yml'
const reload = process.argv[4] ? JSON.parse(process.argv[4]) : false

let networks = ['default', 'execution-manager-net', 'system-dashboard-net']
let top = 5 // Determine top based on amount of assets
let services = {}

// Get amount of assets, based on file list length, minus the three meta files
let count = 0
fs.readdirSync(COMPOSE_FOLDER).forEach(file => {
  if (file.startsWith('3_')) {
    let filestr = fs.readFileSync(COMPOSE_FOLDER + file, { 'encoding': 'utf-8' })
    filestr.split('\n').forEach(line => {
      if (line.match(/ [^{]*:$/g)) {
        services[line.trim().replace(':', '')] = { 'networks': ['asset-net-' + count] }
      }
    })
    count++
  }
})
if (count > top) {
  top = count // Make sure we have enough networks at all time
}

for (let i = 0; i < top; i++) {
  networks.push('asset-net-' + i)
}

// apply network to config files?

services['reverse-proxy'] = { 'networks': networks }
services['rabbitmq'] = { 'networks': networks }
let networkSection = {}
networks.map((network) => {
  if (network !== 'default') {
    networkSection[network] = { 'driver': 'bridge' }
  }
})

// Generate docker-compose file for this asset into folder
fs.writeFileSync(COMPOSE_FOLDER + NETWORK_COMPOSE_FILE, 'version: "3.3"\nservices:\n   ' + JSON.stringify(services) + '\n\nnetworks:\n   ' + JSON.stringify(networkSection))
// If parameter: call docker-compose image to reload asset
if (reload) {
  exec('docker exec vf_os_platform_exec_control docker-compose up -d', (error, stdout, stderr) => {
    if (error) {
      console.log('Failed to reload the platform.', stderr)
    } else {
      console.log('Platform reloaded.', stdout)
    }
  })
}

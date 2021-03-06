#!/usr/bin/env node
'use strict'

const exec = require('child_process').exec
const fs = require('fs')
const zip = require('yazl')

let dockerImage = process.argv[2]
let deleteArtifacts = process.argv[3] ? JSON.parse(process.argv[3]) : false
let additionalImages = process.argv[4] ? process.argv[4] : ''

if (!dockerImage) {
  console.log('Call this script as: ' + process.argv[1] + ' <dockerImage> <deleteArtifacts> ["<additionalImages>"]')
  process.exit(1)
}

let imageFile = dockerImage.replace(/.*\//gi, '').replace(/:.*/gi, '')
let result = {
  'binaryFile': imageFile
}

let saveCommand = 'docker save -o ' + imageFile + '  ' + dockerImage + ' ' + additionalImages

exec(saveCommand, (error, stdout, stderr) => {
  if (error) {
    console.log(error, stderr)
  } else {
    console.log('Exported docker image:', dockerImage)
  }

  let labelCommand = 'docker image inspect ' + dockerImage
  exec(labelCommand, (error, stdout, stderr) => {
    if (error) {
      console.log(error, stderr)
    } else {
      console.log('Got metadata from docker image:', dockerImage)
      let labels = JSON.parse(stdout)[0].Config.Labels
      Object.keys(labels).map((key) => {
        result[key.replace('vf-OS.', '')] = labels[key]
      })
      result['binaryFile'] = imageFile

      console.log(labels, result, imageFile)
      fs.writeFileSync('manifest.json', JSON.stringify(result))

      let zipfile = new zip.ZipFile()
      zipfile.addFile('manifest.json', 'manifest.json')
      zipfile.addFile(imageFile, imageFile)

      zipfile.outputStream.pipe(fs.createWriteStream(imageFile + '.zip')).on('close', function () {
        if (deleteArtifacts) {
          console.log('done, deleting artifacts')
          fs.unlink(imageFile, () => { /* ignore callback */ })
          fs.unlink('manifest.json', () => { /* ignore callback */ })
        } else {
          console.log('done')
        }
      })
      zipfile.end()
    }
  })
})

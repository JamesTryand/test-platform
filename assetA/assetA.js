'use strict';

var http = require('http');
var request = require('request');
const express = require('express');
const app = new express();


app.get('/', (req, res) => {

    // How to get the hostname that was given by the Traefik?? Or how to set it?

    const options = {
        // This shouldn't work:
        // url: 'http://asset-b:9000' + '/person/all',
        // This does work:
        url: 'http://reverse-proxy' + '/assetB/person/all',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        }
    };
    request(options, function (error, response, body) {
        console.log("completed", error);
        if (response) {
            console.log("status:", response.statusCode, response.statusMessage);
        }
        if (!error && response.statusCode == 200) {
            //console.log('body = ' + body);
            res.send(body);
        }
    });

});

app.listen(9001, () => {
    /* eslint-disable */
    console.log('Server is up!');
});
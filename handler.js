'use strict';
const serverless = require('serverless-http');
const express = require('express')
const config = require('./config')
const controllersApi = require('./controllers')

const app = express()

const controller = controllersApi(config)

app.use(express.json());

app.post('/links', controller.saveUrlToQueue)

app.get('/content/:identifierId', controller.getContent)

module.exports.handle = serverless(app);

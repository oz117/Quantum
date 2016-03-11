# Quantum

An app with a user and message transfer system.
The objective of this app is to be used with an android application.
The android app uses RSA algorithm to cypher messages.
The messages are sent to the server and the server uses Google Cloud Messaging (gcm)
to transfer them to their recipient

## Technology

Server side, Quantum is built with the [Express](http://expressjs.com/)
framework. We're using [MongoDB](http://www.mongodb.org/) as a data store.

We are using grunt to automate a few things.

| On The Server | Development |
| ------------- | ----------- |
| Express       | Grunt       |
| body-parser   |             |
| Mongoose      |             |
| Passport      |             |
| node-gcm      |             |


## Requirements

You need [Node.js](http://nodejs.org/download/) and
[MongoDB](http://www.mongodb.org/downloads) installed and running.

We use [`bcrypt`](https://github.com/ncb000gt/node.bcrypt.js) for hashing
secrets.

We use [`node-gcm`](https://github.com/ToothlessGear/node-gcm)
to send data via gcm.

## Installation

```bash
$ git clone git@github.com:oz117/Quantum.git && cd ./Quantum/server
$ npm install
```


## Setup

First you need to setup your config file.

```bash
$ mv ./config.example.js ./config.js #set mongodb and google cloud api key
```

## Running the app

```bash
$ npm start

# > quantumserver@0.0.1 start /private/tmp/Quantum/server
# > grunt

# Running "concurrent:dev" (concurrent) task
#    Running "watch" task
#    Waiting...
#    Running "nodemon:dev" (nodemon) task
#    [nodemon] 1.9.1
#    [nodemon] to restart at any time, enter `rs`
#    [nodemon] watching: *.*
#    [nodemon] starting `node app.js`
#    The App runs on port 4000
```

Now just use Postman (or any other software) to test the api.

## Thanks

Thanks to those guys: [https://github.com/jedireza/drywall]. There website helped
me a lot o/

## Questions and contributing

```bash
$ npm version

# { quantumserver: '0.0.1',
#  npm: '2.14.20',
#  ares: '1.10.1-DEV',
#  http_parser: '2.5.2',
#  icu: '56.1',
#  modules: '46',
#  node: '4.4.0',
#  openssl: '1.0.2g',
#  uv: '1.8.0',
#  v8: '4.5.103.35',
#  zlib: '1.2.8' }
```

## License

BSD-2-Clause

var Promise = require('bluebird');

var Client = require('./client');
const HttpStatus = require('../helpers/statuses');

var ErrorResponse = {
    status: 500,
    error: ''
};

module.exports.getAll = function () {
    return new Promise((resolve, reject) => {
        Client.getAll((err, clients) => {
            if (err) {
                ErrorResponse.status = HttpStatus.InternalServerError;
                ErrorResponse.error = err;
                reject(ErrorResponse);
                return;
            }
            let response = {
                status: HttpStatus.Accepted,
                data: clients
            };
            resolve(response);
        });
    });
}

module.exports.createClient = function (client) {
    return new Promise((resolve, reject) => {
        if (!client.firstName || !client.lastName) {
            ErrorResponse.status = HttpStatus.BadRequest
            ErrorResponse.error = 'Bad Data';
            reject(ErrorResponse);
            return;
        } else {
            var newClient = new Client({
                firstName: client.firstName,
                lastName: client.lastName
            });
            Client.createClient(newClient, (err, client) => {
                if (err) {
                    ErrorResponse.status = HttpStatus.InternalServerError;
                    ErrorResponse.error = err;
                    reject(ErrorResponse);
                    return;
                }
                let response = {
                    status: HttpStatus.Created,
                    data: client
                }
                resolve(response);
            });
        }
    });
}

module.exports.updateClient = function (client) {
    return new Promise((resolve, reject) => {
        if (!client.firstName || !client.lastName) {
            ErrorResponse.status = HttpStatus.BadRequest
            ErrorResponse.error = 'Bad Data';
            reject(ErrorResponse);
            return;
        } else {
            Client.getById(Client._id, function (err, dbClient) {
                if (err) {
                    ErrorResponse.status = HttpStatus.InternalServerError;
                    ErrorResponse.error = err;
                    reject(ErrorResponse);
                    return;
                }
                if (dbClient == null) {
                    ErrorResponse.status = HttpStatus.NotFound;
                    ErrorResponse.error = 'Client not found';
                    reject(ErrorResponse);
                    return;
                }
                Client.updateClient(client, function (err, client) {
                    if (err) {
                        ErrorResponse.status = HttpStatus.InternalServerError;
                        ErrorResponse.error = err;
                        reject(ErrorResponse);
                        return;
                    }
                    let response = {
                        status: HttpStatus.Accepted,
                        data: client
                    };
                    resolve(response);
                });
            });
        }
    });
}

module.exports.deleteClient = function (id) {
    return new Promise((resolve, reject) => {
        Client.deleteClient(id, function (err, dbClient) {
            if (err) {
                ErrorResponse.status = HttpStatus.InternalServerError;
                ErrorResponse.error = err;
                reject(ErrorResponse);
                return;
            }
            let response = {
                status: HttpStatus.Accepted,
                data: id
            };
            resolve(response)
        });
    });
}


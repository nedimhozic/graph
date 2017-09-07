var express = require('express');
var router = express.Router();

var ClientBO = require('./client.business');

//Get All
router.get('/', function (req, res) {
    ClientBO.getAll().then((response) => {
        res.status(response.status);
        res.json(response.data);
    }).catch((response) => {
        res.status(response.status);
        if (response.status == 500) {
            res.send(response.error);
        } else {
            res.json({ message: response.error });
        }
    });
});

//Post Client
router.post('', function (req, res) {
    let client = req.body;
    ClientBO.createClient(client).then((response) => {
        res.status(response.status);
        res.json(response.data);
    }).catch((response) => {
        console.log(response);
        res.status(response.status);
        if (response.status == 500) {
            res.send(response.error);
        } else {
            res.json({ message: response.error });
        }
    });
});

//Update Client
router.put('', function (req, res) {
    let client = req.body;

    ClientBO.updateClient(client).then((response) => {
        res.status(response.status);
        res.json(response.data);
    }).catch((response) => {
        res.status(response.status);
        if (response.status == 500) {
            res.send(response.error);
        } else {
            res.json({ message: response.error });
        }
    });
});

//Delete Client
router.delete('/:id', function (req, res) {
    let id = req.params.id;

    ClientBO.deleteClient(id).then((response) => {
        res.status(response.status);
        res.json(response.data);
    }).catch((response) => {
        res.status(response.status);
        if (response.status == 500) {
            res.send(response.error);
        } else {
            res.json({ message: response.error });
        }
    });
});

module.exports = router;
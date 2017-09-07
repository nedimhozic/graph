var mongoose = require('mongoose');

var db = mongoose.connection;

var ClientSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    }
});

var Client = module.exports = mongoose.model('Client', ClientSchema);

module.exports.getAll = function (callback) {
    Client.find({}, callback);
}

module.exports.getById = function (id, callback) {
    Client.findById(id, callback);
}

module.exports.createClient = function (newClient, callback) {
    newClient.save(callback);
}

module.exports.UpdateClient = function (client, callback) {
    var query = { _id: client._id };
    Client.findOneAndUpdate(query, { firstName: client.firstName, lastName: client.lastName }, { new: true }, callback);
}

module.exports.deleteClient = function(id, callback) {
    var query = {_id: id};
    Client.remove(query, callback);
}
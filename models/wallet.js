var db = require('../db');




exports.create = function (wallet, client) {
    return db.insert(wallet, 'wallet', client)
};

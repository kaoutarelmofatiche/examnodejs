const mongoose = require('mongoose');
const userModel = require('../model/UserModel');

var mysql      = require('mysql2');
require('dotenv').config();

const connection = () => {
    let connection =  mysql.createConnection({
        host     : process.env.HOSTNAME,
        user     : process.env.DB_USERNAME,
        password : process.env.PASSWORD,
        database : process.env.DB_NAME
    });
    connection.connect();

    return connection;
}

const disconnect = (connection) => { 
    return connection.end();
}

const select = (select, array, connection) => {
    let data =  connection.query(select,array, (e, r, f ) => {
        if (e) throw e
    })
    return data
}
const updateSubscription = (userId, subscriptionStatus) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE users SET subscription_status = ? WHERE id = ?`;
      const values = [subscriptionStatus, userId];
  
      connection.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

module.exports = {
    select,
    disconnect,
    connection,
    updateSubscription
}

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
const connection = require('./db');

class UserModel {

    // This is for user signup
    static insertNewUser(email, password, firstName, lastName, phone, address, token) {
        console.log(email, password)
        connection.connect();
        return connection.query("INSERT INTO users (email, password, first_name, last_name, phone, address, token) VALUES (?, ?, ?, ?, ?, ?, ?)", [email, password, firstName, lastName, phone, address, token], (err, results) => {
            connection.end();
            console.log("here");
            if (err) {console.log(err)}
            else return results;
        });
    }
    //This is for user login
    static getUserById(id) {

        connection.connect();
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
                connection.end();
                if (err) reject(err);
                else resolve(results);
            });
        });

    } 
    // Get user by email
    static getUserByEmail(email) {

        connection.connect();
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
                connection.end();
                if (err) reject(err);
                else resolve(results);
            });
        })
    }

    static updateToken(email, token) {

        connection.connect();
        return new Promise((resolve, reject) => {
            connection.query("UPDATE users SET token = ? WHERE email = ?", [token, email], (err, results) => {
                connection.end();
                if (err) reject(err);
                else resolve(results);
            });
        })
    }
}


module.exports = UserModel;

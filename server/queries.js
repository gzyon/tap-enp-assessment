const Pool = require('pg').Pool;
require('dotenv').config()

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
})

pool.connect();

const createUrl = (body) => {
    console.log("creating new entry in db")
    return new Promise(function(resolve, reject) {
        const { longUrl, shortUrl } = body
        pool.query('INSERT INTO urls (longurl, shorturl) VALUES ($1, $2)', [longUrl, shortUrl], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`url added: ${results}`)
        })
    })
}

const getLongUrl = (shortUrl) => {
    return new Promise(function(resolve, reject) {
        var sql = "SELECT * FROM urls WHERE shorturl = '" + shortUrl + "'";
        console.log(sql);
        pool.query(sql, (error, results) => {
            if (error) {
                reject(error)
            }
            if (results.rows.length === 0) resolve(null);
            else resolve(results.rows[0].longurl);
        })
    })
}

const getShortUrl = (longUrl) => {
    return new Promise(function(resolve, reject) {
        var sql = "SELECT * FROM urls WHERE longurl = '" + longUrl + "'";
        pool.query(sql, (error, results) => {
            if (error) {
                reject(error)
            }
            if (results.rows.length === 0) resolve(null);
            else resolve(results.rows[0].shorturl);
        })
    })
}

module.exports = {
    createUrl,
    getLongUrl,
    getShortUrl,
}
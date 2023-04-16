// Boilerplate for Pool & require pg dependency: 
const pg = require('pg');

// this will send Pool objects: 
const Pool = pg.Pool;

// the Pool objects are connected to DB which is 
// running at localhost:5432, named "koala_holla"
const pool = new Pool ({
    host: 'localhost',
    port: 5432,
    database: 'weekend-to-do-app'
})

pool.on('connect', () => {
    console.log('This is Pool, connected to your postgres DB!');
})

pool.on('error', (error) => {
    console.log('The Pool has an error:', error);
})

module.exports = pool;
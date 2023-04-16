const express = require('express');
const toDoRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js');


// GET
toDoRouter.get('/', (req, res) => {
    console.log('GET /toDo');

    let sqlText = `
        SELECT * FROM ??`;

    pool.query(sqlText)
        .then((dbRes) => {
            let theToDo = dbRes.rows;
            res.send(theToDo);
        })
        .catch((dbErr) => {
            // Log that there was an issue with this function
            console.log('SQL query in GET /toDo failed:', dbErr);
            // Send "Internal Server Error" status to client
            res.sendStatus(500)
        })
})


// POST
toDoRouter.post('/', (req, res) => {
    console.log('POST /todo');
    let newToDo = req.body;
    let sqlText = `INSERT INTO "toDo" ("toDo", "completed")
                VALUES($1, $2);`;
    let sqlValues = [newToDo.toDo, newToDo.completed];

    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log(`Error adding new toDo`, error);
            res.sendStatus(500);
        })
})


// PUT: added this to file
toDoRouter.put('/:id', (req, res) => {
    // req.params should look like: { id: '3' }
    let theIdToUpdate = req.params.id;
    let completed = req.body.completed;
    let sqlText = `
        UPDATE "toDo"
            SET "completed"=$1
            WHERE "id"=$2;
    `
    let sqlValues = [completed, theIdToUpdate];

    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            console.log('PUT /toDoRouter fail:', dbErr);
            res.sendStatus(500);
        })
})

// DELETE
toDoRouter.delete('/:id', (req, res) => {
    console.log(req.params);

    let theIdToDelete = req.params.id;

    // Will need to update the name of table for the
    //  delete from SQL query
    // Set up to sanitize the input when paired with
    //  sqlValues.
    let sqlText = `
        DELETE from "koalas"
            where "id"=$1;
    `;

    // Set up to pair with sqlText to sanitize input.
    let sqlValues = [theIdToDelete];

    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            // Send "Okay" to the client that declares this
            //  delete was accepted/processed
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            // Log that there was an issue with this function
            console.log('delete /koalas/:id error:', dbErr);
            // Send "Internal Server Error" status to client
            res.sendStatus(500);
        })
})

module.exports = toDoRouter;
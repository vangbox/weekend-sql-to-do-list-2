const express = require('express');
const todoRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js');


// GET
todoRouter.get('/', (req, res) => {
    // console.log('todoRouter GET /todo works'); -it works!

    let sqlText = `SELECT * FROM "todo";`;

    pool.query(sqlText)
        .then((dbRes) => {
            let theTodo = dbRes.rows;
            res.send(theTodo);
        })
        .catch((dbErr) => {
            // Log that there was an issue with this function
            console.log('SQL query in GET /todo failed:', dbErr);
            // Send "Internal Server Error" status to client
            res.sendStatus(500)
        })
})


// POST
todoRouter.post('/', (req, res) => {
    console.log('POST /todo it works!!');
    let newTodo = req.body;
    let sqlText = `INSERT INTO "todo" ("toDo", "completed")
                VALUES($1, $2);`;
    let sqlValues = [newTodo.toDo, newTodo.completed];

    pool.query(sqlText, sqlValues)

        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log(`Error adding new todo`, error);
            res.sendStatus(500);
        })
})


// // PUT: added this to file
// todoRouter.put('/:id', (req, res) => {
//     // req.params should look like: { id: '3' }
//     let theIdToUpdate = req.params.id;
//     let completed = req.body.completed;
//     let sqlText = `
//         UPDATE "todo"
//             SET "completed"=$1
//             WHERE "id"=$2;
//     `
//     let sqlValues = [completed, theIdToUpdate];

//     pool.query(sqlText, sqlValues)
//         .then((dbRes) => {
//             res.sendStatus(200);
//         })
//         .catch((dbErr) => {
//             console.log('PUT /todoRouter fail:', dbErr);
//             res.sendStatus(500);
//         })
// })

// // DELETE
// todoRouter.delete('/:id', (req, res) => {
//     console.log(req.params);

//     let theIdToDelete = req.params.id;

//     // Will need to update the name of table for the
//     //  delete from SQL query
//     // Set up to sanitize the input when paired with
//     //  sqlValues.
//     let sqlText = `
//         DELETE from "koalas"
//             where "id"=$1;
//     `;

//     // Set up to pair with sqlText to sanitize input.
//     let sqlValues = [theIdToDelete];

//     pool.query(sqlText, sqlValues)
//         .then((dbRes) => {
//             // Send "Okay" to the client that declares this
//             //  delete was accepted/processed
//             res.sendStatus(200);
//         })
//         .catch((dbErr) => {
//             // Log that there was an issue with this function
//             console.log('delete /koalas/:id error:', dbErr);
//             // Send "Internal Server Error" status to client
//             res.sendStatus(500);
//         })
// })

module.exports = todoRouter;
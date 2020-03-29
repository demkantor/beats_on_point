const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get current band request
router.get('/:table', (req, res) => {
    // console.log('in admin GET with id:', req.params.table)
    const queryText = `SELECT * FROM ${req.params.table} ORDER BY "id" ASC;`;
    pool.query(queryText)
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in admin GET ${error}`);
        res.sendStatus(500);
    });
});


module.exports = router;
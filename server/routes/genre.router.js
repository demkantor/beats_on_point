const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get all genres
router.get('/', (req, res) => {
    console.log('in genre GET all')
    const queryText = `SELECT * FROM "genres";`;
    pool.query(queryText)
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in genre GET all ${error}`);
        res.sendStatus(500);
    });
});

//get this bands genre
router.get('/:id', (req, res) => {
    console.log('in GET this bands genre')
    const queryText = `SELECT "genre", "genres"."id" FROM "bands"
    JOIN "bands_genres" ON "bands_id" = "bands"."id" 
    JOIN "genres"  ON "bands_genres"."genres_id" = "genres"."id"
    where "bands"."id"=$1;`;
    pool.query(queryText, [Number(req.params.id)])
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in genre GET this${error}`);
        res.sendStatus(500);
    });
});

//get this bands genre for edit
router.get('/edit/:id', (req, res) => {
    console.log('in GET this bands genre for edit')
    const queryText = `SELECT "genre", "genres"."id" FROM "bands"
    JOIN "bands_genres" ON "bands_id" = "bands"."id" 
    JOIN "genres"  ON "bands_genres"."genres_id" = "genres"."id"
    where "bands"."id"=$1;`;
    pool.query(queryText, [Number(req.params.id)])
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in edit genre GET this${error}`);
        res.sendStatus(500);
    });
});


module.exports = router;
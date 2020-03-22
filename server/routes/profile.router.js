const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get logged-in band request
router.get('/band/:id', (req, res) => {
    console.log('in band profile GET with id:', req.params.id)
    const queryText = `SELECT "bands"."id", "name", "description", "twitter", "facebook", "www", "youtube", 
    ENCODE(band_photo, 'base64') as photo FROM "bands" 
    JOIN "user" ON "user"."id" = "bands"."user_name_id"
    WHERE "user"."id"=$1;`;
    pool.query(queryText, [Number(req.params.id)])
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in band GET ${error}`);
        res.sendStatus(500);
    });
});

//get logged-in venue request
router.get('/venue/:id', (req, res) => {
    console.log('in venue profile GET with id:', req.params.id)
    // const queryText = `SELECT "id", "name", "description", "address", "twitter", "facebook", "www", "youtube", 
    // ENCODE(venue_photo, 'base64') as photo FROM "venues" WHERE "id"=$1;`;
    // pool.query(queryText, [Number(req.params.id)])
    // .then( (result) => {
    //     res.send(result.rows);
    // })
    // .catch( (error) => {
    //     console.log(`Error in venue GET ${error}`);
    //     res.sendStatus(500);
    // });
});


module.exports = router;
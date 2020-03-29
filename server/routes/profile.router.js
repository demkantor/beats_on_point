const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get logged-in band request
router.get('/band/:id', (req, res) => {
    // console.log('in band profile GET with id:', req.params.id)
    const queryText = `SELECT "bands"."id", "bandname", "description", "twitter", "facebook", "www", "youtube", 
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
    // console.log('in venue profile GET with id:', req.params.id)
    const queryText = `SELECT "venues"."id", "venuename", "description", "address", "phone", "twitter", "facebook", "www", "youtube", 
    ENCODE(venue_photo, 'base64') as photo FROM "venues" 
    JOIN "user" ON "user"."id" = "venues"."user_name_id"
    WHERE "user"."id"=$1;`;
    pool.query(queryText, [Number(req.params.id)])
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in venue GET ${error}`);
        res.sendStatus(500);
    });
});

//set details for logged-in band / venue 
router.put('/details/:id', (req, res) => {
    // console.log('in details edit with id:', req.params.id, req.body);
    const queryText = `UPDATE ${req.body.who} SET ${req.body.type}=$1 WHERE "id"=$2;`;
    pool.query(queryText, [req.body.edit, Number(req.params.id)])
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in detail edit: ${error}`);
        res.sendStatus(500);
    });
});

//turn new user into a band
router.post('/new/band/:id', (req, res) => {
    // console.log('in new band POST with', req.params);
    const queryText = `INSERT INTO "bands" ("user_name_id") VALUES ($1);`;
    pool.query(queryText, [Number(req.params.id)])
    .then(() => { console.log('user id posted to bands table')
     })
    .catch((err) => {
      console.log('Error completing new band POST', err);
      res.sendStatus(500);
    }).then(()=>{
        const query = `UPDATE "user" SET "band"=true WHERE "id"=($1);`;
        pool.query(query, [Number(req.params.id)])
    }).then(() => {
        res.send(req.params.id);
    })
    .catch( (error) => {
        console.log(`Error in new band POST: ${error}`);
        res.sendStatus(500);
    });
});

//turn user into a new venue
router.post('/new/venue/:id', (req, res) => {
    // console.log('in new venue POST with', req.params);
    const queryText = `INSERT INTO "venues" ("user_name_id") VALUES ($1);`;
    pool.query(queryText, [Number(req.params.id)])
    .then(() => { console.log('user id posted to venues table')
     })
    .catch((err) => {
      console.log('Error completing new venue POST', err);
      res.sendStatus(500);
    }).then(()=>{
        const query = `UPDATE "user" SET "venue"=true WHERE "id"=($1);`;
        pool.query(query, [Number(req.params.id)])
    }).then(() => {
        res.send(req.params.id);
    })
    .catch( (error) => {
        console.log(`Error in new venue POST: ${error}`);
        res.sendStatus(500);
    });
});


module.exports = router;
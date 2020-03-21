const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get calendar events
router.get('/', (req, res) => {
    console.log('in calendar GET')
    const queryText = `SELECT "calendar"."id", "bands_id", "venues_id", "cost",
    TO_CHAR("date", 'Dy, Mon DD, YY') as "date",
    TO_CHAR("time", 'hh12:mi AM') as "time",  
    ENCODE("bands"."band_photo", 'base64') as "band_photo",
    ENCODE("venues"."venue_photo", 'base64') as "venue_photo"
    FROM "calendar" 
    JOIN "bands" ON "bands"."id" = "calendar"."bands_id"
    JOIN "venues" ON "venues"."id" = "calendar"."venues_id";`;
    pool.query(queryText)
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in photo GET ${error}`);
        res.sendStatus(500);
    });
});

//post new event to calendar
router.post('/', (req, res) => {
    console.log('in calendar POST with', req.params, req.body);
    // if (req.files === null) {
    //     return res.status(400).json({ msg: 'No file uploaded' })
    //   }
    // const photo = req.files.file;
    // const userId = req.params.id;
    // const queryText = `UPDATE "user" SET "photo"=$1 WHERE "id"=$2`;
    // pool.query(queryText, [photo.data, userId])
    // .then(() => { res.status(201).json({ name: photo.name, fileType: photo.mimetype, image: photo.data }); })
    // .catch((err) => {
    //   console.log('Error completing new photo PUT', err);
    //   res.sendStatus(500);
    // });
    res.sendStatus(200);
});

module.exports = router;
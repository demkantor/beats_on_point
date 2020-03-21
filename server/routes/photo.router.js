const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get user photo
router.get('/:id', (req, res) => {
    console.log('in photo GET with id:', req.params.id)
    const queryText = `SELECT ENCODE(photo, 'base64') FROM "user" WHERE "id"=$1;`;
    pool.query(queryText, [Number(req.params.id)])
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in photo GET ${error}`);
        res.sendStatus(500);
    });
});

//update user photo - conditionally set band/venue photos
router.put('/:id/:band/:venue', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' })
      }
    const photo = req.files.file;
    const userId = req.params.id;
    if(req.params.band === 'true'){
        const queryText = `UPDATE "bands" SET "band_photo"=$1 WHERE "user_name_id"=$2`;
        pool.query(queryText, [photo.data, userId])
        .then(()=>{
            console.log('band photo also set');
        });
    }
    if(req.params.venue === 'true'){
        const queryText = `UPDATE "venues" SET "venue_photo"=$1 WHERE "user_name_id"=$2`;
        pool.query(queryText, [photo.data, userId])
        .then(()=>{
            console.log('venue photo also set');
        });
    }
    const queryText = `UPDATE "user" SET "photo"=$1 WHERE "id"=$2`;
    pool.query(queryText, [photo.data, userId])
    .then(() => { res.status(201).json({ name: photo.name, fileType: photo.mimetype, image: photo.data }); })
    .catch((err) => {
      console.log('Error completing new photo PUT', err);
      res.sendStatus(500);
    });
});

module.exports = router;
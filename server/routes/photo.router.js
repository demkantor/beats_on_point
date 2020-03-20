const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get user photo
router.get('/:id', (req, res) => {
    console.log('in photo GET with', req.params)
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

//update photo
router.put('/:id', (req, res) => {
    console.log('in photo PUT with', req.params.id, req.files.file.name);
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' })
      }
    const photo = req.files.file;
    const userId = req.params.id;
    const queryText = `UPDATE "user" SET "photo"=$1 WHERE "id"=$2`;
    pool.query(queryText, [photo.data, userId])
    .then(() => { res.status(201).json({ name: photo.name, fileType: photo.mimetype, image: photo.data }); })
    .catch((err) => {
      console.log('Error completing new photo PUT', err);
      res.sendStatus(500);
    });
});

module.exports = router;
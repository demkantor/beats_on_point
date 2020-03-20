const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

//post new photo
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
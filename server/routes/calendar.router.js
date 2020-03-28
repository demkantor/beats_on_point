const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get all calendar events
router.get('/', (req, res) => {
    // console.log('in calendar GET')
    const queryText = `SELECT "calendar"."id", "bands_id", "venues_id", "cost",
    TO_CHAR("date", 'YY-MM-DD HH12:MI') as "order_date",
    TO_CHAR("date", 'FMDay, FMMonth FMDD FMYYYY HH12:MI am') as "date",  
    ENCODE("bands"."band_photo", 'base64') as "band_photo",
    ENCODE("venues"."venue_photo", 'base64') as "venue_photo"
    FROM "calendar" 
    JOIN "bands" ON "bands"."id" = "calendar"."bands_id"
    JOIN "venues" ON "venues"."id" = "calendar"."venues_id"
    ORDER BY "order_date" ASC;`;
    pool.query(queryText)
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in full calendar GET ${error}`);
        res.sendStatus(500);
    });
});

//get filtered event list
router.get('/new/:type/:query', (req, res) => {
    console.log('in NEW calendar GET', req.params.type, req.params.query);
    let query = req.params.query;
    let column = req.params.type;
    const queryText = `SELECT "calendar"."id", "calendar"."bands_id", "venues_id", "cost",
    TO_CHAR("date", 'YY-MM-DD HH12:MI') as "order_date",
    TO_CHAR("date", 'FMDay, FMMonth FMDD FMYYYY HH12:MI am') as "date",  
    ENCODE("bands"."band_photo", 'base64') as "band_photo",
    ENCODE("venues"."venue_photo", 'base64') as "venue_photo"
    FROM "calendar" 
    JOIN "bands" ON "bands"."id" = "calendar"."bands_id"
    JOIN "venues" ON "venues"."id" = "calendar"."venues_id"
    JOIN "bands_genres" on "bands_genres"."bands_id" = "bands"."id"
    JOIN "genres" on "genres"."id" = "bands_genres"."genres_id"
    WHERE ${column} = '${query}'
    ORDER BY "order_date" ASC;`;
    pool.query(queryText)
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in NEW calendar GET ${error}`);
        res.sendStatus(500);
    });
});

//get personal calendar events
router.get('/personal/:who/:id', (req, res) => {
    // console.log('in personal calendar GET', req.params.who, req.params.id);
    const queryText = `SELECT "calendar"."id", "bands_id", "venues_id", "cost",
    TO_CHAR("date", 'YY-MM-DD HH12:MI') as "order_date", 
    TO_CHAR("date", 'FMDay, FMMonth FMDD FMYYYY HH12:MI am') as "date", 
    ENCODE("bands"."band_photo", 'base64') as "band_photo",
    ENCODE("venues"."venue_photo", 'base64') as "venue_photo",
    "bands"."bandname" as band_name,
    "venues"."venuename" as venue_name
    FROM "calendar" 
    JOIN "bands" ON "bands"."id" = "calendar"."bands_id"
    JOIN "venues" ON "venues"."id" = "calendar"."venues_id"
    WHERE ${req.params.who}."user_name_id" = ${req.params.id}
    ORDER BY "order_date" ASC;`;
    pool.query(queryText)
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in personal calendar GET ${error}`);
        res.sendStatus(500);
    });
});

//delete event from calendar
router.delete('/personal/:who/:id/:event', (req, res) => {
    // console.log('in personal calendar DELETE', req.params.who, req.params.id, req.params.event);
    const queryText = `DELETE FROM "calendar" WHERE id=$1`;
    pool.query(queryText, [Number(req.params.event)])
    .then(() => {
      res.sendStatus(200);
    }).catch(err => {
        console.log("Error deleting event", err);
        res.sendStatus(500);
      });
  });

//post new event to calendar
router.post('/add/personal/:id', (req, res) => {
    // console.log('in new eventcalendar POST with', req.params, req.body);
    const date = req.body.date;
    const cost = req.body.cost;
    const band = req.body.bandsId;
    const venue = req.body.venuesId;
    const queryText = `INSERT INTO "calendar" ("bands_id", "venues_id", "date", "cost")VALUES ($1, $2, $3, $4)`;
    pool.query(queryText, [Number(band), Number(venue), date, Number(cost)])
    .then(() => { 
        res.sendStatus(201)
    }).catch((err) => {
      console.log('Error completing new event POST', err);
      res.sendStatus(500);
    });
});

module.exports = router;
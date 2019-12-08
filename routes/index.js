var express = require('express');
var router = express.Router();

const database = require('../databaseMySQLPromises');
const conveterWatt = require('../converterWatt');
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/table', function(req, res, next) {
  res.sendFile("html_table.html", {root: "../views"});
});

router.get('/devices', function(req, res, next) {
  database.read("smart_bulbs")
      .then(value => res.render('table', {items: value}))
      .catch(reason => next(reason));
});

router.get('/devicesFetch', function(req, res, next) {
    fetch('http://localhost:3000/api/devices')
        .then(res => res.json())
        .then(json => res.render('table', {items: json}))
        .catch(reason => next(reason));
});

router.get('/form', function(req, res, next) {
  res.render('form');
});

router.post('/', function(req, res, next) {
  let watt = req.body.watt;
  let kilowatt = conveterWatt.convertWatt(watt);
  res.render('index', {watt: watt, kilowatt: kilowatt});
});

module.exports = router;

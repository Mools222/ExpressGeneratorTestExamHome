var express = require('express');
var router = express.Router();

const database = require('../databaseMySQLPromises');

router.get('/:id?', function (req, res, next) {
    database.read("smart_bulbs", (req.params.id ? req.params.id : null))
        .then(value => res.send(value))
        .catch(reason => next(reason));
});

router.post('/', (req, res, next) => {
    console.log(req.body);

    database.create(req.body.bulb_id, req.body.hardware_type_number, req.body.software_version, req.body.status_bool, req.body.nominal_consumption, req.body.actual_consumption, req.body.light_intensity, req.body.color)
        .then(value => res.redirect("/api/devices/" + value))
        .catch(reason => next(reason));
});

module.exports = router;

const fetch = require('node-fetch');

// https://www.npmjs.com/package/node-fetch

function getPlainTextOrHtml() {
    fetch('http://localhost:3000/api/devices')
        .then(res => res.text())
        .then(body => console.log(body));
}

// getPlainTextOrHtml();

function getJson() {
    fetch('http://localhost:3000/api/devices')
        .then(res => res.json())
        .then(json => console.log(json));
}

// getJson();

function post() {
    const body = {
        "bulb_id": 9426,
        "hardware_type_number": 96,
        "software_version": "0.1",
        "status_bool": 1,
        "nominal_consumption": 0.07,
        "actual_consumption": 0.06,
        "light_intensity": 63,
        "color": "grøn"
    };

    fetch('http://localhost:3000/api/devices', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'},
    })
        .then(res => res.json())
        .then(json => console.log(json));
}

post();

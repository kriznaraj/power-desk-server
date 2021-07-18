'use strict';

const express = require('express');
var cors = require('cors');

const fs = require('fs');
var path = require('path');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/prechecks/:sitename', (req, res) => {
    const siteName = req.params.sitename;
    const match = fetchReport('prechecks', siteName);
    if(!match) {
        res.sendStatus(404);
    }
    res.send(match);
})

let fetchReport = (report, siteName) => {
    const prechecks = getJsonData(report + '.json');
    let match = prechecks[siteName];
    console.log(report, siteName, match);
    return match;
}

app.get('/issues/:sitename', (req, res) => {
    const siteName = req.params.sitename;
    const match = fetchReport('siteIssues', siteName);
    if(!match) {
        res.sendStatus(404);
    }
    res.send(match);
})

app.get('/report/:reportName/:sitename', (req, res) => {
    const siteName = req.params.sitename;
    const reportName = req.params.reportName;
    const match = fetchReport(reportName, siteName);
    if(!match) {
        res.sendStatus(404);
    }
    res.send(match);
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

//get data from file
const getJsonData = (jsonFileName) => {
    var jsonPath = path.join(__dirname, 'data', jsonFileName);
    console.log(jsonPath);
    try {
        const jsonData = fs.readFileSync(jsonPath);
        return JSON.parse(jsonData)    
    } catch (error) {
        console.error(error);
        return {};
    }
}
const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./config/dbconfig');
const cors = require('cors');
const connection = mysql.createConnection(dbconfig);
const app = express();
app.use(cors());
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('Root');
});

app.get('/lectures', (req, res) => {
  connection.query('SELECT title, type, prof from Lecture', (error, rows) => {
    if (error) throw error;
    res.json(rows);
  });
});

app.get('/questions/:lecID', (req, res) => {
    console.log(req.params.lecID);
    connection.query('SELECT * from Question WHERE ', (err, rows) => {
        if(err)  throw err;
        res.json(rows);
    });
});

app.get('/answers/:qID', (req, res) => {
    connection.query('SELECT * from Answer', (err, rows) => {
        if(err) throw err;
        res.json(rows);
    })
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

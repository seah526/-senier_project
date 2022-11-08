const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./config/dbconfig');

const connection = mysql.createConnection(dbconfig);
const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('Root');
});

app.get('/lectures', (req, res) => {
  connection.query('SELECT id, title, type, prof from Lecture', (error, rows) => {
    if (error) throw error;
    res.json(rows);
  });
});

app.get('/questions/:lecID', (req, res) => {
    const lecId  = parseInt(req.params.lecID);

    if (isNaN(lecId)) {
        console.log("err");
		// return res.json(stat(400, 'Lecture id must be integer.'));
	}
    try{
        connection.query(`SELECT * from Question WHERE lectureId=${lecId}`, (err, rows) => {
            if(err) throw err;
            res.json(rows);
            console.log(rows);
        })

    } catch(err){
		// return res.json(stat(500, err.message));
    }
});

app.post('/questions', (req, res) => {

});

app.get('/answers/:qID', (req, res) => {
    const qId = parseInt(req.params.qID);

    connection.query(`SELECT * from Answer WHERE quetionId=${qId}`, (err, rows) => {
        if(err) throw err;
        res.json(rows);
    })
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

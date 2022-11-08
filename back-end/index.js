const express = require('express');
const mysql = require('mysql');
const path = require('path');
const dbconfig = require('./config/dbconfig');

const connection = mysql.createConnection(dbconfig);
const app = express();

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.send('Root');
});

//전체 과목 목록 반환
app.get('/lectures', (req, res) => {
  connection.query('SELECT id, title, type, prof from Lecture', (error, rows) => {
    if (error) throw error;
    res.json(rows);
  });
});

//해당 과목 중 특정 교수님 분반의 질문 목록 반환
app.get('/', (req, res) => {

});

//선택한 과목에 해당하는 질문 목록 반환
app.get('/lectures/:lecID/questions', (req, res) => {
    const lecId  = parseInt(req.params.lecID);

    if (isNaN(lecId)) {
        console.log("err");
		// return res.json(stat(400, 'Lecture id must be integer.'));
	}
    try{
        connection.query(`SELECT * from Question WHERE lectureId=${lecId}`, (err, rows) => {
            if(err) throw err;
            res.json(rows);
        })

    } catch(err){
		// return res.json(stat(500, err.message));
    }
});

//과목에 해당하는 질문 작성 
app.post('/lectures/:lecID/questions', (req, res) => {

    var lecId = req.params.lecID;
    var title = req.body.title;
    var contents = req.body.contents;

    connection.query(`INSERT INTO Question (lectureId, title, contents) VALUES(${lecId}, '${title}', '${contents}')`, (err, result) => {
        if(err) throw err;
        console.log("1 record inserted");
        console.log(result);
    });
    res.redirect('/');
    // res.send('ok')
});

//질문에 해당하는 답변 목록 반환
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

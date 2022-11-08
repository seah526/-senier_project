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
  connection.query('SELECT id, title, type from Lecture', (error, rows) => {
    if (error) throw error;
    res.json(rows);
  });
});

//해당 과목 중 특정 교수님 분반의 질문 목록 반환
app.get('/lectures/:lecID/professors', (req, res) => {
    const lecId = parseInt(req.params.lecID);

    if(isNaN(lecId)){
        res.send('err');
    } else{
        connection.query(`SELECT profID from Prof_Lec WHERE lecID=${lecId}`, (err, rows) => {
            if(err) throw err;
            let profIDS = [];
            let result = Object.values(JSON.parse(JSON.stringify(rows)));
            result.forEach((v) => profIDS.push(v.profID));

            console.log(profIDS);

            connection.query(`SELECT * from Professor WHERE id in (${profIDS})`, (err, results) => {
                if(err) throw err;
                console.log(results);
                res.json(results);
            })
            // res.json(rows);
        });

    }
});

//선택한 과목에 해당하는 전체 질문 목록 반환
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

//특정 과목 & 특정 교수님 분반에 해당하는 질문 목록 반환
app.get('/lectures/:lecID/professor/:profID/questions', (req, res) => {
    const lecId = parseInt(req.params.lecID);
    const profId = parseInt(req.params.profID);

    if(isNaN(lecId) || isNaN(profId)){
        console.log("err");
    } else{
        try{
            connection.query(`SELECT * from Question WHERE lectureId=${lecId} AND profId=${profId}`, (err, rows) => {
                if(err) throw err;
                res.json(rows);
            })

        } catch(err){
            return res.send(err);
        }
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
    });
    res.redirect('/');
    // res.send('ok')
});

//질문에 해당하는 답변 목록 반환
app.get('/questions/:qID/answers', (req, res) => {
    const qId = parseInt(req.params.qID);

    connection.query(`SELECT * from Answer WHERE quetionId=${qId}`, (err, rows) => {
        if(err) throw err;
        res.json(rows);
    })
});

//답변 작성 api
app.post('/questions/:qID/answers', (req, res) => {

    var qId = req.params.qID;
    var contents = req.body.contents;

    connection.query(`INSERT INTO Answer (questionId, contents) VALUES (${qId, '${contents}'})`, (err, result) => {
        if(err) throw err;
        console.log("1 answer inserted!");
        res.redirect('/');
    });
});


app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

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

//계정 존재 유무 확인 
app.get('/login', (req, res) => {
    const id = req.body.id;
    const pwd = req.body.password;

    connection.query(`SELECT COUNT (*) from User WHERE nickname='${id}' AND password='${pwd}'`, (err, result) => {
        if(err) throw err;

        let check = Object.values(Object.values(JSON.parse(JSON.stringify(result)))[0])[0];

        if(check){
            res.send(true);
        } else{
            res.send(false);
        }
    });
});

//전체 과목 목록 반환
app.get('/lectures', (req, res) => {
  connection.query('SELECT id, title, type from Lecture', (error, rows) => {
    if (error) throw error;
    res.json(rows);
  });
});


app.get('/lectures/:lecID', (req, res) => {
    const lecId = parseInt(req.params.lecID);

    if(isNaN(lecId)){
        res.send('err');
    }else{
        connection.query(`SELECT id, title from Lecture WHERE id=${lecId}`, (err, row) => {
            if(err) throw err;
            let lecData = {};

            lecData.id = Object.values(JSON.parse(JSON.stringify(row)))[0].id;
            lecData.subject = Object.values(JSON.parse(JSON.stringify(row)))[0].title;
            lecData.professor = new Array();
            lecData.questions = new Array();

            connection.query(`SELECT profID from Prof_Lec WHERE lecID=${lecId}`, async (err, rows) => {
                if(err) throw err;
                let profIDS = [];
                let result = Object.values(JSON.parse(JSON.stringify(rows)));
                result.forEach((v) => profIDS.push(v.profID));
    
                if(profIDS.length == 0){
                    res.json(profIDS);
                } else{
                    await connection.query(`SELECT * from Professor WHERE id in (${profIDS})`, (err, results) => {
                        if(err) throw err;
                        let temp = Object.values(JSON.parse(JSON.stringify(results)));
                        temp.forEach((v) => lecData.professor.push(v));

                        connection.query(`SELECT * from Question WHERE lectureId=${lecId}`, (err, q) => {
                            if(err) throw err;
                            let tempQ = Object.values(JSON.parse(JSON.stringify(q)));
                            tempQ.forEach((v) => lecData.questions.push(v));
                            res.json(lecData);
                        });
                    });
                }
            });
        });
    }
});

//해당 과목 중 특정 교수님 분반의 질문 목록 반환
// app.get('/lectures/:lecID/professors', (req, res) => {
//     const lecId = parseInt(req.params.lecID);

//     if(isNaN(lecId)){
//         res.send('err');
//     } else{
//         connection.query(`SELECT profID from Prof_Lec WHERE lecID=${lecId}`, (err, rows) => {
//             if(err) throw err;
//             let profIDS = [];
//             let result = Object.values(JSON.parse(JSON.stringify(rows)));
//             result.forEach((v) => profIDS.push(v.profID));

//             if(profIDS.length == 0){
//                 res.json(profIDS);
//             } else{
//                 connection.query(`SELECT * from Professor WHERE id in (${profIDS})`, (err, results) => {
//                     if(err) throw err;
//                     res.json(results);
//                 });
//             }
//             // res.json(rows);
//         });

//     }
// });

//선택한 과목에 해당하는 전체 질문 목록 반환
// app.get('/lectures/:lecID/questions', (req, res) => {
//     const lecId  = parseInt(req.params.lecID);

//     if (isNaN(lecId)) {
//         console.log("err");
// 		return res.json(stat(400, 'Lecture id must be integer.'));
// 	}
//     try{
//         connection.query(`SELECT * from Question WHERE lectureId=${lecId}`, (err, rows) => {
//             if(err) throw err;
//             res.json(rows);
//         })

//     } catch(err){
// 		return res.json(stat(500, err.message));
//     }
// });

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

// qID로 특정 질문 정보 호출 
app.get('/questions/:qID', (req, res) => {
    const qId = req.params.qID;

    connection.query(`SELECT * from Question WHERE id=${qId}`, (err, row) => {
        if(err) throw err;
        res.json(row);
    });
});

//질문에 해당하는 답변 목록 반환
app.get('/questions/:qID/answers', (req, res) => {
    const qId = parseInt(req.params.qID);

    connection.query(`SELECT * from Answer WHERE quetionId=${qId}`, (err, rows) => {
        if(err) throw err;
        res.json(rows);
    })
});

//과목에 해당하는 질문 작성 
app.post('/lectures/:lecID/questions', (req, res) => {

    var lecId = req.params.lecID;
    var title = req.body.title;
    var authID = req.body.authorID;
    var contents = req.body.contents;
    // var time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') ;
    var time = new Date().toISOString().slice(0, 19).replace('T', ' ');


    console.log(time);

    connection.query(`INSERT INTO Question (lectureId, authorId, title, contents, createdAt) VALUES(${lecId}, ${authID}, '${title}', '${contents}', '${time}')`, (err, result) => {
        if(err) throw err;
        console.log("1 record inserted");
        console.log(result);
    });
    res.redirect('/');
    // res.send('ok')
});

//답변 작성 api
app.post('/questions/:qID/answers', (req, res) => {

    var qId = req.params.qID;
    var contents = req.body.contents;

    connection.query(`INSERT INTO Answer (questionId, contents) VALUES (${qId}, '${contents}')`, (err, result) => {
        if(err) throw err;
        console.log(result);
        console.log("1 answer inserted!");
        res.redirect('/');
    });
});


app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

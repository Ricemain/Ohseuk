const express = require('express');
const app = express();
var db = require('./database.js');
app.use(express.static('public'));
const path = require('path');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }) );

const USER_COOKIE_KEY = 'user';

app.use(cookieParser());


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

//페이지 경로 설정
app.get('/refinesearch/se',(req,res)=>{ //검색페이지
    res.sendFile(__dirname + '/refinesearch/se.html'); 
});
app.get('/login/login',(req,res)=>{ //로그인페이지
    res.sendFile(__dirname + '/login/login.html');
});
app.get('/login/singup',(req,res)=>{ //회원가입페이지
    res.sendFile(__dirname + '/login/singup.html');
});
app.get('/mainPage/mainNode',(req,res)=>{ //메인페이지
    res.sendFile(__dirname + '/mainPage/mainNode.html');
});
app.get('/mainPage/results',(req,res)=>{ //결과페이지
    res.sendFile(__dirname + '/mainPage/result.html');
});
app.get('/recommend/recommendPage',(req,res)=>{ //추천페이지
    res.sendFile(__dirname + '/recommend/recommendPage.html');
});
app.get('/community/community',(req,res)=>{ //커뮤니티페이지
    res.sendFile(__dirname + '/community/community.html');
});
app.get('/community/class',(req,res)=>{ //커뮤니티 만들기 페이지
    res.sendFile(__dirname + '/community/class.html');
});
app.get('/community/InPage',(req,res)=>{ //커뮤니티 페이지
    res.sendFile(__dirname + '/community/InPage.html');
});


app.get('/refinesearch/se/search',(req,res)=>{
    const region1 = req.query.region1;
    const region2 = req.query.region2;
    const puInstitution1 = req.query.puInstitution1;
    const serviceKey = req.query.serviceKey;
    const online = req.query.online;
    const age = req.query.age;
    const gender = req.query.gender;

    db.getResultBySearch(region1, region2, puInstitution1, serviceKey, online, age, gender, (err, result) => {
        if(err) return res.status(500).send('DB Error');
        res.json(result);
    });
    db.getCountBySearch(region1, region2, puInstitution1, serviceKey, online, age, gender, (err, count) => {
        if(err) return res.status(500).send('DB Error');
        res.json({ count });
    });
});

app.get('/mainPage/details',(req,res)=>{
    const numKey = req.query.numKey;

    db.getDetailsByNumKey(numKey, (err, result) => {
        if(err) return res.status(500).send('DB Error');
        res.json(result);
    });
});

app.get('/login/login/user',(req,res)=>{
    const id = req.query.id;
    const pw = req.query.pw;

    db.getUserLogin(id, pw, (err, result) => {
        if(err) return res.status(500).send('DB Error');
        res.json(result);
    });
});

app.get('/list', function (req, res) {
    var sql = 'SELECT * FROM user';
    db.getConnection().query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else res.send(rows);
    });
});

app.get('/login/singup/singUpProc',(req,res)=>{
    const userID = req.query.userID;
    const username = req.query.userName;
    const userPassword = req.query.userPassword;
    const region1 = req.query.region1;
    const region2 = req.query.region2;
    const gender = req.query.gender;
    const userAge = req.query.userAge;
    const serviceKey = req.query.serviceKey;
    var region = region1 + ' ' + region2;

    db.getSigup(userID, username, userPassword, region, gender, userAge, serviceKey, (err, result) => {
        if(err) return res.status(500).send('DB Error');
        res.json(result);
    });
});

app.get('/recommend/recommendPage/recommendButton',(req,res)=>{
    const id = req.query.id;

    db.getRecommend(id, (err, result) => {
        if(err) return res.status(500).send('DB Error');
        res.json(result);
    });
});

app.get('/community/class/creatPage',(req,res)=>{
    const inputField = req.query.inputField;
    const userID = req.query.userID;

    db.getCreatCommunity(inputField, userID, (err, result) => {
        if(err) return res.status(500).send('DB Error');
        res.json(result);
    });
});

app.get('/community/InPage/post',(req,res)=>{
    const postText = req.query.postText;
    const userID = req.query.userID;

    db.getPost(postText, userID, (err, result) => {
        if(err) return res.status(500).send('DB Error');
        res.json(result);
    });
});

app.get('/community/InPage/getPost',(req,res)=>{
    const communityID = req.query.communityID;

    db.getPostPage(communityID, (err, result) => {
        if(err) return res.status(500).send('DB Error');
        res.json(result);
    });
});










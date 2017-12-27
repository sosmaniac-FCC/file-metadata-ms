const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const multer = require('multer');
const counter = require('./counter.js');

const uri = 'mongodb://' + process.env.DBUSER + ':' + process.env.DBPASS + '@' + process.env.DBHOST + ':' + process.env.DBPORT + '/examplefile';
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

// home page
app.get("/", (req, res) => {
  console.log(counter.reset());
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/update", (req, res) => {
  mongodb.MongoClient.connect(uri, (err, db) => {
    if (err) console.error(err);
    
    const coll = db.db('examplefile').collection('formdata');
    coll.find().limit(1).sort({$natural:-1}).toArray((err, doc) => {
      if (err) console.error(err);
      
      if (typeof doc[0] != "undefined")
        doc[0].iteration = counter.value();
      res.send(doc);
      db.close();
    });
  });
});

app.get("/api/files", (req, res) => {
  mongodb.MongoClient.connect(uri, (err, db) => {
    if (err) console.error(err);
    
    const coll = db.db('examplefile').collection('formdata');
    coll.find({}).toArray((err, docs) => {
      if (err) console.error(err);
      
      res.send(docs);
      db.close();
    });
  });
});

app.post("/api/files", multer({dest: './uploads/'}).single('formFile'), (req, res) => {
  console.log(counter.increment());
  
  mongodb.MongoClient.connect(uri, (err, db) => {
    if (err) console.error(err);
    
    const coll = db.db('examplefile').collection('formdata');
    coll.insert({"file": req.file}, (err, result) => {
      if (err) console.error(err);
      
      res.sendFile(__dirname + '/views/index.html');
      db.close();
    });
  });
});

const listener = app.listen(process.env.PORT, () => {
  console.log('PORT: ' + listener.address().port);
});

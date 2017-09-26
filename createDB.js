var MongoClient = require('mongodb').MongoClient
, assert = require('assert')
, format = require('util').format;

// Connection URL
var url = 'mongodb://localhost:27017/chat';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    const collection = db.collection('test_insert');

    collection.remove({}, (err, affected) => {
        if (err) throw err;

        collection.insert({a: 2}, (err, docs) => {
            collection.count((err, count) => console.log(format('count = %s', count)));
        });
    
        const cursor = collection.find({a: 2});
        cursor.toArray((err, results) => {
            console.dir(results);
    
            db.close();
        });
    });

    
});
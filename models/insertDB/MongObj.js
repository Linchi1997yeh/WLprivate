var MongoClient = require('mongodb').MongoClient;

module.exports = function (dbname) {
    this.return_dbname = function () {
        console.log(dbname);
    }

    this.url = "mongodb://localhost:27017/" + dbname;

    this.showURL = function () {
        console.log(this.url);
    }

    this.connect = function () {
        MongoClient.connect(this.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            console.log("run!");
            db.close();
        });
    }

    this.insert_one = function (collection,obj) {
        MongoClient.connect(this.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            var myobj = obj;
        
            dbo.collection(collection).insertOne(myobj, function (err, res) {
                if (err) throw err;
                console.log("run");
                db.close();
            });
        });
    }

    this.insert_many = function (collection,...obj) {
        MongoClient.connect(this.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            dbo.collection(collection).insertMany(obj, function (err, res) {
                if (err) throw err;
                console.log("Inserted file numbers: " + res.insertedCount);
                db.close();
            });
        });
    }

    this.find = function (collection) {
        MongoClient.connect(this.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            dbo.collection(collection).find({}).toArray(function (err, result) {
                if (err) throw err;
                JSON.parse(result)
               // console.log(result);
                db.close();
            });
        });
    }

    this.find_data = function (collection,obj) {
        MongoClient.connect(this.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            var whereStr = obj;
            dbo.collection(collection).find(whereStr).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                db.close();
            });
        });
    }

    this.update_one = function (collection,obj,fixobj) {
        MongoClient.connect(this.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            var whereStr =obj;
            var updateStr = { $set: fixobj };
            dbo.collection(collection).updateOne(whereStr, updateStr, function (err, res) {
                if (err) throw err;
                console.log("Updating Success");
                db.close();
            });
        });
    }

    this.update_many = function (collection, obj, fixkobj) {
        MongoClient.connect(this.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            var whereStr = obj
            var updateStr = { $set: fixkobj };
            dbo.collection(collection).updateMany(whereStr, updateStr, function (err, res) {
                if (err) throw err;
                console.log(res.result.nModified + " Updating Success");
                db.close();
            });
        });
    }

    this.delete_one = function (collection,obj) {
        MongoClient.connect(this.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            var whereStr = obj;
            dbo.collection(collection).deleteOne(whereStr, function (err, obj) {
                if (err) throw err;
                console.log("Deleting Success");
                db.close();
            });
        });
    }

    this.delete_many = function (collection, obj) {
        MongoClient.connect(this.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            var whereStr = obj;
            dbo.collection(collection).deleteMany(whereStr, function (err, obj) {
                if (err) throw err;
                console.log(obj.result.n + "has been deleted");
                db.close();
            });
        });
    }

    this.sort = function (collection,sort_type) {
        MongoClient.connect(this.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            var mysort = { type: sort_type};
            dbo.collection(collection).find().sort(mysort).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                db.close();
            });
        });
    }

    this.find_limit = function (collection, limit_num) {
        MongoClient.connect(this.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            dbo.collection(collection).find().limit(limit_num).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                db.close();
            });
        });
    }

    this.find_skip_limit = function (collection, skip_num, limit_num) {
        MongoClient.connect(this.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            dbo.collection(collection).find().skip(skip_num).limit(limit_num).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                db.close();
            });
        });
    }

    this.delete_collection = function (collection) {
        MongoClient.connect(this.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);

            dbo.collection(collection).drop(function (err, delOK) {
                if (err) throw err;
                if (delOK) console.log("Delete Collections");
                db.close();
            });
        });
    }
}
const express = require("express");
const app = express();
// const mysql = require("mysql");
const cors = require("cors");
const sqlite3 = require('sqlite3').verbose();

app.use(cors());
app.use(express.json());

app.get("/question1", (req, res) => {
    const cost_price = Number(req.query.cost)
    const sell_price = Number(req.query.sell)
    const inventory = Number(req.query.inventory)
    const profit = (sell_price - cost_price) * inventory
    const total = Math.round(profit)
    res.json({ total: total })
});

let db = new sqlite3.Database('product.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

app.get("/question5", (req, res) => {
    let data = [{ name: "Rick", car: "Corvette Z06" },
    { name: "Rick", car: "Lotus Exite S" },
    { name: "Rick", car: "BMW M3" },
    { name: "John", car: "BMW 320d" },
    { name: "John", car: "Mercedes SLK AMG" },
    { name: "Zing", car: "Toyota Alphard" },
    { name: "Zing", car: "Mercedes Sprinter" },
    { name: "Nan", car: "Toyota Camry" },
    { name: "Nan", car: "Porsche 911" },
    { name: "Nan", car: "BMW M5" },
    { name: "Nan", car: "Jaguar" },
    { name: "Nan", car: "TukTuk" },
    { name: "Nan", car: "Mini Cooper" },
    { name: "Nan", car: "Honda Jazz" }]
    db.serialize(function () {
        db.run("CREATE TABLE mem (id INTEGER PRIMARY KEY, name TEXT NOT NULL , car TEXT NOT NULL)");
        var stmt = db.prepare("INSERT INTO mem VALUES (?,?)");
        for (let index = 0; index <= data.length - 1; index++) {
            stmt.run(data[index].name, data[index].car);
        }
        stmt.finalize();

        db.each("SELECT name, car FROM mem", function (err, row) {
            console.log(row.name + " , ", row.car);
        });
    });
    db.close();
});

app.get("/question6", (req, res) => {
    db.serialize(function () {

        db.each("SELECT name,COUNT(name) AS ColCnt FROM user GROUP BY name ", function (err, row) {
            console.log(row);
        });
    });
    db.close();
});

app.get("/question7", (req, res) => {
    db.serialize(function () {

        db.each("SELECT name,COUNT(name) AS ColCnt FROM user GROUP BY name HAVING COUNT(name) > 2", function (err, row) {
            console.log(row);
        });
    });
    db.close();
});

app.listen("3001", () => {
    console.log("run port 3001");
});
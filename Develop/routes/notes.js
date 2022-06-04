const express = require("express")
const app = require ("express").Router();
const fs = require("fs");
const { totalmem } = require("os");
const path = require("path");
const { exit, title } = require("process");

app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(express.static('public'));

app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'), err => {
        console.log('Something went wrong ' + err);
    })
})

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, 'db/db.json'), err => {
        console.log('Something went wrong ' + err);
    })
})

app.post("/api/notes", (req, res) => {
    const {title, text} = req.body;

    if (title && text) {
        
        fs.readFile('../db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let fileData = JSON.parse(data);
                fileData.push(req.body);
                writeToFile('../db/db.json', fileData)
            }
        })
    }
})

module.exports = app;
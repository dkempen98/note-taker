const express = require ("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'), err => {
        if (err) {
            console.log('Something went wrong' + err);
        }
    })
})

app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'), err => {
        if (err) {
            console.log('Something went wrong ' + err);
        }
    })
})

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, 'db/db.json'), err => {
        if (err) {
            console.log('Something went wrong ' + err);
        }
    })
})

app.post("/api/notes"), (req, res) => {

}

app.post("/api/notes", (req, res) => {
    const {title, text} = req.body;

    const newNote = {
        title,
        text,
        id: uuidv4()
    }

    if (title && text) {
        
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let fileData = JSON.parse(data);
                fileData.push(newNote);
                fs.writeFile('./db/db.json', JSON.stringify(fileData), (err) => 
                err ? console.log(err) : console.log("Note added"))
            }
        })
    }
})

app.delete("/api/notes/:id", (req, res) => {

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
       let fileData = JSON.parse(data);
       for (let i = 0; i < fileData.length; i++) {
        console.log(typeof(fileData[i].id));
           if (fileData[i].id == req.params.id) {
            fileData.splice(i)
           }
       }
       fs.writeFile('./db/db.json', JSON.stringify(fileData), (err) => 
                err ? console.log(err) : console.log("Note deleted"))
    })
})

app.listen(PORT, () => {
    console.log('App is live at localhost:' + PORT);
})

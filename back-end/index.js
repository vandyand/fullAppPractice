const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 4000;

// const storeFileName = "./store.json";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const getStore = () => JSON.parse(fs.readFileSync("./store.json", "utf8"));
const writeStore = data =>
    fs.writeFileSync("./store.json", JSON.stringify(data));

app.get("/", (req, res) => {
    console.log("get called!");
    let store = getStore();
    res.send(store);
});

app.post("/", (req, res) => {
    console.log("post called! req.body: ",req.body);
    let store = getStore();
    store = { entries: [...store.entries, req.body] };
    writeStore(store);
    res.send(store);
});

app.patch("/", (req, res) => {
    console.log("patch called! req.body: ",req.body);
    // console.log(Object.keys(req.body)[0])
    let store = getStore();
    if (store.entries.some(e => e.id === req.body.id)) {
        store = {
            entries: [
                ...store.entries.filter(entry => entry.id !== req.body.id),
                req.body
            ]
        };
    }
    writeStore(store);
    res.send(store);
});

app.delete("/", (req, res) => {
    console.log("delete called! req.body: ",req.body);
    let store = getStore();

    store = { entries: store.entries.filter(item => item.id !== req.body.id) };

    writeStore(store);

    res.send(store);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

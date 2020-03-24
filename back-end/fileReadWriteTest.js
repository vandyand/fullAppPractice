const fs = require("fs");




let data = JSON.parse(fs.readFileSync("./store.json", "utf8"));

// let newKey = String(Date.now())

data = {...data, [String(Date.now())]:"what?"}

fs.writeFileSync("./store.json",JSON.stringify(data))


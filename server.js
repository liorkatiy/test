const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const files = {
  data: "data.json",
  people: "people.json"
};

app.use(
  bodyParser.json(),
  express.static(path.join(__dirname, "/public"))
);

app.get("/people", async (req, res) => {
  const r = await readFile(files.people);
  res.json(r);
});

app.post("/people", async (req, res) => {
  const name = req.body.name;
  const r = await readFile(files.people);
  r.push(name);
  await writeFile(files.people, r);
  res.json(r);
});

app.listen(9001, async () => {
  console.log('Server running on port 9001.');
});

async function addPrson(name) {

}

async function readFile(name) {
  const file = fs.readFileSync("files/" + name);
  return await JSON.parse(file);
}

async function writeFile(name, data) {
  const d = await JSON.stringify(data);
  const file = fs.writeFileSync("files/" + name, d);
}
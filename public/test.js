const people = [];
const table = document.getElementById("table");
const editor = document.getElementById("editor");
let currentNode = false;
let currentDay = false;

async function init() {
  const p = await fetch("/people", {
    method: "GET"
  }).then((res) => res.json());
  p.forEach(name => {
    add(name);
  });
}

function add(userName) {
  const name = userName || document.getElementById("name").value;
  const row = document.createElement("tr");
  const namElement = document.createElement("td");
  namElement.innerText = name;
  const person = {
    name,
    days: []
  }
  people.push(person);
  row.appendChild(namElement);
  for (let i = 0; i < 6; i++) {
    const td = document.createElement("td");
    person.days.push([]);
    td.style.verticalAlign = "top"
    td.onclick = tdEdit(person.days[i], td);
    row.appendChild(td);
  }
  table.appendChild(row);
  fetch("/people", {
    method: "POST",
    body: JSON.stringify({
      name
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

function tdEdit(day, td) {
  return (e) => {
    currentDay = day;
    currentNode = td;
    document.getElementById("back").style.display = "block";
  };
}

function appendToNode(e) {
  currentNode.innerHTML = ""
  currentDay.splice(0);
  const inputs = editor.getElementsByTagName("input");
  const data = [];
  currentDay.push({
    start: 0,
    end: 0,
    name: ""
  });
  for (let i = 0, k = 0; i < inputs.length - 1; i += 2, k++) {
    const val = inputs[i].value;
    if (val) {
      currentDay[currentDay.length - 1].end = k * 50;
      currentDay.push({
        start: k * 50,
        end: k * 50,
        name: val,
        color: inputs[i + 1].value
      });
    }
  }
  currentDay[currentDay.length - 1].end = 400;
  for (let i = 0; i < currentDay.length; i++) {
    const div = document.createElement("div");
    const p = document.createElement("span");
    div.classList.add("job");
    p.innerText = currentDay[i].name;
    div.appendChild(p);
    div.style.height = (currentDay[i].end - currentDay[i].start) + "px"
    div.style.backgroundColor = currentDay[i].color;
    currentNode.appendChild(div);
  }
  document.getElementById("back").style.display = "none";
}
init();
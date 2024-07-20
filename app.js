console.log('Remote access is starting...');

const express = require('express');
const app = express();
const port = 3000;

app.use((req, res) => {
  res.send(getEarliestEntry());
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let entries = [];
function getEarliestEntry() {
  if (entries.length === 0) {
    console.log('Ping recieved but no event.');
    return "null";
  }
  const earliestEntry = entries.shift();
  console.log(`The following event will be executed: ${earliestEntry}`);
  return earliestEntry;
}

function handleInput() {
  rl.question('Type an event: ', (input) => {
    if (input.toLowerCase() === 'get') {
      getEarliestEntry();
    } else {
      entries.push(input);
      console.log(`Added to queue: ${input}`);
    }
    handleInput();
  });
}

handleInput();

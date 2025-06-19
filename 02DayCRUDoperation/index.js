const express = require('express');
const app = express();
app.use(express.json());

app.get('/read_data', (req, res) => {
  res.send('Reading data...');
});

app.get('/insert_data', (req, res) => {
  res.send('Inserting data...');
});

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const employees = require('./routes/employees');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/employees', employees);

app.use((err, req, res, next) => {
  if (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> console.log('Server listening on', PORT));

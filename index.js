const express = require('express');
const getTasks = require('./services/notion');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static('public'));

app.get('/tasks', async (req, res) => {
  const tasks = await getTasks();
  res.json(tasks);
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
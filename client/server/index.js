const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5001;

const publicPath = path.join(__dirname, '..', 'build');

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log('App running on port', PORT);
});

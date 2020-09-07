if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');
const errHandler = require('./middlewares/errorHandler');

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/v1', routes);
app.use(errHandler);

module.exports = app;

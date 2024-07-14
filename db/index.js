const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log('DB Connecction Successful'))
  .catch((err) => {
    console.err(err);
  });

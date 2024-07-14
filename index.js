const express = require('express');
const cors = require('cors');
const router = require('./router/router');
const createRoles = require('./controllers/roles');
const mongoose = require('mongoose');
require('./db/');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

(async () => {
  const list = await mongoose.connection.listCollections();

  if (list.filter((obj) => obj.name === 'roles').length == 0) {
    createRoles();
  }
})();

app.get('/', (req, res) => res.json({ message: 'hello world' }));
router(app);

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});

const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

const encryptPsw = async (psw) => {
  const hash = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(psw, hash);
};

const decryptPsw = async (psw, hash) => {
  return await bcryptjs.compare(psw, hash);
};

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
    expiresIn: '24h',
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.TOKEN_SECRET_KEY);
};

const decodeToken = async (token) => {
  return jwt.decode(token);
};

module.exports = {
  encryptPsw,
  decryptPsw,
  generateToken,
  verifyToken,
  decodeToken,
};

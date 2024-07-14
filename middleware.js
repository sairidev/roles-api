const { RolSchema } = require('./db/schemas');
const { decodeToken } = require('./utils/auth');

const admin = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const { roles } = await decodeToken(
        req.headers.authorization.replace('Bearer ', '')
      );

      if (roles && roles.length > 0) {
        const rol = await RolSchema.findById({ _id: roles[0] });

        if (rol && rol.name === 'user') {
          return res.redirect('/');
        }
      } else {
        return res.status(403).json({ message: 'Unauthorized' });
      }
    } else {
      return res
        .status(403)
        .json({ message: 'No authorizarion header provided' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }

  next();
};

module.exports = admin;

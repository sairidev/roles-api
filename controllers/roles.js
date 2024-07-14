const { RolSchema } = require('../db/schemas');
const roles = ['admin', 'moderator', 'user'];

const createRoles = async () => {
  roles.forEach(async (rol) => {
    const def = new RolSchema({ name: rol });
    await def.save();
  });
};

module.exports = createRoles;

const { Schema, model } = require('mongoose');

// user schema
const userSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  roles: {
    type: [{ type: Schema.Types.ObjectId, ref: 'roles' }],
    default: [],
  },
});

const UserSchema = model('user', userSchema);

// role schema
const rolSchema = new Schema({
  name: { type: String },
});

const RolSchema = model('roles', rolSchema);

// exports
module.exports = { UserSchema, RolSchema };

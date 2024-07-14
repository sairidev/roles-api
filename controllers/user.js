const { UserSchema, RolSchema } = require('../db/schemas');
const { encryptPsw, generateToken } = require('../utils/auth');

const getUser = async (req, res) => {
  try {
    const user = await UserSchema.find({ _id: req.body._id }, { password: 0 });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserSchema.find({}, { password: 0 });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await UserSchema.findOne({ username, email });

    if (!userExists) {
      const rol = await RolSchema.find({ name: 'user' }, { _id: 1 });

      const newPsw = await encryptPsw(password);
      const newUser = new UserSchema({
        username,
        email,
        password: newPsw,
        roles: [rol[0]._id],
      });
      await newUser.save();

      const token = generateToken({
        username: newUser.username,
        email: newUser.email,
        roles: newUser.roles,
      });

      return res.status(201).json({ message: 'User created', token });
    } else {
      return res.status(422).json({ message: 'User not created' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, email, password } = req.body;
    const newPsw = await encryptPsw(password);

    await UserSchema.findByIdAndUpdate(
      { _id: id },
      { email, password: newPsw }
    );

    return res.status(204).json({ message: 'User updated' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await UserSchema.findByIdAndDelete({ _id: req.body._id });

    return res.status(204).json({ message: 'User deleted' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUser, getAllUsers, createUser, updateUser, deleteUser };

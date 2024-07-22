import bcrypt from 'bcryptjs';
import {
  getAllUsers,
  createUser,
  updateUserById,
  findUserBySearch,
  deleteUserById,
  findUserByEmail
} from '../models/userModel.js';

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(`GET USERS: ${err.message}`);
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const addUser = async (req, res) => {
    try {
      const { Email, Pass, Nom, Prenom, Role } = req.body;
  
      const existingUser = await findUserByEmail(Email);
      if (existingUser) {
        return res.status(400).json({
          status: 'fail',
          message: 'Email already exists'
        });
      }
  
      const hashedPassword = await bcrypt.hash(Pass, parseInt(process.env.HASH_SALT, 10));
  
      const user = {
        Email,
        Pass: hashedPassword,
        Nom,
        Prenom,
        Role
      };
  
      const result = await createUser(user);
      res.status(201).json({
        status: 'success',
        data: {
          user: result
        }
      });
    } catch (err) {
      console.log(`ADD USER: ${err.message}`);
      res.status(500).json({
        status: 'fail',
        message: err.message
      });
    }
  };

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;

    const { Nom, Prenom, Email, Role, Pass } = user;
    if (!Nom || !Prenom || !Email || !Role || !Pass) {
      return res.status(400).json({
        status: 'fail',
        message: 'One or more parameters are missing or undefined'
      });
    }

    console.log(`Received update request for user with id: ${id}`);
    user.Pass = await bcrypt.hash(user.Pass, parseInt(process.env.HASH_SALT, 10));
    const result = await updateUserById(id, user);
    console.log('Update result:', result);
    res.status(200).json({
      status: 'success',
      data: {
        message: 'User updated successfully',
        result,
      },
    });
  } catch (err) {
    console.log(`UPDATE USER: ${err.message}`);
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const user = req.body;

    const { Nom, Prenom, Email, Pass } = user;
    if (!Nom || !Prenom || !Email || !Pass) {
      return res.status(400).json({
        status: 'fail',
        message: 'One or more parameters are missing or undefined'
      });
    }

    console.log(`Received update request for user profile with id: ${id}`);
    user.Pass = await bcrypt.hash(user.Pass, parseInt(process.env.HASH_SALT, 10));
    const result = await updateUserById(id, user);
    console.log('Update result:', result);
    res.status(200).json({
      status: 'success',
      data: {
        message: 'Profile updated successfully',
        result,
      },
    });
  } catch (err) {
    console.log(`UPDATE MY PROFILE: ${err.message}`);
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const searchUser = async (req, res) => {
  try {
    const { key } = req.query;
    const users = await findUserBySearch(key);
    res.status(200).json({
      status: 'success',
      data: {
        users
      }
    });
  } catch (err) {
    console.log(`SEARCH USER: ${err.message}`);
    res.status(500).json({
      status: 'fail',
      message: err.message
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteUserById(id);
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        message: 'User deleted successfully'
      }
    });
  } catch (err) {
    console.log(`DELETE USER: ${err.message}`);
    res.status(500).json({
      status: 'fail',
      message: err.message
    });
  }
};

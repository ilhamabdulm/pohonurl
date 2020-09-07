const User = require('../models/user');
const { generateToken } = require('../helpers/jwt');
const { comparePass } = require('../helpers/bcrypt');

class UserController {
  static async register(req, res, next) {
    const userData = {
      name: '',
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const createdData = await User.create(userData);
      if (createdData) {
        res.status(201).json({
          code: 201,
          success: true,
          data: {},
          message: 'Registrasi berhasil',
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    const userData = {
      credential: req.body.credential,
      password: req.body.password,
    };
    try {
      const userFound = await User.findOne({
        $or: [
          { email: userData.credential },
          { username: userData.credential },
        ],
      });

      if (!userFound)
        throw {
          code: 401,
          message: 'Username/Email atau Password yang kamu masukan salah!',
        };

      const compare = comparePass(userData.password, userFound.password);

      if (!compare)
        throw {
          code: 401,
          message: 'Username/Email atau Password yang kamu masukan salah!',
        };

      const accessToken = generateToken({ _id: userFound._id });
      res.status(200).json({
        code: 200,
        success: true,
        message: 'Login berhasil',
        data: {
          accessToken,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async getUserInfo(req, res, next) {
    const id = req.loggedIn._id;
    try {
      const result = await User.findById(id);
      res.status(200).json({
        code: 200,
        success: true,
        data: {
          name: result.name || '',
          username: result.username,
        },
        message: 'Detail user',
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateUserInfo(req, res, next) {
    const id = req.loggedIn._id;
    const updateData = {
      name: req.body.name,
      username: req.body.username,
    };
    try {
      const userData = await User.findById(id);
      const response =
        userData && (await User.findByIdAndUpdate(id, updateData));
      res.status(200).json({
        code: 200,
        success: true,
        data: response,
        message: 'Update data berhasil',
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UserController;

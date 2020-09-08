const Link = require('../models/link');
const User = require('../models/user');
const { Types } = require('mongoose');

class LinkController {
  static async getAll(req, res, next) {
    try {
      const user_id = req.loggedIn._id;
      const results = await Link.find({ user_id });
      res.status(200).json({
        code: 200,
        success: true,
        data: results,
        message: 'Get All Data',
      });
    } catch (err) {
      next(err);
    }
  }

  static async addLink(req, res, next) {
    try {
      const data = {
        linkUrl: req.body.linkUrl,
        linkName: req.body.linkName,
        user_id: req.loggedIn._id,
        createdAt: new Date() + 7,
        updatedAt: new Date() + 7,
      };
      const result = await Link.create(data);
      res.status(201).json({
        code: 201,
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getDetails(req, res, next) {
    try {
      const id = req.params.id;
      const result = await Link.findById(id);
      if (result) {
        res.status(200).json({
          code: 200,
          success: true,
          data: result.length,
        });
      } else {
        throw { code: 404, message: 'Data not found' };
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteLink(req, res, next) {
    try {
      const id = req.params.id;
      const user_id = req.loggedIn._id;
      const result = await Link.findById(id);
      if (!result) throw { code: 404, message: 'Data not found' };
      if (String(result.user_id) !== user_id)
        throw { code: 403, message: 'Sorry, you are not authorized' };
      const responseDelete = await Link.deleteOne({ _id: id });
      res.status(200).json({
        code: 200,
        success: true,
        data: responseDelete.n,
        message: 'Delete data berhasil',
      });
    } catch (err) {
      next(err);
    }
  }

  static async editLinkDetails(req, res, next) {
    try {
      const id = req.params.id;
      const user_id = req.loggedIn._id;
      const updatedData = {
        linkUrl: req.body.linkUrl,
        linkName: req.body.linkName,
        user_id,
        updatedAt: new Date() + 7,
      };
      const result = await Link.findById(id);
      if (!result) throw { code: 404, message: 'Data not found' };
      if (String(result.user_id) !== user_id)
        throw { code: 403, message: 'Sorry, you are not authorized' };
      const responseEdit = await Link.findByIdAndUpdate(id, updatedData);
      res.status(200).json({
        code: 200,
        success: true,
        data: responseEdit,
        message: 'Edit data berhasil',
      });
    } catch (err) {
      next(err);
    }
  }

  static async getUserLinks(req, res, next) {
    try {
      const username = req.params.username;
      const userData = await User.findOne({ username });
      if (!userData) throw { code: 404, message: 'User not found!' };
      const links = await Link.find({ user_id: userData['_id'] });
      res.status(200).json({
        code: 200,
        success: true,
        data: { links, user: userData },
        message: 'Get user links success',
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = LinkController;

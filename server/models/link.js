const { model, Schema, Types } = require('mongoose');

const linkSchema = new Schema({
  linkUrl: {
    type: String,
    required: true,
  },
  linkName: {
    type: String,
    required: true,
  },
  user_id: {
    type: Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

const Link = model('Link', linkSchema);

module.exports = Link;

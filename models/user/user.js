const mongoose = require('mongoose')
require('../db')

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
})

const UserModel = mongoose.model('users', userSchema)

const User = {
  async getAll() {
    return UserModel.find({})
  },

  async getOne(id) {
    return UserModel.findById(id)
  },

  async create(user) {
    return new UserModel(user).save()
  },

  async delete(id) {
    UserModel.findByIdAndRemove(id)
  }
}

module.exports = User

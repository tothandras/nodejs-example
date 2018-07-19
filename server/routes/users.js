const joi = require('joi')
const User = require('../../models/user')

post.schema = joi.object({
  body: joi.object({
    email: joi.string().email().required(),
    username: joi.string().required(),
    firstName: joi.string().required(),
    lastName: joi.string().required()
  }).required()
}).required()
async function post(req, res) {
  try {
    await User.create(req.body)
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).send()
      return
    }

    throw err
  }

  res.status(200).send()
}

get.schema = joi.object({
  params: joi.object({
    id: joi.string()
  })
}).required()
async function get(req, res) {
  if (req.params && req.params.id) {
    const user = await User.getOne(req.params.id)
    res.send(user)
    return
  }

  const users = await User.getAll()
  res.send(users)
}

del.schema = joi.object({
  params: joi.object({
    id: joi.string().required()
  }).required()
}).required()
async function del(req, res) {
  const { id } = req.params
  await User.delete(id)
  res.status(201).send()
}

module.exports = {
  post,
  get,
  del
}

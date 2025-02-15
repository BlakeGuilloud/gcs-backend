import mongoose from "mongoose"

const grocerySchema = new mongoose.Schema({
  name: String,
  isComplete: {
    default: false,
    type: Boolean
  }
})

const Grocery = mongoose.model('Grocery', grocerySchema)

export const fetchAll = () => {
  return Grocery.find()
}

export const fetchOne = (id) => {
  return Grocery.findById(id)
}

export const postOne = async (data) => {
  return Grocery.create(data)
}

export const patchOne = async (_id, data) => {
  await Grocery.findOneAndUpdate({ _id }, data)

  return fetchOne(_id);
}

export const deleteOne = async (_id) => {
  await Grocery.deleteOne({ _id })
}

export const deleteMany = async ({ ids }) => {
  await Grocery.deleteMany({ _id: ids})
}

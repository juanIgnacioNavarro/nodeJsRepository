import {randomUUID} from 'crypto'
import {dbProducts} from './models/products.mongoose.js'


class ProductsManager {

  async create(datosProducto) {
    datosProducto._id = randomUUID()
    const product = await dbProducts.create(datosProducto)
    return product.toObject()
  }

  async findAll() {
    return await dbProducts.find().lean()
  }

  async findById(id) {
    const buscada = await dbProducts.findById(id).lean()
    if (!buscada) {
      throw new Error('id no encontrado')
    }
    return buscada
  }

  async updateById(id, newData) {
    const modificada = await dbProducts.findByIdAndUpdate(id,
      { $set: newData },
      { new: true })
      .lean()

    if (!modificada) {
      throw new Error('id no encontrado')
    }

    return modificada
  }

  async deleteById(id) {
    const borrada = await dbProducts.findByIdAndDelete(id).lean()

    if (!borrada) {
      throw new Error('id no encontrado')
    }

    return borrada
  }
}


export const productsManager= new ProductsManager()
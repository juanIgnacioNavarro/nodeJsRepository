import { Router } from 'express'
import { productManager } from '../index.js'
const productsRouter = Router()

productsRouter.get('/', async (req, res) => {
    try {
        const limit = req.query;
        const products = productManager.getProducts()
        if (limit) {
            const productLimit = products.slice(0, limit)
            return res.json(productLimit)
        }
    } catch (error) {
        console.log(error)
        res.send('Error al recibir los productos')
    }
})

productsRouter.get('pid', async (req, res) => {
    try {
        const pid = req.params
        const products = productManager.getProductsById(pid)
        res.json(products)
    } catch (error) {
        res.send('Error al intentar encontrar el producto con id ${pid}')
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body

        const response = await productManager.addProduct({ title, description, price, thumbnail, code, stock, status, category })
        res.json(response)
    } catch (error) {
        res.send('Error al intentar agregar producto')
    }
})

productsRouter.put('/', async (req, res) => {

    const pid = req.params

    try {

        const { title, description, price, thumbnail, code, stock, status, category } = req.body;

        const response = await productManager.updateProduct(id, {title, description, price, thumbnail, code, stock, status, category})
        res.json(response)
    } catch (error) {
        res.send('Error al intentar editar producto')
    }
})

productsRouter.delete('/', async (req,res) => {
    try {
        await productManager.deleteProduct(id)
        res.send('Producto eliminado!')
    } catch (error) {
        console.log(error)
        res.send('Error al intentar eliminar el producto')
    }
})

export { productsRouter }
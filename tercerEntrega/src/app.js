import express from 'express'
import { PORT, productsJson } from './config.js'
import { ProductManager } from './productManager.js'

const pm = new ProductManager(productsJson)

const app = express()

app.get('/products', async (req, res) => {
    const limit = req.query.limit;
    try {
        const products = await pm.getAll({ limit })
        res.json(products)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }

})

app.get('/products/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const products = await pm.getById(id)
        res.json(products)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
})

app.get('/', (req, res) => {
    res.send('<h1>bienvenido a mi backend</h1>')
})

app.listen(PORT, () => {
    console.log(`conectado y escuchando en puerto ${PORT}`)
})
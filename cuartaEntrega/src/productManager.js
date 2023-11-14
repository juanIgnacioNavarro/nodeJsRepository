import fs from 'fs/promises'
import { pm_path } from './config.js'

export class ProductManajer {
    static id = 0
    constructor() {
        this.Products = []
    }

    async init() {
    
        try {
            const fileContent = await this.#readfile()
            if (!fileContent || fileContent.length === 0) { throw new Error('Creating File') }
            fileContent.forEach(el => { this.Products.push(el) }) 
            ProductManajer.id = fileContent[fileContent.length - 1].id 
            console.log('Archivo leido correctamente') 
        } catch (err) {
            console.log(err.message)
        }
    }

    async addProduct(prod) {
        try {
            const codecheck = this.#codeCheck(prod.code)
            if (codecheck) throw new Error('El codigo ingresado ya existe')
            const pr = new Product(prod)
            this.Products.push(pr)
            await this.#writefile()
            return {status: 'Ok', message: pr}
        } catch (err) {
            return { status: 'Error al Crear el producto', message: err.message }
        }
    }

    async updProduct(id, prod) {
        const arrayIndex = this.Products.findIndex(el => el.id === parseInt(id))
        if (arrayIndex === -1) throw new Error(`El producto con ID ${id} no existe`)
        const selProd = this.Products[arrayIndex]
        this.Products[arrayIndex] = {
            id: selProd.id,
            title: (prod.title) ? prod.title : selProd.title,
            description: (prod.description) ? prod.description : selProd.description,
            code: (prod.code) ? prod.code : selProd.code,
            price: (prod.price) ? prod.price : selProd.price,
            status: (prod.status) ? prod.status : true,
            stock: (prod.stock) ? prod.stock : selProd.stock,
            category: (prod.category) ? prod.category : selProd.category,
            thumbnails: (prod.thumbnails) ? prod.thumbnails : selProd.thumbnails,
        }
        await this.#writefile()
        return this.Products[arrayIndex]
    }

    async delProduct(id) {
        const arrayIndex = this.Products.findIndex(el => el.id === parseInt(id))
        if (arrayIndex === -1) throw new Error(`El producto con ID ${id} no existe`)
        this.Products.splice(arrayIndex, 1)
        await this.#writefile()
    }

    getAll() {
        return this.Products
    }
    getById(id) {
        const product = this.Products.find(el => el.id === parseInt(id))
        return product
    }
    async #writefile() {
        await fs.writeFile(pm_path, JSON.stringify(this.Products), 'utf-8')
    }
    async #readfile() {
        const fileContent = await fs.readFile(pm_path, 'utf-8')
        return JSON.parse(fileContent)
    }

    #codeCheck(newcode) { return this.Products.find(el => el.code === newcode) }
}

export class Product {
    constructor({ title, description, code, price, status, stock, category, thumbnails }) {
        this.id = ++ProductManajer.id
        this.title = title
        this.description = description
        this.code = code
        this.price = price
        this.status = status || true
        this.stock = stock
        this.category = category
        this.thumbnails = thumbnails
    }
}
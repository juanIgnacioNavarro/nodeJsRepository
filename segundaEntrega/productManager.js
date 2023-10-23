const { promises: fs } = require('fs')

class ProductManager {
    constructor({ id, title, description, price, thumbnail, code, stock }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = Math.floor(Math.random() * 1000000);
        this.stock = stock;
    }
}

class ProductList {

    constructor({ ruta }) {
        this.ruta = ruta
        this.products = [];
    }

    generarId() {
        if (this.products.length > 0) {
            return this.products[this.products.length - 1].id + 1
        } else {
            return 1
        }
    }

    async reset() {
        this.products = []
        await this.writeProducts()
    }

    async readProducts() {
        const productsInJson = await fs.readFile(this.ruta, 'utf-8')
        const productDataArray = JSON.parse(productsInJson)
        this.products = productDataArray.map(j => new ProductManager(j))
    }

    async writeProducts() {
        const productsInJson = JSON.stringify(this.products, null, 2)
        await fs.writeFile(this.ruta, productsInJson)
    }

    static getNewIdProduct() {
        return ProductList.nextIdProduct++;
    }

    async addProduct(dataProduct) {
        const id = this.generarId()
        const product = new ProductManager({ id: id, ...dataProduct });
        this.products.push(product);
        await this.writeProducts()
        return product;
    }

    async getProducts() {
        await this.readProducts()
        return this.products;
    }

    async updateProducts(id, dataProducts) {
        await this.readProducts();
        const index = this.products.findIndex(p => p.id === id)
        console.log(index)
        if (index !== -1) {
            const newProduct = new ProductManager({ id, ...this.products[index], ...dataProducts })
            this.products[index] = newProduct
            await this.writeProducts()
            return newProduct
        } else {
            throw new Error('Error al actualizar: usuario no encontrado')
        }
    }

    async deleteProducts(id) {
        await this.readProducts()
        const index = this.products.findIndex(u => u.id === id)
        if (index !== -1) {
            const deleteProductsArray = this.products.splice(index, 1)
            await this.writeProducts()
            return deleteProductsArray[0]
        } else {
            throw new Error('Error al borrar: usuario no encontrado')
        }
    }

    sortProductsById() {
        this.products.sort((a, b) => a.code - b.code);
    }

    getProductByCode(codeId) {
        const product = this.products.find((product) => product.code === codeId);
        if (product) {
            return product;
        } else {
            return "Product not found";
        }
    }

    incluirProducto(idProduct, newPrice, newStock, newTitle, newDescription) {
        const product = this.products.find(e => e.code === idProduct);
        if (!product) {
            throw new Error("Product not found");
        }
        const newProduct = new ProductManager({
            ...product,
            code: ProductList.getNewIdProduct(),
            price: newPrice,
            stock: newStock,
            title: newTitle,
            description: newDescription

        });
        this.products.push(newProduct);
        return newProduct;
    }
}

//PRUEBA

async function main() {

    const pm = new ProductList({ ruta: 'products.json' })
    pm.reset()

    console.log('agregado: ', await pm.addProduct({
        title: 'servilletas',
        description: '30 mts doble hoja', price: 600,
        thumbnail: 'url de las servilletas',
        stock: 50
    }))

    console.log('agregado: ', await pm.addProduct({
        title: 'lavandina',
        description: 'con mucho cloro', price: 300,
        thumbnail: 'url de la lavandina',
        stock: 80
    }))

    console.log('obtenidos: ', await pm.getProducts())

    console.log('actualizado: ', await pm.updateProducts(1, { description: 'hola' }))

    console.log('borrado: ', await pm.deleteProducts(2))

    console.log('Obtenidos: ', await pm.getProducts())

}

main()
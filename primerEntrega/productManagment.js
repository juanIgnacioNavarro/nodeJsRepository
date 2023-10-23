class ProductManager {
    constructor({ title, description, price, thumbnail, code, stock }) {
        this.id = Math.floor(Math.random() * 1000000); // Genera un ID aleatorio único
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductList {

    static nextIdProduct = 1;

    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    static getNewIdProduct() {
        return ProductList.nextIdProduct++;
    }

    addProduct(dataProduct) {
        if (!dataProduct.title || !dataProduct.price || !dataProduct.description) {
            throw new Error('Faltan campos obligatorios. Asegúrate de proporcionar name, price y description.');
        }
        if (typeof dataProduct.price !== 'number' || dataProduct.price <= 0) {
            throw new Error('El precio debe ser un número positivo.');
        }
        const idProduct = ProductList.getNewIdProduct();
        const product = new ProductManager({ code: idProduct, ...dataProduct });
        this.products.push(product);
        return product;
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

const manejadorProductos = new ProductList();

console.log('Agregando yerba mate playadito, precio 200, stock 50');
const productoAgregado = manejadorProductos.addProduct({
    title: 'Yerba mate playadito',
    price: 200,
    stock: 50,
    description: 'la mejor',
    thumbnail: 'url img'
});
console.log('Producto agregado: ', productoAgregado);



console.log('Creando copia de producto con información diferente');
const productoCopiado = manejadorProductos.incluirProducto(1, 300, 20, 'jugo de tomate frio', 'frio en serio');
console.log('Producto copiado: ', productoCopiado);

console.log('Listado de productos: ', manejadorProductos.getProducts());


console.log('Buscando producto con código 1');
try {
    const productoEncontrado = manejadorProductos.getProductByCode(1);
    console.log('Producto encontrado: ', productoEncontrado);
} catch (error) {
    console.log(error.message);
}

// Se hace fallar a proposito para devolver el mensaje y cumplir con la consigna

console.log('Buscando producto con código 5');
try {
    const productoEncontrado = manejadorProductos.getProductByCode(5);
    console.log('Producto encontrado: ', productoEncontrado);
} catch (error) {
    console.log(error.message);
}

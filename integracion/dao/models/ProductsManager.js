import fs from 'fs/promises'


class Product{
 
    constructor({id,title,description,code,price,status,stock,category,thumbnail}){
        this.id = id
        this.title= title
        this.description=description
        this.code=code
        this.price=price
        this.status=status
        this.category=category
        this.thumbnail=thumbnail
        
        this.setStock(stock)
    }

    setStock(nuevoStock){
        if(nuevoStock < 0){
            throw new Error ('El stock no puede ser menor a cero')
        }
        this.stock= nuevoStock
    }

    getStock(){
        return this.stock
    } 
    
}

 
export class ProductsManager{

    #products

    constructor(ruta){
        this.ruta=ruta
        this.#products=[]
    }

    async getAll(query={}){
        const json = await fs.readFile(this.ruta,'utf-8')
        const {limit}=query
        const data=JSON.parse(json) 
        if(limit){ 
            if(limit>data.length || parseInt(limit)<=0){
                throw new Error('Limite invalido') 
            }
            return data.slice(0, parseInt(limit));
        }        
        return data
    }

    async getById(id){
        const json= await fs.readFile(this.ruta, 'utf-8')
        const products= JSON.parse(json)
        const searchedProduct= products.find(p=> p.id === id)
        if(!searchedProduct) throw new Error(`producto no encontrado con id ${id}`)
        return searchedProduct
    }

    async #readProducts(){
        const productsEnJson = await fs.readFile(this.ruta,'utf-8')
        this.#products = JSON.parse(productsEnJson)
    }

    async #writeProducts(){
        await fs.writeFile(this.ruta, JSON.stringify(this.#products, null, 2))
    }

    async addProducts({title,description,code,price,status,stock,category,thumbnail}){

        if(!title || !description || !code  || !price || !status ||!stock || !category){
            throw new Error('Todos los campos son obligatorios');
        }
        const productCode= this.#products.find((p)=>p.code===code)
        if(productCode) throw new Error('Otro producto ya fue agregado con ese codigo')
        const id= Math.random().toString(36).substring(7)
        const product= new Product({id,title,description,code,price,status,stock,category,thumbnail})
        console.log(this.#products)
        await this.#readProducts()
        this.#products.push(product)
        await this.#writeProducts()
        console.log(this.#products)
        return product
    }

    async updateProducts(id,{title,description,code,price,status,stock,category,thumbnail}){
        const json= await fs.readFile(this.ruta, 'utf-8')
        const products= JSON.parse(json)
        const index = products.findIndex((p)=>p.id === id)
        console.log(index)
        if(index == -1){
            throw new Error('Producto no encontrado' ) 
        }else{
            await this.#readProducts()
            products[index] = new Product({id,title,description,code,price,status,stock,category,thumbnail});
            this.#products[index]=products[index]
            await this.#writeProducts()
            return products
       }

   }

    async deleteProducts(id){
        const json= await fs.readFile(this.ruta, 'utf-8')
        const products= JSON.parse(json)
        const index = products.findIndex((p)=>p.id === id)
        if(index != -1){
            await this.#readProducts()
            this.#products.splice(index,1)
            products.splice(index,1)
            this.#products.forEach((p, i) => {
                p.id = ++i;
            });
            products.forEach((p, i) => {
                p.id = ++i;
            });
            await this.#writeProducts()
            console.log('producto borrado')
            return products
        }
    }
        
}
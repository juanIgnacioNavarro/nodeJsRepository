import fs from 'fs/promises'


export class CartsManager {
    constructor(ruta) {
      this.ruta=ruta
      this.carts = [];
    }

    async getCarts(){
      const data = await fs.readFile(this.ruta, 'utf-8');
      this.carts = JSON.parse(data)
      return this.carts
    }

    generateId() {
      return Math.random().toString(36).substring(2, 9);
    }
  
    async createCart() { 
      const id = this.generateId();
      const newCart= {id, products:[]}
      this.carts=await this.getCarts()
      this.carts.push(newCart);
      await this.saveData();
      return newCart
    }
  
    async getCartById(cartId) {    
      const carritos= await this.getCarts()
      const carrito= carritos.find(carrito => carrito.id === cartId)

      if(carrito){
        return carrito.products
      }else{
        throw new Error('Carrito no encontrado' ) 
      }
    }

  
    async addProductToCart(cartId, productId) {

      const carts= await this.getCarts()
      const index=carts.findIndex(cart=>cart.id ===cartId)
  
      if(index === -1){
        throw new Error('Carrito no encontrado' ) 
      }else{
        const cartProducts= await this.getCartById(cartId)
        const existingProductsIndex=cartProducts.findIndex(product=>product.id ===productId)
        if(existingProductsIndex !== -1){
          ++cartProducts[existingProductsIndex].quantity
        }else{
           cartProducts.push({id:productId,quantity : 1})
        }

        carts[index].products=cartProducts
        await fs.writeFile(this.ruta, JSON.stringify(carts, null, 2));
        console.log("producto agregado con exito");
        return this.getCarts()
      }
    }

  
    async saveData(){
      await fs.writeFile(this.ruta, JSON.stringify(this.carts, null, 2));
    }
  
  
}
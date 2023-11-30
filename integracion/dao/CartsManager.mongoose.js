import {dbCarts} from './models/carts.mongoose.js'
import {randomUUID} from 'crypto'


class CartsManager{

    
    async create(datosCart) {
        datosCart._id = randomUUID()
        const cart = await dbCarts.create(datosCart)
        return cart.toObject()
    }
   
    
    async findAll(){
        return await dbCarts.find().lean()
    }

    async findById(cartId) {
        const buscada = await dbCarts.findById(cartId).lean()
        if (!buscada) {
          throw new Error('id no encontrado')
        }
        return buscada
      }


    async addProductToCart(cartId, productId) {
        try {
          const cart = await dbCarts.findById(cartId);
      
          if (!cart) {
            throw new Error('Carrito no encontrado');
          } else {
            const existingProduct = cart.products.find(product => product.id === productId);
      
            if (existingProduct) {
              existingProduct.quantity += 1;
            } else {
              cart.products.push({ id: productId, quantity: 1 });
            }
      
            await cart.save();
            console.log('Producto agregado con éxito');
            return cart;
          }
        } catch (error) {
          console.error('Error al agregar producto:', error.message);
          throw error;
        }
      }
    

}

export const cartsManager= new CartsManager()
import { Schema,model } from 'mongoose';

const productSchema = new Schema({
    id: String,
    quantity: Number,
  });

const cartsSchema = new Schema({
    _id: {type: String, require:true},
    products: [productSchema]
})

export const dbCarts= model('carts', cartsSchema)
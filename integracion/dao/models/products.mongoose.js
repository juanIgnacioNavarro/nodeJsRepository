import { Schema,model } from 'mongoose'

const productSchema = new Schema({
    _id: {type: String, require:true},
    title: {type: String, require:true},
    description: {type: String, require:true},
    code: {type: String, require:true},
    price: {type: String, require:true},
    status: {type: String, require:true},
    stock: {type: String, require:true},
    category: {type: String, require:true},
    thumbnail: {type: String, require:true}
},{
    strict:'throw',
    versionKey:false,
    statics:{},
    methods:{}
})

export const dbProducts= model('products', productSchema)
import { Schema,model } from "mongoose"

const messageSchema = new Schema({
    _id: {type: String, require:true},
    user:{type: String, require:true},
    message:{type:String, requiere:true}
},{
    strict:'throw',
    versionKey:false,
    statics:{},
    methods:{}
})

export const dbMessages= model('messages', messageSchema)
import { Router } from "express"
import {productsManager} from '../dao/ProductsManager.js'

export const productsRouter =Router()

productsRouter.get('/',async (req, res)=>{
    const limit=parseInt(String(req.query.limit));
    try{
        const products= await productsManager.getAll({limit})
        res.json(products)
    }catch(error){
        res.json({
            status:'error',
            message: error.message
        })
    }

}) 

productsRouter.get('/:pid', async (req, res)=>{
    const id= req.params.pid
    try{
        const products = await productsManager.getById(id)
        res.json(products)
    } catch(error){
        res.json({
            status:'error',
            message: error.message
        })
    }
}) 


productsRouter.post('/',async (req,res)=>{
    const {title,description,code,price,status,stock,category,thumbnail} = req.body
    try{
        const productAgregado = await productsManager.addProducts({title,description,code,price,status,stock,category,thumbnail});
        res.json(productAgregado)
    } catch(error){
        res.json({
            status:'error',
            message: error.message
        })
    }  
})

productsRouter.put('/:pid',async (req,res)=>{
    
    const id= req.params.pid
    const {title,description,code,price,status,stock,category,thumbnail} = req.body
    try{
        const productActualizado = await productsManager.updateProducts(id,{title,description,code,price,status,stock,category,thumbnail});
        res.json(productActualizado)
    } catch(error){
        res.json({
            status:'error',
            message: error.message
        })
    }  
})

productsRouter.delete('/:pid',async (req,res)=>{
    const id= req.params.pid
    try{
        const productDelete= await productsManager.deleteProducts(id);
        res.json(productDelete)
    } catch(error){
        res.json({
            status:'error',
            message: error.message
        })
    }
    
})
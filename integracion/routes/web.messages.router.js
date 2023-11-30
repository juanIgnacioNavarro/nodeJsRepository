import { Router } from 'express'

export const webMessagesRouter = Router()

webMessagesRouter.get('/', (req,res)=>{
    res.render('chat.handlebars', { title: 'Mensajes'})
})

webMessagesRouter.get('/messages', (req,res)=>{
    res.render('messages.handlebars', { title:'Messages'})
})
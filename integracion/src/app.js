import express from 'express'
import  mongoose from 'mongoose'
import {PORT, MONGODB_CNX_STR} from './config.js'
import {apiProductsRouter} from '../routes/api.products.router.js'
import {apiCartsRouter} from '../routes/api.carts.router.js'
import {apiMessagesRouter} from '../routes/api.messages.router.js'
import{webMessagesRouter} from '../routes/web.messages.router.js'
import { engine } from 'express-handlebars'


await mongoose.connect(MONGODB_CNX_STR)
console.log('base de datos conectada')

const app=express()

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.json())

app.use('/static',express.static('./static'))

app.use('/api/carts',apiCartsRouter)
app.use('/api/products',apiProductsRouter)
app.use('/api/messages',apiMessagesRouter)
app.use('/',webMessagesRouter)

const server = app.listen(PORT, async ()=>{ 
    console.log(`conectado y escuchando servidor en puerto ${PORT}`)
})
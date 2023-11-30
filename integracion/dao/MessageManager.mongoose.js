import {randomUUID} from 'crypto'
import {dbMessages} from './models/messages.mongoose.js'


class MessagesManager{

    async create(datosUser) {
        datosUser._id = randomUUID()
        const message = await dbMessages.create(datosUser)
        return message.toObject()
    }
}

export const messagesManager= new MessagesManager()
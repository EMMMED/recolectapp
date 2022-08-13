const Newsletter = require('../models/newsletter.model')
const createErrors = require('http-errors')

function newPost(data){
    const date = new Date()
    const datePost = date.toLocaleString()

    const newletter = new Newsletter(data)
    newletter.date_newletter = datePost.slice(0,10).replace(' ', '')
    newletter.time_newletter = datePost.slice(-8)

    return newletter.save()
}


const getNewletter = () => Newsletter.find()

const getNewletterById = (id) => Newsletter.findById(id)

const updateNewletter = (id, data) =>{
    return Newsletter.findByIdAndUpdate(id, data)
}

const deleteNewletter = (id) =>{
    const error = Newsletter.findById(id)
    if(!error) {
        throw new createErrors(404,'Datos no encontrados')
    }

    return Newsletter.findOneAndDelete(id)

}

module.exports = {
    newPost,
    getNewletter,
    getNewletterById,
    updateNewletter,
    deleteNewletter
}
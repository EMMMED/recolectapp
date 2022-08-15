require('dotenv').config()
const Fetch = require('cross-fetch')
const {
    urlApi
} = process.env

const getnewsletterAll = async()=>{
    const response = await Fetch(`${urlApi}/newsletter`)
    const data = await response.json()
    return data
}

const getnewsletterId = async (id) =>{
    const response = await Fetch(`${urlApi}/newsletter/${id}`)
    const data = await response.json()
    return data
}

module.exports = {
    getnewsletterAll,
    getnewsletterId
}
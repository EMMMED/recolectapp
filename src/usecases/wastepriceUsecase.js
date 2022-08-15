require('dotenv').config()
const Fetch = require('cross-fetch')
const {
    urlApi
} = process.env

const getwastepriceAll = async() =>{
    const response = await Fetch(`${urlApi}/wasteprice`)
    const data = await response.json()
    return data
}

const getwastepriceID = async (id) =>{
    const response = await Fetch(`${urlApi}/wasteprice/${id}`)
    const data = await response.json()
    return data
}

module.exports = {
    getwastepriceID,
    getwastepriceAll
}
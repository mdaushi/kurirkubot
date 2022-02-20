const axios = require('axios');

async function getData(params = '') {
    const url = `${process.env.BASE_URI}/resto?name=${params}`
    const raw = await axios.get(url)
    const data = raw.data
    return data
}

async function getDataById(id) {
    const url = `${process.env.BASE_URI}/resto/${id}`
    const raw = await axios.get(url)
    const data = raw.data
    return data
}

module.exports = {
    getData,
    getDataById
}
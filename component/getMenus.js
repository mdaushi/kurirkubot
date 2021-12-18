const axios = require('axios');

async function getMenus(params = '') {
    const url = `${process.env.BASE_URI}/menu/${params}`;
    const raw = await axios.get(url)
    const data = raw.data
    return data
}

async function getMenu(query, id) {
    const url = `${process.env.BASE_URI}/menus?name=${query}&id=${id}`;
    const raw = await axios.get(url)
    const data = raw.data
    return data
}

module.exports = {
    getMenus,
    getMenu
}
const db = require("../config/Databases")
const axios = require('axios')

async function findDriver() {
    const url = `${process.env.BASE_URI}/algorithm/find/driver`
    const raw = await axios.get(url)
    const arrData = raw.data

    const ordered = arrData.sort(compore)
    return ordered
}

const compore = (a,b) => {
    if ( a.totalOrder < b.totalOrder ){
        return -1;
    }
    if ( a.totalOrder > b.totalOrder ){
        return 1;
    }
    return 0;
}

module.exports = findDriver;
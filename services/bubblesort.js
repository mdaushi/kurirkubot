const db = require("../config/Databases")
const user = db.user

async function sort() {
    const url = `${process.env.BASE_URI}/algorithm/find/driver`
    const raw = await axios.get(url)
    const data = raw.data
    return data
}

module.exports = sort;
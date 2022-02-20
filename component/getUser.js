const axios = require('axios')

const getUserById = async (id) => {
    const url = `${process.env.BASE_URI}/user/${id}`;
    const raw = await axios.get(url)
    const data = raw.data
    return data
}

module.exports = {
    getUserById
}
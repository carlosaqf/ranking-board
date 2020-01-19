import axios from 'axios'
const baseUrl = '/api/games'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const create = async newObj => {
    const config = {
        headers: { Authorization: token }
    }
    const res = await axios.post(baseUrl, newObj, config)
    return res.data
}

const update = (id, newObj) => {
    const req = axios.put(`${baseUrl}/${id}`, newObj)
    return req.then(res => res.data)
}

export default {
    getAll,
    create,
    update,
    setToken
}


import axios from "axios";

export const PostWithAuth = (url, body) => {
    return axios.post(url, body, {
        headers: {
            "Authorization": localStorage.getItem("tokenKey"),
            'Content-Type': 'application/json'
        }
    })
}

export const PutWithAuth = (url, body) => {
    return axios.put(url, body, {
        headers: {
            "Authorization": localStorage.getItem("tokenKey"),
            'Content-Type': 'application/json'
        }
    })
}

export const DeleteWithAuth = (url) => {
    return axios.delete(url, {
        headers: {
            "Authorization": localStorage.getItem("tokenKey"),
            'Content-Type': 'application/json'
        }
    })
}

export const GetWithAuth = (url) => {
    return axios.get(url, {
        headers: {
            "Authorization": localStorage.getItem("tokenKey"),
            'Content-Type': 'application/json'
        }
    })
}

export const PostWithoutAuth = (url, body) => {
    return axios.post(url, body, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

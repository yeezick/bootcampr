import axios from 'axios'

const baseURL = process.env.REACT_APP_LOCAL_URL
export const api = axios.create({
  baseURL,
})

const getToken = () => {
  return new Promise(resolve => {
    resolve(`Bearer ${localStorage.getItem('collabifyAuthToken') || null}`)
  })
}

api.interceptors.request.use(
  async config => {
    config.headers['Authorization'] = await getToken()
    return config
  },
  error => {
    console.error('Request error: ', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return error.response
  }
)

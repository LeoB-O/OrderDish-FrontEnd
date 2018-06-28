import axios from 'axios'

let token = localStorage.getItem('token')

if (!token) {
  token = Math.random().toString()
  localStorage.setItem('token', token)
}

const request = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 1000,
  data: {token: token},
  params: {token: token}
})

export default request

import axios, { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import humps from 'humps'
import { getToken } from '../../services/auth/auth-action'
import { customRequestData, deepLoop } from './tools'
require('dotenv').config()

const createClient = () => {
  const ax = axios.create({
    withCredentials: true,
  })
  ax.interceptors.request.use((request: any) => {
    // const host = process.env.REACT_APP_API_HOST
    const host = 'http://127.0.0.1:8626/api/v1'

    request.url = `${host}/${request.url}`

    const token = getToken()
    request.headers.common['Authorization'] = `Bearer ${token}`

    if (request.params) {
      request.params = deepLoop(request.params, modifyRequestData)
    }
    if (request.data) {
      request.data = deepLoop(request.data, modifyRequestData)
      // request.data = humps.decamelizeKeys(request.data)
      customRequestData(request)
    }
    return request
  })
  ax.interceptors.response.use(
    (response: AxiosResponse<any>) => {
      if (response.headers['content-type'].includes('application/json')) {
        response.data = humps.camelizeKeys(response.data)
        // deepLoop(response.data, data => {
        //   return data
        // })
      }
      return response
    },
    (error: any) => Promise.reject(error),
  )
  return ax
}

const modifyRequestData = (data: any) => {
  if (dayjs.isDayjs(data)) {
    return data.format()
  }
  return data
}

export const tomtomClient = createClient()

export const tomtomApiWraper = async (method: Promise<AxiosResponse>) => {
  try {
    const res = await method
    return Promise.resolve(res)
  } catch (e) {
    const { response, message } = e
    const { data } = response || {}
    const { message: errorMessage } = data || {}
    return Promise.reject(errorMessage || message || e)
  }
}

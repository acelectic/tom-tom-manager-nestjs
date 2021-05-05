import axios, { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import humps from 'humps'
import FormData from 'form-data'
import https from 'https'
import { ContentType, customRequestData, deepLoop } from './tools'
import { debugLog } from '../helper'

const createClient = () => {
  const ax = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  })

  ax.interceptors.request.use((request: any) => {
    request.url = `${process.env.API_SAFE_GOLD}/${request.url}`
    request.headers.common['Authorization'] = `Bearer ${process.env.API_SEND_SAFE_GOLD_TOKEN}`

    if (request.params) {
      request.params = deepLoop(request.params, modifyRequestData)
    }
    if (request.data) {
      console.log('==== content type =====')
      console.log(request.headers['Content-Type'])
      if (!(request.headers['Content-Type'] === ContentType.FORMDATA)) {
        request.data = deepLoop(request.data, modifyRequestData)
        request.data = humps.decamelizeKeys(request.data)
        customRequestData(request)
      } else {
        request.headers = { ...request.headers, ...request.data.getHeaders() }

        console.log('==== headers ====')
        console.log(request.headers)
        console.log('==== data ====')
        console.log(request.data)
      }
    }
    return request
  })
  ax.interceptors.response.use(
    (response: AxiosResponse<any>) => {
      if (response.headers['content-type'].includes('application/json')) {
        response.data = humps.camelizeKeys(response.data)
        // deepLoop(response.data, (data) => {
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

export const safeGoldClient = createClient()

export const safeGoldApiWraper = async (method: Promise<AxiosResponse>) => {
  try {
    const res = await method
    return Promise.resolve(res)
  } catch (e) {
    const { response, message } = e
    const { data } = response || {}
    const { message: errorMessage } = data || {}
    const rawError = errorMessage || message || e
    debugLog({ rawError })
    const messageCode = handleError(rawError)
    return Promise.reject(messageCode)
  }
}

export const handleError = (message: string) => {
  switch (message) {
    case 'Transaction is exists':
      return '422-042'
    case 'Invalid Product Code':
      return '422-043'
    case 'Product out of Stock':
      return '422-044'
    case 'Insufficient Balance':
      return '422-045'
    case 'User is Blacklisted':
      return '422-046'
    case 'Missing required information':
      return '422-047'
    case 'User with that ID is missing':
      return '422-048'
    case 'Service is not functioning':
      return '422-049'
    case 'SG rate does not match current rate':
      return '422-050'
    case 'Gold Amount does not match':
    case 'Gold Amount Does Not Match':
      return '422-051'
    case 'Invalid Rate':
      return '422-052'
    case 'Invalid Transaction ID':
      return '422-053'
    case 'User ID/Vendor ID Mismatch':
      return '422-054'
    case 'User ID missing in transaction':
      return '422-055'
    case 'Transaction Timeout':
      return '422-056'
    case 'Rate does not match current rate':
      return '422-057'
    case 'User not registered':
      return '422-058'
    case 'The start date must be at least today or after today':
      return '422-060'
    case 'SIP ID does not match the User ID':
      return '422-061'
    case 'SIP Completed':
      return '422-062'
    case 'Invalid SIP ID':
      return '422-063'
    case 'Invalid Service fee':
      return '422-064'
    default:
      // for debug
      // return message
      return 'Not Identify'
  }
}

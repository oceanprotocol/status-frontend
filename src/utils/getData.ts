import axios, { AxiosResponse } from 'axios'
import { Status } from '../@types'

export async function getData(url: string): Promise<{ [key: string]: Status }> {
  try {
    const response: AxiosResponse<Status[]> = await axios.get(url)
    if (!response?.data || response.status !== 200)
      throw Error('ERROR: no data recieved')

    // transform data into object with network names as keys
    let output = Object.fromEntries(
      response.data?.map((item) => [item.network, item])
    )
    // make sure 'general' is always the first key
    output = Object.assign({ general: output['general'] }, output)
    console.log('Got new data', output)
    return output
  } catch (error) {
    console.error(error.message)
  }
}

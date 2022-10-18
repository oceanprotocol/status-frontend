import axios, { AxiosResponse } from 'axios'
import { Status } from '../@types'
import { statusApiUri } from '../../app.config'

export async function getData(): Promise<{ [key: string]: Status }> {
  try {
    const response: AxiosResponse<Status[]> = await axios.get(`${statusApiUri}`)
    if (!response?.data || response.status !== 200)
      throw Error('ERROR: no data recieved')

    // transform data into object with network names as keys
    const output = Object.fromEntries(
      response.data?.map((item) => [item.network, item])
    )
    return output
  } catch (error) {
    console.error(error.message)
  }
}

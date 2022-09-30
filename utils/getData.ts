import axios, { AxiosResponse } from 'axios'
import { Status } from '../@types'
import { statusServiceUri } from '../app.config'

export async function getData(): Promise<Status[] | void> {
  try {
    const response: AxiosResponse<Status[]> = await axios.get(
      `${statusServiceUri}`
    )
    if (!response || response.status !== 200 || !response.data) return

    const data = { ...response.data }
    console.log('data', data)
    return data
  } catch (error) {
    console.log(error)
  }
}

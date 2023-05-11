import axios, { AxiosResponse } from 'axios'

export async function getStats(url: string): Promise<any> {
  try {
    console.log('Fetching data from', url)
    const response: AxiosResponse<any[]> = await axios.get(url)
    console.log('Got response', response)
    if (!response?.data || response.status !== 200)
      throw Error('ERROR: no data recieved')

    // transform data into object with network names as keys
    console.log('Got new data', response.data)
    return response
  } catch (error) {
    console.error(error.message)
  }
}

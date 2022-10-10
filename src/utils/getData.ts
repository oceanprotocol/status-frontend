import axios, { AxiosResponse } from 'axios'
import { Status, Summary } from '../@types'
import { statusApiUri } from '../../app.config'

export async function getData(): Promise<Status[]> {
  try {
    console.log(`${statusApiUri}`)
    const response: AxiosResponse<Status[]> = await axios.get(`${statusApiUri}`)
    if (!response || response.status !== 200 || !response.data)
      console.log('ERROR: no data recieved')

    const data = [...response.data]
    console.log('1. data length', data.length)
    console.log('1. data ', data)

    return data
  } catch (error) {
    console.log(error)
  }
}

export function getSummary(network: number, data: Status[]): Summary[] {
  console.log('2. data', data)
  try {
    if (data) {
      const summary: Summary[] = [
        { component: 'Aquarius', status: data[network].aquarius.status },
        { component: 'Provider', status: data[network].provider.status },
        { component: 'Subgraph', status: data[network].subgraph.status },
        { component: 'Market', status: data[network].market },
        { component: 'Port', status: data[network].port },
        {
          component: 'Data Farming',
          status: data[network].dataFarming
        },
        {
          component: 'Operator Service',
          status: data[network].operator.status
        },
        {
          component: 'DAO Grants',
          status: data[network].daoGrants
        }
      ]
      data[network].faucet.status &&
        summary.push({
          component: 'Faucet',
          status: data[network].faucet.status
        })

      return summary
    }
  } catch (error) {
    console.log(error)
  }
}

export function getNetworks(data: Status[]): string[] {
  console.log('3. data', data)
  try {
    if (data) {
      const networks: string[] = []
      for (let i = 0; i < data.length; i++) {
        console.log(i, 'data', data[i].network)
        networks.push(data[i].network)
      }
      return networks
    }
  } catch (error) {
    console.log(error)
  }
}

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

export function getSummary(network: string, data: Status[]): Summary[] {
  console.log('2. data', data)
  try {
    if (data) {
      let status: Status
      data.forEach((element) => {
        if (element.network === network) return (status = element)
      })
      const summary: Summary[] = [
        { component: 'Aquarius', status: status.aquarius.status },
        { component: 'Provider', status: status.provider.status },
        { component: 'Subgraph', status: status.subgraph.status },
        { component: 'Market', status: status.market },
        { component: 'Port', status: status.port },
        {
          component: 'Data Farming',
          status: status.dataFarming
        },
        {
          component: 'Operator Service',
          status: status.operator.status
        },
        {
          component: 'DAO Grants',
          status: status.daoGrants
        }
      ]
      status.faucet.status &&
        summary.push({
          component: 'Faucet',
          status: status.faucet.status
        })

      return summary
    }
  } catch (error) {
    console.log(error)
  }
}

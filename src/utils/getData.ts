import axios, { AxiosResponse } from 'axios'
import { NetworkSummary, State, Status, Summary } from '../@types'
import { statusApiUri } from '../../app.config'
import { availableNetworks } from '../../app.config'

export async function getData(): Promise<Status[][]> {
  try {
    console.log(
      'statusApiUri',
      process.env,
      process.env.NEXT_PUBLIC_STATUS_API_URI,
      statusApiUri
    )
    const response: AxiosResponse<Status[][]> = await axios.get(
      `${statusApiUri}`
    )
    if (!response || response.status !== 200 || !response.data)
      console.log('ERROR: no data recieved')

    const data = response.data
    console.log('data', data)

    return data
  } catch (error) {
    console.log(error)
  }
}

export function getSummary(network: string, data: Status[][]): Summary[] {
  try {
    if (data) {
      let status: Status

      data.forEach((element) => {
        if (element[0].network === network) return (status = element[0])
      })

      const summary: Summary[] = [
        { component: 'Aquarius', status: status?.aquarius?.status },
        { component: 'Provider', status: status?.provider?.status },
        { component: 'Subgraph', status: status?.subgraph?.status },
        { component: 'Market', status: status?.market },
        { component: 'Port', status: status?.port },
        {
          component: 'Data Farming',
          status: status?.dataFarming
        },
        {
          component: 'Operator Service',
          status: status?.operator?.status
        },
        {
          component: 'DAO Grants',
          status: status?.daoGrants
        }
      ]
      status?.faucet?.status &&
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

export function getNetworkSUmmary(data: Status[][]): NetworkSummary[] {
  const networks: string[] = JSON.parse(availableNetworks)
  const networkSummary: NetworkSummary[] = []
  networks.forEach((network) => {
    const summary = getSummary(network, data)
    let status = State.Up
    summary.forEach((service) => {
      if (service.status === State.Down) return (status = State.Down)
    })
    if (status === State.Up) {
      summary.forEach((service) => {
        if (service.status === State.Warning) return (status = State.Warning)
      })
    }
    networkSummary.push({ name: network, status })
  })
  return networkSummary
}

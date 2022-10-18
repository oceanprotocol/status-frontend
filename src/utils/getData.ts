import axios, { AxiosResponse } from 'axios'
import { NetworkSummary, State, Status, Summary } from '../@types'
import { statusApiUri } from '../../app.config'
import { availableNetworks } from '../../app.config'

export async function getData(): Promise<Status[][]> {
  try {
    const response: AxiosResponse<Status[][]> = await axios.get(
      `${statusApiUri}`
    )
    if (!response || response.status !== 200 || !response.data)
      console.log('ERROR: no data recieved')

    const data = response.data

    return data
  } catch (error) {
    console.error(error.message)
  }
}

export function getSummary(network: string, data: Status[][]): Summary[] {
  try {
    if (data) {
      let status: Status

      data.forEach((element) => {
        if (element[0].network === network) return (status = element[0])
      })

      // TODO: this is not fun. Needs a smart iteration over response instead of
      // aall this hardcoding
      const summary: Summary[] = [
        {
          component: 'Aquarius',
          status: status?.aquarius?.status,
          version: status?.aquarius?.version
        },
        {
          component: 'Provider',
          status: status?.provider?.status,
          version: status?.provider?.version
        },
        {
          component: 'Subgraph',
          status: status?.subgraph?.status,
          version: status?.subgraph?.version
        },
        {
          component: 'Market',
          status: status?.market
        },
        {
          component: 'Data Farming',
          status: status?.dataFarming
        },
        {
          component: 'Operator Service',
          status: status?.operator?.status,
          version: status?.operator?.version
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
    console.error(error.message)
  }
}

export function getNetworkSUmmary(data: Status[][]): NetworkSummary[] {
  const networks: string[] = JSON.parse(availableNetworks)
  const networkSummary: NetworkSummary[] = []

  networks.forEach((network) => {
    const summary = getSummary(network, data)
    let status = State.Up

    summary?.forEach((service) => {
      if (service.status === State.Down) return (status = State.Down)
    })
    if (status === State.Up) {
      summary?.forEach((service) => {
        if (service.status === State.Warning) return (status = State.Warning)
      })
    }
    networkSummary.push({ name: network, status })
  })
  return networkSummary
}

import { BigNumber } from 'ethers'

/* eslint-disable no-unused-vars */
export enum State {
  Up = 'UP',
  Down = 'DOWN',
  Warning = 'WARNING'
}
/* eslint-enable no-unused-vars */

export interface Status {
  network: string
  lastUpdatedOn: number
  currentBlock?: number
  components: Component[]
}

export interface Component {
  name: string
  status: State
  statusMessages: string[]
  response: number
  version: string
  latestRelease?: string
  validChainList?: boolean
  monitorVersion?: string
  block?: number
  validQuery?: boolean
  environments?: number
  limitReached?: boolean
  ethBalance?: BigNumber
  ethBalanceSufficient?: boolean
  oceanBalance?: BigNumber
  oceanBalanceSufficient?: boolean
}

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
  currentBlock: number
  market: State
  faucet: FaucetStatus | Record<string, never>
  aquarius: AquariusStatus
  provider: ProviderStatus
  subgraph: SubgraphStatus
  operator: OperatorStatus
  dataFarming: State
  lastUpdatedOn: number
}

export interface ComponentStatusBase {
  status: State
  statusMessages: string
  response: number
  version: string
}

export interface ProviderStatus extends ComponentStatusBase {
  latestRelease: string
}

export interface AquariusStatus extends ComponentStatusBase {
  validChainList: boolean
  monitorVersion: string
  latestRelease: string
  block: number
  validQuery: boolean
}

export interface SubgraphStatus extends ComponentStatusBase {
  latestRelease: string
  block: number
}

export interface OperatorStatus extends ComponentStatusBase {
  latestRelease: string
  environments: number
  limitReached: boolean
}

export interface FaucetStatus extends ComponentStatusBase {
  ethBalance?: BigNumber
  ethBalanceSufficient?: boolean
  oceanBalance?: BigNumber
  oceanBalanceSufficient?: boolean
}

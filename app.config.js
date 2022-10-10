module.exports = {
  statusApiUri: process.env.NEXT_STATUS_API_URI || 'http://localhost:8000',
  availableNetworks:
    process.env.NEXT_NETWORKS ||
    '["mainnet","polygon","bsc","moonriver","energyweb","mumbai","moonbase","goerli"]'
}

import { Box, Container, VStack } from '@chakra-ui/react'
import TransactionChart from './components/TransactionChart'
import { useTransactionData } from './hooks/useTransactionData'
import Header from './components/Header'
import StatCard from './components/StatCard'

const TESTNET_RPC = 'https://rpc.testnet.seda.xyz'

function App() {
  const testnet = useTransactionData(TESTNET_RPC)

  const latestCumulative =
    testnet.data.length > 0
      ? testnet.data[testnet.data.length - 1].cumulativeTransactions.toLocaleString()
      : '...'

  return (
    <Box minH="100vh" bg="#181A20">
      <Header />
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <StatCard
            label="Total Transactions (30 days)"
            value={testnet.isLoading ? 'Loading...' : latestCumulative}
          />
          <Box p={6} borderRadius="xl" boxShadow="dark-lg" bg="rgba(24,26,32,0.95)">
            <TransactionChart
              data={testnet.data}
              isLoading={testnet.isLoading}
              error={testnet.error}
              onRefresh={testnet.refresh}
              progress={testnet.progress}
            />
            <Box mt={4} textAlign="center" color="whiteAlpha.800" fontWeight="bold">
              Testnet
            </Box>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default App 
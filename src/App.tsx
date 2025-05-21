import { Box, Container, VStack, SimpleGrid } from '@chakra-ui/react'
import TransactionChart from './components/TransactionChart'
import { useTransactionData } from './hooks/useTransactionData'
import Header from './components/Header'

const TESTNET_RPC = 'https://rpc.testnet.seda.xyz'
const PLANET_RPC = 'https://rpc.planet.seda.xyz'

function App() {
  const testnet = useTransactionData(TESTNET_RPC)
  const planet = useTransactionData(PLANET_RPC)

  return (
    <Box minH="100vh" bg="#181A20">
      <Header />
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box p={6} borderRadius="xl" boxShadow="dark-lg" bg="rgba(24,26,32,0.95)">
              <TransactionChart
                data={testnet.data}
                isLoading={testnet.isLoading}
                error={testnet.error}
                onRefresh={testnet.refresh}
                progress={testnet.progress}
              />
              <Box mt={4} textAlign="center" color="whiteAlpha.800" fontWeight="bold">Testnet</Box>
            </Box>
            <Box p={6} borderRadius="xl" boxShadow="dark-lg" bg="rgba(24,26,32,0.95)">
              <TransactionChart
                data={planet.data}
                isLoading={planet.isLoading}
                error={planet.error}
                onRefresh={planet.refresh}
                progress={planet.progress}
              />
              <Box mt={4} textAlign="center" color="whiteAlpha.800" fontWeight="bold">Planet</Box>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

export default App 
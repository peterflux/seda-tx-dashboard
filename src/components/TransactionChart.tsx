import {
  // LineChart, // unused
  // Line, // unused
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'
import {
  Box,
  Button,
  Text,
  useToast,
  VStack,
  HStack,
  Spinner,
  Progress,
} from '@chakra-ui/react'
import dayjs from 'dayjs'

interface TransactionData {
  timestamp: number
  cumulativeTransactions: number
}

interface TransactionChartProps {
  data: TransactionData[]
  isLoading: boolean
  error: string | null
  onRefresh: () => void
  progress?: number
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        bg="white"
        p={3}
        borderRadius="md"
        boxShadow="md"
        border="1px solid"
        borderColor="gray.200"
      >
        <Text fontWeight="bold">
          {dayjs(label * 1000).format('YYYY-MM-DD HH:mm:ss')}
        </Text>
        <Text>
          Cumulative Transactions: {payload[0].value.toLocaleString()}
        </Text>
      </Box>
    )
  }
  return null
}

export default function TransactionChart({
  data,
  isLoading,
  error,
  onRefresh,
  progress = 0,
}: TransactionChartProps) {
  const toast = useToast()

  const handleRefresh = () => {
    onRefresh()
    toast({
      title: 'Refreshing data',
      status: 'info',
      duration: 2000,
      isClosable: true,
    })
  }

  if (error) {
    return (
      <VStack spacing={4}>
        <Text color="red.500">Error: {error}</Text>
        <Button onClick={handleRefresh}>Retry</Button>
      </VStack>
    )
  }

  if (isLoading) {
    return (
      <VStack spacing={4} h="400px" justify="center">
        <Spinner size="xl" color="whiteAlpha.900" thickness="4px" />
        <Text color="whiteAlpha.900" fontSize="xl" fontWeight="bold">Loading transaction data...</Text>
        <Box w="80%" maxW="400px">
          <Progress value={progress * 100} size="md" colorScheme="purple" borderRadius="md" />
          <Text color="whiteAlpha.800" fontSize="md" mt={2} textAlign="center">
            {Math.round(progress * 100)}%
          </Text>
        </Box>
      </VStack>
    )
  }

  // Gradient for area fill
  const gradientId = 'txAreaGradient'

  return (
    <VStack spacing={4} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="lg" fontWeight="bold" color="whiteAlpha.900">
          Cumulative Transactions Over Time
        </Text>
        <Button onClick={handleRefresh} isLoading={isLoading}>
          Refresh
        </Button>
      </HStack>

      <Box h="400px">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A259FF" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#A259FF" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(value) => dayjs(value * 1000).format('MM/DD')}
              tick={{ fill: '#B3B3B3', fontSize: 13, fontWeight: 600 }}
              minTickGap={40}
            />
            <YAxis
              tickFormatter={(value) => value.toLocaleString()}
              tick={{ fill: '#B3B3B3', fontSize: 13, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              width={80}
              interval="preserveStartEnd"
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#A259FF', strokeWidth: 1, opacity: 0.2 }} />
            <Area
              type="monotone"
              dataKey="cumulativeTransactions"
              stroke="#A259FF"
              strokeWidth={3}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{ r: 6, fill: '#fff', stroke: '#A259FF', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </VStack>
  )
} 
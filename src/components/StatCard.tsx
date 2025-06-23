import { Box, Text, VStack } from '@chakra-ui/react'

interface StatCardProps {
  label: string
  value: string
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <Box
      p={6}
      borderRadius="xl"
      boxShadow="dark-lg"
      bg="rgba(24,26,32,0.95)"
      textAlign="center"
    >
      <VStack>
        <Text fontSize="lg" color="whiteAlpha.700">
          {label}
        </Text>
        <Text fontSize="4xl" fontWeight="bold" color="whiteAlpha.900">
          {value}
        </Text>
      </VStack>
    </Box>
  )
} 
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'

export default function Header() {
  return (
    <Box
      as="header"
      w="100%"
      bgGradient="linear(to-r, #6C38FF 0%, #3A1C71 100%)"
      px={8}
      py={4}
      boxShadow="md"
      mb={8}
    >
      <Flex align="center">
        <Image src="/src/assets/seda-logo.svg" alt="SEDA Logo" h="40px" mr={4} />
        <Heading as="h1" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} color="white" fontWeight="extrabold" letterSpacing="wide">
          Transaction Dashboard
        </Heading>
        <Text ml={4} color="whiteAlpha.800" fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }}>
          (Testnet & Planet)
        </Text>
      </Flex>
    </Box>
  )
} 
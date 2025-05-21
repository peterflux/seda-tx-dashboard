# SEDA Testnet Transaction Dashboard

A real-time dashboard for tracking cumulative transactions on the SEDA testnet blockchain.

## Features

- Real-time transaction data from SEDA testnet
- Interactive line chart showing cumulative transactions over time
- Automatic data refresh
- Error handling and loading states
- Responsive design

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd seda-dashboard
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Technical Details

- Built with React and TypeScript
- Uses Vite as the build tool
- Chakra UI for the component library
- Recharts for data visualization
- ethers.js for blockchain interaction

## Data Fetching

The dashboard fetches transaction data from the SEDA testnet RPC endpoint (https://rpc.testnet.seda.xyz). It processes the data in batches to avoid overwhelming the RPC endpoint and calculates cumulative transaction counts over time.

## Error Handling

The application includes comprehensive error handling for:
- RPC connection issues
- Invalid responses
- Rate limiting
- Network errors

## License

ISC 
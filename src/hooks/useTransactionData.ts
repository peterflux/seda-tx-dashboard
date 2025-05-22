import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

interface TransactionData {
  date: string
  timestamp: number
  cumulativeTransactions: number
}

const DEFAULT_RPC_URL = 'https://rpc.testnet.seda.xyz'
const BATCH_SIZE = 50 // Number of blocks to fetch in each batch
const MAX_BLOCKS = 25000 // Try to fetch enough blocks to cover recent history
const HOURS_WINDOW = 30 // 30 hours

function getCacheKey(rpcUrl: string) {
  return `seda-tx-daily-cache-${rpcUrl}`
}

async function getLatestBlockHeight(rpcUrl: string): Promise<number> {
  const url = `${rpcUrl}/blockchain?minHeight=1&maxHeight=999999999`
  const res = await axios.get(url)
  return parseInt(res.data.result.last_height, 10)
}

async function getBlockData(rpcUrl: string, height: number) {
  const url = `${rpcUrl}/block?height=${height}`
  const res = await axios.get(url)
  const block = res.data.result.block
  return {
    timestamp: dayjs(block.header.time).unix(),
    transactionCount: block.data.txs ? block.data.txs.length : 0,
  }
}

export function useTransactionData(rpcUrl: string = DEFAULT_RPC_URL) {
  const [data, setData] = useState<TransactionData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    setProgress(0)

    // Check localStorage for cached data
    const cacheKey = getCacheKey(rpcUrl)
    const cached = localStorage.getItem(cacheKey)
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        setData(parsed)
        setIsLoading(false)
        setProgress(1)
        return
      } catch (e) {}
    }

    try {
      const latestHeight = await getLatestBlockHeight(rpcUrl)
      const startHeight = Math.max(1, latestHeight - MAX_BLOCKS + 1)
      let blockData: { timestamp: number; transactionCount: number }[] = []
      const totalBatches = Math.ceil((latestHeight - startHeight + 1) / BATCH_SIZE)
      let cumulative = 0

      for (let i = startHeight, batchNum = 0; i <= latestHeight; i += BATCH_SIZE, batchNum++) {
        const end = Math.min(i + BATCH_SIZE - 1, latestHeight)
        const batchPromises = []
        for (let h = i; h <= end; h++) {
          batchPromises.push(getBlockData(rpcUrl, h))
        }
        const batchResults = await Promise.all(batchPromises)
        blockData = blockData.concat(batchResults)
        setProgress((batchNum + 1) / totalBatches)
      }

      // Sort by timestamp
      blockData.sort((a, b) => a.timestamp - b.timestamp)

      // Aggregate: keep only the last block of each day
      const now = dayjs().unix()
      const cutoff = now - HOURS_WINDOW * 3600
      let lastDate = ''
      let lastBlockOfDay: TransactionData | null = null
      const dailyData: TransactionData[] = []
      for (const b of blockData) {
        if (b.timestamp < cutoff) continue
        cumulative += b.transactionCount
        const date = dayjs.unix(b.timestamp).format('YYYY-MM-DD')
        if (date !== lastDate && lastBlockOfDay) {
          dailyData.push(lastBlockOfDay)
        }
        lastDate = date
        lastBlockOfDay = {
          date,
          timestamp: b.timestamp,
          cumulativeTransactions: cumulative,
        }
      }
      if (lastBlockOfDay) dailyData.push(lastBlockOfDay)

      setData(dailyData)
      setProgress(1)
      // Store in localStorage
      localStorage.setItem(cacheKey, JSON.stringify(dailyData))
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [rpcUrl])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    isLoading,
    error,
    refresh: fetchData,
    progress,
  }
} 
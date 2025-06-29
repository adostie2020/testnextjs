import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/components/ui/button'
import { Checkbox } from '@/components/components/ui/checkbox'
import { format as formatDate } from 'date-fns'

export interface MergedColumnsRow {
  position?: string
  action?: string
  stockSymbol?: string
  proxyETF?: string
  eodBuyPrice?: number
  currentEodPrice?: number
  dateIn?: string | Date
  priceIn?: number
  dateOut?: string | Date
  priceOut?: number
  percentOfAccount?: number
  percentGainLoss?: number
  weightedPercentGainLoss?: number
  SectorIndex?: string
  SectorIndexETFSymbol?: string
  StopLoss?: number
}

export type MergedColumnDef = ColumnDef<MergedColumnsRow>
// Merged column definitions for flexible table rendering
export const mergedColumns: ColumnDef<MergedColumnsRow>[] = [
  { accessorKey: 'position', header: 'Position' },
  { accessorKey: 'action', header: 'Action' },
  { accessorKey: 'stockSymbol', header: 'Stock Symbol' },
  { accessorKey: 'proxyETF', header: 'Proxy ETF' },
  {
    accessorKey: 'eodBuyPrice',
    header: 'EOD Buy Price',
    cell: ({ row }) => {
      const value = row.getValue('eodBuyPrice')
      return typeof value === 'number'
        ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        : value
    },
  },
  {
    accessorKey: 'currentEodPrice',
    header: 'Current EOD Price',
    cell: ({ row }) => {
      const value = row.getValue('currentEodPrice')
      return typeof value === 'number'
        ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        : value
    },
  },
  {
    accessorKey: 'dateIn',
    header: 'Date in',
    cell: ({ row }) => {
      const value = row.getValue('dateIn')
      if (typeof value === 'string' || typeof value === 'number' || value instanceof Date) {
        try {
          return formatDate(new Date(value), 'MM/dd/yy')
        } catch {
          return value
        }
      }
      return ''
    },
  },
  {
    accessorKey: 'priceIn',
    header: 'Price in',
    cell: ({ row }) => {
      const value = row.getValue('priceIn')
      return typeof value === 'number'
        ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        : value
    },
  },
  {
    accessorKey: 'dateOut',
    header: 'Date out',
    cell: ({ row }) => {
      const value = row.getValue('dateOut')
      if (typeof value === 'string' || typeof value === 'number' || value instanceof Date) {
        try {
          return formatDate(new Date(value), 'MM/dd/yy')
        } catch {
          return value
        }
      }
      return ''
    },
  },
  {
    accessorKey: 'Date',
    header: 'Date',
    cell: ({ row }) => {
      const value = row.getValue('Date')
      if (typeof value === 'string' || typeof value === 'number' || value instanceof Date) {
        try {
          return formatDate(new Date(value), 'MM/dd/yy')
        } catch {
          return value
        }
      }
      return ''
    },
  },
  {
    accessorKey: 'priceOut',
    header: 'Price out',
    cell: ({ row }) => {
      const value = row.getValue('priceOut')
      return typeof value === 'number'
        ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        : value
    },
  },
  {
    accessorKey: 'percentOfAccount',
    header: '% of account',
    cell: ({ row }) => {
      const value = row.getValue('percentOfAccount')
      return typeof value === 'number' ? value.toFixed(2) + '%' : value
    },
  },
  {
    accessorKey: 'percentGainLoss',
    header: '% Gain/Loss',
    cell: ({ row }) => {
      const value = row.getValue('percentGainLoss')
      return typeof value === 'number' ? value.toFixed(2) + '%' : value
    },
  },
  {
    accessorKey: 'weightedPercentGainLoss',
    header: 'Weighted % Gain/Loss',
    cell: ({ row }) => {
      const value = row.getValue('weightedPercentGainLoss')
      return typeof value === 'number' ? value.toFixed(2) + '%' : value
    },
  },
  { accessorKey: 'Sector/Index', header: 'Sector/Index' },
  { accessorKey: 'Sector/IndexETF Symbol', header: 'Sector/IndexETF Symbol' },
  { accessorKey: 'StopLoss', header: 'Stop Loss' },
]

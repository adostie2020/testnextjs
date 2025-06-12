'use client'

import { ColumnDef } from '@tanstack/react-table'

// This type defines the shape of our order data
export type Order = {
  symbol: string
  date: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  allocation: number
  type: 'Buy Long' | 'Sell Long' | 'Buy Short' | 'Sell Short'
  quantity: number
  price: number
  stopPrice: number
}

export type Positions = {
  symbol: string
  type: string
  date: string
  price: number
  stopPrice: number
  quantity: number
  allocation: number
  profitLoss: number
}

export const ordersColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'symbol',
    header: 'Ticker Symbol',
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'allocation',
    header: 'Allocation',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
]

export const positionsColumns: ColumnDef<Positions>[] = [
  {
    accessorKey: 'symbol',
    header: 'Ticker Symbol',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'allocation',
    header: 'Allocation',
  },
  {
    accessorKey: 'profitLoss',
    header: 'P/L',
  },
]

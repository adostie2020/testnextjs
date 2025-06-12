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
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "stopPrice",
    header: () => <div className="text-right">Stop Price</div>,
    cell: ({ row }) => {
      const stopPrice = parseFloat(row.getValue("stopPrice"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(stopPrice)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
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
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "stopPrice",
    header: () => <div className="text-right">Stop Price</div>,
    cell: ({ row }) => {
      const stopPrice = parseFloat(row.getValue("stopPrice"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(stopPrice)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
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
    header: () => <div className="text-right">P/L</div>,
    cell: ({ row }) => {
      const profitLoss = parseFloat(row.getValue("profitLoss"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(profitLoss)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]

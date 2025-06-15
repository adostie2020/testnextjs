'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from "lucide-react"
import { Button } from '@/components/components/ui/button'
import { Checkbox } from '@/components/components/ui/checkbox'

// This type defines the shape of our order data
export type Order = {
  active: 'Active' | 'Inactive'
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
  active: 'Active' | 'Inactive'
  symbol: string
  type: string
  date: string
  price: number
  stopPrice: number
  quantity: number
  allocation: number
  profitLoss: number
}

const filters = {'true': 'Active', 'false':undefined};

export const ordersColumns: ColumnDef<Order>[] = [
  {accessorKey: 'active',
    header: ({ table }) => (
      <div className="flex items-center">
        <Checkbox
          checked={table.getColumn('active')?.getFilterValue() === 'Active'}
          onCheckedChange={(value) => {
            table.getColumn('active')?.setFilterValue(filters[value as string])
          }}
          aria-label="Show active positions"
        />
        <span className="ml-2">Filter active</span>
      </div>
    ),
    filterFn: (row, id, value) => {
      if (!value) return true
      return row.getValue(id) === value
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'symbol',
    header: 'Ticker Symbol',
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 lg:px-3"
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
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
    header: () => <div className="text-left">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price)

      return <div className="text-left font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'stopPrice',
    header: () => <div className="text-left">Stop Price</div>,
    cell: ({ row }) => {
      const stopPrice = parseFloat(row.getValue('stopPrice'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(stopPrice)

      return <div className="text-left font-medium">{formatted}</div>
    },
  },
]

export const positionsColumns: ColumnDef<Positions>[] = [
  {accessorKey: 'active',
    header: ({ table }) => (
      <div className="flex items-center">
        <Checkbox
          checked={table.getColumn('active')?.getFilterValue() === 'Active'}
          onCheckedChange={(value) => {
            table.getColumn('active')?.setFilterValue(filters[value as string])
          }}
          aria-label="Show active positions"
        />
        <span className="ml-2">Filter active</span>
      </div>
    ),
    filterFn: (row, id, value) => {
      if (!value) return true
      return row.getValue(id) === value
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'symbol',
    header: 'Ticker Symbol',
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 lg:px-3"
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
  {
    accessorKey: 'price',
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'stopPrice',
    header: () => <div className="text-right">Stop Price</div>,
    cell: ({ row }) => {
      const stopPrice = parseFloat(row.getValue('stopPrice'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
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
      const profitLoss = parseFloat(row.getValue('profitLoss'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(profitLoss)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]

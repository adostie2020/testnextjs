'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from "lucide-react"
import { Button } from '@/components/components/ui/button'
import { Checkbox } from '@/components/components/ui/checkbox'
import { format } from 'date-fns'

// This type defines the shape of our order data
export interface Order {
  active: string
  symbol: string
  date: Date
  status: string
  allocation: number
  type: string
  quantity: number
  price: number
  stopPrice: number
}

export interface Positions {
  action: string
  active: string
  symbol: string
  type: string
  date: Date
  price: number
  quantity: number
  allocation: number
  profitLoss: number
  stopPrice: number
}

const filters = {'true': 'Active', 'false':undefined};

export const StaticTableColumns: ColumnDef<Positions>[] = [
  {accessorKey: 'action',
    header: 'Action',
  },
  {accessorKey: 'date',
    header: 'Date',
  },  
  {accessorKey: 'price',
    header: 'Price',
  },
  {accessorKey: 'stopPrice',
    header: 'Stop Price',
  },
  {accessorKey: 'quantity',
    header: 'Quantity',
  },
  {accessorKey: 'allocation',
    header: 'Allocation',
  },
  {accessorKey: 'profitLoss',
    header: 'P/L',
  },
  {accessorKey: 'symbol',
    header: 'Ticker Symbol',
  },
  {accessorKey: 'type',
    header: 'Type',
  },
]

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
    cell: ({ row }) => {
      const date = row.getValue('date') as Date
      return format(date, 'MM/dd/yy')
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
  {accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.getValue('action')}</div>
    },
  },    
  {
    accessorKey: 'active',
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
    header: 'Date',
    cell: ({ row }) => {
      const date = row.getValue('date') as Date
      return format(date, 'MM/dd/yy')
    },
    filterFn: (row, columnId, value: Date) => {
      const rowDate = row.getValue(columnId) as Date
      return rowDate.toDateString() === value.toDateString()
    }
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

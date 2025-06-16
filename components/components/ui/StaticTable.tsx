"use client"

import {
  ColumnDef,
  flexRender,
  getFilteredRowModel,
  ColumnFiltersState,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"
import * as React from "react"
import { ChartLegend, ChartLegendContent, type ChartConfig } from "components/components/ui/chart"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/components/ui/table"

import { DatePicker } from "@/components/components/ui/datepicker"
import { Button } from "@/components/components/ui/button"

interface StaticTableProps<TData extends { action: string }, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  DateFilter: boolean
}

export function StaticTable<TData extends { action: string }, TValue>({
  columns,
  data, DateFilter
}: StaticTableProps<TData, TValue>) {
    const bgColor = {'buy new': 'bg-green', 'sell': 'bg-red', 'update stops': 'bg-yellow'}
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [
        {
          id: 'date',
          value: new Date()
        }
      ]
    )
    const [date, setDate] = React.useState<Date>(new Date())
    const table = useReactTable({
      data,
      columns,
      getPaginationRowModel: getPaginationRowModel(),
      getCoreRowModel: getCoreRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        columnFilters,
      }
    })

    const handleDateChange = (newDate: Date) => {
      setDate(newDate);
      table.getColumn('date')?.setFilterValue(newDate);
    };

  return (
    <div>
        {DateFilter ?(
          <div className='flex items-center py-4'>
              <DatePicker 
                date={date}
                setDate={handleDateChange}
              />
          </div>
        ): null}
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder || (header.id === 'date' && !DateFilter) || header.id === 'active'
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`
                  ${row.original.action === 'buy new' ? 'bg-green-500/50 hover:bg-green-500' : ''}
                  ${row.original.action === 'sell' ? 'bg-red-500/50 hover:bg-red-500' : ''}
                  ${row.original.action === 'update stops' ? 'bg-yellow-500/50 hover:bg-yellow-500' : ''}
                `}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender( (cell.column.id === 'date' && !!DateFilter)
                    || cell.column.id === 'actions' ? 
                        null : 
                        cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
      <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  </div>
    
  )
}
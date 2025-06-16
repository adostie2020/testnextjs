"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/components/ui/table"



interface StaticTableProps<TData extends { action: string }, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function StaticTable<TData extends { action: string }, TValue>({
  columns,
  data,
}: StaticTableProps<TData, TValue>) {
    const bgColor = {'buy new': 'bg-green', 'sell': 'bg-red', 'update stops': 'bg-yellow'}
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder || header.id === 'date' || header.id === 'active'
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
                    {flexRender( cell.column.id === 'date' 
                    || cell.column.id === 'active' ? 
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
  )
}
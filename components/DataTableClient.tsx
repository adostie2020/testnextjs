'use client'
import { useEffect, useState } from 'react'
import { mergedColumns, MergedColumnDef, MergedColumnsRow } from '@/components/columns/columns'
import { DataTable } from '@/components/components/ui/DataTable'
import { StaticTable } from '@/components/components/ui/StaticTable'
import { Skeleton } from '@/components/components/ui/skeleton'
import { ColumnDef } from '@tanstack/react-table'

//TODO call getData through and API route

export function DataTableClient({ account, actions = false, datefilter = false }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/getData?account=${encodeURIComponent(account)}`
      )
      const json = await res.json()
      setData(json)
      setLoading(false)
    }
    fetchData()
  }, [account])

  const dataKeys = new Set(data.flatMap((obj) => Object.keys(obj)))
  const columns = mergedColumns.filter(
    (col: ColumnDef<MergedColumnsRow>) =>
      'accessorKey' in col &&
      // @ts-ignore
      (col.accessorKey as string) &&
      // @ts-ignore
      dataKeys.has(col.accessorKey)
  )

  if (loading) return <Skeleton className="h-2 w-4"></Skeleton>
  return actions ? (
    <DataTable columns={columns} data={data} /> //TODO: add static table method
  ) : (
    <DataTable columns={columns} data={data} />
  )
}

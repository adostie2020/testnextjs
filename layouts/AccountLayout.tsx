import { ordersColumns, positionsColumns, Positions, Order } from '@/components/columns/columns'
import { DataTable } from '@/components/components/ui/DataTable'
import type { Investments } from 'contentlayer/generated'
import { ReactNode } from 'react'
import AccountPosts from './AccountPosts'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'


interface Props {
  children: ReactNode
  content: Omit<Investments, '_id' | '_raw' | 'body'>
}

async function getOrdersData(): Promise<Order[]> {
  // Placeholder data for orders
  return [
    {
      symbol: 'AAPL',
      date: '2024-01-15',
      status: 'completed',
      allocation: 25000,
      type: 'Buy Long',
      quantity: 100,
      price: 185.92,
      stopPrice: 0,
    },
    {
      symbol: 'MSFT',
      date: '2024-01-14',
      status: 'pending',
      allocation: 15000,
      type: 'Sell Short',
      quantity: 50,
      price: 389.55,
      stopPrice: 0,
    },
    {
      symbol: 'GOOGL',
      date: '2024-01-13',
      status: 'processing',
      allocation: 20000,
      type: 'Buy Long',
      quantity: 75,
      price: 142.65,
      stopPrice: 0,
    },
  ]
}

async function getData(): Promise<Positions[]> {
  // Fetch data from API here.
  return [
    {
      symbol: 'AAPL',
      type: 'Long',
      date: '2024-01-15',
      price: 185.92,
      quantity: 100,
      allocation: 25000,
      profitLoss: 1520.5,
      stopPrice: 0,
    },
    {
      symbol: 'MSFT',
      type: 'Short',
      date: '2024-01-14',
      price: 389.55,
      quantity: 50,
      allocation: 15000,
      profitLoss: -850.25,
      stopPrice: 0,
    },
    {
      symbol: 'GOOGL',
      type: 'Long',
      date: '2024-01-13',
      price: 142.65,
      quantity: 75,
      allocation: 20000,
      profitLoss: 2150.75,
      stopPrice: 0,
    },
  ]
}

export default async function AccountLayout({ children, content }: Props) {
  const positionsData = await getData()
  const ordersData = await getOrdersData()
  const { account } = content
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  

  return (
    <>
      <div className="flex flex-col gap-16 pb-16">
        {/* Hero Section */}
        <section className="flex flex-col items-center gap-8 pt-8 text-center">
          <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl dark:from-gray-100 dark:to-gray-400">
            {content.account} Dashboard
          </h1>
          <p className="max-w-2xl text-xl text-gray-600 dark:text-gray-300">{children}</p>
        </section>
      </div>
      <div className="mx-auto flex flex-col gap-8 py-10">
        <h1 className="text-center text-2xl font-bold">Positions</h1>
        <DataTable columns={positionsColumns} data={positionsData} />
        <br />
        <h1 className="text-center text-2xl font-bold">Orders</h1>
        <DataTable columns={ordersColumns} data={ordersData} />
      </div>
      <AccountPosts posts={posts} />
    </>
  )
}

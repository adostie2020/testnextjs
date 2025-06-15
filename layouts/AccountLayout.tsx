import { ordersColumns, positionsColumns, Positions, Order } from '@/components/columns/columns'
import { DataTable } from '@/components/components/ui/DataTable'
import type { Investments } from 'contentlayer/generated'
import { ReactNode } from 'react'
import AccountPosts from './AccountPosts'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { SectionCards } from '@/components/components/section-cards'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/components/ui/tabs"
import { ChartAreaInteractive } from '@/components/components/chart-area-interactive'

interface Props {
  children: ReactNode
  content: Omit<Investments, '_id' | '_raw' | 'body'>
}

async function getOrdersData(): Promise<Order[]> {
  // Placeholder data for orders
  return [
    {
      active: 'Active',
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
      active: 'Inactive',
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
      active: 'Active',
      symbol: 'GOOGL',
      date: '2024-01-13',
      status: 'processing',
      allocation: 20000,
      type: 'Buy Long',
      quantity: 75,
      price: 142.65,
      stopPrice: 0,
    },
    {
      active: 'Active',
      symbol: 'AMZN',
      date: '2024-01-12',
      status: 'completed',
      allocation: 30000,
      type: 'Buy Long',
      quantity: 200,
      price: 151.94,
      stopPrice: 0,
    },
    {
      active: 'Inactive',
      symbol: 'META',
      date: '2024-01-11',
      status: 'cancelled',
      allocation: 10000,
      type: 'Sell Long',
      quantity: 40,
      price: 378.99,
      stopPrice: 0,
    },
    {
      active: 'Active',
      symbol: 'TSLA',
      date: '2024-01-10',
      status: 'completed',
      allocation: 50000,
      type: 'Buy Short',
      quantity: 150,
      price: 237.49,
      stopPrice: 0,
    }
  ]
}

async function getData(): Promise<Positions[]> {
  // Fetch data from API here.
  return [
    {
      active: 'Active',
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
      active: 'Inactive',
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
      active: 'Active',
      symbol: 'GOOGL',
      type: 'Long',
      date: '2024-01-13',
      price: 142.65,
      quantity: 75,
      allocation: 20000,
      profitLoss: 2150.75,
      stopPrice: 0,
    },
    {
      active: 'Active',
      symbol: 'AMZN',
      type: 'Long',
      date: '2024-01-12',
      price: 151.94,
      quantity: 200,
      allocation: 30000,
      profitLoss: 3250.00,
      stopPrice: 0,
    },
    {
      active: 'Inactive',
      symbol: 'META',
      type: 'Short',
      date: '2024-01-11',
      price: 378.99,
      quantity: 40,
      allocation: 10000,
      profitLoss: -1200.50,
      stopPrice: 0,
    },
    {
      active: 'Active',
      symbol: 'TSLA',
      type: 'Long',
      date: '2024-01-10',
      price: 237.49,
      quantity: 150,
      allocation: 50000,
      profitLoss: 4500.25,
      stopPrice: 0,
    },
    {
      active: 'Active',
      symbol: 'NVDA',
      type: 'Long',
      date: '2024-01-09',
      price: 485.09,
      quantity: 30,
      allocation: 45000,
      profitLoss: 2800.75,
      stopPrice: 0,
    },
    {
      active: 'Inactive',
      symbol: 'AMD',
      type: 'Short',
      date: '2024-01-08',
      price: 162.51,
      quantity: 100,
      allocation: 20000,
      profitLoss: -950.25,
      stopPrice: 0,
    }
  ]
}

export default async function AccountLayout({ children, content }: Props) {
  const positionsData = await getData()
  const ordersData = await getOrdersData()
  const { account } = content
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  
  return (
    <div>
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
      <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <Tabs defaultValue="positions">
                <TabsList>
                  <TabsTrigger value="positions">Positions</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                </TabsList>
                <TabsContent value="positions">
                  <DataTable columns={positionsColumns} data={positionsData} />
                </TabsContent>
                <TabsContent value="orders">
                  <DataTable columns={ordersColumns} data={ordersData} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <AccountPosts posts={posts} />
  </div>)
}

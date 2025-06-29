export const dynamic = 'force-dynamic' // at the top of /about/page.tsx

import { ordersColumns, positionsColumns, Positions, Order } from '@/components/columns/columns'
import { DataTable } from '@/components/components/ui/DataTable'
import type { Investments } from 'contentlayer/generated'
import { ReactNode, Suspense } from 'react'
import AccountPosts from './AccountPosts'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { SectionCards } from '@/components/components/section-cards'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/components/ui/tabs'
import { ChartAreaInteractive } from '@/components/components/chart-area-interactive'
import { StaticTable } from '@/components/components/ui/StaticTable'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { Skeleton } from '@/components/components/ui/skeleton'
import { flexRender } from '@tanstack/react-table'

interface Props {
  children: ReactNode
  content: Omit<Investments, '_id' | '_raw' | 'body'>
}

async function getData() {
  const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.S3_CURRENT_JSON_ACCESS_KEY!,
      secretAccessKey: process.env.S3_CURRENT_JSON_SECRET_ACCESS_KEY!,
    },
  })

  const command = new GetObjectCommand({
    Bucket: process.env.S3_CURRENT_JSON_BUCKET,
    Key: process.env.S3_CURRENT_JSON_KEY,
  })

  const res = await s3.send(command)
  const body = await res.Body?.transformToString?.()
  const json = body ? JSON.parse(body) : {}
  return json
}

export default async function AccountLayout({ children, content }: Props) {
  const positionsData = await getData()
  const ordersData = await getData()
  const { account } = content
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)

  return (
    <div>
      <div className="flex flex-col gap-8 pb-16">
        {/* Hero Section */}
        <section className="flex flex-col items-center gap-8 pt-8 text-center">
          <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl dark:from-gray-100 dark:to-gray-400">
            {content.account} Dashboard
          </h1>
          <h2 className="max-w-2xl text-xl text-gray-600 dark:text-gray-300">{children}</h2>
        </section>
      </div>
      <div className="mx-auto flex flex-col gap-8 py-10">
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col py-4 md:py-6">
              <div className="mt-8 flex flex-col gap-4 rounded-lg border border-gray-300 p-4 shadow-sm dark:border-gray-700">
                <h1 className="text-2xl font-bold"> New today</h1>
                <StaticTable columns={ordersColumns} data={ordersData} DateFilter={false} />
                <div></div>
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
                <div className="mt-8 flex flex-col gap-4 rounded-lg border border-gray-300 p-4 shadow-sm dark:border-gray-700">
                  <Suspense fallback={<Skeleton className="flex flex-col" />}>
                    <Tabs defaultValue="orders">
                      <TabsList>
                        <TabsTrigger value="positions">Positions</TabsTrigger>
                        <TabsTrigger value="orders">Orders</TabsTrigger>
                        <TabsTrigger value="archive">Archive</TabsTrigger>
                      </TabsList>
                      {/* <TabsContent value="positions">
                      <DataTable columns={positionsColumns} data={positionsData} />
                    </TabsContent>*/}
                      <TabsContent value="orders">
                        <DataTable columns={ordersColumns} data={ordersData} />
                      </TabsContent>
                      {/*<TabsContent value="archive">
                      <StaticTable columns={positionsColumns} data={positionsData} DateFilter={true} />
                    </TabsContent>*/}
                    </Tabs>
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AccountPosts posts={posts} />
      </div>
    </div>
  )
}

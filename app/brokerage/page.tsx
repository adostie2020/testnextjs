import { ordersColumns, positionsColumns, Positions, Order } from '@/components/columns/columns'
import { DataTable } from '@/components/components/ui/DataTable'

async function getOrdersData(): Promise<Order[]> {
  // Placeholder data for orders
  return [
    {
      symbol: 'TSLA',
      date: '2024-01-15',
      status: 'completed',
      allocation: 30000,
      type: 'Buy Long',
      quantity: 150,
      price: 212.19,
      stopPrice: 0,
    },
    {
      symbol: 'NVDA',
      date: '2024-01-14',
      status: 'pending',
      allocation: 25000,
      type: 'Buy Long',
      quantity: 45,
      price: 547.1,
      stopPrice: 0,
    },
    {
      symbol: 'META',
      date: '2024-01-13',
      status: 'completed',
      allocation: 20000,
      type: 'Sell Short',
      quantity: 55,
      price: 374.49,
      stopPrice: 0,
    },
  ]
}

async function getData(): Promise<Positions[]> {
  // Fetch data from API here.
  return [
    {
      symbol: 'TSLA',
      type: 'Long',
      date: '2024-01-15',
      price: 212.19,
      quantity: 150,
      allocation: 30000,
      profitLoss: 2250.75,
      stopPrice: 0,
    },
    {
      symbol: 'NVDA',
      type: 'Long',
      date: '2024-01-14',
      price: 547.1,
      quantity: 45,
      allocation: 25000,
      profitLoss: 1875.5,
      stopPrice: 0,
    },
    {
      symbol: 'META',
      type: 'Short',
      date: '2024-01-13',
      price: 374.49,
      quantity: 55,
      allocation: 20000,
      profitLoss: -950.25,
      stopPrice: 0,
    },
  ]
}

export default async function DemoPage() {
  const positionsData = await getData()
  const ordersData = await getOrdersData()
  return (
    <>
      <div className="flex flex-col gap-16 pb-16">
        {/* Hero Section */}
        <section className="flex flex-col items-center gap-8 pt-8 text-center">
          <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl dark:from-gray-100 dark:to-gray-400">
            Brokerage Dashboard
          </h1>
          <p className="max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Maximize your investment potential with our flexible brokerage solutions.
          </p>
        </section>
      </div>
      <div className="mx-auto flex flex-col gap-8 py-10">
        <h1 className="text-center text-2xl font-bold">Positions</h1>
        <DataTable columns={positionsColumns} data={positionsData} />
        <br />
        <br />
        <h1 className="text-center text-2xl font-bold">Orders</h1>
        <DataTable columns={ordersColumns} data={ordersData} />
      </div>
    </>
  )
}

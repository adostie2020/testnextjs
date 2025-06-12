import { ordersColumns, positionsColumns, Positions, Order } from '@/components/columns/columns'
import { DataTable } from '@/components/components/ui/DataTable'

async function getOrdersData(): Promise<Order[]> {
  // Placeholder data for orders
  return [
    {
      symbol: 'VTI',
      date: '2024-01-15',
      status: 'completed',
      allocation: 15000,
      type: 'Buy Long',
      quantity: 75,
      price: 235.45,
      stopPrice: 0,
    },
    {
      symbol: 'VXUS',
      date: '2024-01-14',
      status: 'pending',
      allocation: 10000,
      type: 'Buy Long',
      quantity: 150,
      price: 57.25,
      stopPrice: 0,
    },
    {
      symbol: 'BND',
      date: '2024-01-13',
      status: 'completed',
      allocation: 5000,
      type: 'Buy Long',
      quantity: 65,
      price: 72.85,
      stopPrice: 0,
    },
  ]
}

async function getData(): Promise<Positions[]> {
  // Fetch data from API here.
  return [
    {
      symbol: 'VTI',
      type: 'Long',
      date: '2024-01-15',
      price: 235.45,
      quantity: 75,
      allocation: 15000,
      profitLoss: 825.5,
      stopPrice: 0,
    },
    {
      symbol: 'VXUS',
      type: 'Long',
      date: '2024-01-14',
      price: 57.25,
      quantity: 150,
      allocation: 10000,
      profitLoss: -250.75,
      stopPrice: 0,
    },
    {
      symbol: 'BND',
      type: 'Long',
      date: '2024-01-13',
      price: 72.85,
      quantity: 65,
      allocation: 5000,
      profitLoss: 125.25,
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
            IRA Dashboard
          </h1>
          <p className="max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Build your retirement nest egg with tax-advantaged investment strategies.
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

import * as React from 'react'
import { Skeleton } from '@/components/components/ui/skeleton'
import { Suspense } from 'react'
import PricingTable from '@/components/pricingTable'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >
    }
  }
}

async function Page() {
  // Server-side authentication check - will redirect to login if not authenticated
  return (
    <Suspense fallback={<Skeleton className="hw-96 w-96" />}>
      <PricingTable />
    </Suspense>
  )
}

export default Page

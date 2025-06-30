import { AppSidebar } from '@/components/components/app-sidebar'
import { ChartAreaInteractive } from '@/components/components/chart-area-interactive'
import { DataTable } from '@/components/components/data-table'
import { SectionCards } from '@/components/components/section-cards'
import { SiteHeader } from '@/components/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/components/ui/sidebar'
import { requireAuth } from '@/lib/auth-server'

import data from './data.json'

export default async function Page() {
  // Server-side authentication check - will redirect to login if not authenticated
  await requireAuth()

  return (
    <div>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}

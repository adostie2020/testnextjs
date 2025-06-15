import { AppSidebar } from '@/components/components/app-sidebar'
import { ChartAreaInteractive } from '@/components/components/chart-area-interactive'
import { DataTable } from '@/components/components/ui/DataTable'
import { SectionCards } from '@/components/components/section-cards'
import { SiteHeader } from '@/components/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/components/ui/sidebar'



export default function DashLayout(orderData, positionData, ordersColumns, positionsColumns) {
    return (
      <div>
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
                <DataTable data={orderData} columns={ordersColumns} />
                <DataTable data={positionData} columns={positionsColumns} />
              </div>
            </div>
          </div>
      </div>
    )
  }
  
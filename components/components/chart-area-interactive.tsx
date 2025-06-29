'use client'

import * as React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { useIsMobile } from '@/components/hooks/use-mobile'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/components/ui/toggle-group'

export const description = 'An interactive area chart'

const jsonData = JSON.parse(
  '{"total":{"2025-01-07T00:00:00.000":300000.0,"2025-01-08T00:00:00.000":299830.4,"2025-01-09T00:00:00.000":299830.4,"2025-01-10T00:00:00.000":299372.8,"2025-01-11T00:00:00.000":299372.8,"2025-01-12T00:00:00.000":299372.8,"2025-01-13T00:00:00.000":299372.8,"2025-01-14T00:00:00.000":299372.8,"2025-01-15T00:00:00.000":299372.8,"2025-01-16T00:00:00.000":299588.8,"2025-01-17T00:00:00.000":299666.2,"2025-01-18T00:00:00.000":299666.2,"2025-01-19T00:00:00.000":299666.2,"2025-01-20T00:00:00.000":299666.2,"2025-01-21T00:00:00.000":299891.2,"2025-01-22T00:00:00.000":299925.0,"2025-01-23T00:00:00.000":300175.0,"2025-01-24T00:00:00.000":300244.6,"2025-01-25T00:00:00.000":300244.6,"2025-01-26T00:00:00.000":300244.6,"2025-01-27T00:00:00.000":299926.4,"2025-01-28T00:00:00.000":300009.6,"2025-01-29T00:00:00.000":300655.2,"2025-01-30T00:00:00.000":303061.7,"2025-01-31T00:00:00.000":302363.5,"2025-02-01T00:00:00.000":302363.5,"2025-02-02T00:00:00.000":302363.5,"2025-02-03T00:00:00.000":303442.4,"2025-02-04T00:00:00.000":303849.6,"2025-02-05T00:00:00.000":308004.7,"2025-02-06T00:00:00.000":307970.4,"2025-02-07T00:00:00.000":306102.5,"2025-02-08T00:00:00.000":306102.5,"2025-02-09T00:00:00.000":306102.5,"2025-02-10T00:00:00.000":309498.4,"2025-02-11T00:00:00.000":306038.2999999999,"2025-02-12T00:00:00.000":306229.2,"2025-02-13T00:00:00.000":308778.6,"2025-02-14T00:00:00.000":310761.0999999999,"2025-02-15T00:00:00.000":310761.0999999999,"2025-02-16T00:00:00.000":310761.0999999999,"2025-02-17T00:00:00.000":310761.0999999999,"2025-02-18T00:00:00.000":309450.9999999999,"2025-02-19T00:00:00.000":308666.4999999999,"2025-02-20T00:00:00.000":303082.2,"2025-02-21T00:00:00.000":297461.4999999999,"2025-02-22T00:00:00.000":297461.4999999999,"2025-02-23T00:00:00.000":297461.4999999999,"2025-02-24T00:00:00.000":296680.6,"2025-02-25T00:00:00.000":296680.6,"2025-02-26T00:00:00.000":296680.6,"2025-02-27T00:00:00.000":296680.6,"2025-02-28T00:00:00.000":296680.6,"2025-03-01T00:00:00.000":296680.6,"2025-03-02T00:00:00.000":296680.6,"2025-03-03T00:00:00.000":296680.6,"2025-03-04T00:00:00.000":296680.6,"2025-03-05T00:00:00.000":297266.9,"2025-03-06T00:00:00.000":295115.2,"2025-03-07T00:00:00.000":295115.2,"2025-03-08T00:00:00.000":295115.2,"2025-03-09T00:00:00.000":295115.2,"2025-03-10T00:00:00.000":295115.2,"2025-03-11T00:00:00.000":295115.2,"2025-03-12T00:00:00.000":295115.2,"2025-03-13T00:00:00.000":295816.0,"2025-03-14T00:00:00.000":296717.5,"2025-03-15T00:00:00.000":296717.5,"2025-03-16T00:00:00.000":296717.5,"2025-03-17T00:00:00.000":298155.2,"2025-03-18T00:00:00.000":298943.9,"2025-03-19T00:00:00.000":300325.4,"2025-03-20T00:00:00.000":300807.9,"2025-03-21T00:00:00.000":299359.8,"2025-03-22T00:00:00.000":299359.8,"2025-03-23T00:00:00.000":299359.8,"2025-03-24T00:00:00.000":299575.4,"2025-03-25T00:00:00.000":299117.8,"2025-03-26T00:00:00.000":299417.0,"2025-03-27T00:00:00.000":299601.8,"2025-03-28T00:00:00.000":299168.9,"2025-03-29T00:00:00.000":299168.9,"2025-03-30T00:00:00.000":299168.9,"2025-03-31T00:00:00.000":299642.0,"2025-04-01T00:00:00.000":299632.0,"2025-04-02T00:00:00.000":299718.0,"2025-04-03T00:00:00.000":299231.8,"2025-04-04T00:00:00.000":299231.8,"2025-04-05T00:00:00.000":299231.8,"2025-04-06T00:00:00.000":299231.8,"2025-04-07T00:00:00.000":299231.8,"2025-04-08T00:00:00.000":299231.8,"2025-04-09T00:00:00.000":299231.8,"2025-04-10T00:00:00.000":299231.8,"2025-04-11T00:00:00.000":299231.8,"2025-04-12T00:00:00.000":299231.8,"2025-04-13T00:00:00.000":299231.8,"2025-04-14T00:00:00.000":299231.8,"2025-04-15T00:00:00.000":300442.1,"2025-04-16T00:00:00.000":300267.8,"2025-04-17T00:00:00.000":299541.5,"2025-04-18T00:00:00.000":299541.5,"2025-04-19T00:00:00.000":299541.5,"2025-04-20T00:00:00.000":299541.5,"2025-04-21T00:00:00.000":299541.5,"2025-04-22T00:00:00.000":299541.5,"2025-04-23T00:00:00.000":299541.5,"2025-04-24T00:00:00.000":299541.5,"2025-04-25T00:00:00.000":299541.5,"2025-04-26T00:00:00.000":299541.5,"2025-04-27T00:00:00.000":299541.5,"2025-04-28T00:00:00.000":299541.5,"2025-04-29T00:00:00.000":299541.5,"2025-04-30T00:00:00.000":299541.5,"2025-05-01T00:00:00.000":299541.5,"2025-05-02T00:00:00.000":300544.1,"2025-05-03T00:00:00.000":300544.1,"2025-05-04T00:00:00.000":300544.1,"2025-05-05T00:00:00.000":300437.5,"2025-05-06T00:00:00.000":299422.3,"2025-05-07T00:00:00.000":299621.7,"2025-05-08T00:00:00.000":301234.1,"2025-05-09T00:00:00.000":306640.6,"2025-05-10T00:00:00.000":306640.6,"2025-05-11T00:00:00.000":306640.6,"2025-05-12T00:00:00.000":314712.2,"2025-05-13T00:00:00.000":318695.1,"2025-05-14T00:00:00.000":321216.9,"2025-05-15T00:00:00.000":320209.5,"2025-05-16T00:00:00.000":320692.4,"2025-05-17T00:00:00.000":320692.4,"2025-05-18T00:00:00.000":320692.4,"2025-05-19T00:00:00.000":319952.6,"2025-05-20T00:00:00.000":319286.1,"2025-05-21T00:00:00.000":315799.0,"2025-05-22T00:00:00.000":315153.0,"2025-05-23T00:00:00.000":316656.6,"2025-05-24T00:00:00.000":316656.6,"2025-05-25T00:00:00.000":316656.6,"2025-05-26T00:00:00.000":316656.6,"2025-05-27T00:00:00.000":318796.6,"2025-05-28T00:00:00.000":322916.4,"2025-05-29T00:00:00.000":323865.2,"2025-05-30T00:00:00.000":325155.9,"2025-05-31T00:00:00.000":325155.9,"2025-06-01T00:00:00.000":325155.9,"2025-06-02T00:00:00.000":329004.3,"2025-06-03T00:00:00.000":328757.2,"2025-06-04T00:00:00.000":329289.4,"2025-06-05T00:00:00.000":329289.4}}'
)

const chartData = Object.entries(jsonData.total).map(([date, value]) => ({
  date,
  value: Number(value),
}))

const chartConfig = {
  total: {
    label: 'Total Earnings',
    color: 'var(--primary)',
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState('90d')

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange('7d')
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date('2025-06-5')
    let daysToSubtract = 90
    if (timeRange === '30d') {
      daysToSubtract = 30
    } else if (timeRange === '7d') {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Earnings</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">Total earnings over time</span>
          <span className="@[540px]/card:hidden">Earnings over time</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-total)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-total)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              domain={['dataMin - 1000', 'dataMax + 1000']}
              padding={{ top: 10, bottom: 10 }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="value"
              type="natural"
              fill="url(#fillTotal)"
              stroke="var(--color-total)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

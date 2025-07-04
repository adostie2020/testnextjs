import { Investments, allInvestments } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AccountLayout from '@/layouts/AccountLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Brokerage' })

export default function Page() {
  const account = allInvestments.find((p) => p.slug === 'Brokerage') as Investments
  const mainContent = coreContent(account)

  return (
    <AccountLayout content={mainContent}>
      <MDXLayoutRenderer code={account.body.code} />
    </AccountLayout>
  )
}

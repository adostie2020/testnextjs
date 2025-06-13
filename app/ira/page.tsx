import { Investments, allInvestments } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AccountLayout from '@/layouts/AccountLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'


export const metadata = genPageMetadata({ title: 'IRA' })

export default async function Page() {
  const account = allInvestments.find((p) => p.slug === 'IRA') as Investments
  const mainContent = coreContent(account)
  
  return (
    <AccountLayout content={mainContent}>
      <MDXLayoutRenderer code={account.body.code} />
    </AccountLayout>
  )
}
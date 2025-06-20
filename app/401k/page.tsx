import { Investments, allInvestments } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AccountLayout from '@/layouts/AccountLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import Protected from '@/components/Protected';

export const metadata = genPageMetadata({ title: '401k' })

export default function Page() {
  const account = allInvestments.find((p) => p.slug === '401k') as Investments
  const mainContent = coreContent(account)

  return (
    <Protected>
      <AccountLayout content={mainContent}>
        <MDXLayoutRenderer code={account.body.code} />
      </AccountLayout>
    </Protected>
  )
}

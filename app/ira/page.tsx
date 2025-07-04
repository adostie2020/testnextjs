import { Investments, allInvestments } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AccountLayout from '@/layouts/AccountLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import { requireAuth } from '@/lib/auth-server'

export const metadata = genPageMetadata({ title: 'IRA' })

export default async function Page() {
  // Server-side authentication check - will redirect to login if not authenticated
  await requireAuth('/pricing', true, ['prod_SYVqqJAL42CXD8', 'prod_SYcsC0mCeMEeAu'])

  const account = allInvestments.find((p) => p.slug === 'IRA') as Investments
  const mainContent = coreContent(account)

  return (
    <AccountLayout content={mainContent}>
      <MDXLayoutRenderer code={account.body.code} />
    </AccountLayout>
  )
}

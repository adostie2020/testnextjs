import { requireAuth } from '@/lib/auth-server'
import { customer as customerData } from '@/lib/user/userData'
import Script from 'next/script'
import * as React from 'react'

async function PricingTable() {
  await requireAuth()
  const data = await customerData()
  const res = await fetch('https://bxfyahvadypibeogvuqg.supabase.co/functions/v1/stripe-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ customer_id: data?.stripe_customer_id }),
  })
  if (!res.ok) {
    const errorText = await res.text()
    console.error('Stripe function error:', errorText)
    return <div>Error loading pricing table.</div>
  }
  const { customer_session } = await res.json()
  return (
    <>
      <Script async src="https://js.stripe.com/v3/pricing-table.js"></Script>
      <div
        style={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
        }}
      >
        {React.createElement('stripe-pricing-table', {
          'pricing-table-id': 'prctbl_1RgXDbP9zSvTUviSpZ91JgdN',
          'publishable-key':
            'pk_test_51RcPwvP9zSvTUviS3a5ZvLsNd0gqtZ2HgX4t76aAojWIbyMhE8lh6paTlTC8g2zFkjSxOVEP7jUUIktNTA0N9G0q00xIHbv8lw',
          'customer-session-client-secret': customer_session,
          id: 'pricing',
          style: { display: 'block', width: '100%' },
        })}
      </div>
    </>
  ) // ✅ Remove the extra closing parenthesis
} // ✅ Add the missing closing brace and semicolon

export default PricingTable

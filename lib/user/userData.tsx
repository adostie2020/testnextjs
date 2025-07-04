import { getCurrentUser } from '@/lib/auth-server'
import { createClient } from '@/lib/supabase/server'

interface subscription {
  product_id: string
  status: string
}

interface customer {
  stripe_customer_id: string
}

export const subscription = async (): Promise<subscription | null> => {
  const supabase = await createClient()
  const user = await getCurrentUser()

  if (!user) {
    return null
  }
  console.log(user)
  const { data, error } = await supabase
    .from('subscriptions')
    .select('product_id, status')
    .eq('user_id', user.id)
    .single()
  console.log(data)
  if (!data) {
    console.log('No subscription found for user:', user.id)
  }
  if (error) {
    console.error('Error fetching user data:', error)
    return null
  }
  return data
}

export const customer = async (): Promise<customer | null> => {
  const supabase = await createClient()
  const user = await getCurrentUser()

  if (!user) {
    return null
  }
  console.log('Fetching customer data for user:', user.id)
  const { data, error } = await supabase
    .from('customers')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single()
  if (error) {
    console.error('Error fetching customer data:', error)
    return null
  }

  return { data }
}

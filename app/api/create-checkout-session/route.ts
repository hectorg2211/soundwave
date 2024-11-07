import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/libs/stripe'
import { getUrl } from '@/libs/helpers'
import { createOrRetrieveACustomer } from '@/libs/supabaseAdmin'

export async function POST(request: Request) {
  const { price, quantity = 1, metadata = {} } = await request.json()

  try {
    const supabase = createRouteHandlerClient({
      cookies: cookies,
    })

    const {
      data: { user },
    } = await supabase.auth.getUser()
    const customer = await createOrRetrieveACustomer({ email: user?.email || '', uuid: user?.id || '' })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer,
      line_items: [
        {
          price: price.id,
          quantity,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      subscription_data: {
        trial_from_plan: true,
        metadata,
      },
      success_url: `${getUrl()}/account`,
      cancel_url: `${getUrl()}`,
      metadata,
    })

    return NextResponse.json({ sessionId: session.id })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error)
    return NextResponse.json('Internal error', { status: 500 })
  }
}

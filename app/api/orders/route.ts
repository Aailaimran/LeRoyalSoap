import { Resend } from 'resend'

export const runtime = 'nodejs'

const getResend = () => new Resend(process.env.RESEND_API_KEY || 'missing-api-key')

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export async function POST(request: Request) {
  try {
    const order = await request.json()
    const { customer, items, subtotal, shipping, total } = order ?? {}

    if (!customer?.name || !customer?.email || !customer?.phone || !customer?.city || !customer?.address || !Array.isArray(items) || items.length === 0) {
      return Response.json({ error: 'Please provide complete order details.' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY || !process.env.SEND_MAIL_FROM || !process.env.SEND_MAIL_TO) {
      return Response.json({ error: 'Email service is not configured.' }, { status: 500 })
    }

    const orderId = `LR-${Date.now().toString(36).toUpperCase()}`
    const itemRows = items.map((item: { name: string; details?: string; quantity: number; price: number }) => `<tr><td style="padding:10px 0;border-bottom:1px solid #eee"><strong>${escapeHtml(item.name)}</strong>${item.details ? `<br><small>${escapeHtml(item.details)}</small>` : ''}</td><td style="padding:10px 0;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td><td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right">Rs. ${Number(item.price * item.quantity).toLocaleString('en-PK')}</td></tr>`).join('')
    const html = `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#30291f"><h1>New Le Royal Order</h1><p>Order reference: <strong>${orderId}</strong></p><h2>Customer details</h2><p><strong>${escapeHtml(customer.name)}</strong><br>${escapeHtml(customer.email)}<br>${escapeHtml(customer.phone)}<br>${escapeHtml(customer.address)}, ${escapeHtml(customer.city)}${customer.postalCode ? `, ${escapeHtml(customer.postalCode)}` : ''}<br>Payment: ${escapeHtml(customer.payment || 'Cash on Delivery')}</p><h2>Order details</h2><table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left">Item</th><th>Qty</th><th style="text-align:right">Price</th></tr></thead><tbody>${itemRows}</tbody></table><p style="text-align:right;margin-top:20px">Subtotal: Rs. ${Number(subtotal).toLocaleString('en-PK')}<br>Shipping: ${Number(shipping) === 0 ? 'Complimentary' : `Rs. ${Number(shipping).toLocaleString('en-PK')}`}<br><strong>Total: Rs. ${Number(total).toLocaleString('en-PK')}</strong></p></div>`

    const { data, error } = await getResend().emails.send({
      from: process.env.SEND_MAIL_FROM,
      to: [process.env.SEND_MAIL_TO],
      replyTo: customer.email,
      subject: `New Le Royal order ${orderId} — ${customer.name}`,
      html,
    }, { idempotencyKey: `order/${orderId}` })

    if (error) {
      console.error('[v0] Resend order email failed:', error)
      return Response.json({ error: 'Unable to send order email.' }, { status: 502 })
    }

    return Response.json({ orderId, emailId: data?.id })
  } catch (error) {
    console.error('[v0] Order email request failed:', error)
    return Response.json({ error: 'Invalid order request.' }, { status: 400 })
  }
}

export async function GET() {
  return Response.json({ error: 'Method not allowed.' }, { status: 405, headers: { Allow: 'POST' } })
}

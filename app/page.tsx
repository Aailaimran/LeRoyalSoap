'use client'

import { useEffect, useMemo, useState } from 'react'
import { getProductUrl, money, products, type Product, whatsappUrl } from '@/lib/products'

const faqs = [
  ['How do I choose the right soap?', 'Start with the ritual you want to create. Charcoal and neem feel fresh and purifying, while rice, baby and flax blends are gentle everyday choices.'],
  ['Can I order multiple soaps together?', 'Absolutely. Add as many varieties as you like to your cart and we will pack them together as one order.'],
  ['Do you deliver nationwide?', 'Yes, Le Royal delivers across Pakistan. Shipping is a flat Rs. 250, with free delivery on orders above Rs. 3,000.'],
  ['What payment methods do you accept?', 'We currently offer Cash on Delivery for a simple, comfortable ordering experience.'],
  ['Can I order through WhatsApp?', 'Yes. Send us your chosen soaps and delivery details through WhatsApp and our team will help you complete the order.'],
]

type CartItem = { product: Product; quantity: number }

export default function Page() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [orderSubmitted, setOrderSubmitted] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem('leroyal_cart')
    if (!saved) return
    try {
      const parsed = JSON.parse(saved) as CartItem[]
      setCart(parsed.filter((item) => products.some((product) => product.id === item.product.id)))
    } catch {
      window.localStorage.removeItem('leroyal_cart')
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('leroyal_cart', JSON.stringify(cart))
  }, [cart])

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart])
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [cart])
  const shipping = subtotal >= 3000 || subtotal === 0 ? 0 : 250

  function addToCart(product: (typeof products)[number]) {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id)
      return existing ? current.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { product, quantity: 1 }]
    })
    setToast(`${product.displayName} added to your ritual`)
    setDrawerOpen(true)
    window.setTimeout(() => setToast(''), 2600)
  }

  function changeQuantity(id: string, delta: number) {
    setCart((current) => current.flatMap((item) => item.product.id === id ? (item.quantity + delta > 0 ? [{ ...item, quantity: item.quantity + delta }] : []) : [item]))
  }

  return (
    <main className="site-shell">
      <div className="announcement">Complimentary delivery on orders above Rs. 3,000 <span>·</span> Made for everyday rituals</div>
      <header className="site-header">
        <a className="brand brand-logo" href="#top" aria-label="Le Royal home"><img src="/logo.jpeg" alt="Le Royal Handmade Soap" /></a>
        <nav className={`main-nav ${mobileOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <a href="#top" onClick={() => setMobileOpen(false)}>Home</a>
          <a href="#products" onClick={() => setMobileOpen(false)}>Products</a>
          <a href="#about" onClick={() => setMobileOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
        </nav>
        <div className="header-actions">
          <button className="cart-trigger" onClick={() => setDrawerOpen(true)} aria-label={`Open cart with ${cartCount} items`}><span className="bag-icon">▢</span><span>Cart</span><b>{cartCount}</b></button>
          <button className="menu-trigger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu"><span /><span /></button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy"><p className="eyebrow">THE EVERYDAY RITUAL, REFINED</p><h1>Care that feels<br /><em>beautifully</em> natural.</h1><p className="hero-text">Ingredient-inspired handmade soaps created to make your everyday cleanse feel a little more considered.</p><a className="button button-dark" href="#products">Explore the collection <span>↗</span></a><div className="hero-note"><span className="seal">✦</span><span>Thoughtfully made<br />for daily use</span></div></div>
        <div className="hero-art"><div className="art-glow" /><div className="hero-soap hero-soap-back" /><div className="hero-soap hero-soap-front"><span>LE<br />ROYAL</span></div><div className="hero-leaf leaf-one" /><div className="hero-leaf leaf-two" /><p>CHARCOAL · RICE · NEEM · COFFEE</p></div>
      </section>

      <section className="marquee" aria-label="Brand values"><span>SMALL BATCH</span><i>✦</i><span>EVERYDAY CARE</span><i>✦</i><span>INGREDIENT INSPIRED</span><i>✦</i><span>SMALL BATCH</span></section>

      <section className="collection section-wrap" id="products"><div className="section-heading"><div><p className="eyebrow">A SOAP FOR EVERY RITUAL</p><h2>Our collection</h2></div><p>Discover considered blends for clean, comfortable skin and a fresher everyday start.</p></div><div className="product-grid">{products.map((product, index) => <article className="product-card" key={product.id}><a className={`product-image ${product.tone}`} href={getProductUrl(product)} aria-label={`View details for ${product.displayName}`}><img src={product.image} alt={`${product.displayName} handmade soap`} loading={index > 2 ? 'lazy' : 'eager'} /><span className="product-number">0{index + 1}</span></a><div className="product-info"><p className="product-category">{product.category}</p><h3>{product.displayName}</h3><p>{product.description}</p><div className="product-footer"><strong>{money(product.price)}</strong><button onClick={() => addToCart(product)}>Add to cart <span>+</span></button></div></div></article>)}</div></section>

      <section className="why-section"><div className="section-wrap"><div className="section-heading centered"><div><p className="eyebrow">THE LE ROYAL WAY</p><h2>Simple care, <em>well considered.</em></h2></div></div><div className="benefit-grid"><div><span>01</span><h3>Thoughtfully selected</h3><p>Ingredient-inspired blends chosen for a calm, comfortable cleanse.</p></div><div><span>02</span><h3>Everyday gentle care</h3><p>Good soap should be a pleasure to use, morning after morning.</p></div><div><span>03</span><h3>Distinctive rituals</h3><p>From charcoal to citrus, find a bar with its own character.</p></div><div><span>04</span><h3>Fresh experience</h3><p>Clean, refined and made to leave you feeling renewed.</p></div></div></div></section>

      <section className="about-section section-wrap" id="about"><div className="about-image"><div className="about-stamp">LR<br /><small>EST. 2024</small></div></div><div className="about-copy"><p className="eyebrow">A LITTLE ABOUT US</p><h2>Made for the small moments that make up your day.</h2><p>Le Royal is a handmade soap collection inspired by the ingredients we return to again and again — charcoal, rice, neem, coffee, citrus and more. Each bar is created to bring a sense of ease and refinement to the everyday ritual of cleansing.</p><p>Nothing overcomplicated. Just considered care, a beautiful lather, and a fresher feeling to carry with you.</p><a className="text-link" href="#contact">Get to know Le Royal <span>↗</span></a></div></section>

      <section className="faq-section section-wrap"><div className="section-heading"><div><p className="eyebrow">A FEW GOOD QUESTIONS</p><h2>FAQ</h2></div><p>Everything you need to know before beginning your next ritual.</p></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className="faq-item" key={question}><button aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><b>{openFaq === index ? '−' : '+'}</b></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></section>

      <section className="contact-section" id="contact"><div className="section-wrap contact-inner"><div><p className="eyebrow">LET'S KEEP IN TOUCH</p><h2>Your next ritual<br /><em>starts here.</em></h2></div><div className="contact-details"><p>For questions, recommendations or WhatsApp orders, we would love to hear from you.</p><a href="mailto:hello@leroyal.pk">hello@leroyal.pk <span>↗</span></a><a href="https://wa.me/923334515719" target="_blank" rel="noreferrer">WhatsApp us <span>↗</span></a><div className="socials"><a href="#contact">Instagram</a><a href="#contact">Facebook</a></div></div></div></section>

      <footer><div className="footer-top"><a className="brand brand-light" href="#top"><span>LE ROYAL</span><small>HANDMADE SOAP</small></a><p>Refined care for a fresher<br />everyday ritual.</p><div className="footer-links"><a href="#products">Products</a><a href="#about">About</a><a href="#contact">Contact</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Le Royal. All rights reserved.</span><span>Made with care, for everyday.</span></div></footer>

      {toast && <div className="toast" role="status">{toast}<span>✓</span></div>}
      {drawerOpen && <div className="drawer-overlay" onClick={() => setDrawerOpen(false)} />}
      <aside className={`cart-drawer ${drawerOpen ? 'is-open' : ''}`} aria-label="Shopping cart"><div className="drawer-header"><div><p className="eyebrow">YOUR SELECTION</p><h2>Your cart <span>({cartCount})</span></h2></div><button onClick={() => setDrawerOpen(false)} aria-label="Close cart">×</button></div>{cart.length === 0 ? <div className="empty-cart"><div className="empty-mark">✦</div><h3>Your cart is empty.</h3><p>Find a soap to make your next ritual feel special.</p><button className="button button-dark" onClick={() => { setDrawerOpen(false); document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' }) }}>Continue shopping</button></div> : <><div className="cart-items">{cart.map(({ product, quantity }) => <div className="cart-item" key={product.id}><img src={product.image} alt="" /><div><h3>{product.displayName}</h3><p>{money(product.price)}</p><div className="stepper"><button onClick={() => changeQuantity(product.id, -1)} aria-label={`Decrease ${product.displayName}`}>−</button><span>{quantity}</span><button onClick={() => changeQuantity(product.id, 1)} aria-label={`Increase ${product.displayName}`}>+</button></div></div><strong>{money(product.price * quantity)}</strong></div>)}</div><div className="drawer-footer"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>{shipping === 0 ? 'Complimentary delivery applied.' : 'Delivery calculated at checkout.'}</p><button className="button button-dark checkout-button" onClick={() => { setDrawerOpen(false); setCheckoutOpen(true) }}>Proceed to checkout <span>↗</span></button><button className="clear-button" onClick={() => setCart([])}>Clear cart</button></div></>}</aside>
      {checkoutOpen && <div className="checkout-overlay" role="dialog" aria-modal="true" aria-labelledby="checkout-title"><div className="checkout-modal"><button className="checkout-close" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout">×</button>{orderSubmitted ? <div className="checkout-success"><p className="eyebrow">ORDER RECEIVED</p><h2 id="checkout-title">Thank you for choosing Le Royal.</h2><p>Your order request has been prepared. We will contact you shortly to confirm delivery and Cash on Delivery details.</p><button className="button button-dark" onClick={() => { setCheckoutOpen(false); setOrderSubmitted(false); setCart([]) }}>Back to home</button></div> : <form onSubmit={(event) => { event.preventDefault(); setOrderSubmitted(true) }}><p className="eyebrow">COMPLETE YOUR ORDER</p><h2 id="checkout-title">Your ritual, delivered.</h2><div className="checkout-fields"><label>Full name<input required name="name" /></label><label>Email<input required type="email" name="email" /></label><label>Phone<input required type="tel" name="phone" /></label><label>City<input required name="city" /></label><label className="field-wide">Full address<textarea required name="address" rows={3} /></label><label>Postal code<input name="postalCode" /></label><label>Payment method<select name="payment"><option>Cash on Delivery</option></select></label></div><div className="checkout-summary"><span>{cartCount} item{cartCount === 1 ? '' : 's'}</span><strong>{money(subtotal + shipping)}</strong></div><button className="button button-dark" type="submit">Place order <span>↗</span></button><p className="checkout-note">Order requests are confirmed by WhatsApp until email service is connected.</p></form>}</div></div>}
    </main>
  )
}

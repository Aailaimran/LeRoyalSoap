'use client'

import { useMemo, useState } from 'react'

const products = [
  { id: 'black-velvet', name: 'Le Royal Charcoal', displayName: 'Black Velvet', category: 'Charcoal Soap', price: 1500, description: 'Charcoal-inspired cleansing soap for a fresh everyday routine.', image: 'https://images.unsplash.com/photo-1607006483225-5c98a2c0c5bd?auto=format&fit=crop&w=900&q=85', tone: 'dark' },
  { id: 'rice-glow', name: 'Le Royal Rice', displayName: 'Rice Glow', category: 'Rice Soap', price: 1500, description: 'Gentle rice-inspired care for smooth, soft-feeling skin.', image: 'https://images.unsplash.com/photo-1608181831718-c9a9c6d7b3e1?auto=format&fit=crop&w=900&q=85', tone: 'rice' },
  { id: 'herbal-pure', name: 'Le Royal Neem', displayName: 'Herbal Pure', category: 'Neem Soap', price: 1500, description: 'A clean daily ritual with a fresh, botanical character.', image: 'https://images.unsplash.com/photo-1605264965141-3b7c8b54bfa0?auto=format&fit=crop&w=900&q=85', tone: 'green' },
  { id: 'beet-glow', name: 'Le Royal Beetroot', displayName: 'Beet Glow', category: 'Beetroot Soap', price: 1500, description: 'A soft, fresh cleanse with a naturally vibrant spirit.', image: 'https://images.unsplash.com/photo-1607006483225-5c98a2c0c5bd?auto=format&fit=crop&w=900&q=85', tone: 'rose' },
  { id: 'mocha-bliss', name: 'Le Royal Coffee', displayName: 'Mocha Bliss', category: 'Coffee Soap', price: 1500, description: 'Rich, energizing lather for a beautifully fresh start.', image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85', tone: 'coffee' },
  { id: 'blue-bliss', name: 'Le Royal Moroccan Blue', displayName: 'Blue Bliss', category: 'Moroccan Soap', price: 1500, description: 'Smooth, cool character for a comfortable daily wash.', image: 'https://images.unsplash.com/photo-1605264965141-3b7c8b54bfa0?auto=format&fit=crop&w=900&q=85', tone: 'blue' },
  { id: 'silk-grain', name: 'Le Royal Flax & Rice', displayName: 'Silk Grain', category: 'Flax & Rice Soap', price: 1500, description: 'A gentle blend that leaves skin soft, clean and fresh.', image: 'https://images.unsplash.com/photo-1608181831718-c9a9c6d7b3e1?auto=format&fit=crop&w=900&q=85', tone: 'wheat' },
  { id: 'tender-touch', name: 'Le Royal Baby', displayName: 'Tender Touch', category: 'Baby Soap', price: 1500, description: 'Mild, soft lather made for delicate everyday care.', image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=85', tone: 'cream' },
  { id: 'citrus-herb', name: 'Le Royal Lemon Neem', displayName: 'Citrus Herb', category: 'Lemon Neem Soap', price: 1500, description: 'A bright lemon-and-neem blend for a refreshing wash.', image: 'https://images.unsplash.com/photo-1605264965141-3b7c8b54bfa0?auto=format&fit=crop&w=900&q=85', tone: 'citrus' },
]

const faqs = [
  ['How do I choose the right soap?', 'Start with the ritual you want to create. Charcoal and neem feel fresh and purifying, while rice, baby and flax blends are gentle everyday choices.'],
  ['Can I order multiple soaps together?', 'Absolutely. Add as many varieties as you like to your cart and we will pack them together as one order.'],
  ['Do you deliver nationwide?', 'Yes, Le Royal delivers across Pakistan. Shipping is a flat Rs. 250, with free delivery on orders above Rs. 3,000.'],
  ['What payment methods do you accept?', 'We currently offer Cash on Delivery for a simple, comfortable ordering experience.'],
  ['Can I order through WhatsApp?', 'Yes. Send us your chosen soaps and delivery details through WhatsApp and our team will help you complete the order.'],
]

const money = (amount: number) => `Rs. ${amount.toLocaleString('en-PK')}`

type CartItem = { product: (typeof products)[number]; quantity: number }

export default function Page() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

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

      <section className="collection section-wrap" id="products"><div className="section-heading"><div><p className="eyebrow">A SOAP FOR EVERY RITUAL</p><h2>Our collection</h2></div><p>Discover considered blends for clean, comfortable skin and a fresher everyday start.</p></div><div className="product-grid">{products.map((product, index) => <article className="product-card" key={product.id}><a className={`product-image ${product.tone}`} href={`#${product.id}`} aria-label={`View details for ${product.displayName}`}><img src={product.image} alt={`${product.displayName} handmade soap`} loading={index > 2 ? 'lazy' : 'eager'} /><span className="product-number">0{index + 1}</span></a><div className="product-info"><p className="product-category">{product.category}</p><h3>{product.displayName}</h3><p>{product.description}</p><div className="product-footer"><strong>{money(product.price)}</strong><button onClick={() => addToCart(product)}>Add to cart <span>+</span></button></div></div></article>)}</div></section>

      <section className="why-section"><div className="section-wrap"><div className="section-heading centered"><div><p className="eyebrow">THE LE ROYAL WAY</p><h2>Simple care, <em>well considered.</em></h2></div></div><div className="benefit-grid"><div><span>01</span><h3>Thoughtfully selected</h3><p>Ingredient-inspired blends chosen for a calm, comfortable cleanse.</p></div><div><span>02</span><h3>Everyday gentle care</h3><p>Good soap should be a pleasure to use, morning after morning.</p></div><div><span>03</span><h3>Distinctive rituals</h3><p>From charcoal to citrus, find a bar with its own character.</p></div><div><span>04</span><h3>Fresh experience</h3><p>Clean, refined and made to leave you feeling renewed.</p></div></div></div></section>

      <section className="about-section section-wrap" id="about"><div className="about-image"><div className="about-stamp">LR<br /><small>EST. 2024</small></div></div><div className="about-copy"><p className="eyebrow">A LITTLE ABOUT US</p><h2>Made for the small moments that make up your day.</h2><p>Le Royal is a handmade soap collection inspired by the ingredients we return to again and again — charcoal, rice, neem, coffee, citrus and more. Each bar is created to bring a sense of ease and refinement to the everyday ritual of cleansing.</p><p>Nothing overcomplicated. Just considered care, a beautiful lather, and a fresher feeling to carry with you.</p><a className="text-link" href="#contact">Get to know Le Royal <span>↗</span></a></div></section>

      <section className="faq-section section-wrap"><div className="section-heading"><div><p className="eyebrow">A FEW GOOD QUESTIONS</p><h2>FAQ</h2></div><p>Everything you need to know before beginning your next ritual.</p></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className="faq-item" key={question}><button aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><b>{openFaq === index ? '−' : '+'}</b></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></section>

      <section className="contact-section" id="contact"><div className="section-wrap contact-inner"><div><p className="eyebrow">LET'S KEEP IN TOUCH</p><h2>Your next ritual<br /><em>starts here.</em></h2></div><div className="contact-details"><p>For questions, recommendations or WhatsApp orders, we would love to hear from you.</p><a href="mailto:hello@leroyal.pk">hello@leroyal.pk <span>↗</span></a><a href="https://wa.me/923334515719" target="_blank" rel="noreferrer">WhatsApp us <span>↗</span></a><div className="socials"><a href="#contact">Instagram</a><a href="#contact">Facebook</a></div></div></div></section>

      <footer><div className="footer-top"><a className="brand brand-light" href="#top"><span>LE ROYAL</span><small>HANDMADE SOAP</small></a><p>Refined care for a fresher<br />everyday ritual.</p><div className="footer-links"><a href="#products">Products</a><a href="#about">About</a><a href="#contact">Contact</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Le Royal. All rights reserved.</span><span>Made with care, for everyday.</span></div></footer>

      {toast && <div className="toast" role="status">{toast}<span>✓</span></div>}
      {drawerOpen && <div className="drawer-overlay" onClick={() => setDrawerOpen(false)} />}
      <aside className={`cart-drawer ${drawerOpen ? 'is-open' : ''}`} aria-label="Shopping cart"><div className="drawer-header"><div><p className="eyebrow">YOUR SELECTION</p><h2>Your cart <span>({cartCount})</span></h2></div><button onClick={() => setDrawerOpen(false)} aria-label="Close cart">×</button></div>{cart.length === 0 ? <div className="empty-cart"><div className="empty-mark">✦</div><h3>Your cart is empty.</h3><p>Find a soap to make your next ritual feel special.</p><button className="button button-dark" onClick={() => { setDrawerOpen(false); document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' }) }}>Continue shopping</button></div> : <><div className="cart-items">{cart.map(({ product, quantity }) => <div className="cart-item" key={product.id}><img src={product.image} alt="" /><div><h3>{product.displayName}</h3><p>{money(product.price)}</p><div className="stepper"><button onClick={() => changeQuantity(product.id, -1)} aria-label={`Decrease ${product.displayName}`}>−</button><span>{quantity}</span><button onClick={() => changeQuantity(product.id, 1)} aria-label={`Increase ${product.displayName}`}>+</button></div></div><strong>{money(product.price * quantity)}</strong></div>)}</div><div className="drawer-footer"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>{shipping === 0 ? 'Complimentary delivery applied.' : 'Delivery calculated at checkout.'}</p><button className="button button-dark checkout-button" onClick={() => setToast('Checkout is ready to connect when your order endpoint is enabled.')}>Proceed to checkout <span>↗</span></button><button className="clear-button" onClick={() => setCart([])}>Clear cart</button></div></>}</aside>
    </main>
  )
}

'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { careCopy, genericUsage, getProductUrl, money, products, type Product, whatsappUrl } from '@/lib/products'

export default function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('Description')
  const [cartMessage, setCartMessage] = useState('')
  const related = useMemo(() => products.filter((item) => item.active && item.id !== product.id).slice(0, 3), [product.id])
  const tabs = ['Description', 'Benefits', 'How to Use', 'Ingredients', 'Care']

  function addToCart() {
    const current = JSON.parse(window.localStorage.getItem('leroyal_cart') || '[]') as { id: string; quantity: number }[]
    const existing = current.find((item) => item.id === product.id)
    const next = existing ? current.map((item) => item.id === product.id ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) } : item) : [...current, { id: product.id, quantity }]
    window.localStorage.setItem('leroyal_cart', JSON.stringify(next))
    setCartMessage(`${product.displayName} added to your cart.`)
    window.setTimeout(() => setCartMessage(''), 2600)
  }

  const content = activeTab === 'Description' ? <p>{product.longDescription}</p> : activeTab === 'Benefits' ? <ul>{product.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul> : activeTab === 'How to Use' ? <p>{product.usage || genericUsage}</p> : activeTab === 'Ingredients' ? <p>{product.ingredients || 'Full ingredient list coming soon.'}</p> : <p>{careCopy}</p>

  return <main className="product-detail-page">
    <header className="site-header product-header"><Link className="brand brand-logo" href="/" aria-label="Le Royal home"><img src="/logo.jpeg" alt="Le Royal Handmade Soap" /></Link><nav className="main-nav" aria-label="Product navigation"><Link href="/">Home</Link><Link href="/#products">Products</Link><Link href="/#about">About</Link><Link href="/#contact">Contact</Link></nav><a className="product-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp us ↗</a></header>
    <div className="product-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/#products">Products</Link><span>/</span><span>{product.displayName}</span></div>
    <section className="product-main section-wrap"><div className={`detail-image ${product.tone}`}><img src={product.image} alt={`${product.name} — ${product.displayName} handmade soap`} /></div><div className="detail-info"><p className="eyebrow">{product.category}</p><h1>{product.displayName}</h1><h2>{product.name}</h2><div className="detail-price">{money(product.price)}</div><p className="detail-short">{product.description}</p><div className="skin-tags">{product.skinFeel.map((tag) => <span key={tag}>{tag}</span>)}</div><p className={product.stock > 0 ? 'stock in-stock' : 'stock'}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p><div className="detail-actions"><div className="quantity-control"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button><span>{quantity}</span><button onClick={() => setQuantity((value) => Math.min(product.stock, value + 1))} aria-label="Increase quantity">+</button></div><button className="button button-dark" onClick={addToCart} disabled={product.stock <= 0}>Add to cart <span>+</span></button></div>{cartMessage && <p className="detail-toast" role="status">{cartMessage}</p>}</div></section>
    <section className="product-tabs section-wrap" aria-label="Product information"><div className="tab-list" role="tablist">{tabs.map((tab) => <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)} role="tab" aria-selected={activeTab === tab}>{tab}</button>)}</div><div className="tab-content">{content}</div></section>
    <section className="related section-wrap"><div className="section-heading"><div><p className="eyebrow">CONTINUE EXPLORING</p><h2>You may also like</h2></div></div><div className="product-grid">{related.map((item) => <article className="product-card" key={item.id}><Link className={`product-image ${item.tone}`} href={getProductUrl(item)}><img src={item.image} alt={`${item.displayName} handmade soap`} /></Link><div className="product-info"><p className="product-category">{item.category}</p><h3>{item.displayName}</h3><div className="product-footer"><strong>{money(item.price)}</strong><Link href={getProductUrl(item)}>View details ↗</Link></div></div></article>)}</div><Link className="back-collection" href="/#products">← Back to collection</Link></section>
    <footer><div className="footer-top"><Link className="brand brand-light" href="/"><span>LE ROYAL</span><small>HANDMADE SOAP</small></Link><p>Refined care for a fresher<br />everyday ritual.</p></div></footer>
  </main>
}

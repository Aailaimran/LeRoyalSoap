import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProductDetail from '@/components/product-detail'
import { getProductBySlug, products } from '@/lib/products'

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Product not found | Le Royal' }
  return { title: `${product.displayName} | ${product.name}`, description: product.description, openGraph: { title: `${product.displayName} | ${product.name}`, description: product.description, images: [product.image] } }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return <main className="not-found"><p className="eyebrow">LE ROYAL</p><h1>Product not found.</h1><Link className="button button-dark" href="/#products">Back to collection</Link></main>
  return <ProductDetail product={product} />
}

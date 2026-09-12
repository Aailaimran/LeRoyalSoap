export type Product = {
  id: string
  slug: string
  name: string
  displayName: string
  category: string
  description: string
  longDescription: string
  price: number
  image: string
  gallery?: string[]
  ingredients?: string | null
  benefits: string[]
  usage?: string
  skinFeel: string[]
  stock: number
  active: boolean
  tone: string
}

const soapImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Sep%205%2C%202026%2C%2001_43_09%20AM-Pa6bKKaDPbR0JzHH1HZe2ZDq1gzboM.png'

export const products: Product[] = [
  { id: 'black-velvet', slug: 'black-velvet', name: 'Le Royal Charcoal', displayName: 'Black Velvet', category: 'Charcoal Soap', description: 'Charcoal-inspired cleansing soap for a fresh everyday routine.', longDescription: 'A rich, distinctive bar with a clean character and a beautifully grounded lather for everyday cleansing.', price: 1500, image: soapImage, benefits: ['Everyday cleansing', 'Removes surface dirt and buildup', 'Leaves skin feeling refreshed', 'Rich, satisfying lather'], skinFeel: ['Bold', 'Clean', 'Fresh'], stock: 20, active: true, tone: 'dark' },
  { id: 'rice-glow', slug: 'rice-glow', name: 'Le Royal Rice', displayName: 'Rice Glow', category: 'Rice Soap', description: 'Gentle rice-inspired care for smooth, soft-feeling skin.', longDescription: 'A soft, comforting bar designed for a gentle daily ritual with a clean, calm finish.', price: 1500, image: 'https://images.unsplash.com/photo-1608181831718-c9a9c6d7b3e1?auto=format&fit=crop&w=900&q=85', benefits: ['Gentle everyday wash', 'Comfortable, soft-feeling finish', 'Easy to use morning or evening', 'Creamy lather'], skinFeel: ['Soft', 'Gentle', 'Clean'], stock: 20, active: true, tone: 'rice' },
  { id: 'herbal-pure', slug: 'herbal-pure', name: 'Le Royal Neem', displayName: 'Herbal Pure', category: 'Neem Soap', description: 'A clean daily ritual with a fresh, botanical character.', longDescription: 'A fresh botanical-inspired bar that brings a bright, uncomplicated feel to the daily cleanse.', price: 1500, image: 'https://images.unsplash.com/photo-1605264965141-3b7c8b54bfa0?auto=format&fit=crop&w=900&q=85', benefits: ['Fresh everyday cleansing', 'Botanical-inspired character', 'Leaves skin feeling comfortable', 'Light, clean lather'], skinFeel: ['Herbal', 'Fresh', 'Clean'], stock: 20, active: true, tone: 'green' },
  { id: 'beet-glow', slug: 'beet-glow', name: 'Le Royal Beetroot', displayName: 'Beet Glow', category: 'Beetroot Soap', description: 'A soft, fresh cleanse with a naturally vibrant spirit.', longDescription: 'A vibrant-looking bar with a soft, fresh character for a bright everyday ritual.', price: 1500, image: soapImage, benefits: ['Fresh everyday cleanse', 'Smooth-feeling lather', 'Comfortable daily use', 'Distinctive, vibrant character'], skinFeel: ['Fresh', 'Vibrant', 'Smooth'], stock: 20, active: true, tone: 'rose' },
  { id: 'mocha-bliss', slug: 'mocha-bliss', name: 'Le Royal Coffee', displayName: 'Mocha Bliss', category: 'Coffee Soap', description: 'Rich, energizing lather for a beautifully fresh start.', longDescription: 'A warm coffee-inspired bar with a rich lather and a bold character for your morning ritual.', price: 1500, image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85', benefits: ['Rich daily lather', 'Warm, energizing character', 'Leaves skin feeling refreshed', 'A satisfying morning ritual'], skinFeel: ['Warm', 'Energizing', 'Bold'], stock: 20, active: true, tone: 'coffee' },
  { id: 'blue-bliss', slug: 'blue-bliss', name: 'Le Royal Moroccan Blue', displayName: 'Blue Bliss', category: 'Moroccan Blue Soap', description: 'Smooth, cool character for a comfortable daily wash.', longDescription: 'A distinctive blue bar with a cool, refreshing character and an easy everyday lather.', price: 1500, image: 'https://images.unsplash.com/photo-1605264965141-3b7c8b54bfa0?auto=format&fit=crop&w=900&q=85', benefits: ['Comfortable daily cleansing', 'Cool, refreshing character', 'Smooth-feeling lather', 'Distinctive ritual experience'], skinFeel: ['Cool', 'Refreshing', 'Distinctive'], stock: 20, active: true, tone: 'blue' },
  { id: 'silk-grain', slug: 'silk-grain', name: 'Le Royal Flax & Rice', displayName: 'Silk Grain', category: 'Flax & Rice Soap', description: 'A gentle blend that leaves skin soft, clean and fresh.', longDescription: 'A balanced, gentle blend for a soft-feeling cleanse that fits beautifully into everyday care.', price: 1500, image: 'https://images.unsplash.com/photo-1608181831718-c9a9c6d7b3e1?auto=format&fit=crop&w=900&q=85', benefits: ['Gentle daily cleansing', 'Soft-feeling finish', 'Balanced character', 'Comfortable lather'], skinFeel: ['Balanced', 'Soft', 'Gentle'], stock: 20, active: true, tone: 'wheat' },
  { id: 'tender-touch', slug: 'tender-touch', name: 'Le Royal Gentle', displayName: 'Tender Touch', category: 'Gentle Soap', description: 'Mild, soft lather made for delicate everyday care.', longDescription: 'A mild, uncomplicated bar made for a soft and comfortable everyday washing ritual.', price: 1500, image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=85', benefits: ['Mild everyday cleansing', 'Soft, comfortable lather', 'Simple daily care', 'Gentle character'], skinFeel: ['Soft', 'Mild', 'Caring'], stock: 20, active: true, tone: 'cream' },
  { id: 'citrus-herb', slug: 'citrus-herb', name: 'Le Royal Lemon Neem', displayName: 'Citrus Herb', category: 'Lemon Neem Soap', description: 'A bright lemon-and-neem blend for a refreshing wash.', longDescription: 'A bright citrus-herbal bar that brings a refreshing lift to the everyday cleanse.', price: 1500, image: 'https://images.unsplash.com/photo-1605264965141-3b7c8b54bfa0?auto=format&fit=crop&w=900&q=85', benefits: ['Fresh daily cleansing', 'Bright citrus character', 'Herbal-inspired finish', 'Refreshing lather'], skinFeel: ['Citrusy', 'Fresh', 'Herbal'], stock: 20, active: true, tone: 'citrus' },
]

export const getProductBySlug = (slug: string) => products.find((product) => product.slug === slug && product.active)
export const getProductUrl = (product: Product) => `/products/${product.slug}`
export const money = (amount: number) => `Rs. ${amount.toLocaleString('en-PK')}`
export const genericUsage = 'Wet the soap and work into a lather with water. Gently cleanse the skin, then rinse thoroughly. Allow the soap to dry between uses.'
export const careCopy = 'Keep the soap in a dry, well-drained place between uses to help maintain its shape and texture.'
export const whatsappUrl = 'https://wa.me/923334515719'

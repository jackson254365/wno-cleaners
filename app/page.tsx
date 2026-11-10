'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleAlert,
  ClipboardCheck,
  Droplets,
  GraduationCap,
  HandHeart,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Minus,
  PackageCheck,
  Phone,
  Plus,
  Recycle,
  Send,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Trash2,
  TriangleAlert,
  Truck,
  Users,
  X,
  Zap,
} from 'lucide-react'

type Product = {
  id: number
  name: string
  category: string
  price: number
  description: string
  color: string
  icon: typeof Trash2
}

const products: Product[] = [
  { id: 1, name: 'Smart sorting bin', category: 'Waste tools', price: 1850, description: 'Two-compartment bin for easy home sorting.', color: 'mint', icon: Trash2 },
  { id: 2, name: 'Heavy-duty trash bags', category: 'Waste tools', price: 350, description: 'Pack of 20 leak-resistant black bags.', color: 'blue', icon: PackageCheck },
  { id: 3, name: 'Reusable cleaning gloves', category: 'Sanitary care', price: 280, description: 'Durable, comfortable protection for every clean-up.', color: 'yellow', icon: HandHeart },
  { id: 4, name: 'PureFlow tap filter', category: 'Water care', price: 2400, description: 'Household filtration for better-tasting water.', color: 'sky', icon: Droplets },
  { id: 5, name: 'Chlorine water tabs', category: 'Water care', price: 520, description: 'Safe treatment for 50 litres of water.', color: 'aqua', icon: ShieldCheck },
  { id: 6, name: 'Soft hand towels', category: 'Sanitary care', price: 600, description: 'Pack of 4 washable cotton hand towels.', color: 'peach', icon: Sparkles },
]

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Shop', href: '#shop' },
  { label: 'Learn', href: '#learn' },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cart, setCart] = useState<Record<number, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All products')

  const cartItems = useMemo(
    () => products.filter((product) => cart[product.id]).map((product) => ({ ...product, quantity: cart[product.id] })),
    [cart],
  )
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const filteredProducts = activeCategory === 'All products' ? products : products.filter((product) => product.category === activeCategory)

  function updateCart(id: number, change: number) {
    setCart((current) => {
      const next = Math.max(0, (current[id] ?? 0) + change)
      const updated = { ...current }
      if (next === 0) delete updated[id]
      else updated[id] = next
      return updated
    })
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <main className="site-shell">
      <div className="top-strip"><span><Zap size={14} /> Same-day collection in selected areas</span><span className="top-strip-location"><MapPin size={14} /> Serving homes, schools & local businesses</span></div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Wild N out cleaners home">
          <span className="brand-mark"><span className="mark-dot dot-one" /><span className="mark-dot dot-two" /><span className="mark-dot dot-three" /><Trash2 size={19} /></span>
          <span><strong>Wild N out</strong><small>cleaners</small></span>
        </a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="header-actions">
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${cartCount} items`}><ShoppingBag size={18} /><span>Cart</span>{cartCount > 0 && <b>{cartCount}</b>}</button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> Cleaner places. Healthier lives.</div>
          <h1>Good waste habits make <em>great</em> communities.</h1>
          <p>Wild N out cleaners makes everyday waste management simple, reliable, and better for everyone — from your doorstep to the whole neighborhood.</p>
          <div className="hero-buttons"><button className="button button-primary" onClick={() => scrollTo('services')}>Request a service <ArrowRight size={17} /></button><button className="text-button" onClick={() => scrollTo('learn')}>Explore the guide <span>↗</span></button></div>
          <div className="trust-row"><div className="avatar-stack"><span>W</span><span>N</span><span>O</span></div><span><strong>Trusted by 120+ households</strong><small>and growing every week</small></span></div>
        </div>
        <div className="hero-art" aria-label="Illustration of a clean neighborhood" role="img">
          <div className="sun" /><div className="hill hill-back" /><div className="hill hill-front" />
          <div className="hero-card hero-card-top"><ShieldCheck size={19} /><span><strong>Safe & responsible</strong><small>Collection you can count on</small></span></div>
          <div className="house house-one"><div className="roof" /><div className="window" /><div className="door" /></div><div className="house house-two"><div className="roof" /><div className="window" /><div className="door" /></div>
          <div className="tree tree-one"><i /><b /><span /></div><div className="tree tree-two"><i /><b /><span /></div>
          <div className="person person-one"><div className="head" /><div className="body" /><div className="legs" /></div><div className="bin-illustration"><div className="bin-lid" /><div className="bin-body"><span>WNO</span></div></div>
          <div className="hero-card hero-card-bottom"><Recycle size={19} /><span><strong>Sort. Save. Sustain.</strong><small>Small actions, big impact</small></span></div>
        </div>
      </section>

      <section className="impact-bar"><div><strong>3</strong><span>ways to make a difference</span></div><div><strong>24h</strong><span>response on reports</span></div><div><strong>100%</strong><span>community-focused</span></div><div className="impact-note"><Leaf size={20} /> Better habits start at home.</div></section>

      <section className="section services-section" id="services">
        <div className="section-heading"><div><span className="section-kicker">01 / Smart waste management</span><h2>Everything cleaner<br /><em>starts here.</em></h2></div><p>From a one-time collection to a full home water-care setup, we help you keep your space healthy without the hassle.</p></div>
        <div className="service-grid">
          <article className="service-card featured-service"><div className="service-icon green-icon"><Truck size={24} /></div><span className="service-number">01</span><h3>Book a waste pickup</h3><p>Schedule a convenient garbage pickup for your home, school, or local business.</p><button className="card-link" onClick={() => scrollTo('request')} >Book a pickup <ArrowRight size={16} /></button></article>
          <article className="service-card"><div className="service-icon blue-icon"><CircleAlert size={24} /></div><span className="service-number">02</span><h3>Report a problem</h3><p>Tell us about illegal dumping, overflowing bins, or an area needing attention.</p><button className="card-link" onClick={() => scrollTo('request')}>Make a report <ArrowRight size={16} /></button></article>
          <article className="service-card"><div className="service-icon yellow-icon"><Droplets size={24} /></div><span className="service-number">03</span><h3>Safer water at home</h3><p>Install a clean filtration tap and get practical chlorine-care guidance.</p><button className="card-link" onClick={() => scrollTo('shop')}>See water care <ArrowRight size={16} /></button></article>
        </div>
      </section>

      <section className="request-section" id="request"><div className="request-intro"><span className="section-kicker">Need a hand?</span><h2>Let&apos;s take care<br />of your <em>corner.</em></h2><p>Share your details and what you need. Our team will get back to you with the next available option.</p><div className="response-note"><Check size={17} /> We usually respond within 24 hours</div></div><form className="request-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>{submitted ? <div className="submitted-state"><div className="success-icon"><Check size={28} /></div><h3>Request received.</h3><p>Thanks for helping make your community cleaner. We&apos;ll reach out soon.</p><button type="button" className="button button-outline" onClick={() => setSubmitted(false)}>Send another request</button></div> : <><div className="form-row"><label>Full name<input required placeholder="e.g. Amina Wanjiku" /></label><label>Mobile number<input required type="tel" placeholder="+254 7XX XXX XXX" /></label></div><div className="form-row"><label>Email address<input required type="email" placeholder="you@example.com" /></label><label>Location<input required placeholder="Estate, school or area" /></label></div><label>What can we help with?<select defaultValue=""><option value="" disabled>Select a service</option><option>Waste pickup</option><option>Report improper disposal</option><option>Water filtration setup</option><option>Product enquiry</option></select></label><label>Additional details<textarea rows={3} placeholder="Tell us a little more..." /></label><button className="button button-primary" type="submit">Send request <Send size={16} /></button></>}</form></section>

      <section className="section shop-section" id="shop"><div className="section-heading shop-heading"><div><span className="section-kicker">02 / Clean living shop</span><h2>Good tools for<br /><em>good habits.</em></h2></div><p>Simple, affordable products that make sorting, cleaning, and caring for your water easier.</p></div><div className="shop-toolbar"><div className="category-tabs">{['All products', 'Waste tools', 'Sanitary care', 'Water care'].map((category) => <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><button className="cart-summary" onClick={() => setCartOpen(true)}><ShoppingBag size={17} /> {cartCount} items <strong>KES {total.toLocaleString()}</strong></button></div><div className="product-grid">{filteredProducts.map((product) => { const Icon = product.icon; return <article className="product-card" key={product.id}><div className={`product-image ${product.color}`}><Icon size={64} strokeWidth={1.15} /><span className="product-tag">{product.category}</span></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.description}</p></div><div className="product-bottom"><strong>KES {product.price.toLocaleString()}</strong><button className="add-button" onClick={() => updateCart(product.id, 1)} aria-label={`Add ${product.name} to cart`}><Plus size={17} /></button></div></div></article> })}</div></section>

      <section className="learn-section" id="learn"><div className="learn-visual"><div className="learn-circle"><Recycle size={60} /><span>Learn<br />to sort</span></div><div className="floating-tip tip-one"><Leaf size={16} /> Reusables</div><div className="floating-tip tip-two"><TriangleAlert size={16} /> Hazardous</div><div className="floating-tip tip-three"><Droplets size={16} /> Water care</div></div><div className="learn-copy"><span className="section-kicker">03 / The clean guide</span><h2>Know what goes<br /><em>where.</em></h2><p>A little knowledge makes a big difference. Use our quick guide to sort waste safely, reduce what you throw away, and care for clean water.</p><div className="learn-list"><details open><summary><span className="summary-icon green-icon"><Recycle size={18} /></span><span><strong>Recyclables</strong><small>Paper, cardboard, glass, metal and clean plastics</small></span><ChevronDown size={18} /></summary><p>Rinse containers, flatten boxes, and keep recyclable materials dry. Separate them from food scraps and general waste.</p></details><details><summary><span className="summary-icon blue-icon"><Trash2 size={18} /></span><span><strong>General disposal</strong><small>Food scraps, dirty packaging and non-recyclable waste</small></span><ChevronDown size={18} /></summary><p>Bag general waste securely and place it out only on your collection day to keep pests away.</p></details><details><summary><span className="summary-icon yellow-icon"><TriangleAlert size={18} /></span><span><strong>Handle with care</strong><small>Batteries, chemicals, bulbs and medical waste</small></span><ChevronDown size={18} /></summary><p>Never mix hazardous materials with regular trash. Keep them sealed and contact a safe disposal service.</p></details></div><button className="text-button" onClick={() => scrollTo('contact')}>Read the full clean guide <ArrowRight size={16} /></button></div></section>

      <section className="community-section"><div><span className="section-kicker">Built for your community</span><h2>Cleaner streets.<br /><em>Stronger together.</em></h2></div><div className="audience-grid"><div><Users size={22} /><strong>Smart homes</strong><span>Easy pickup and safer water for every household.</span></div><div><GraduationCap size={22} /><strong>Schools & students</strong><span>Practical learning for cleaner campuses.</span></div><div><MapPin size={22} /><strong>Neighborhoods</strong><span>Report problem areas and see change happen.</span></div></div></section>

      <footer className="site-footer" id="contact"><div className="footer-top"><div className="brand footer-brand"><span className="brand-mark"><Trash2 size={19} /></span><span><strong>Wild N out</strong><small>cleaners</small></span></div><p>Making the everyday act of caring for our spaces feel simple, shared, and worthwhile.</p><div className="footer-contact"><a href="tel:+254712345678"><Phone size={15} /> +254 712 345 678</a><a href="mailto:wildnoutcleaners@gmail.com?subject=Enquiry%20from%20website"><Mail size={15} /> wildnoutcleaners@gmail.com</a></div></div><div className="footer-bottom"><span>© 2025 Wild N out cleaners</span><span>Smart waste management for brighter places.</span><span className="hazard-label"><TriangleAlert size={13} /> Handle hazardous waste safely</span></div></footer>

      {cartOpen && <div className="cart-overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="cart-header"><div><span className="section-kicker">Your selection</span><h2>Your cart <span>({cartCount})</span></h2></div><button onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={21} /></button></div>{cartItems.length === 0 ? <div className="empty-cart"><ShoppingBag size={38} /><h3>Your cart is empty</h3><p>Add a few clean-living essentials to get started.</p><button className="button button-primary" onClick={() => setCartOpen(false)}>Browse products</button></div> : <><div className="cart-lines">{cartItems.map((item) => { const CartIcon = item.icon; return <div className="cart-line" key={item.id}><div className={`mini-product ${item.color}`}><CartIcon size={25} /></div><div className="cart-line-info"><strong>{item.name}</strong><small>KES {item.price.toLocaleString()} each</small><div className="quantity"><button onClick={() => updateCart(item.id, -1)}><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => updateCart(item.id, 1)}><Plus size={13} /></button></div></div><strong>KES {(item.price * item.quantity).toLocaleString()}</strong></div>})}</div><div className="cart-total"><span>Estimated total</span><strong>KES {total.toLocaleString()}</strong></div><button className="button button-primary checkout-button" onClick={() => { setCartOpen(false); scrollTo('request') }}>Proceed to purchase <ArrowRight size={17} /></button><p className="secure-note"><ShieldCheck size={14} /> We&apos;ll confirm availability and payment on contact.</p></>}</aside></div>}
    </main>
  )
}

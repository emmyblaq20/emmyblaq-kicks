import { useMemo, useState } from 'react';
import { ShoppingBag, Search, Menu, X, Plus, Minus, Trash2, ArrowRight, CheckCircle2, ShieldCheck, Truck, RotateCcw, Heart, CreditCard, Wallet, Banknote, PackageCheck } from 'lucide-react';

// Catalogue data is kept here so you can edit product names, prices, categories and photos.
const PRODUCTS = [
  {id:1,name:'Court Classic Low',category:'Lifestyle',price:68500,tag:'BESTSELLER',color:'Cream / Green',image:'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85'},
  {id:2,name:'Velocity Runner',category:'Running',price:79500,tag:'NEW DROP',color:'White / Silver',image:'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85'},
  {id:3,name:'Street High Top',category:'Lifestyle',price:92000,tag:'LIMITED',color:'Black / White',image:'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=85'},
  {id:4,name:'Everyday Essential',category:'Casual',price:54000,tag:'-17%',color:'Sand / Bone',image:'https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=900&q=85'},
  {id:5,name:'Cloudfoam Sport',category:'Running',price:73500,tag:'LIGHTWEIGHT',color:'Grey / Blue',image:'https://images.unsplash.com/photo-1460353581641-37badd?auto=format&fit=crop&w=900&q=85'},
  {id:6,name:'Retro Suede',category:'Casual',price:61500,tag:'FAN FAVORITE',color:'Rust / Cream',image:'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=85'}
];
const SIZES = ['39','40','41','42','43','44','45'];
const money = n => new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',maximumFractionDigits:0}).format(n);

export default function App() {
  // The demo cart is saved in this browser only. It is not shared across devices.
  const [cart,setCart] = useState(() => { try { return JSON.parse(localStorage.getItem('emmyblaq-kicks-cart') || '[]'); } catch { return []; } });
  const [selectedSizes,setSelectedSizes] = useState({});
  const [category,setCategory] = useState('All shoes');
  const [search,setSearch] = useState('');
  const [cartOpen,setCartOpen] = useState(false);
  const [checkout,setCheckout] = useState(false);
  const [mobileMenu,setMobileMenu] = useState(false);
  const [favorites,setFavorites] = useState([]);
  const [payment,setPayment] = useState('transfer');
  const [form,setForm] = useState({name:'',email:'',phone:'',address:'',city:'Lagos'});
  const [checks,setChecks] = useState({details:false,delivery:false,payment:false});
  const [error,setError] = useState('');
  const [order,setOrder] = useState(null);
  const [notice,setNotice] = useState('');

  const saveCart = next => {
    setCart(next);
    try { localStorage.setItem('emmyblaq-kicks-cart',JSON.stringify(next)); } catch {}
  };
  const visibleProducts = useMemo(() => PRODUCTS.filter(p =>
    (category === 'All shoes' || p.category === category) &&
    (p.name+' '+p.category+' '+p.color).toLowerCase().includes(search.toLowerCase())
  ),[category,search]);
  const count = cart.reduce((n,item)=>n+item.qty,0);
  const subtotal = cart.reduce((n,item)=>n+item.price*item.qty,0);
  const delivery = subtotal === 0 || subtotal >= 100000 ? 0 : 2500;

  function addToCart(product) {
    const size = selectedSizes[product.id] || '42';
    const existing = cart.find(i=>i.id===product.id && i.size===size);
    saveCart(existing
      ? cart.map(i=>i.id===product.id && i.size===size ? {...i,qty:i.qty+1} : i)
      : [...cart,{...product,size,qty:1}]);
    setNotice(product.name+' added to your bag');
    window.setTimeout(()=>setNotice(''),2200);
  }
  function updateQuantity(id,size,delta) {
    saveCart(cart.map(i=>i.id===id && i.size===size ? {...i,qty:i.qty+delta} : i).filter(i=>i.qty>0));
  }
  function removeItem(id,size) { saveCart(cart.filter(i=>!(i.id===id && i.size===size))); }
  function placeOrder(event) {
    event.preventDefault();
    if (!cart.length) { setError('Your bag is empty. Add a pair before checkout.'); return; }
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim() || !form.city.trim()) {
      setError('Please complete your name, phone number and delivery address.'); return;
    }
    if (!checks.details || !checks.delivery || !checks.payment) {
      setError('Please tick all three checklist items to continue.'); return;
    }
    const ref = 'EBK-'+Math.random().toString(36).slice(2,8).toUpperCase();
    setOrder({ref,customer:form.name,method:payment,total:subtotal+delivery});
    saveCart([]); setError(''); setCheckout(false); setCartOpen(false);
  }
  const scrollToShop = () => document.getElementById('shop')?.scrollIntoView({behavior:'smooth'});

  return <div className="site">
    <div className="topline">COMPLIMENTARY DELIVERY ON ORDERS OVER ₦100,000 <span>·</span> MADE FOR EVERY STEP</div>
    <header className="header">
      <button className="icon-btn menu-btn" onClick={()=>setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu?<X/>:<Menu/>}</button>
      <a className="brand" href="#top" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>EMMYBLAQ <span>KICKS</span><i>.</i></a>
      <nav className={mobileMenu?'nav open':'nav'}>{['All shoes','Lifestyle','Running','Casual'].map(c=><button key={c} className={category===c?'nav-active':''} onClick={()=>{setCategory(c);setMobileMenu(false);scrollToShop();}}>{c}</button>)}</nav>
      <div className="head-actions"><label className="search"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find your pair"/></label><button className="bag-btn" onClick={()=>setCartOpen(true)} aria-label="Open shopping bag"><ShoppingBag size={20}/><span>Bag</span><b>{count}</b></button></div>
    </header>
    <main id="top">
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow"><span/> YOUR NEXT EVERYDAY FAVORITE</p><h1>Walk your<br/><em>own way.</em></h1><p className="hero-desc">Good shoes take you places. Find your next pair of everyday icons, made for movement and moments in between.</p><button className="primary" onClick={scrollToShop}>Shop the collection <ArrowRight size={18}/></button><div className="hero-note"><div className="avatars"><span>✦</span><span>✦</span><span>✦</span></div><span><b>Comfort meets character.</b><br/>Your feet will thank you.</span></div></div>
        <div className="hero-image"><img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=90" alt="Red statement sneaker"/><div className="image-label"><span>THE NEW EDIT</span><b>Made to move.</b></div><div className="round-stamp">STEP<br/>INTO<br/><b>STYLE</b> ✳</div></div>
        <div className="hero-side">EST. FOR EVERYDAY · 001</div>
      </section>
      <section className="benefits"><div><Truck/><span><b>Delivery made easy</b><small>Across Nigeria</small></span></div><div><ShieldCheck/><span><b>Shop with confidence</b><small>Secure checkout experience</small></span></div><div><RotateCcw/><span><b>Easy exchanges</b><small>Size not quite right? Let us help</small></span></div></section>
      <section className="shop-section" id="shop"><div className="section-head"><div><p className="eyebrow">THE EMMYBLAQ KICKS EDIT</p><h2>Pairs worth <em>showing off.</em></h2></div><p>Everyday staples. Weekend statements.<br/>Find the pair that feels like you.</p></div>
        <div className="filters">{['All shoes','Lifestyle','Running','Casual'].map(c=><button key={c} className={category===c?'filter active':'filter'} onClick={()=>setCategory(c)}>{c}</button>)}<span className="results">{visibleProducts.length} pairs</span></div>
        <div className="product-grid">{visibleProducts.map(p=><article className="product" key={p.id}><div className="product-photo"><img src={p.image} alt={p.name} loading="lazy"/><span className="tag">{p.tag}</span><button className={favorites.includes(p.id)?'heart liked':'heart'} onClick={()=>setFavorites(favorites.includes(p.id)?favorites.filter(id=>id!==p.id):[...favorites,p.id])} aria-label="Toggle favourite"><Heart size={18} fill={favorites.includes(p.id)?'currentColor':'none'}/></button><button className="quick-add" onClick={()=>addToCart(p)}>Add to bag <Plus size={16}/></button></div><div className="product-info"><div><h3>{p.name}</h3><p>{p.color}</p></div><b>{money(p.price)}</b></div><div className="size-row"><span>Size (EU)</span><div>{SIZES.slice(0,5).map(s=><button key={s} className={(selectedSizes[p.id]||'42')===s?'size selected':'size'} onClick={()=>setSelectedSizes({...selectedSizes,[p.id]:s})}>{s}</button>)}</div></div></article>)}</div>
        {!visibleProducts.length&&<div className="empty-search">No pairs found. Try another search or category.</div>}
      </section>
      <section className="closing"><div><p className="eyebrow">GOOD THINGS START FROM THE GROUND UP</p><h2>Find your <em>stride.</em></h2><p>Comfortable, confident, unmistakably you.</p><button className="light-btn" onClick={scrollToShop}>Explore all shoes <ArrowRight size={17}/></button></div><div className="closing-mark">E<span>K</span>.</div></section>
    </main>
    <footer><a className="brand" href="#top">EMMYBLAQ <span>KICKS</span><i>.</i></a><p>Find your everyday favorite.</p><small>© 2026 EMMYBLAQ KICKS. Demo storefront.</small></footer>
    {notice&&<div className="toast"><CheckCircle2 size={18}/>{notice}</div>}

    {cartOpen&&<div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setCartOpen(false);}}><aside className="drawer"><div className="drawer-head"><div><p className="eyebrow">YOUR SELECTION</p><h2>Your bag <span>({count})</span></h2></div><button className="icon-btn" onClick={()=>setCartOpen(false)} aria-label="Close cart"><X/></button></div>
      {!cart.length?<div className="empty-cart"><ShoppingBag size={42}/><h3>Your bag is taking a breather.</h3><p>There are plenty of good steps ahead.</p><button className="primary" onClick={()=>setCartOpen(false)}>Keep shopping <ArrowRight size={17}/></button></div>:<><div className="cart-items">{cart.map(i=><div className="cart-item" key={i.id+'-'+i.size}><img src={i.image} alt={i.name}/><div className="cart-item-info"><h3>{i.name}</h3><p>EU {i.size} · {i.color}</p><b>{money(i.price)}</b><div className="qty"><button onClick={()=>updateQuantity(i.id,i.size,-1)} aria-label="Decrease quantity"><Minus size={14}/></button><span>{i.qty}</span><button onClick={()=>updateQuantity(i.id,i.size,1)} aria-label="Increase quantity"><Plus size={14}/></button><button className="remove" onClick={()=>removeItem(i.id,i.size)} aria-label="Remove item"><Trash2 size={15}/></button></div></div></div>)}</div><div className="cart-bottom"><div className="subtotal"><span>Subtotal</span><b>{money(subtotal)}</b></div><div className="subtotal"><span>Delivery</span><b>{delivery===0?'FREE':money(delivery)}</b></div><p className="delivery-note">{subtotal>=100000?'You unlocked complimentary delivery.':'Spend '+money(Math.max(0,100000-subtotal))+' more for free delivery.'}</p><button className="primary full" onClick={()=>{setCartOpen(false);setCheckout(true);setError('');}}>Continue to checkout <ArrowRight size={18}/></button><small className="secure-note"><ShieldCheck size={14}/> Demo checkout · no payment is charged</small></div></>}
    </aside></div>}

    {checkout&&<div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setCheckout(false);}}><section className="checkout-modal"><div className="drawer-head"><div><p className="eyebrow">ALMOST YOURS</p><h2>Checkout</h2></div><button className="icon-btn" onClick={()=>setCheckout(false)} aria-label="Close checkout"><X/></button></div><div className="checkout-layout"><form onSubmit={placeOrder} className="checkout-form"><h3>01 / Delivery details</h3><div className="field-grid">
      <label>Full name *<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your full name"/></label><label>Phone number *<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+234..." inputMode="tel"/></label><label className="wide">Email (optional)<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label><label className="wide">Delivery address *<input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="Street, area, landmark"/></label><label className="wide">City / state *<input value={form.city} onChange={e=>setForm({...form,city:e.target.value})} placeholder="Lagos"/></label></div>
      <h3 className="payment-title">02 / Payment method</h3><div className="payment-options">
      <button type="button" className={payment==='transfer'?'pay-option chosen':'pay-option'} onClick={()=>setPayment('transfer')}><Wallet/><span><b>Bank transfer</b><small>Instructions must be configured by the store owner</small></span><i>{payment==='transfer'?'●':'○'}</i></button>
      <button type="button" className={payment==='card'?'pay-option chosen':'pay-option'} onClick={()=>setPayment('card')}><CreditCard/><span><b>Debit / credit card</b><small>Requires a payment gateway integration</small></span><i>{payment==='card'?'●':'○'}</i></button>
      <button type="button" className={payment==='cod'?'pay-option chosen':'pay-option'} onClick={()=>setPayment('cod')}><Banknote/><span><b>Pay on delivery</b><small>Confirm availability in your area</small></span><i>{payment==='cod'?'●':'○'}</i></button></div>
      <h3 className="payment-title">03 / Checkout checklist</h3><div className="checklist">{[{key:'details',title:'My delivery details are correct',desc:'Name, phone and address are accurate.'},{key:'delivery',title:'I understand delivery terms',desc:'Delivery fee is shown in the order summary.'},{key:'payment',title:'I understand this is a demo checkout',desc:'No payment is processed on this website.'}].map(c=><label className="check-row" key={c.key}><input type="checkbox" checked={checks[c.key]} onChange={e=>setChecks({...checks,[c.key]:e.target.checked})}/><span><b>{c.title}</b><small>{c.desc}</small></span></label>)}</div>
      {error&&<p className="error-msg">{error}</p>}<button className="primary full place-order" type="submit">Place demo order · {money(subtotal+delivery)} <ArrowRight size={18}/></button></form>
      <div className="order-summary"><h3>Order summary</h3>{cart.map(i=><div className="summary-item" key={i.id+'-'+i.size}><img src={i.image} alt={i.name}/><span><b>{i.name}</b><small>EU {i.size} × {i.qty}</small></span><strong>{money(i.price*i.qty)}</strong></div>)}<div className="subtotal"><span>Subtotal</span><b>{money(subtotal)}</b></div><div className="subtotal"><span>Delivery</span><b>{delivery===0?'FREE':money(delivery)}</b></div><div className="total"><span>Total</span><b>{money(subtotal+delivery)}</b></div><p className="demo-warning">Demo only: connect a payment provider and order database before accepting live orders.</p></div>
      </div></section></div>}

    {order&&<div className="overlay"><section className="success-modal"><div className="success-icon"><PackageCheck size={35}/></div><p className="eyebrow">DEMO ORDER CREATED</p><h2>You're one step closer.</h2><p>Thanks, {order.customer}. Your demo order was created in this browser session only.</p><div className="success-ref"><span>Order reference</span><b>{order.ref}</b></div><div className="success-ref"><span>Payment method</span><b>{order.method==='transfer'?'Bank transfer':order.method==='card'?'Debit / credit card':'Pay on delivery'}</b></div><div className="success-ref"><span>Order total</span><b>{money(order.total)}</b></div><p className="demo-warning">No real order was sent to a store and no money was charged.</p><button className="primary full" onClick={()=>{setOrder(null);setChecks({details:false,delivery:false,payment:false});setForm({name:'',email:'',phone:'',address:'',city:'Lagos'});}}>Back to the shop <ArrowRight size={18}/></button></section></div>}
  </div>;
}

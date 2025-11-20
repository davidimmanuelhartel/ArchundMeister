
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, ArrowUpRight, CheckCircle } from 'lucide-react';
import { PRODUCTS, LEGAL_TEXTS } from './data';
import { Product, OrderForm } from './types';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';

// --- Utilities ---

const transition = { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] };

// --- Custom Components ---

// Page Transition Wrapper
const PageTransition = ({ children, className }: { children?: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// Custom Link component to bypass strict blob/iframe security restrictions on href navigation
const Link = ({ to, children, className, style, onClick, onMouseEnter, onMouseLeave }: any) => {
    const navigate = useNavigate();
    return (
        <a
            className={`cursor-pointer ${className || ''}`}
            style={style}
            onClick={(e) => {
                e.preventDefault();
                if (onClick) onClick(e);
                navigate(to);
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </a>
    );
};

// --- Components ---

const Header = ({ toggleMenu, isMenuOpen }: { toggleMenu: () => void, isMenuOpen: boolean }) => {
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 100], [0, -20]);
  
  return (
    <motion.header 
      style={{ y: headerY }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:py-8 flex justify-between items-center mix-blend-difference text-white"
    >
      <Link to="/" className="font-display font-bold text-xl md:text-2xl tracking-tighter uppercase z-50">
        Architekt & Meister
      </Link>
      
      <button onClick={toggleMenu} className="group flex items-center gap-3 z-50 focus:outline-none">
        <span className="hidden md:block text-sm font-mono uppercase tracking-widest group-hover:tracking-[0.2em] group-hover:text-gray-300 transition-all duration-300">
          {isMenuOpen ? 'Close' : 'Menu'}
        </span>
        <div className="relative w-8 h-8 flex items-center justify-center">
            <AnimatePresence mode='wait'>
                {isMenuOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                        <X size={24} />
                    </motion.div>
                ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                        <Menu size={24} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </button>
    </motion.header>
  );
};

const FullscreenMenu = ({ isOpen, close }: { isOpen: boolean, close: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 bg-am-black text-white z-40 flex flex-col justify-center items-center"
        >
            <div className="container mx-auto px-6 grid md:grid-cols-2 h-full pt-32 pb-12">
                <div className="flex flex-col justify-between order-2 md:order-1">
                    <div className="font-mono text-sm text-gray-400 space-y-1">
                        <p>Buchenstraße 20</p>
                        <p>01097 Dresden</p>
                        <p className="pt-4">architektundmeister@gmail.com</p>
                        <p className="mb-8">+49 151 22807682</p>

                        {/* Secondary Navigation / Legal Links */}
                        <div className="flex flex-col gap-2 pt-4 border-t border-gray-800 w-fit">
                            <Link to="/impressum" onClick={close} className="hover:text-white transition-colors">Impressum</Link>
                            <Link to="/datenschutz" onClick={close} className="hover:text-white transition-colors">Datenschutz</Link>
                            <Link to="/agb" onClick={close} className="hover:text-white transition-colors">AGB</Link>
                            <Link to="/widerruf" onClick={close} className="hover:text-white transition-colors">Widerruf</Link>
                            <Link to="/versand" onClick={close} className="hover:text-white transition-colors">Versand</Link>
                        </div>
                    </div>
                    <div className="text-[12vw] md:text-[8vw] font-display font-bold leading-none opacity-10 select-none hidden md:block">
                        A&M
                    </div>
                </div>
                <nav className="flex flex-col justify-center space-y-2 md:space-y-6 order-1 md:order-2">
                    {[
                        { name: "Home", path: "/" },
                        { name: "Kollektion", path: "/shop" },
                        { name: "Beratung", path: "/beratung" },
                        { name: "Kontakt", path: "/beratung" }
                    ].map((item, i) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + (i * 0.1) }}
                        >
                            <Link 
                                to={item.path} 
                                onClick={close}
                                className="block font-display text-5xl md:text-7xl font-bold hover:text-transparent hover:stroke-text transition-all duration-300"
                                style={{ WebkitTextStroke: "1px white" }}
                            >
                                {item.name}
                            </Link>
                        </motion.div>
                    ))}
                </nav>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { y: "105%" }, 
    visible: {
      y: "0%",
      transition: { duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] as const }
    }
  };

  const words = ["Möbel,", "die", "entworfen", "werden."];

  return (
    <section className="relative min-h-screen flex items-center px-6 pt-20 overflow-hidden bg-am-offwhite">
      <div className="container mx-auto grid md:grid-cols-12 gap-8 items-center relative z-10">
        <div className="md:col-span-9">
            <motion.h1 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="font-display text-huge font-bold leading-[0.95] tracking-tighter uppercase flex flex-wrap gap-x-[0.25em] gap-y-0"
            >
                {words.map((word, i) => (
                    <div key={i} className="overflow-hidden py-6 -my-6 px-6 -mx-6">
                         <motion.span 
                            variants={childVariants} 
                            className={`block ${word === 'entworfen' ? 'italic font-light text-am-black/90' : ''}`}
                         >
                            {word}
                         </motion.span>
                    </div>
                ))}
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-12 md:mt-20 font-sans font-normal text-base max-w-md leading-relaxed text-gray-600"
            >
                Keine Produktion ohne Entwurf. Kein Entwurf ohne Handwerk.
                Jedes Stück entsteht in der Begegnung von Architekturdenken und meisterlicher Schreinerkunst.
            </motion.p>
        </div>
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="absolute top-1/2 right-0 md:right-[5%] w-[60vw] md:w-[30vw] aspect-[3/4] z-0 -translate-y-1/2 pointer-events-none"
      >
          <motion.img 
            initial={{ scale: 1.5, filter: "blur(10px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "circOut" }}
            src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1000&q=80"
            alt="Minimalist Architectural Interior" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute -bottom-10 -left-10 bg-white p-6 shadow-xl hidden md:block">
             <p className="font-mono text-xs uppercase mb-2">Unikat 001</p>
             <p className="font-display font-bold text-xl">210h Handarbeit</p>
          </div>
      </motion.div>
    </section>
  );
};

const HorizontalPhilosophy = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  
    return (
      <section ref={targetRef} className="relative h-[300vh] bg-am-black text-white">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-12 md:gap-24 px-6 md:px-24 w-max">
            
            {/* Intro Card */}
            <div className="w-[85vw] md:w-[40vw] flex flex-col justify-center">
                <h2 className="font-display text-big font-bold leading-none mb-8">DAS<br/>KONZEPT</h2>
                <p className="font-mono text-lg md:text-xl leading-relaxed text-gray-400 max-w-md">
                    In einer Welt der Massenproduktion kehren wir zurück zum Ursprung. 
                    Die Synthese zweier Disziplinen.
                </p>
                <ArrowRight className="mt-8 text-white" size={32} />
            </div>
  
            {/* Architekt Card */}
            <div className="w-[85vw] md:w-[60vw] h-[70vh] bg-white text-am-black p-8 md:p-16 flex flex-col justify-between relative group hover:scale-[1.02] transition-transform duration-500">
                <div className="font-display text-[10rem] md:text-[15rem] leading-none absolute -top-10 -right-10 opacity-10 group-hover:opacity-20 transition-opacity">A</div>
                <h3 className="font-display text-5xl md:text-7xl font-bold">ARCHITEKT</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <p className="font-mono text-sm uppercase tracking-widest mb-4 border-b border-black pb-2">Fokus</p>
                        <p className="text-lg leading-relaxed">Proportion. Licht. Kontext. Der Entwurf folgt keinen Trends, sondern architektonischen Prinzipien.</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80" className="w-full h-48 object-cover grayscale" alt="Architektur Skizze" />
                </div>
            </div>
  
            {/* Meister Card */}
            <div className="w-[85vw] md:w-[60vw] h-[70vh] bg-[#222] text-white p-8 md:p-16 flex flex-col justify-between relative group hover:scale-[1.02] transition-transform duration-500 border border-white/10">
                <div className="font-display text-[10rem] md:text-[15rem] leading-none absolute -top-10 -right-10 opacity-10 group-hover:opacity-20 transition-opacity">M</div>
                <h3 className="font-display text-5xl md:text-7xl font-bold">MEISTER</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <p className="font-mono text-sm uppercase tracking-widest mb-4 border-b border-white pb-2">Handwerk</p>
                        <p className="text-lg leading-relaxed text-gray-300">Materialwissen. Präzision. 30 Jahre Erfahrung. Keine Maschine ersetzt das Auge des Meisters.</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" className="w-full h-48 object-cover grayscale opacity-70" alt="Meister Werkstatt" />
                </div>
            </div>

             {/* CTA Card */}
             <div className="w-[85vw] md:w-[40vw] flex flex-col justify-center items-center text-center">
                <p className="font-display text-4xl mb-8 font-bold">Bereit für Ihr Unikat?</p>
                <Link 
                    to="/beratung" 
                    className="inline-block px-10 py-5 bg-white text-black border border-white font-display font-bold text-xl uppercase tracking-wide hover:bg-black hover:text-white hover:border-white transition-all duration-300 shadow-lg"
                >
                    Beratung starten
                </Link>
            </div>
  
          </motion.div>
        </div>
      </section>
    );
};

const ProductListItem: React.FC<{ product: Product, setCursorImage: (img: string | null) => void }> = ({ product, setCursorImage }) => {
    return (
        <Link 
            to={`/product/${product.id}`}
            className="group block border-t border-gray-300 py-12 md:py-16 relative bg-am-offwhite"
            onMouseEnter={() => setCursorImage(product.images[0])}
            onMouseLeave={() => setCursorImage(null)}
        >
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-baseline relative z-10 pointer-events-none">
                <h3 className="font-display text-4xl md:text-6xl font-bold group-hover:translate-x-4 transition-transform duration-500 uppercase pointer-events-auto">
                    {product.name}
                </h3>
                <div className="flex items-center gap-8 mt-4 md:mt-0 pointer-events-auto">
                     <span className="font-mono text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                        {product.tagline}
                     </span>
                     <span className="font-mono text-xl font-medium">
                        {product.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                     </span>
                     <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            </div>
        </Link>
    );
};

const ProductList = () => {
    const [cursorImage, setCursorImage] = useState<string | null>(null);
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    
    // Smooth mouse spring
    const springConfig = { damping: 25, stiffness: 150 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 150); // Center the 300px image
            cursorY.set(e.clientY - 200);
        }
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    return (
        <section className="py-32 bg-am-offwhite relative">
            {/* Floating Image Cursor */}
            <motion.div 
                className="fixed top-0 left-0 w-[300px] h-[400px] pointer-events-none z-50 hidden md:block overflow-hidden bg-white shadow-2xl"
                style={{ 
                    x: cursorXSpring, 
                    y: cursorYSpring,
                    opacity: cursorImage ? 1 : 0,
                    scale: cursorImage ? 1 : 0.8
                }}
            >
                {cursorImage && (
                    <img src={cursorImage} alt="Preview" className="w-full h-full object-cover" />
                )}
            </motion.div>

            <div className="container mx-auto px-6 mb-16">
                <h2 className="font-mono text-sm uppercase tracking-widest mb-2">Kollektion</h2>
                <p className="font-display text-big leading-none font-bold">AUSGEWÄHLTE<br/>WERKE</p>
            </div>

            <div className="border-b border-gray-300">
                {PRODUCTS.map(p => (
                    <ProductListItem key={p.id} product={p} setCursorImage={setCursorImage} />
                ))}
            </div>
        </section>
    );
};

const ProductDetail = () => {
    const location = useLocation();
    const productId = location.pathname.split('/').pop();
    const product = PRODUCTS.find(p => p.id === productId);

    if (!product) return null;

    return (
        <div className="bg-am-offwhite min-h-screen">
            {/* Hero Image Parallax */}
            <div className="h-[80vh] w-full overflow-hidden relative">
                <motion.img 
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={product.images[0]} 
                    className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-12 left-6 md:left-12 text-white">
                     <h1 className="font-display text-big font-bold leading-none mb-4 uppercase">{product.name}</h1>
                     <p className="font-mono text-lg">{product.tagline}</p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-24 grid md:grid-cols-12 gap-12">
                <div className="md:col-span-4 sticky top-24 h-fit">
                    <div className="border-t border-black pt-6 mb-8">
                        <p className="font-mono text-sm uppercase text-gray-500 mb-2">Preis</p>
                        <p className="font-display text-3xl font-bold">{product.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
                    </div>
                    
                    <div className="space-y-6">
                        <div>
                            <p className="font-mono text-sm uppercase text-gray-500 mb-1">Material</p>
                            <p className="font-sans text-lg font-normal">{product.material}</p>
                        </div>
                        <div>
                            <p className="font-mono text-sm uppercase text-gray-500 mb-1">Maße</p>
                            <p className="font-sans text-lg font-normal">{product.dimensions}</p>
                        </div>
                        <div>
                            <p className="font-mono text-sm uppercase text-gray-500 mb-1">Nachhaltigkeit</p>
                            <p className="font-sans text-lg font-normal">{product.sustainability}</p>
                        </div>
                    </div>

                    <Link 
                        to={`/checkout?product=${product.id}`}
                        className="block mt-12 w-full bg-black text-white border border-black text-center py-4 px-8 font-display font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
                    >
                        Kaufen
                    </Link>
                </div>

                <div className="md:col-span-8 space-y-24">
                    <p className="font-display text-3xl md:text-4xl leading-tight font-medium text-gray-900">
                        {product.description}
                    </p>

                    {product.images.slice(1).map((img, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8 }}
                        >
                            <img src={img} className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-xl" alt={`Detail ${idx}`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get('product');
    const product = PRODUCTS.find(p => p.id === productId);
    
    const [formData, setFormData] = useState<OrderForm>({
      name: '', email: '', phone: '', street: '', houseNumber: '', postcode: '', country: ''
    });
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const ref = `AM-${new Date().getFullYear()}-${Math.random().toString(36).slice(2,7).toUpperCase()}`;
      navigate('/confirmation', { state: { ref, product, formData } });
    };
  
    if (!product) return <div className="pt-32 text-center font-mono">Kein Produkt ausgewählt.</div>;
  
    return (
      <div className="pt-32 pb-20 px-6 bg-white min-h-screen">
        <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-16">
           <div>
              <h1 className="font-display text-6xl font-bold mb-8 uppercase">CHECKOUT</h1>
              <div className="bg-am-offwhite p-8">
                  <h3 className="font-mono uppercase tracking-widest text-sm mb-4">Bestellübersicht</h3>
                  <div className="flex justify-between items-end border-b border-gray-300 pb-4 mb-4">
                      <span className="font-display text-2xl font-bold">{product.name}</span>
                      <span className="font-mono">{product.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
                  </div>
                  <img src={product.images[0]} className="w-full h-64 object-cover grayscale" alt="Product Preview"/>
              </div>
           </div>
  
           <form onSubmit={handleSubmit} className="space-y-8 mt-8 md:mt-0">
                {/* Form fields styled brutally simple */}
                {['name', 'email', 'street'].map((field) => (
                    <div key={field} className="relative">
                         <input 
                            required 
                            type={field === 'email' ? 'email' : 'text'}
                            placeholder={field.toUpperCase()}
                            className="w-full border-b border-black py-4 bg-transparent font-mono focus:outline-none placeholder-gray-400 focus:border-gray-800 transition-colors"
                            onChange={e => setFormData({...formData, [field]: e.target.value})} 
                         />
                    </div>
                ))}
                
                <div className="grid grid-cols-2 gap-8">
                    <input 
                        required 
                        type="text" 
                        placeholder="PLZ"
                        className="w-full border-b border-black py-4 bg-transparent font-mono focus:outline-none"
                        onChange={e => setFormData({...formData, postcode: e.target.value})} 
                    />
                     <input 
                        required 
                        type="text" 
                        placeholder="ORT"
                        className="w-full border-b border-black py-4 bg-transparent font-mono focus:outline-none"
                        onChange={e => setFormData({...formData, houseNumber: e.target.value})} 
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-black text-white border border-black py-5 font-display font-bold text-xl uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300 mt-12 shadow-md hover:shadow-lg"
                >
                    Bestellung Abschliessen
                </button>
           </form>
        </div>
      </div>
    );
  };

const Footer = () => {
    return (
        <footer className="bg-am-black text-white pt-32 pb-12 px-6">
            <div className="container mx-auto">
                <div className="border-b border-white/20 pb-24 mb-12">
                    <h2 className="font-display text-[12vw] leading-[0.8] font-bold mb-8">
                        LET'S TALK
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <p className="font-mono text-lg text-gray-400 max-w-md">
                                Interessiert an einem maßgefertigten Stück oder einer architektonischen Beratung?
                            </p>
                            <a href="mailto:architektundmeister@gmail.com" className="inline-block mt-8 text-2xl font-display border-b border-white pb-1 hover:text-gray-400 hover:border-gray-400 transition-colors">
                                architektundmeister@gmail.com
                            </a>
                            <a href="tel:+4915122807682" className="block mt-2 text-xl font-display hover:text-gray-400 transition-colors">
                                +49 151 22807682
                            </a>
                        </div>
                        <div className="grid grid-cols-2 font-mono text-sm text-gray-500">
                            <ul>
                                <li className="text-white uppercase mb-4">Rechtliches</li>
                                <li className="mb-2"><Link to="/impressum" className="hover:text-white">Impressum</Link></li>
                                <li className="mb-2"><Link to="/datenschutz" className="hover:text-white">Datenschutz</Link></li>
                                <li className="mb-2"><Link to="/agb" className="hover:text-white">AGB</Link></li>
                            </ul>
                            <ul>
                                <li className="text-white uppercase mb-4">Social</li>
                                <li className="mb-2"><a href="#" className="hover:text-white">Instagram</a></li>
                                <li className="mb-2"><a href="#" className="hover:text-white">Pinterest</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-end font-mono text-xs uppercase text-gray-600">
                    <span>© {new Date().getFullYear()} Architekt & Meister</span>
                    <span>Made in Germany</span>
                </div>
            </div>
        </footer>
    );
};

const Confirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as { ref: string, product: Product, formData: OrderForm } | null;
  
    useEffect(() => {
        if (!state) {
            navigate('/');
        }
    }, [state, navigate]);

    if (!state) {
      return null;
    }
  
    return (
      <div className="h-screen bg-am-black text-white flex items-center justify-center px-6">
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-2xl w-full border border-white/20 p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-white animate-[loading_2s_ease-in-out]" />
          <h1 className="font-display text-6xl font-bold mb-6">DANKE.</h1>
          <p className="font-mono text-gray-400 mb-12">Ihre Anfrage ist eingegangen. Referenz: {state.ref}</p>
          <Link to="/" className="text-xl font-display underline decoration-1 underline-offset-4 hover:text-gray-300">Zurück zur Startseite</Link>
        </motion.div>
      </div>
    );
  };

const LegalPage = ({ type }: { type: keyof typeof LEGAL_TEXTS }) => {
    const data = LEGAL_TEXTS[type];
    return (
      <div className="pt-32 pb-20 px-6 bg-white min-h-screen">
        <div className="container mx-auto max-w-3xl">
          <h1 className="font-display text-6xl font-bold mb-12 uppercase">{data.title}</h1>
          <div className="prose prose-lg font-sans leading-relaxed">
            {data.content.split('\n').map((line, i) => {
              if (line.trim().startsWith('**')) {
                return <h3 key={i} className="text-xl font-bold mt-8 mb-4 font-display text-black uppercase tracking-wider">{line.replace(/\*\*/g, '')}</h3>;
              }
              // Trim content to ensure empty lines are treated properly or text aligns correctly
              return <p key={i} className="mb-4 text-gray-600 font-normal">{line.trim()}</p>;
            })}
          </div>
        </div>
      </div>
    );
}

const Consultation = () => (
    <div className="min-h-screen bg-am-offwhite flex flex-col justify-center px-6 pt-32">
        <div className="container mx-auto">
             <h1 className="font-display text-huge leading-none mb-12 font-bold">KONTAKT</h1>
             <div className="grid md:grid-cols-2 gap-12 border-t border-black pt-12">
                <div>
                    <p className="font-mono text-xl mb-8">
                        Besuchen Sie uns im Atelier oder vereinbaren Sie einen digitalen Termin.
                    </p>
                    <div className="font-display text-3xl space-y-2 font-bold">
                        <a href="tel:+4915122807682" className="block hover:text-gray-600 transition-colors">+49 151 22807682</a>
                        <a href="mailto:architektundmeister@gmail.com" className="block hover:text-gray-600 transition-colors">Mail senden</a>
                    </div>
                </div>
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Atelier" />
                    <div className="absolute inset-0 border border-black/5 pointer-events-none"></div>
                </div>
             </div>
        </div>
    </div>
);

// --- Main Wrapper for Routing Context ---

const AppContent = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="bg-am-offwhite min-h-screen selection:bg-am-black selection:text-white">
        <Header toggleMenu={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
        <FullscreenMenu isOpen={isMenuOpen} close={() => setIsMenuOpen(false)} />
        
        <main>
            <AnimatePresence mode='wait'>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={
                        <PageTransition>
                            <Hero />
                            <HorizontalPhilosophy />
                            <ProductList />
                        </PageTransition>
                    } />
                    <Route path="/shop" element={<PageTransition><ProductList /></PageTransition>} />
                    <Route path="/product/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
                    <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
                    <Route path="/confirmation" element={<PageTransition><Confirmation /></PageTransition>} />
                    <Route path="/beratung" element={<PageTransition><Consultation /></PageTransition>} />
                    
                    {/* Legal Routes */}
                    <Route path="/impressum" element={<PageTransition><LegalPage type="imprint" /></PageTransition>} />
                    <Route path="/agb" element={<PageTransition><LegalPage type="terms" /></PageTransition>} />
                    <Route path="/datenschutz" element={<PageTransition><LegalPage type="privacy" /></PageTransition>} />
                    <Route path="/widerruf" element={<PageTransition><LegalPage type="withdrawal" /></PageTransition>} />
                    <Route path="/versand" element={<PageTransition><LegalPage type="shipping" /></PageTransition>} />
                </Routes>
            </AnimatePresence>
        </main>

        <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
        <AppContent />
    </HashRouter>
  );
};

export default App;
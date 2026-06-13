import { useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { DataProvider } from '../context/DataContext'
import { useDarkMode } from '../hooks/useDarkMode'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Menu from '../components/Menu'
import BestSellers from '../components/BestSellers'
import Gallery from '../components/Gallery'
import Events from '../components/Events'
import Location from '../components/Location'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import ProductModal from '../components/ProductModal'

function SiteContent() {
  const [dark, toggleDark] = useDarkMode()
  const [selected, setSelected] = useState(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gold-shine"
        aria-hidden="true"
      />
      <Navbar dark={dark} toggleDark={toggleDark} />

      <main>
        <Hero />
        <Menu onOpen={setSelected} />
        <BestSellers onOpen={setSelected} />
        <Gallery />
        <Events />
        <Location />
      </main>

      <Footer />
      <WhatsAppButton />
      <ProductModal item={selected} onClose={() => setSelected(null)} />
    </>
  )
}

export default function SitePage() {
  return (
    <DataProvider>
      <SiteContent />
    </DataProvider>
  )
}

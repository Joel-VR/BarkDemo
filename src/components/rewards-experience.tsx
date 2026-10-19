'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check, Gift, Sparkles, Truck, Zap } from 'lucide-react'
import { FREE_SHIPPING, products, rewardTiers } from '@/data/catalog'
import { useCart } from '@/store/cart'

const money = (value: number) => `S/ ${value.toFixed(2)}`
const levels = [
  { name: 'BARK Starter', range: '0–249', benefit: 'Acceso a novedades' },
  { name: 'BARK Pro', range: '250–499', benefit: 'Beneficios adicionales' },
  { name: 'BARK Elite', range: '500+', benefit: 'Experiencias premium' },
]

export function RewardsExperience() {
  const { lines } = useCart()
  const subtotal = lines.reduce((sum, line) => sum + (products.find(product => product.id === line.productId)?.price ?? 0) * line.quantity, 0)
  const [simulatedSpend, setSimulatedSpend] = useState(180)
  const [activeRewardIndex, setActiveRewardIndex] = useState(0)
  const [rewardOpen, setRewardOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 34])
  const orbRotation = useTransform(scrollYProgress, [0, 1], [0, 8])
  const level = simulatedSpend >= 500 ? 'BARK Elite' : simulatedSpend >= 250 ? 'BARK Pro' : 'BARK Starter'
  const activeReward = rewardTiers[activeRewardIndex]
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100)
  const points = Math.floor(simulatedSpend / 10)

  return <main className="rewards-page">
    <motion.section ref={heroRef} className="rewards-hero" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0 : 0.7 }}>
      <motion.div className="rewards-intro" initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : 0.12, duration: 0.55 }}>
        <span className="eyebrow">BARK REWARDS · PROPUESTA DEMO</span>
        <h1>EL ESFUERZO<br/>TIENE <em>RECOMPENSA.</em></h1>
        <p>Una experiencia de beneficios por compra, diseñada para hacer que cada pedido cuente.</p>
        <Link href="/productos" className="btn btn-primary">Empezar a explorar <ArrowRight size={17}/></Link>
        <small>Programa conceptual. No está activo en la tienda actual.</small>
      </motion.div>
      <div className="rewards-visual">
        <motion.button type="button" className="reward-orb" aria-label={rewardOpen ? `Siguiente recompensa: ${activeReward.title}` : 'Descubrir recompensas'} aria-controls="orb-benefit" aria-expanded={rewardOpen} onClick={() => { if (!rewardOpen) setRewardOpen(true); else setActiveRewardIndex(index => (index + 1) % rewardTiers.length) }} style={reduceMotion ? undefined : { y: orbY, rotate: orbRotation }} animate={reduceMotion ? undefined : { scale: [1, 1.035, 1] }} whileHover={reduceMotion ? undefined : { scale: 1.07, transition: { duration: 0.2 } }} whileTap={reduceMotion ? undefined : { scale: 0.94, transition: { duration: 0.12 } }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}><Gift size={70}/><span>+</span></motion.button>
        <AnimatePresence mode="wait">{rewardOpen && <motion.div id="orb-benefit" key={activeReward.amount} className="orb-benefit" initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: 0.2 }}><span>RECOMPENSA DEMO · {money(activeReward.amount)}</span><b>{activeReward.title}</b><small>Pulsa para descubrir la siguiente</small></motion.div>}</AnimatePresence>
        <motion.div className="floating-reward reward-a" animate={reduceMotion ? undefined : { y: [0, -7, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}><Sparkles/>Beneficios por compra</motion.div>
        <motion.div className="floating-reward reward-b" animate={reduceMotion ? undefined : { y: [0, 6, 0] }} transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}><Zap/>Tu progreso, visible</motion.div>
        <motion.i className="reward-ring ring1" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}/>
        <motion.i className="reward-ring ring2" animate={reduceMotion ? undefined : { rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}/>
      </div>
    </motion.section>

    <section className="section rewards-how">
      <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.45 }}><span className="eyebrow">ASÍ FUNCIONA</span><h2 className="rewards-section-title">Cada compra suma al progreso</h2></motion.div>
      <div className="reward-thresholds">{rewardTiers.map((reward, index) => {
        const unlocked = subtotal >= reward.amount
        return <motion.article key={reward.amount} className={`threshold-card ${unlocked ? 'achieved' : ''}`} initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} whileHover={reduceMotion ? undefined : { y: -5 }} transition={{ duration: 0.4, delay: reduceMotion ? 0 : index * 0.1 }}>
          <span>0{index + 1}</span><div className="threshold-icon">{unlocked ? <Check/> : index === 1 ? <Truck/> : <Gift/>}</div><h3>{reward.title}</h3><p>{unlocked ? '¡Meta alcanzada con tu carrito actual!' : `Al alcanzar ${money(reward.amount)} en tu compra simulada.`}</p><small>{unlocked ? 'DESBLOQUEADO · DEMO' : 'BENEFICIO DEMOSTRATIVO'}</small>
        </motion.article>
      })}</div>
      <motion.div className="rewards-progress" initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }}>
        <div><span className="eyebrow">TU CARRITO ACTUAL</span><h3>{money(subtotal)} <small>/ progreso demo</small></h3></div>
        <div className="progress-track"><motion.div className="progress-fill" initial={{ width: 0 }} whileInView={{ width: `${progress}%` }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.9, ease: 'easeOut' }}/></div>
        <Link href="/carrito" className="text-link">Ver mi carrito <ArrowRight size={15}/></Link>
      </motion.div>
    </section>

    <section className="levels-section">
      <motion.div className="levels-heading" initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }}>
        <span className="eyebrow">SIMULADOR BARK REWARDS</span><h2>Descubre tu nivel.</h2><p>Prueba distintos montos de compra para explorar los niveles propuestos.</p>
      </motion.div>
      <motion.div className="simulator" initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.45 }}>
        <div className="simulator-input"><label htmlFor="sim-range">Monto de compra</label><motion.b key={simulatedSpend} initial={reduceMotion ? false : { y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }}>{money(simulatedSpend)}</motion.b><input id="sim-range" type="range" min="0" max="800" step="10" value={simulatedSpend} onChange={event => setSimulatedSpend(Number(event.target.value))}/><div><span>S/ 0</span><span>S/ 800</span></div></div>
        <AnimatePresence mode="wait"><motion.div key={level} className="level-result" initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96, y: -5 }} transition={{ duration: 0.22 }}><span className="level-star">✦</span><span>NIVEL SIMULADO</span><h3>{level}</h3><small>{points} puntos ilustrativos</small></motion.div></AnimatePresence>
      </motion.div>
      <div className="levels-grid">{levels.map((item, index) => <motion.article layout key={item.name} className={`level-card ${level === item.name ? 'current' : ''}`} initial={reduceMotion ? false : { opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.35, delay: reduceMotion ? 0 : index * 0.08 }}><span className="level-mark">0{index + 1}</span><h3>{item.name}</h3><b>{item.range} pts</b><p>{item.benefit}</p><AnimatePresence>{level === item.name && <motion.small initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 6 }}>Tu nivel simulado</motion.small>}</AnimatePresence></motion.article>)}</div>
      <p className="fine-print center-note">Puntos, niveles y beneficios son ilustrativos y no constituyen un programa vigente.</p>
    </section>
  </main>
}

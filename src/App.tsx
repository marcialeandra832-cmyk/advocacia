/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import heroImage from "./assets/images/female_lawyer_cutout_navy_1791589166650.jpg";
import heroBackdropImg from "./assets/images/hero_office_skyline_backdrop_1791590219025.jpg";
import practiceTaxImg from "./assets/images/practice_tax_law_luxury_1791589457318.jpg";
import practiceWealthImg from "./assets/images/practice_wealth_protection_luxury_1791589466558.jpg";
import practiceCivilImg from "./assets/images/practice_civil_contracts_luxury_1791589477364.jpg";
import { 
  MessageCircle, 
  Scale, 
  ShieldCheck, 
  Gavel, 
  Briefcase, 
  Instagram, 
  Linkedin, 
  ChevronRight,
  ChevronDown,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock
} from "lucide-react";

const HERO_WORDS = ["Patrimônio", "Negócio", "Futuro"];

const HERO_PRACTICE_CARDS = [
  {
    title: "Direito Tributário",
    phrase: "Otimização fiscal e defesa estratégica em processos administrativos e judiciais de alta complexidade.",
  },
  {
    title: "Proteção Patrimonial",
    phrase: "Estruturação de holdings e blindagem jurídica para preservação segura de bens familiares.",
  },
  {
    title: "Direito Civil & Contratos",
    phrase: "Elaboração de instrumentos jurídicos robustos e representação de excelência em litígios civis.",
  },
  {
    title: "Planejamento Sucessório",
    phrase: "Organização preventiva da sucessão familiar com foco em segurança, agilidade e eficiência patrimonial.",
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gold/10 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left group"
      >
        <span className="text-ice/90 font-serif text-lg group-hover:text-gold transition-colors">{question}</span>
        <ChevronDown className={`text-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={20} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="py-4 text-ice/60 text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const whatsappUrl = "https://wa.me/5511999999999";
  const shouldReduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [cutoutSrc, setCutoutSrc] = useState<string>(heroImage);
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [servicesInView, setServicesInView] = useState(false);
  const servicesSectionRef = useRef<HTMLElement | null>(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [isCarouselAnimating, setIsCarouselAnimating] = useState(true);

  useEffect(() => {
    const el = servicesSectionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setServicesInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setServicesInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px 0px", threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = window.setInterval(() => {
      setWordIndex((prev) => (prev + 1) % HERO_WORDS.length);
    }, 2500);
    return () => window.clearInterval(interval);
  }, [shouldReduceMotion]);

  // Auto-advance hero carousel 1 card every 4.5s with 1s slide in seamless loop
  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = window.setInterval(() => {
      setIsCarouselAnimating(true);
      setCarouselIdx((prev) => prev + 1);
    }, 4500);
    return () => window.clearInterval(interval);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (carouselIdx === HERO_PRACTICE_CARDS.length) {
      const timeout = window.setTimeout(() => {
        setIsCarouselAnimating(false);
        setCarouselIdx(0);
      }, 1000);
      return () => window.clearTimeout(timeout);
    }
  }, [carouselIdx]);

  useEffect(() => {
    let isMounted = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const blueDiff = b - r;

          if (blueDiff >= 18 && r < 60 && g < 80) {
            data[i + 3] = 0;
          } else if (blueDiff > 9 && r < 65 && g < 85) {
            const alphaFactor = 1 - (blueDiff - 9) / 9;
            data[i + 3] = Math.round(data[i + 3] * Math.max(0, Math.min(1, alphaFactor)));
            data[i + 2] = Math.min(b, Math.round((r + g) * 0.52));
          }
        }

        ctx.putImageData(imageData, 0, 0);
        if (isMounted) {
          setCutoutSrc(canvas.toDataURL("image/png"));
        }
      } catch {
        // Fallback to original image if canvas manipulation is restricted
      }
    };
    img.src = heroImage;
    return () => {
      isMounted = false;
    };
  }, []);

  const getStepMotionProps = (stepIndex: number) => {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0 },
      };
    }
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: 0.6,
        delay: stepIndex * 0.15,
        ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
      },
    };
  };

  const doubledHeroCards = [...HERO_PRACTICE_CARDS, ...HERO_PRACTICE_CARDS];

  return (
    <div className="min-h-screen bg-navy selection:bg-gold selection:text-navy overflow-x-hidden">
      {/* Header Fixo: 84% opacidade azul-marinho e leve desfoque, alinhado em 1400px com 32px de margem lateral */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A192F]/84 backdrop-blur-md border-b border-gold/10 py-5">
        <div className="w-[calc(100%-64px)] max-w-[1400px] mx-auto flex justify-between items-center">
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
            }}
            className="flex flex-col cursor-pointer hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/60 rounded"
          >
            <span className="text-gold font-serif text-xl font-bold tracking-[0.2em] uppercase leading-none">Figueiredo</span>
            <span className="text-[8px] text-ice/40 uppercase tracking-[0.4em] mt-1">Advocacia Estratégica</span>
          </a>
          <nav className="hidden md:flex gap-8 text-[10px] uppercase tracking-widest text-ice/60">
            <a href="#sobre" className="hover:text-gold transition-colors">Sobre</a>
            <a href="#servicos" className="hover:text-gold transition-colors">Serviços</a>
            <a href="#faq" className="hover:text-gold transition-colors">Dúvidas</a>
          </nav>
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold/10 text-gold border border-gold/20 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest hover:bg-gold hover:text-navy transition-all duration-500"
          >
            Contato Direto
          </a>
        </div>
      </header>

      {/* Hero Section: min 100vh, fundo escritório/cidade desfocado + degradê azul-marinho (65% topo, 85% base) */}
      <section id="inicio" className="relative min-h-screen flex flex-col justify-between pt-[104px] pb-0 lg:pb-10 overflow-hidden">
        {/* Camada 0: Foto de fundo escura e desfocada + degradê azul-marinho 65% em cima e 85% embaixo */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={heroBackdropImg}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover blur-[6px] scale-105"
            referrerPolicy="no-referrer"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(10, 25, 47, 0.65) 0%, rgba(10, 25, 47, 0.85) 100%)",
            }}
          />
        </div>

        {/* Camada 1 (Desktop): Foto da advogada GRANDE (95% da altura do hero), encostada na base, à direita com ~8% cortado */}
        <motion.div
          {...getStepMotionProps(3)}
          className="hidden lg:flex absolute bottom-0 right-0 h-[95%] z-10 pointer-events-none select-none items-end justify-end translate-x-[8%]"
        >
          <img
            src={cutoutSrc}
            alt="Dra. Helena Figueiredo"
            className="h-full w-auto max-w-none object-contain object-bottom block drop-shadow-[0_24px_48px_rgba(0,0,0,0.75)]"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Camada 2: Conteúdo alinhado com a logo (max 1400px, 32px de margem lateral) */}
        <div className="relative z-20 w-[calc(100%-64px)] max-w-[1400px] mx-auto flex-1 flex flex-col justify-between">
          {/* Bloco Superior: Texto e Botão */}
          <div className="pt-6 lg:pt-12 pb-10 lg:pb-12 max-w-[880px]">
            <motion.div {...getStepMotionProps(0)}>
              <h2 className="text-gold uppercase tracking-[0.4em] text-xs font-semibold mb-4">
                Excelência Jurídica
              </h2>
              <h1 className="uppercase font-serif font-extrabold text-[40px] sm:text-[56px] lg:text-[clamp(70px,5.2vw,82px)] leading-[1.1] mb-[32px]">
                Protegendo seu <br />
                <span className="inline-grid overflow-hidden align-bottom h-[1.12em]">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={HERO_WORDS[wordIndex]}
                      initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={shouldReduceMotion ? { y: 0, opacity: 0 } : { y: "-100%", opacity: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="col-start-1 row-start-1 text-gold block"
                    >
                      {HERO_WORDS[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>{" "}
                com <br />
                Autoridade.
              </h1>
            </motion.div>

            <motion.p 
              {...getStepMotionProps(1)}
              className="text-ice/80 text-base md:text-lg mb-[36px] leading-relaxed font-light max-w-[620px]"
            >
              Soluções jurídicas personalizadas para clientes que exigem discrição, agilidade e resultados concretos em questões complexas.
            </motion.p>
            
            <motion.div 
              {...getStepMotionProps(2)}
              className="flex flex-col sm:flex-row sm:items-center gap-6"
            >
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-gold text-navy px-10 py-5 rounded-full font-bold uppercase tracking-wider text-xs shadow-[4px_5px_0px_0px_#8B6F1E] hover:-translate-y-[2px] hover:bg-ice hover:text-navy transition-all duration-300 group w-fit"
              >
                Solicitar Consultoria
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <div className="flex items-center gap-4 px-6 py-3.5 rounded-full border border-ice/15 bg-navy/60 backdrop-blur-md w-fit">
                <div className="text-gold font-serif text-base font-bold">Dra. Helena Figueiredo</div>
                <span className="w-1 h-1 rounded-full bg-gold/60" aria-hidden="true" />
                <div className="text-[10px] uppercase tracking-[0.25em] text-ice/70">OAB/SP 123.456</div>
              </div>
            </motion.div>
          </div>

          {/* Parte de baixo do hero, à esquerda: Carrossel de cartões (470x200px no desktop, 1.5 cartões no celular, gap 19px, avança a cada 4,5s com deslize de 1s) */}
          <div className="w-full lg:max-w-[959px] overflow-hidden pb-6 lg:pb-2">
            <div
              className={`flex gap-[19px] ${
                isCarouselAnimating && !shouldReduceMotion
                  ? "transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  : "transition-none"
              }`}
              style={{
                transform: `translate3d(calc(-1 * ${carouselIdx} * (var(--hero-card-w) + 19px)), 0, 0)`,
              }}
            >
              {doubledHeroCards.map((card, idx) => (
                <div
                  key={`${card.title}-${idx}`}
                  className="w-[var(--hero-card-w)] h-[200px] shrink-0 rounded-2xl border border-gold/25 bg-[#0A192F]/80 backdrop-blur-md p-6 md:p-7 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">
                      Área de Atuação
                    </span>
                    <span className="w-2 h-2 rounded-full bg-gold/70 shrink-0" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-ice mb-2 line-clamp-1">
                      {card.title}
                    </h3>
                    <p className="text-ice/70 text-xs md:text-sm leading-relaxed line-clamp-2 font-light">
                      {card.phrase}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Foto no Celular: embaixo ocupando a largura toda e encostada na base */}
        <motion.div
          {...getStepMotionProps(3)}
          className="relative z-10 w-full flex lg:hidden items-end justify-center pt-4"
        >
          <img
            src={cutoutSrc}
            alt="Dra. Helena Figueiredo"
            className="w-full h-auto object-contain object-bottom block drop-shadow-[0_20px_40px_rgba(0,0,0,0.75)]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </section>

      {/* Seção "Sobre" */}
      <section id="sobre" className="py-[56px] md:py-[96px] bg-lead/10">
        <div className="w-[calc(100%-40px)] md:w-[calc(100%-96px)] max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[64px] items-center">
            <motion.div {...fadeIn}>
              <div className="mb-[40px]">
                <h2 className="text-gold uppercase tracking-[0.4em] text-xs font-semibold mb-4">Nossa História</h2>
                <h3 className="text-4xl md:text-5xl font-serif leading-tight">Compromisso com a Verdade e a Justiça.</h3>
              </div>
              <p className="text-ice/70 leading-relaxed mb-8 text-lg font-light max-w-[680px]">
                Fundado com o propósito de redefinir o conceito de assessoria jurídica, o escritório Figueiredo Advocacia combina tradição com uma visão moderna e tecnológica do direito, sob a liderança da Dra. Helena Figueiredo.
              </p>
              <div className="w-full grid grid-cols-2 gap-[24px]">
                <div>
                  <div className="text-3xl font-serif text-gold mb-2">15+</div>
                  <div className="text-[10px] uppercase tracking-widest text-ice/40">Anos de Atuação</div>
                </div>
                <div>
                  <div className="text-3xl font-serif text-gold mb-2">98%</div>
                  <div className="text-[10px] uppercase tracking-widest text-ice/40">Taxa de Sucesso</div>
                </div>
              </div>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="relative w-full">
              <img 
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800" 
                alt="Law Office" 
                className="w-full h-full object-cover rounded-3xl grayscale opacity-60 hover:opacity-100 transition-opacity duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -right-10 glass p-8 rounded-2xl border border-white/10 hidden lg:block">
                <blockquote className="text-ice/80 font-serif text-lg mb-4">
                  "O direito não é apenas uma regra, é a base da liberdade."
                </blockquote>
                <div className="text-gold text-xs uppercase tracking-widest">— Rui Barbosa</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seção "Serviços" */}
      <section id="servicos" ref={servicesSectionRef} className="py-[56px] md:py-[96px]">
        <div className="w-[calc(100%-40px)] md:w-[calc(100%-96px)] max-w-[1320px] mx-auto">
          <motion.div {...fadeIn} className="text-left mb-[40px]">
            <h2 className="text-gold uppercase tracking-[0.4em] text-xs font-semibold mb-4">Especialidades</h2>
            <h3 className="text-4xl md:text-5xl font-serif">Áreas de Atuação Estratégica</h3>
          </motion.div>

          {(() => {
            const services = [
              { 
                icon: <Scale size={28} />, 
                title: "Direito Tributário", 
                desc: "Otimização fiscal e defesa em processos administrativos e judiciais de alta complexidade.",
                features: ["Planejamento Fiscal", "Recuperação de Créditos", "Defesa em Execuções"],
                image: practiceTaxImg
              },
              { 
                icon: <ShieldCheck size={28} />, 
                title: "Proteção Patrimonial", 
                desc: "Estruturação de holdings e estratégias sucessórias para preservação de bens familiares.",
                features: ["Holdings Familiares", "Planejamento Sucessório", "Blindagem Jurídica"],
                image: practiceWealthImg
              },
              { 
                icon: <Gavel size={28} />, 
                title: "Direito Civil & Contratos", 
                desc: "Elaboração de instrumentos jurídicos robustos e representação em litígios civis.",
                features: ["Contratos Internacionais", "Responsabilidade Civil", "Direito Imobiliário"],
                image: practiceCivilImg
              }
            ];

            const activeService = services[activeServiceIdx];

            return (
              <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-[24px] items-start">
                {/* Coluna da Esquerda: Lista de Áreas de Atuação (fileira horizontal rolável no celular) */}
                <div 
                  role="tablist" 
                  aria-label="Áreas de Atuação Estratégica"
                  className="md:col-span-5 lg:col-span-4 flex md:flex-col overflow-x-auto gap-3 md:gap-2 pb-2 md:pb-0"
                >
                  {services.map((item, idx) => {
                    const isSelected = activeServiceIdx === idx;
                    return (
                      <button
                        key={item.title}
                        type="button"
                        role="tab"
                        id={`service-tab-${idx}`}
                        aria-selected={isSelected}
                        aria-controls={`service-panel-${idx}`}
                        onClick={() => setActiveServiceIdx(idx)}
                        className={`group relative text-left shrink-0 md:shrink w-auto md:w-full px-6 py-5 rounded-r-2xl border-l-2 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/60 ${
                          isSelected
                            ? "border-gold text-gold bg-gold/[0.06]"
                            : "border-white/10 text-ice/40 hover:text-ice/75 hover:border-gold/30 bg-white/[0.01]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span 
                            className={`font-serif text-lg md:text-2xl whitespace-nowrap md:whitespace-normal inline-block transition-transform duration-300 ease-out ${
                              shouldReduceMotion ? "" : "group-hover:translate-x-[6px]"
                            }`}
                          >
                            {item.title}
                          </span>
                          <ChevronRight 
                            size={18} 
                            className={`hidden md:block shrink-0 transition-opacity duration-300 ${
                              isSelected ? "opacity-100 text-gold" : "opacity-0 group-hover:opacity-50 text-ice/50"
                            }`} 
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Coluna da Direita: Painel com Foto, Título, Texto Curto e Botão */}
                <div 
                  role="tabpanel"
                  id={`service-panel-${activeServiceIdx}`}
                  aria-labelledby={`service-tab-${activeServiceIdx}`}
                  className="md:col-span-7 lg:col-span-8 w-full glass rounded-[2.5rem] border border-white/5 overflow-hidden"
                >
                  {/* Foto com fade cruzado (sem piscar) e carregamento sob demanda ao entrar na tela */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-lead/40">
                    {servicesInView && services.map((item, idx) => (
                      <img
                        key={item.title}
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity ${
                          shouldReduceMotion ? "duration-0" : "duration-500"
                        } ease-in-out ${
                          activeServiceIdx === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                        }`}
                      />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent z-20 pointer-events-none" />
                  </div>

                  {/* Conteúdo com saída fade (0.2s) e entrada subindo 16px com fade (0.35s) */}
                  <div className="p-8 md:p-10">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={activeService.title}
                        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: shouldReduceMotion ? 0 : 0.35,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        }}
                        exit={{
                          opacity: shouldReduceMotion ? 1 : 0,
                          y: 0,
                          transition: {
                            duration: shouldReduceMotion ? 0 : 0.2,
                            ease: "easeOut",
                          },
                        }}
                      >
                        <div className="flex items-center gap-3 text-gold mb-4">
                          {activeService.icon}
                          <h4 className="text-2xl md:text-3xl font-serif text-ice">{activeService.title}</h4>
                        </div>

                        <p className="text-ice/60 text-sm md:text-base leading-relaxed mb-6 max-w-[680px]">
                          {activeService.desc}
                        </p>

                        <ul className="flex flex-wrap gap-x-6 gap-y-3 mb-8">
                          {activeService.features.map((f, i) => (
                            <li key={i} className="flex items-center gap-2.5 text-[10px] uppercase tracking-widest text-ice/50">
                              <div className="w-1.5 h-1.5 bg-gold rounded-full shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-3 bg-gold text-navy px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white transition-all duration-300 group shadow-lg shadow-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          Falar sobre este caso
                          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Seção "Depoimentos" */}
      <section className="py-[56px] md:py-[96px] bg-lead/5">
        <div className="w-[calc(100%-40px)] md:w-[calc(100%-96px)] max-w-[1320px] mx-auto">
          <motion.div {...fadeIn} className="text-left mb-[40px]">
            <h2 className="text-gold uppercase tracking-[0.4em] text-xs font-semibold mb-4">Reconhecimento</h2>
            <h3 className="text-4xl font-serif">O que dizem nossos clientes</h3>
          </motion.div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            {[
              {
                text: "A atuação da Dra. Helena foi decisiva para a reestruturação da nossa empresa. Profissionalismo e visão estratégica impecáveis.",
                author: "Carlos Mendes",
                role: "CEO, TechInvest Group"
              },
              {
                text: "Encontramos no escritório Figueiredo Advocacia a segurança que precisávamos para o nosso planejamento sucessório familiar. Recomendo fortemente.",
                author: "Helena Albuquerque",
                role: "Diretora Executiva"
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                {...fadeIn}
                className="w-full p-10 rounded-3xl border border-gold/10 bg-navy relative"
              >
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-gold text-gold" />)}
                </div>
                <p className="text-ice/80 font-serif text-lg mb-8 leading-relaxed max-w-[680px]">"{item.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
                    {item.author[0]}
                  </div>
                  <div>
                    <div className="text-ice font-medium text-sm">{item.author}</div>
                    <div className="text-ice/40 text-[10px] uppercase tracking-widest">{item.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção FAQ */}
      <section id="faq" className="py-[56px] md:py-[96px]">
        <div className="w-[calc(100%-40px)] md:w-[calc(100%-96px)] max-w-[1320px] mx-auto">
          <motion.div {...fadeIn} className="text-left mb-[40px] max-w-[680px]">
            <h2 className="text-gold uppercase tracking-[0.4em] text-xs font-semibold mb-4">FAQ</h2>
            <h3 className="text-4xl font-serif">Dúvidas Frequentes</h3>
          </motion.div>
          
          <motion.div {...fadeIn} className="w-full max-w-[680px] space-y-4">
            <FAQItem 
              question="Como funciona a primeira consulta?" 
              answer="A primeira consulta é um momento de diagnóstico. Analisamos os fatos, documentos e objetivos para traçar um plano de ação estratégico e transparente." 
            />
            <FAQItem 
              question="O escritório atende em todo o Brasil?" 
              answer="Sim. Através de ferramentas digitais e uma rede de parceiros estratégicos, atuamos em tribunais de todo o território nacional, com foco especial em instâncias superiores." 
            />
            <FAQItem 
              question="Quais são os honorários praticados?" 
              answer="Nossos honorários são estabelecidos de acordo com a complexidade da causa e o valor envolvido, sempre seguindo a tabela da OAB e prezando pela transparência total." 
            />
          </motion.div>
        </div>
      </section>

      {/* Footer / CTA Final */}
      <footer className="py-[56px] md:py-[96px] bg-lead/20 border-t border-gold/10 relative overflow-hidden">
        <div className="w-[calc(100%-40px)] md:w-[calc(100%-96px)] max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[64px] mb-[56px] md:mb-[96px]">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl md:text-5xl font-serif mb-[40px] leading-tight">Vamos iniciar sua <br /><span className="text-gold">Defesa Estratégica</span>?</h2>
              <p className="text-ice/60 mb-10 text-lg font-light max-w-[680px]">
                Estamos prontos para ouvir seu caso e oferecer a melhor solução jurídica. Atendimento exclusivo e sob total sigilo.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-ice/80">
                  <MapPin size={20} className="text-gold" />
                  <span className="text-sm">Av. Faria Lima, 1500 - Itaim Bibi, São Paulo - SP</span>
                </div>
                <div className="flex items-center gap-4 text-ice/80">
                  <Phone size={20} className="text-gold" />
                  <span className="text-sm">+55 (11) 99999-9999</span>
                </div>
                <div className="flex items-center gap-4 text-ice/80">
                  <Mail size={20} className="text-gold" />
                  <span className="text-sm">contato@figueiredo.adv.br</span>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="w-full glass p-10 rounded-[2.5rem] border border-white/5">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px]">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-ice/40 ml-2">Nome</label>
                    <input type="text" className="w-full bg-navy/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none transition-colors" placeholder="Seu nome" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-ice/40 ml-2">WhatsApp</label>
                    <input type="text" className="w-full bg-navy/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none transition-colors" placeholder="(00) 00000-0000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-ice/40 ml-2">Assunto</label>
                  <select className="w-full bg-navy/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none transition-colors appearance-none">
                    <option>Direito Tributário</option>
                    <option>Proteção Patrimonial</option>
                    <option>Direito Civil</option>
                    <option>Outros</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-ice/40 ml-2">Mensagem</label>
                  <textarea className="w-full bg-navy/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none transition-colors h-32 resize-none" placeholder="Como podemos ajudar?"></textarea>
                </div>
                <button className="w-full bg-gold text-navy font-bold uppercase tracking-widest text-xs py-5 rounded-xl hover:bg-white transition-all duration-500">
                  Enviar Mensagem
                </button>
              </form>
            </motion.div>
          </div>

          <div className="pt-12 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
              }}
              className="flex flex-col items-center md:items-start cursor-pointer hover:opacity-90 transition-opacity"
            >
              <span className="text-gold font-serif text-xl font-bold tracking-[0.2em] uppercase">Figueiredo</span>
              <span className="text-[8px] text-ice/40 uppercase tracking-[0.4em] mt-1">Excelência em cada detalhe</span>
            </a>
            
            <div className="flex gap-8">
              <a href="#" className="text-ice/40 hover:text-gold transition-colors"><Instagram size={24} /></a>
              <a href="#" className="text-ice/40 hover:text-gold transition-colors"><Linkedin size={24} /></a>
            </div>

            <div className="text-[10px] uppercase tracking-widest text-ice/30 text-center md:text-right">
              © 2024 Figueiredo Advocacia. <br />
              Desenvolvido por Studio Premium.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

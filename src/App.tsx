/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
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

  return (
    <div className="min-h-screen bg-navy selection:bg-gold selection:text-navy overflow-x-hidden">
      {/* Header Fixo */}
      <header className="fixed top-0 left-0 right-0 z-50 glass py-5 px-6 md:px-12 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-gold font-serif text-xl font-bold tracking-[0.2em] uppercase leading-none">Vanguarda</span>
          <span className="text-[8px] text-ice/40 uppercase tracking-[0.4em] mt-1">Advocacia Estratégica</span>
        </div>
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
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-gold/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-gold/5 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-gold uppercase tracking-[0.4em] text-xs font-semibold mb-6">
              Excelência Jurídica
            </h2>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-[1.1]">
              Protegendo seu <br />
              <span className="italic font-normal text-gold/90">Patrimônio</span> com <br />
              Autoridade.
            </h1>
            <p className="text-ice/60 text-lg mb-12 leading-relaxed font-light max-w-md">
              Soluções jurídicas personalizadas para clientes que exigem discrição, agilidade e resultados concretos em questões complexas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-gold text-navy px-10 py-5 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white transition-all duration-500 animate-pulse-gold group shadow-2xl shadow-gold/20"
              >
                Solicitar Consultoria
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center gap-4 px-6 py-4 rounded-full border border-ice/10 glass">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-navy bg-lead overflow-hidden">
                      <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="Client" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-ice/50">
                  <span className="text-ice font-bold">+500 Clientes</span> <br /> Satisfeitos
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden border border-gold/20 aspect-[4/5] shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000" 
                alt="Dra. Helena Vanguarda" 
                className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8 right-8 p-6 glass rounded-2xl border border-white/5">
                <div className="text-gold font-serif text-2xl mb-1">Dra. Helena Vanguarda</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-ice/60">OAB/SP 123.456</div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-gold/30 rounded-tr-3xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-gold/30 rounded-bl-3xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Seção "Sobre" */}
      <section id="sobre" className="py-32 px-6 bg-lead/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-gold uppercase tracking-[0.4em] text-xs font-semibold mb-8">Nossa História</h2>
              <h3 className="text-4xl md:text-5xl font-serif mb-10 leading-tight">Compromisso com a <span className="italic">Verdade</span> e a Justiça.</h3>
              <p className="text-ice/70 leading-relaxed mb-8 text-lg font-light">
                Fundado com o propósito de redefinir o conceito de assessoria jurídica, o escritório Vanguarda Advocacia combina tradição com uma visão moderna e tecnológica do direito, sob a liderança da Dra. Helena Vanguarda.
              </p>
              <div className="grid grid-cols-2 gap-8">
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
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="relative">
              <img 
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800" 
                alt="Law Office" 
                className="rounded-3xl grayscale opacity-60 hover:opacity-100 transition-opacity duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -right-10 glass p-8 rounded-2xl border border-white/10 hidden lg:block">
                <blockquote className="text-ice/80 italic font-serif text-lg mb-4">
                  "O direito não é apenas uma regra, é a base da liberdade."
                </blockquote>
                <div className="text-gold text-xs uppercase tracking-widest">— Rui Barbosa</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seção "Serviços" */}
      <section id="servicos" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-20">
            <h2 className="text-gold uppercase tracking-[0.4em] text-xs font-semibold mb-4">Especialidades</h2>
            <h3 className="text-4xl md:text-5xl font-serif">Áreas de Atuação Estratégica</h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Scale size={32} />, 
                title: "Direito Tributário", 
                desc: "Otimização fiscal e defesa em processos administrativos e judiciais de alta complexidade.",
                features: ["Planejamento Fiscal", "Recuperação de Créditos", "Defesa em Execuções"]
              },
              { 
                icon: <ShieldCheck size={32} />, 
                title: "Proteção Patrimonial", 
                desc: "Estruturação de holdings e estratégias sucessórias para preservação de bens familiares.",
                features: ["Holdings Familiares", "Planejamento Sucessório", "Blindagem Jurídica"]
              },
              { 
                icon: <Gavel size={32} />, 
                title: "Direito Civil & Contratos", 
                desc: "Elaboração de instrumentos jurídicos robustos e representação em litígios civis.",
                features: ["Contratos Internacionais", "Responsabilidade Civil", "Direito Imobiliário"]
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="glass p-10 rounded-[2.5rem] border border-white/5 hover:border-gold/30 transition-all duration-500 group"
              >
                <div className="text-gold mb-8 group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-serif mb-6">{item.title}</h4>
                <p className="text-ice/60 text-sm leading-relaxed mb-8">{item.desc}</p>
                <ul className="space-y-3">
                  {item.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-ice/40">
                      <div className="w-1 h-1 bg-gold rounded-full" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção "Depoimentos" */}
      <section className="py-32 px-6 bg-lead/5">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-20">
            <h2 className="text-gold uppercase tracking-[0.4em] text-xs font-semibold mb-4">Reconhecimento</h2>
            <h3 className="text-4xl font-serif">O que dizem nossos clientes</h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                text: "A atuação da Dra. Helena foi decisiva para a reestruturação da nossa empresa. Profissionalismo e visão estratégica impecáveis.",
                author: "Carlos Mendes",
                role: "CEO, TechInvest Group"
              },
              {
                text: "Encontramos no escritório Vanguarda a segurança que precisávamos para o nosso planejamento sucessório familiar. Recomendo fortemente.",
                author: "Helena Albuquerque",
                role: "Diretora Executiva"
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                {...fadeIn}
                className="p-10 rounded-3xl border border-gold/10 bg-navy relative"
              >
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-gold text-gold" />)}
                </div>
                <p className="text-ice/80 italic font-serif text-lg mb-8 leading-relaxed">"{item.text}"</p>
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
      <section id="faq" className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-gold uppercase tracking-[0.4em] text-xs font-semibold mb-4">FAQ</h2>
            <h3 className="text-4xl font-serif">Dúvidas Frequentes</h3>
          </motion.div>
          
          <motion.div {...fadeIn} className="space-y-4">
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
      <footer className="py-32 px-6 bg-lead/20 border-t border-gold/10 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 mb-20">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Vamos iniciar sua <br /><span className="text-gold italic">Defesa Estratégica</span>?</h2>
              <p className="text-ice/60 mb-12 text-lg font-light">
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
                  <span className="text-sm">contato@vanguarda.adv.br</span>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="glass p-10 rounded-[2.5rem] border border-white/5">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-6">
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
            <div className="flex flex-col items-center md:items-start">
              <span className="text-gold font-serif text-xl font-bold tracking-[0.2em] uppercase">Vanguarda</span>
              <span className="text-[8px] text-ice/40 uppercase tracking-[0.4em] mt-1">Excelência em cada detalhe</span>
            </div>
            
            <div className="flex gap-8">
              <a href="#" className="text-ice/40 hover:text-gold transition-colors"><Instagram size={24} /></a>
              <a href="#" className="text-ice/40 hover:text-gold transition-colors"><Linkedin size={24} /></a>
            </div>

            <div className="text-[10px] uppercase tracking-widest text-ice/30 text-center md:text-right">
              © 2024 Vanguarda Advocacia. <br />
              Desenvolvido por Studio Premium.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

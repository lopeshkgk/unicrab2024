import { useState, useEffect, useRef } from "react";
import mapaImg from "../imports/WhatsApp_Image_2026-08-07_at_08.56.58__1_-1.jpeg";
import quemSomosImg from "../imports/Rio_Grande_do_Sul_-_Ato_Pol_tico_e_Almo_o__Foto__Priscila_Ramos.jpg";
import dirEderson from "../imports/WhatsApp_Image_2026-08-31_at_14.20.24__1_.jpeg";
import dirClarice from "../imports/WhatsApp_Image_2026-08-31_at_14.20.24.jpeg";
import dirAlzerina from "../imports/WhatsApp_Image_2026-08-31_at_14.20.23.jpeg";
import dirPaula from "../imports/WhatsApp_Image_2026-08-31_at_14.21.04.jpeg";
import { toast, Toaster } from "sonner";
import {
  Menu, X, ChevronRight, MapPin, Calendar, FileText, Phone, Mail,
  Globe, ExternalLink, ArrowRight,
  Users, Building2, Sprout, Handshake, Download, Plus, Trash2,
  Edit3, Save, LogOut, Eye, EyeOff, Image as ImageIcon,
  Newspaper, Settings, Lock, ChevronDown, Star
} from "lucide-react";

// ─── Brand Colors ─────────────────────────────────────────────────────────────
const C = {
  green: "#0B6821", lime: "#7EB229", red: "#E42232",
  yellow: "#FFC23B", brown: "#5F2F14", white: "#FFFFFF",
  bg: "#f5f7f2", dark: "#1a2e14",
};

// ─── Default Data ─────────────────────────────────────────────────────────────
const DEFAULT_HERO_IMG =
  "https://images.unsplash.com/photo-1735504646725-0a5e69c4c9ac?w=1600&h=900&fit=crop&auto=format";

const DEFAULT_NEWS = [
  {
    id: "1", categoria: "Cooperação Internacional",
    titulo: "Projeto do MST para agricultura familiar é reconhecido pela China entre 10 exemplos de IA que podem beneficiar o mundo",
    data: "24 Jul 2026", fonte: "Brasil de Fato",
    img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=500&fit=crop&auto=format",
    destaque: true,
    link: "https://www.brasildefato.com.br/2026/07/24/projeto-do-mst-para-agricultura-familiar-e-reconhecido-pela-china-entre-10-exemplos-de-ia-que-podem-beneficiar-o-mundo/",
  },
  {
    id: "2", categoria: "Agroindústria",
    titulo: "Cooperativa de agricultores da reforma agrária lança primeira agroindústria no Distrito Federal",
    data: "02 Jul 2026", fonte: "Brasil de Fato",
    img: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=500&fit=crop&auto=format",
    destaque: false,
    link: "https://www.brasildefato.com.br/2026/07/02/cooperativa-agricultores-reforma-agraria-lanca-primeira-agroindustria-no-distrito-federal/",
  },
  {
    id: "3", categoria: "Institucional",
    titulo: "Cooperativismo solidário e popular recebe homenagem da Assembleia Legislativa do Paraná",
    data: "30 Abr 2026", fonte: "MST",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop&auto=format",
    destaque: false,
    link: "https://mst.org.br/2026/04/30/cooperativismo-solidario-e-popular-recebe-homenagem-da-alep/",
  },
  {
    id: "4", categoria: "Economia",
    titulo: "Cooperativas geram R$ 389 milhões em negócios internacionais em evento da ApexBrasil",
    data: "15 Mar 2026", fonte: "Mundo Coop",
    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop&auto=format",
    destaque: false,
    link: "https://mundocoop.com.br/acontece-no-setor/cooperativas-geram-r-389-milhoes-em-negocios-internacionais-em-evento-da-apexbrasil/",
  },
];

type NewsItem = typeof DEFAULT_NEWS[0];

// ─── Editais Types & Defaults ─────────────────────────────────────────────────
type Edital = {
  id: string;
  titulo: string;
  numero: string;
  objeto: string;
  dataAbertura: string;
  dataEncerramento: string;
  status: "Aberto" | "Encerrado" | "Em análise" | "Homologado";
  arquivo: string;
  orgao: string;
};

// ─── Projeto Types & Defaults ─────────────────────────────────────────────────
type Projeto = {
  id: string;
  titulo: string;
  resumo: string;
  territorio: string;
  parceiros: string;
  status: "Em andamento" | "Concluído" | "Planejado";
  tema: string;
  img: string;
  link: string;
};

const TEMAS_PROJETOS = ["Todos", "Evento", "Cooperação Internacional", "Agroindústria", "Institucional", "Formação", "Economia"];

const DEFAULT_PROJETOS: Projeto[] = [
  { id: "p1", titulo: "Feira Nacional da Reforma Agrária", resumo: "A maior feira da reforma agrária do Brasil, reunindo produtores agroecológicos de todo o país em São Paulo.", territorio: "São Paulo – SP", parceiros: "MST, UNICOPAS", status: "Concluído", tema: "Evento", img: "https://images.unsplash.com/photo-1737154758445-7fcae87148ed?w=600&h=400&fit=crop&auto=format", link: "https://mst.org.br/especiais/feira-nacional-da-reforma-agraria-2025/" },
  { id: "p2", titulo: "Cooperação Brasil–China em IA Agrícola", resumo: "Projeto reconhecido pela China entre os 10 exemplos de IA que podem beneficiar o mundo na agricultura familiar.", territorio: "Nacional", parceiros: "Sinomach, Embrapa", status: "Em andamento", tema: "Cooperação Internacional", img: "https://images.unsplash.com/photo-1735504646590-88988726512d?w=600&h=400&fit=crop&auto=format", link: "https://www.brasildefato.com.br/2026/07/24/projeto-do-mst-para-agricultura-familiar-e-reconhecido-pela-china-entre-10-exemplos-de-ia-que-podem-beneficiar-o-mundo/" },
  { id: "p3", titulo: "Primeira Agroindústria no Distrito Federal", resumo: "Cooperativa de agricultores da reforma agrária lança a primeira agroindústria no Distrito Federal.", territorio: "Distrito Federal", parceiros: "MDA, INCRA", status: "Concluído", tema: "Agroindústria", img: "https://images.unsplash.com/photo-1767103593977-217ae79c9de3?w=600&h=400&fit=crop&auto=format", link: "https://www.brasildefato.com.br/2026/07/02/cooperativa-agricultores-reforma-agraria-lanca-primeira-agroindustria-no-distrito-federal/" },
  { id: "p4", titulo: "Encontro Nacional das Cooperativas 2025", resumo: "Segundo encontro nacional reafirma a importância do cooperativismo popular e planeja a expansão da rede.", territorio: "Nacional", parceiros: "UNICOPAS, FINAPOP", status: "Concluído", tema: "Institucional", img: "https://images.unsplash.com/photo-1735504648103-497ddbd3b749?w=600&h=400&fit=crop&auto=format", link: "https://mst.org.br/2025/02/27/encontro-nacional-das-cooperativas-de-reforma-agraria-2025/" },
  { id: "p5", titulo: "Programa de Formação Agroecológica", resumo: "Capacitações em práticas agroecológicas para cooperados de todas as regiões do Brasil.", territorio: "5 Regiões", parceiros: "CREHNOR, Raízes", status: "Em andamento", tema: "Formação", img: "https://images.unsplash.com/photo-1735504647328-29640120e46f?w=600&h=400&fit=crop&auto=format", link: "https://mst.org.br/2025/05/11/cooperativas-do-mst-colheitas-de-resistencia-e-esperanca-no-campo-brasileiro/" },
  { id: "p6", titulo: "Exportações via APEX-Brasil", resumo: "Cooperativas da reforma agrária geram R$ 389 milhões em negócios internacionais em evento da ApexBrasil.", territorio: "Nacional", parceiros: "APEX-Brasil, MDIC", status: "Concluído", tema: "Economia", img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop&auto=format", link: "https://mundocoop.com.br/acontece-no-setor/cooperativas-geram-r-389-milhoes-em-negocios-internacionais-em-evento-da-apexbrasil/" },
];

const DEFAULT_EDITAIS: Edital[] = [
  {
    id: "e1",
    titulo: "Chamada Pública para Aquisição de Produtos da Agricultura Familiar",
    numero: "001/2026",
    objeto: "Aquisição de alimentos da agricultura familiar para programas de alimentação escolar (PNAE) em territórios da reforma agrária.",
    dataAbertura: "01 Mar 2026",
    dataEncerramento: "30 Abr 2026",
    status: "Encerrado",
    arquivo: "",
    orgao: "MDA / FNDE",
  },
  {
    id: "e2",
    titulo: "Edital de Seleção de Projetos de Agroecologia e Cooperativismo",
    numero: "002/2026",
    objeto: "Seleção de projetos voltados ao fortalecimento da agroecologia e do cooperativismo popular nos territórios da reforma agrária.",
    dataAbertura: "01 Jun 2026",
    dataEncerramento: "31 Ago 2026",
    status: "Aberto",
    arquivo: "",
    orgao: "FINEP / UNICRAB",
  },
];

// ─── Supabase Cloud Store ─────────────────────────────────────────────────────
const EDGE = "https://mabvcstrksqmcdkozkwv.supabase.co/functions/v1/server";
const ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hYnZjc3Rya3NxbWNka296a3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5MTk4NDMsImV4cCI6MjEwNDQ5NTg0M30.DMjCZt2NgNtPXJyyXLNvLZWKwOjY_09CrV6XXfUUHOk";

async function cloudGet(key: string): Promise<any> {
  const r = await fetch(`${EDGE}/make-server-9255bd65/kv/${key}`, {
    headers: { Authorization: `Bearer ${ANON}` },
  });
  const d = await r.json();
  return d.value ?? null;
}

async function cloudSet(key: string, value: any): Promise<void> {
  await fetch(`${EDGE}/make-server-9255bd65/kv/${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${ANON}` },
    body: JSON.stringify({ value }),
  });
}

// Starts with localStorage for instant render, fetches cloud on mount, writes to both.
// Cloud always wins on mount — ensures cross-device sync.
function useStore<T>(key: string, defaultVal: T): [T, (v: T) => void] {
  const [val, setVal] = useState<T>(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? JSON.parse(s) : defaultVal;
    } catch { return defaultVal; }
  });

  useEffect(() => {
    cloudGet(key).then(cloudVal => {
      if (cloudVal !== null && cloudVal !== undefined) {
        setVal(cloudVal);
        localStorage.setItem(key, JSON.stringify(cloudVal));
      }
    }).catch(() => {});
  }, [key]);

  const set = (v: T) => {
    setVal(v);
    localStorage.setItem(key, JSON.stringify(v));
    cloudSet(key, v).catch(() => {});
  };

  return [val, set];
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function UnicrabLogo({ size = 40, white = false }: { size?: number; white?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
        <path d="M4 4 H30 V20 Q20 20 14 28 Q8 36 8 44 H4 Z" fill={white ? "rgba(255,255,255,0.9)" : C.red} />
        <path d="M30 4 H56 V4 Q56 4 44 14 Q36 20 30 20 Z" fill={white ? "rgba(255,255,255,0.7)" : C.yellow} />
        <path d="M30 20 Q36 20 44 14 Q52 8 56 4 V28 Q50 28 42 34 Q36 38 30 38 Q24 38 18 34 Q12 30 8 24 Q14 28 20 24 Q24 22 30 20 Z" fill={white ? "rgba(255,255,255,0.8)" : C.lime} />
        <path d="M8 24 Q12 30 18 34 Q24 38 30 38 Q36 38 42 34 Q50 28 56 28 V44 Q50 44 42 50 Q36 54 30 56 Q24 56 18 52 Q12 48 8 44 Z" fill={white ? "rgba(255,255,255,0.6)" : C.green} />
        <path d="M8 44 Q12 48 18 52 Q24 56 30 56 Q36 54 42 50 Q50 44 56 44 V56 H4 V44 Z" fill={white ? "rgba(255,255,255,0.4)" : C.brown} />
      </svg>
      <span style={{
        fontFamily: "'Gabarito', sans-serif", fontWeight: 800, fontSize: size * 0.52,
        letterSpacing: "0.04em",
        background: white ? C.white : `linear-gradient(135deg, ${C.green} 0%, ${C.lime} 100%)`,
        WebkitBackgroundClip: white ? undefined : "text",
        WebkitTextFillColor: white ? C.white : "transparent",
        backgroundClip: white ? undefined : "text",
        color: white ? C.white : undefined,
        lineHeight: 1,
      }}>UNICRAB</span>
    </div>
  );
}

// ─── Wave Separator ───────────────────────────────────────────────────────────
function WaveSeparator({ topColor, bottomColor }: { topColor: string; bottomColor: string }) {
  return (
    <div style={{ backgroundColor: bottomColor, marginTop: -2 }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block" }}>
        <path d="M0,0 C360,80 1080,0 1440,60 L1440,0 Z" fill={topColor} />
      </svg>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
const navLinks = [
  { label: "Quem Somos", href: "#quem-somos" },
  { label: "Diretoria", href: "#diretoria" },
  { label: "Rede UNICRAB", href: "#rede" },
  { label: "Nossas Ações", href: "#acoes" },
  { label: "Parcerias", href: "#parcerias" },
  { label: "Notícias", href: "#noticias" },
  { label: "Transparência", href: "#transparencia" },
  { label: "Contato", href: "#contato" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ backgroundColor: scrolled ? C.green : "rgba(11,104,33,0.82)", backdropFilter: "blur(6px)", boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.2)" : "none" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
        <a href="#"><UnicrabLogo size={36} white /></a>
        <nav className="hidden xl:flex items-center gap-0.5">
          {navLinks.map(l => (
            <a key={l.label} href={l.href}
              className="px-2.5 py-2 text-xs font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              style={{ fontFamily: "'Gabarito', sans-serif" }}>{l.label}</a>
          ))}
          <a href="#filiacao"
            className="ml-3 px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: C.red, fontFamily: "'Gabarito', sans-serif" }}>Filie-se</a>
        </nav>
        <button onClick={() => setOpen(!open)} className="xl:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="xl:hidden" style={{ backgroundColor: C.green }}>
          <nav className="flex flex-col px-4 pb-6 gap-1">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                className="px-4 py-3 text-white font-semibold hover:bg-white/10 rounded-lg transition-colors"
                style={{ fontFamily: "'Gabarito', sans-serif" }}>{l.label}</a>
            ))}
            <a href="#filiacao"
              className="mt-2 px-5 py-3 rounded-full text-center font-bold text-white"
              style={{ backgroundColor: C.red, fontFamily: "'Gabarito', sans-serif" }}>Filie-se</a>
          </nav>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection({ heroImg }: { heroImg: string }) {
  return (
    <section className="relative min-h-screen flex flex-col" style={{ backgroundColor: C.green }}>
      <div className="absolute inset-0 overflow-hidden">
        <img src={heroImg} alt="Trabalhadores rurais em cooperativa" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${C.green}ee 0%, ${C.green}99 50%, ${C.green}cc 100%)` }} />
      </div>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <path d="M0,600 C200,500 400,700 600,580 C800,460 1000,620 1200,540 C1350,480 1420,560 1440,540 L1440,900 L0,900 Z" fill={C.lime} opacity="0.12" />
        <path d="M0,700 C250,650 500,750 750,680 C1000,610 1200,700 1440,660 L1440,900 L0,900 Z" fill={C.brown} opacity="0.18" />
        <circle cx="1300" cy="150" r="280" fill={C.yellow} opacity="0.06" />
      </svg>
      <div className="relative flex-1 flex items-center max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-8"
            style={{ backgroundColor: C.yellow, color: C.dark, fontFamily: "'Gabarito', sans-serif" }}>
            <Sprout size={16} />União Nacional das Cooperativas da Reforma Agrária Popular
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.05]"
            style={{ fontFamily: "'Gabarito', sans-serif" }}>
            Cooperar para o<br /><span style={{ color: C.yellow }}>Brasil Alimentar</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/85 mb-10 leading-relaxed max-w-2xl"
            style={{ fontFamily: "'Gabarito', sans-serif" }}>
            Fortalecemos a agricultura camponesa, a agroecologia e a reforma agrária popular por meio do cooperativismo solidário em todo o território nacional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#quem-somos"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg text-white transition-all hover:scale-105"
              style={{ backgroundColor: C.red, fontFamily: "'Gabarito', sans-serif" }}>
              Conheça a UNICRAB <ArrowRight size={20} />
            </a>
            <a href="#acoes"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg border-2 border-white/60 text-white hover:bg-white/10 transition-all"
              style={{ fontFamily: "'Gabarito', sans-serif" }}>Nossas Ações</a>
          </div>
        </div>
      </div>
      <WaveSeparator topColor={C.green} bottomColor={C.bg} />
    </section>
  );
}


// ─── Quem Somos ───────────────────────────────────────────────────────────────
function QuemSomosSection() {
  return (
    <section id="quem-somos" style={{ backgroundColor: C.green }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: C.yellow, fontFamily: "'Gabarito', sans-serif" }}>Quem Somos</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-6 leading-tight" style={{ fontFamily: "'Gabarito', sans-serif" }}>
              Cooperar para o<br /><span style={{ color: C.lime }}>Brasil Alimentar</span>
            </h2>

            {/* Missão */}
            <div className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
              <div className="font-black text-lg mb-3" style={{ color: C.yellow, fontFamily: "'Gabarito', sans-serif" }}>Missão</div>
              <p className="text-white/85 leading-relaxed" style={{ fontFamily: "'Gabarito', sans-serif" }}>
                A UNICRAB tem como missão promover o desenvolvimento socioeconômico, o combate à pobreza e a construção da Reforma Agrária Popular, por meio do fortalecimento da organização cooperativa camponesa.
              </p>
            </div>

            {/* Objetivos */}
            <div className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
              <div className="font-black text-lg mb-3" style={{ color: C.lime, fontFamily: "'Gabarito', sans-serif" }}>Objetivos</div>
              <p className="text-white/80 leading-relaxed text-sm" style={{ fontFamily: "'Gabarito', sans-serif" }}>
                A União das Cooperativas e Associações de Reforma Agrária do Brasil (UNICRAB) é a representação nacional do Sistema Cooperativista dos Assentamentos e Acampamentos da Reforma Agrária Popular. Com atuação em 25 estados brasileiros, a UNICRAB articula mais de 1.900 associações, cerca de 200 cooperativas, 120 agroindústrias e diversas empresas sociais, que atuam de forma coletiva e solidária para transformar os territórios da reforma agrária, fortalecer a agricultura camponesa, promover a agroecologia, ampliar a produção de alimentos saudáveis e contribuir para o desenvolvimento social e econômico do Brasil.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Visão", texto: "Ser referência nacional em cooperativismo solidário e agroecológico" },
                { label: "Valores", texto: "Solidariedade, democracia, transparência e justiça social" },
              ].map(item => (
                <div key={item.label} className="rounded-xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                  <div className="font-bold mb-1" style={{ color: C.yellow, fontFamily: "'Gabarito', sans-serif" }}>{item.label}</div>
                  <div className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: "'Gabarito', sans-serif" }}>{item.texto}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
              <img src={quemSomosImg}
                alt="Ato político e almoço no Rio Grande do Sul – Foto: Priscila Ramos" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.green}88 0%, transparent 60%)` }} />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl px-6 py-4 shadow-xl" style={{ backgroundColor: C.yellow }}>
              <div className="text-3xl font-black" style={{ color: C.dark, fontFamily: "'Gabarito', sans-serif" }}>2024</div>
              <div className="text-sm font-bold" style={{ color: C.dark, fontFamily: "'Gabarito', sans-serif" }}>Ano de fundação</div>
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-40" style={{ backgroundColor: C.lime }} />
          </div>
        </div>
      </div>
      <WaveSeparator topColor={C.green} bottomColor={C.bg} />
    </section>
  );
}

// ─── Diretoria ────────────────────────────────────────────────────────────────
const diretores = [
  {
    cargo: "Presidente",
    nome: "Ederson Moreira",
    apelido: "Diego Moreira",
    bio: "Agricultor e assentado da reforma agrária em Centenário do Sul (PR), desde 1996 em atuação. Trajetória marcada pelo trabalho nos Setores de Formação, Produção, Cooperação e Meio Ambiente.",
    destaques: [
      "Atua em pautas de cooperativismo e agroecologia, com atuação em Brasília",
      "Presidente da UNICRAB e integrante da Coordenação Nacional do MST",
      "Integra a diretoria da União Nacional das Organizações Cooperativistas Solidárias",
    ],
    cor: C.green,
    img: dirEderson,
  },
  {
    cargo: "Vice-Presidente",
    nome: "Clarice Rodrigues",
    apelido: null,
    bio: "Administradora e doutora em Agroecologia e Desenvolvimento Territorial pela Universidade Federal Rural de Pernambuco (UFRPE). Desenvolve ações voltadas à agroecologia, à reforma agrária e ao fortalecimento da agricultura familiar no Ceará.",
    destaques: [
      "Coordena o Centro de Formação, Capacitação e Pesquisa Frei Humberto, referência na formação e pesquisa voltadas ao campo",
      "Coordena a Feira Cultural da Reforma Agrária, evento anual em Fortaleza desde 2016",
      "Desde 2024, é vice-presidenta da UNICRAB",
    ],
    cor: C.lime,
    img: dirClarice,
  },
  {
    cargo: "Secretária Geral",
    nome: "Maria Alzerina Montelo",
    apelido: null,
    bio: "Assentada da Reforma Agrária e moradora do Assentamento Cristina, no município de Itapecuru Mirim no Maranhão. Agricultora e produtora rural com foco na agroecologia e cooperação nos territórios da Amazônia Legal.",
    destaques: [
      "Presidente da Cooperativa Mista do Vale do Itapecuru",
      "Atua pelo fortalecimento da agricultura familiar e agroecologia nos territórios da Reforma Agrária",
      "Secretária da UNICRAB, representando as vozes da Amazônia Legal",
    ],
    cor: C.red,
    img: dirAlzerina,
  },
  {
    cargo: "Tesoureira",
    nome: "Paula Ribeiro Guimarães",
    apelido: null,
    bio: "Engenheira agrônoma pela Universidade Federal dos Vales do Jequitinhonha e Mucuri (UFVJM). Atua nas áreas de agroecologia, economia popular e solidária, comercialização e abastecimento de alimentos saudáveis.",
    destaques: [
      "Coordenadora da Cooperativa Camponesa Central de Minas Gerais (CONCENTRA)",
      "Atua na comercialização, economia popular e solidária e abastecimento de alimentos saudáveis da Reforma Agrária",
      "Tesoureira da UNICRAB, contribuindo para o fortalecimento da gestão cooperativista nacional",
    ],
    cor: C.yellow,
    img: dirPaula,
  },
];

function DiretoriaSection() {
  const [ativo, setAtivo] = useState(0);
  const dir = diretores[ativo];

  return (
    <section id="diretoria" className="py-20 md:py-28" style={{ backgroundColor: C.bg }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-bold uppercase tracking-widest" style={{ color: C.red, fontFamily: "'Gabarito', sans-serif" }}>Governança</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 mb-4" style={{ color: C.green, fontFamily: "'Gabarito', sans-serif" }}>Diretoria da UNICRAB</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={{ fontFamily: "'Gabarito', sans-serif" }}>
            Liderança democrática, plural e comprometida com a reforma agrária popular e o cooperativismo camponês.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {diretores.map((d, i) => (
            <button key={d.nome} onClick={() => setAtivo(i)}
              className="px-5 py-3 rounded-full text-sm font-bold transition-all duration-200"
              style={{
                backgroundColor: ativo === i ? d.cor : C.white,
                color: ativo === i ? C.white : C.dark,
                border: `2px solid ${d.cor}`,
                fontFamily: "'Gabarito', sans-serif",
                boxShadow: ativo === i ? `0 4px 16px ${d.cor}44` : "none",
              }}>
              {d.cargo}
            </button>
          ))}
        </div>

        {/* Card */}
        <div className="rounded-3xl overflow-hidden shadow-xl grid lg:grid-cols-2" style={{ backgroundColor: C.white }}>
          <div className="relative h-72 lg:h-auto min-h-[380px] overflow-hidden" style={{ backgroundColor: `${dir.cor}20` }}>
            <img src={dir.img} alt={dir.nome} className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${dir.cor}cc 0%, transparent 50%)` }} />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="px-3 py-1.5 rounded-full text-xs font-black text-white inline-block mb-2"
                style={{ backgroundColor: dir.cor, fontFamily: "'Gabarito', sans-serif" }}>{dir.cargo}</span>
              <h3 className="text-3xl font-black text-white leading-tight" style={{ fontFamily: "'Gabarito', sans-serif" }}>{dir.nome}</h3>
              {dir.apelido && <p className="text-white/70 text-sm mt-1" style={{ fontFamily: "'Gabarito', sans-serif" }}>({dir.apelido})</p>}
            </div>
          </div>

          <div className="p-8 lg:p-10 flex flex-col justify-center">
            <div className="w-12 h-1 rounded-full mb-6" style={{ backgroundColor: dir.cor }} />
            <p className="text-base leading-relaxed mb-8" style={{ color: C.dark, fontFamily: "'Gabarito', sans-serif" }}>{dir.bio}</p>
            <div className="space-y-4">
              {dir.destaques.map((d, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: `${dir.cor}18` }}>
                    <Star size={14} style={{ color: dir.cor }} />
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a5568", fontFamily: "'Gabarito', sans-serif" }}>{d}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {diretores.map((d, i) => (
                <button key={d.nome} onClick={() => setAtivo(i)}
                  className="w-10 h-10 rounded-full transition-all hover:scale-110"
                  style={{ backgroundColor: i === ativo ? d.cor : `${d.cor}30`, border: `2px solid ${d.cor}` }}
                  title={d.cargo} />
              ))}
            </div>
          </div>
        </div>

        {/* Grid rápido */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {diretores.map((d, i) => (
            <button key={d.nome} onClick={() => setAtivo(i)}
              className="rounded-2xl p-4 text-left hover:scale-105 transition-transform"
              style={{ backgroundColor: ativo === i ? d.cor : C.white, border: `2px solid ${d.cor}30` }}>
              <div className="text-xs font-bold mb-1" style={{ color: ativo === i ? "rgba(255,255,255,0.8)" : d.cor, fontFamily: "'Gabarito', sans-serif" }}>{d.cargo}</div>
              <div className="text-sm font-black leading-tight" style={{ color: ativo === i ? C.white : C.dark, fontFamily: "'Gabarito', sans-serif" }}>{d.nome}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Rede Nacional ────────────────────────────────────────────────────────────
function RedeSection() {
  return (
    <section id="rede" style={{ backgroundColor: C.green }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28">
        <div className="text-center mb-14">
          <span className="text-sm font-bold uppercase tracking-widest" style={{ color: C.yellow, fontFamily: "'Gabarito', sans-serif" }}>Atuação Nacional</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4" style={{ fontFamily: "'Gabarito', sans-serif" }}>Presença em todo o Brasil</h2>
        </div>

        {/* Mapa de Cadeias Produtivas */}
        <div className="rounded-3xl overflow-hidden shadow-2xl mb-10" style={{ backgroundColor: C.white }}>
          <div className="p-6 pb-2" style={{ borderBottom: `1px solid ${C.green}12` }}>
            <h3 className="font-black text-xl" style={{ color: C.green, fontFamily: "'Gabarito', sans-serif" }}>
              Cadeias Produtivas da Reforma Agrária
            </h3>
            <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: "'Gabarito', sans-serif" }}>
              Diversidade produtiva presente em todo o território nacional
            </p>
          </div>
          <div className="p-4 md:p-6">
            <img
              src={mapaImg}
              alt="Mapa de Cadeias Produtivas do MST — cadeias produtivas presentes nos estados brasileiros"
              className="w-full rounded-2xl"
              style={{ display: "block" }}
            />
            {/* Fonte obrigatória — sempre visível */}
            <div
              className="mt-5 flex items-start gap-3 rounded-xl px-5 py-4"
              style={{ backgroundColor: `${C.green}08`, border: `1px solid ${C.green}18` }}
            >
              <FileText size={15} style={{ color: C.green, flexShrink: 0, marginTop: 2 }} />
              <p className="text-xs leading-relaxed" style={{ color: "#4a6741", fontFamily: "'Gabarito', sans-serif" }}>
                <strong style={{ color: C.green }}>Fonte:</strong>{" "}
                Pesquisa realizada no âmbito do TED INCRA/UnB/FINATEC — <em>Cooperativismo e Associativismo em Áreas de Reforma Agrária: Potencialidades e Desafios.</em>
              </p>
            </div>
          </div>
        </div>

        {/* Afiliadas UNICRAB */}
        <div className="rounded-3xl p-8 md:p-10" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: C.yellow }}>
              <Building2 size={20} style={{ color: C.dark }} />
            </div>
            <h3 className="text-2xl font-black text-white" style={{ fontFamily: "'Gabarito', sans-serif" }}>Afiliadas UNICRAB</h3>
          </div>
          <p className="text-white/80 leading-relaxed text-lg mb-6" style={{ fontFamily: "'Gabarito', sans-serif" }}>
            A rede UNICRAB reúne cooperativas, associações, agroindústrias e iniciativas coletivas presentes em diferentes territórios do Brasil. Esta área será ampliada futuramente com informações detalhadas sobre as afiliadas da rede.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Página de cooperativas por estado", "Filtros e diretórios institucionais", "Perfis completos das afiliadas"].map(item => (
              <div key={item} className="rounded-xl p-4 flex items-center gap-3" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                <ChevronRight size={16} style={{ color: C.yellow }} />
                <span className="text-white/70 text-sm" style={{ fontFamily: "'Gabarito', sans-serif" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <WaveSeparator topColor={C.green} bottomColor={C.bg} />
    </section>
  );
}

// ─── Nossas Ações ─────────────────────────────────────────────────────────────
function NossasAcoesSection({ projetos }: { projetos: Projeto[] }) {
  const [filtro, setFiltro] = useState("Todos");
  const filtered = filtro === "Todos" ? projetos : projetos.filter(a => a.tema === filtro);
  const statusColor = (s: string) => s === "Em andamento" ? C.lime : C.green;
  return (
    <section id="acoes" style={{ backgroundColor: C.green }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28">
        <div className="text-center mb-12">
          <span className="text-sm font-bold uppercase tracking-widest" style={{ color: C.yellow, fontFamily: "'Gabarito', sans-serif" }}>Nossas Ações</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4" style={{ fontFamily: "'Gabarito', sans-serif" }}>Projetos que Transformam</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {TEMAS_PROJETOS.map(t => (
            <button key={t} onClick={() => setFiltro(t)}
              className="px-4 py-2 rounded-full text-sm font-bold transition-all"
              style={{ backgroundColor: filtro === t ? C.yellow : "rgba(255,255,255,0.15)", color: filtro === t ? C.dark : C.white, fontFamily: "'Gabarito', sans-serif" }}>
              {t}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="rounded-2xl overflow-hidden flex flex-col group hover:scale-[1.02] transition-transform shadow-lg" style={{ backgroundColor: C.white }}>
              <div className="relative h-48 overflow-hidden bg-green-900">
                <img src={p.img} alt={p.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: statusColor(p.status) }}>{p.status}</span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: C.yellow, color: C.dark }}>{p.tema}</span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-black text-lg mb-2 leading-tight" style={{ color: C.dark, fontFamily: "'Gabarito', sans-serif" }}>{p.titulo}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1" style={{ fontFamily: "'Gabarito', sans-serif" }}>{p.resumo}</p>
                <div className="flex flex-wrap gap-3 text-xs font-semibold mb-4">
                  <span className="flex items-center gap-1" style={{ color: C.green }}><MapPin size={12} />{p.territorio}</span>
                  <span className="flex items-center gap-1" style={{ color: C.brown }}><Handshake size={12} />{p.parceiros}</span>
                </div>
                {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-bold hover:gap-3 transition-all"
                  style={{ color: C.green, fontFamily: "'Gabarito', sans-serif" }}>
                  Saiba mais <ExternalLink size={14} />
                </a>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <WaveSeparator topColor={C.green} bottomColor={C.bg} />
    </section>
  );
}

// ─── Parcerias ────────────────────────────────────────────────────────────────
function ParceriasSection() {
  const grupos = [
    {
      titulo: "Parcerias Rede UNICRAB",
      cor: C.green,
      lista: [
        { nome: "UNICOPAS", descricao: "União e Solidariedade das Cooperativas e Empreendimentos de Economia Social do Brasil", link: "https://unicopas.org.br" },
        { nome: "FINAPOP", descricao: "Finanças para a Economia Popular e Solidária", link: "https://finapop.com.br/" },
        { nome: "CREHNOR", descricao: "Cooperativa de Crédito Rural do Norte do Rio Grande do Sul", link: "https://www.crehnor.coop.br/pagina.php?p=16" },
        { nome: "Raízes do Campo", descricao: "Organização de apoio ao cooperativismo popular e à agricultura familiar", link: "https://www.raizesdocampo.com.br/" },
      ],
    },
    {
      titulo: "Cooperação Institucional",
      cor: C.red,
      placeholder: true,
      lista: [
        { nome: "MDA", descricao: "Ministério do Desenvolvimento Agrário e Agricultura Familiar", link: "https://www.gov.br/mda" },
        { nome: "INCRA", descricao: "Instituto Nacional de Colonização e Reforma Agrária", link: "https://www.gov.br/incra" },
        { nome: "FINEP", descricao: "Financiadora de Estudos e Projetos", link: "https://www.finep.gov.br" },
        { nome: "APEX-Brasil", descricao: "Agência Brasileira de Promoção de Exportações e Investimentos", link: "https://www.apexbrasil.com.br" },
        { nome: "MDIC", descricao: "Ministério do Desenvolvimento, Indústria, Comércio e Serviços", link: "https://www.gov.br/mdic" },
      ],
    },
    {
      titulo: "Parcerias Internacionais",
      cor: C.yellow,
      lista: [
        { nome: "Mundukide", descricao: "Organização basco-espanhola de cooperação internacional para o desenvolvimento solidário", link: "https://mundukide.org/en/" },
        { nome: "IAPC – Baobab", descricao: "Organização de cooperação internacional em agroecologia e economia solidária", link: "https://baobab.iapc.group/pt/" },
        { nome: "Sinomach", descricao: "Acordo de Cooperação para fortalecer a mecanização e a IA na agricultura familiar no Brasil", link: "https://mst.org.br/2025/07/13/empresa-chinesa-fecha-acordo-de-cooperacao-para-fortalecer-agricultura-familiar-no-brasil/" },
      ],
    },
  ];

  return (
    <section id="parcerias" className="py-20 md:py-28" style={{ backgroundColor: C.bg }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-bold uppercase tracking-widest" style={{ color: C.red, fontFamily: "'Gabarito', sans-serif" }}>Cooperações e Parcerias</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 mb-4" style={{ color: C.green, fontFamily: "'Gabarito', sans-serif" }}>Juntos somos mais fortes</h2>
        </div>
        <div className="space-y-12">
          {grupos.map(g => (
            <div key={g.titulo}>
              <h3 className="text-xl font-black mb-2 flex items-center gap-3" style={{ color: C.green, fontFamily: "'Gabarito', sans-serif" }}>
                <span className="inline-block w-1 h-6 rounded-full" style={{ backgroundColor: g.cor }} />{g.titulo}
              </h3>
              {g.placeholder && (
                <p className="text-sm text-muted-foreground mb-4 ml-4 italic" style={{ fontFamily: "'Gabarito', sans-serif" }}>
                  As informações detalhadas sobre os instrumentos de cooperação institucional (contratos, convênios, termos de cooperação e documentos) serão disponibilizadas em atualização futura.
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {g.lista.map(p => (
                  <a key={p.nome} href={p.link} target="_blank" rel="noopener noreferrer"
                    className="rounded-2xl p-5 group hover:scale-105 transition-transform shadow-sm block"
                    style={{ backgroundColor: C.white, border: `2px solid ${g.cor}20` }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm mb-4"
                      style={{ backgroundColor: `${g.cor}15`, color: g.cor, fontFamily: "'Gabarito', sans-serif" }}>
                      {p.nome.slice(0, 2)}
                    </div>
                    <div className="font-black text-base mb-1" style={{ color: C.dark, fontFamily: "'Gabarito', sans-serif" }}>{p.nome}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed" style={{ fontFamily: "'Gabarito', sans-serif" }}>{p.descricao}</div>
                    <div className="mt-3 flex items-center gap-1 text-xs font-bold group-hover:underline" style={{ color: g.cor, fontFamily: "'Gabarito', sans-serif" }}>
                      <ExternalLink size={12} /> Ver parceria
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Notícias ─────────────────────────────────────────────────────────────────
const categorias = ["Institucional", "Cooperativismo", "Agroecologia", "Formação", "Projetos", "Parcerias", "Eventos", "Imprensa"];

function NoticiasSection({ news }: { news: NewsItem[] }) {
  const [catAtiva, setCatAtiva] = useState("Institucional");
  const destaque = news.find(n => n.destaque) ?? news[0];
  const demais = news.filter(n => !n.destaque).slice(0, 3);
  return (
    <section id="noticias" style={{ backgroundColor: C.brown }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: C.yellow, fontFamily: "'Gabarito', sans-serif" }}>Notícias</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2" style={{ fontFamily: "'Gabarito', sans-serif" }}>UNICRAB em Ação</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categorias.map(c => (
              <button key={c} onClick={() => setCatAtiva(c)}
                className="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
                style={{ backgroundColor: catAtiva === c ? C.yellow : "rgba(255,255,255,0.12)", color: catAtiva === c ? C.dark : "rgba(255,255,255,0.8)", fontFamily: "'Gabarito', sans-serif" }}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {destaque && (
            <a href={destaque.link} target="_blank" rel="noopener noreferrer"
              className="lg:col-span-2 rounded-3xl overflow-hidden relative group cursor-pointer bg-green-900 block">
              <img src={destaque.img} alt={destaque.titulo}
                className="w-full h-72 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1735504646590-88988726512d?w=800&h=500&fit=crop&auto=format"; }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)" }} />
              <div className="absolute bottom-0 p-6 md:p-8">
                <span className="px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block" style={{ backgroundColor: C.red, color: C.white }}>{destaque.categoria}</span>
                <h3 className="text-xl md:text-2xl font-black text-white mb-2 leading-tight group-hover:text-yellow-300 transition-colors" style={{ fontFamily: "'Gabarito', sans-serif" }}>{destaque.titulo}</h3>
                <div className="flex items-center gap-4 text-white/60 text-sm" style={{ fontFamily: "'Gabarito', sans-serif" }}>
                  <span className="flex items-center gap-1"><Calendar size={12} />{destaque.data}</span>
                  <span>{destaque.fonte}</span>
                  <span className="flex items-center gap-1 ml-auto text-white/80"><ExternalLink size={12} />Ler reportagem</span>
                </div>
              </div>
            </a>
          )}
          <div className="flex flex-col gap-4">
            {demais.map(n => (
              <a key={n.id} href={n.link} target="_blank" rel="noopener noreferrer"
                className="rounded-2xl overflow-hidden flex gap-4 group cursor-pointer hover:scale-[1.02] transition-transform"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                <div className="w-28 flex-shrink-0 bg-green-900 overflow-hidden">
                  <img src={n.img} alt={n.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80" />
                </div>
                <div className="p-3 flex flex-col justify-center">
                  <span className="text-xs font-bold mb-1" style={{ color: C.yellow, fontFamily: "'Gabarito', sans-serif" }}>{n.categoria}</span>
                  <h4 className="text-sm font-bold text-white leading-snug mb-1 line-clamp-3 group-hover:text-yellow-300 transition-colors" style={{ fontFamily: "'Gabarito', sans-serif" }}>{n.titulo}</h4>
                  <span className="text-xs text-white/50" style={{ fontFamily: "'Gabarito', sans-serif" }}><Calendar size={10} className="inline mr-1" />{n.data} · {n.fonte}</span>
                </div>
              </a>
            ))}
            <a href="https://unicopas.org.br/noticias/" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm mt-auto hover:opacity-90 hover:scale-[1.02] transition-all"
              style={{ backgroundColor: C.yellow, color: C.dark, fontFamily: "'Gabarito', sans-serif" }}>
              Ver todas as notícias <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
      <WaveSeparator topColor={C.brown} bottomColor={C.bg} />
    </section>
  );
}

// ─── Transparência ────────────────────────────────────────────────────────────
const transparenciaAnos = [
  { ano: "2024", itens: ["Atas de Assembleia", "Relatórios Anuais", "Estatuto"] },
  { ano: "2025", itens: ["Atas de Assembleia", "Relatórios Anuais", "Estatuto"] },
  { ano: "2026", itens: ["Atas de Assembleia", "Relatórios Anuais", "Estatuto"] },
];

function TransparenciaSection({ editais }: { editais: Edital[] }) {
  const [anoAtivo, setAnoAtivo] = useState("2026");
  const [abaAdm, setAbaAdm] = useState<"parcerias" | "editais">("editais");

  const statusEditailColor = (s: Edital["status"]) => {
    if (s === "Aberto") return C.lime;
    if (s === "Em análise") return C.yellow;
    if (s === "Homologado") return C.green;
    return "#9ca3af";
  };

  return (
    <section id="transparencia" className="py-20 md:py-28" style={{ backgroundColor: C.bg }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header destaque */}
        <div className="rounded-3xl p-8 md:p-12 mb-12 grid lg:grid-cols-2 gap-8 items-center"
          style={{ background: `linear-gradient(135deg, ${C.green} 0%, #0d7a28 100%)` }}>
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-white/70" style={{ fontFamily: "'Gabarito', sans-serif" }}>Transparência</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4" style={{ fontFamily: "'Gabarito', sans-serif" }}>Gestão aberta e democrática</h2>
            <p className="text-white/80 leading-relaxed" style={{ fontFamily: "'Gabarito', sans-serif" }}>
              A UNICRAB é comprometida com a transparência plena. Acesse documentos institucionais, atas, relatórios e estatutos organizados por ano.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {transparenciaAnos.map(d => (
              <button key={d.ano} onClick={() => setAnoAtivo(d.ano)}
                className="px-6 py-3 rounded-full font-bold text-sm transition-all"
                style={{ backgroundColor: anoAtivo === d.ano ? C.yellow : "rgba(255,255,255,0.15)", color: anoAtivo === d.ano ? C.dark : C.white, fontFamily: "'Gabarito', sans-serif" }}>
                {d.ano}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Documentos */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-black mb-5 flex items-center gap-2" style={{ color: C.green, fontFamily: "'Gabarito', sans-serif" }}>
              <FileText size={20} /> Documentos — {anoAtivo}
            </h3>
            <div className="space-y-3">
              {transparenciaAnos.find(d => d.ano === anoAtivo)?.itens.map(item => (
                <div key={item} className="flex items-center justify-between p-4 rounded-xl hover:bg-green-50 transition-colors"
                  style={{ backgroundColor: C.white, border: `1px solid ${C.green}15` }}>
                  <div className="flex items-center gap-3">
                    <FileText size={18} style={{ color: C.green }} />
                    <span className="font-semibold text-sm" style={{ color: C.dark, fontFamily: "'Gabarito', sans-serif" }}>{item} — {anoAtivo}</span>
                  </div>
                  <button
                    onClick={() => toast.success("Download iniciado", { description: `${item} — ${anoAtivo}.pdf`, icon: <Download size={16} />, duration: 4000 })}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold hover:opacity-85 active:scale-95 transition-all"
                    style={{ backgroundColor: C.green, color: C.white, fontFamily: "'Gabarito', sans-serif" }}>
                    <Download size={13} /> Baixar PDF
                  </button>
                </div>
              ))}
            </div>

            {/* Parcerias com Adm. Pública */}
            <div className="mt-8 rounded-2xl overflow-hidden" style={{ backgroundColor: C.white, border: `2px solid ${C.lime}25` }}>
              <div className="p-5 pb-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${C.lime}15` }}>
                    <Handshake size={18} style={{ color: C.lime }} />
                  </div>
                  <h4 className="font-black" style={{ color: C.green, fontFamily: "'Gabarito', sans-serif" }}>Parcerias com a Administração Pública</h4>
                </div>
                {/* Sub-tabs */}
                <div className="flex gap-2 mb-0">
                  {[
                    { key: "editais", label: "Editais e Chamadas" },
                    { key: "parcerias", label: "Instrumentos de Cooperação" },
                  ].map(t => (
                    <button key={t.key} onClick={() => setAbaAdm(t.key as any)}
                      className="px-4 py-2 rounded-t-xl text-xs font-bold transition-all border-b-2"
                      style={{
                        backgroundColor: abaAdm === t.key ? `${C.green}10` : "transparent",
                        color: abaAdm === t.key ? C.green : "#9ca3af",
                        borderBottomColor: abaAdm === t.key ? C.green : "transparent",
                        fontFamily: "'Gabarito', sans-serif",
                      }}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5 pt-4" style={{ borderTop: `1px solid ${C.green}10` }}>
                {abaAdm === "editais" ? (
                  editais.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic py-4 text-center" style={{ fontFamily: "'Gabarito', sans-serif" }}>
                      Nenhum edital publicado no momento.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {editais.map(ed => (
                        <div key={ed.id} className="rounded-xl p-4 hover:bg-green-50 transition-colors"
                          style={{ border: `1px solid ${C.green}12`, backgroundColor: "#fafffe" }}>
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                                  style={{ backgroundColor: statusEditailColor(ed.status), fontFamily: "'Gabarito', sans-serif" }}>
                                  {ed.status}
                                </span>
                                <span className="text-xs text-muted-foreground" style={{ fontFamily: "'Gabarito', sans-serif" }}>
                                  Nº {ed.numero} · {ed.orgao}
                                </span>
                              </div>
                              <p className="font-bold text-sm leading-snug" style={{ color: C.dark, fontFamily: "'Gabarito', sans-serif" }}>{ed.titulo}</p>
                              <p className="text-xs text-muted-foreground mt-1 leading-relaxed" style={{ fontFamily: "'Gabarito', sans-serif" }}>{ed.objeto}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-2 mt-3">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground" style={{ fontFamily: "'Gabarito', sans-serif" }}>
                              <span className="flex items-center gap-1"><Calendar size={11} /> Abertura: {ed.dataAbertura}</span>
                              <span className="flex items-center gap-1"><Calendar size={11} /> Encerramento: {ed.dataEncerramento}</span>
                            </div>
                            {ed.arquivo ? (
                              <a href={ed.arquivo} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                                style={{ backgroundColor: C.green, color: C.white, fontFamily: "'Gabarito', sans-serif" }}>
                                <Download size={12} /> Baixar Edital
                              </a>
                            ) : (
                              <button
                                onClick={() => toast.info("Arquivo em breve", { description: "O arquivo deste edital será disponibilizado em breve." })}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                                style={{ backgroundColor: `${C.green}20`, color: C.green, fontFamily: "'Gabarito', sans-serif" }}>
                                <FileText size={12} /> Ver Edital
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  <p className="text-sm text-muted-foreground leading-relaxed py-2" style={{ fontFamily: "'Gabarito', sans-serif" }}>
                    As informações detalhadas sobre contratos, convênios e termos de cooperação técnica firmados com órgãos da administração pública serão disponibilizadas em atualização futura.
                  </p>
                )}
              </div>
            </div>

            {/* Trabalhe Conosco */}
            <div className="mt-4 rounded-2xl p-6" style={{ backgroundColor: C.white, border: `2px solid ${C.yellow}30` }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${C.yellow}20` }}>
                  <Users size={18} style={{ color: C.yellow }} />
                </div>
                <h4 className="font-black" style={{ color: C.green, fontFamily: "'Gabarito', sans-serif" }}>Trabalhe Conosco</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3" style={{ fontFamily: "'Gabarito', sans-serif" }}>
                Faça parte do time da UNICRAB. Envie seu currículo ou consulte oportunidades disponíveis.
              </p>
              <a href="mailto:unicrab@unicrab.com" className="inline-flex items-center gap-2 text-sm font-bold hover:underline" style={{ color: C.green, fontFamily: "'Gabarito', sans-serif" }}>
                <Mail size={14} /> unicrab@unicrab.com
              </a>
            </div>
          </div>

          {/* Ouvidoria */}
          <div className="rounded-3xl p-6 md:p-8 flex flex-col" style={{ backgroundColor: C.green }}>
            <h3 className="text-2xl font-black text-white mb-4" style={{ fontFamily: "'Gabarito', sans-serif" }}>Canal de Ouvidoria</h3>
            <p className="text-white/80 mb-6 leading-relaxed text-sm" style={{ fontFamily: "'Gabarito', sans-serif" }}>
              Utilize nosso canal para solicitações de informação, denúncias, sugestões e elogios. Respondemos em até 20 dias úteis.
            </p>
            <div className="space-y-3 mb-6">
              <button onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full flex items-center justify-between px-5 py-4 rounded-xl font-bold text-sm hover:bg-white/20 active:scale-[0.98] transition-all"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", color: C.white, fontFamily: "'Gabarito', sans-serif" }}>
                Solicitar Informação <FileText size={16} />
              </button>
              <button onClick={() => toast.info("Acompanhamento de Protocolo", { description: "Envie o número do protocolo para ouvidoria@unicrab.com", duration: 6000 })}
                className="w-full flex items-center justify-between px-5 py-4 rounded-xl font-bold text-sm hover:bg-white/20 active:scale-[0.98] transition-all"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", color: C.white, fontFamily: "'Gabarito', sans-serif" }}>
                Acompanhar Protocolo <ChevronRight size={16} />
              </button>
            </div>
            <div className="rounded-2xl p-5 mt-auto" style={{ backgroundColor: C.yellow }}>
              <div className="font-black text-lg mb-1" style={{ color: C.dark, fontFamily: "'Gabarito', sans-serif" }}>Canal de Informação</div>
              <div className="text-sm font-semibold" style={{ color: C.dark, fontFamily: "'Gabarito', sans-serif" }}>unicrab@unicrab.com</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contato ──────────────────────────────────────────────────────────────────
function ContatoSection() {
  const [form, setForm] = useState({ nome: "", email: "", assunto: "", mensagem: "" });
  return (
    <section id="contato" style={{ backgroundColor: C.lime }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-white/80" style={{ fontFamily: "'Gabarito', sans-serif" }}>Fale Conosco</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-6" style={{ fontFamily: "'Gabarito', sans-serif" }}>Entre em Contato</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-10" style={{ fontFamily: "'Gabarito', sans-serif" }}>
              Parcerias, informações institucionais, imprensa ou para filiar sua cooperativa à UNICRAB.
            </p>
            <div className="space-y-5">
              {[
                { icon: Phone, label: "(61) 3962-2474", href: "tel:+556139622474" },
                { icon: Mail, label: "unicrab@unicrab.com", href: "mailto:unicrab@unicrab.com" },
                { icon: MapPin, label: "Brasília – DF, Brasil", href: "#" },
                { icon: Globe, label: "unicrab.org.br", href: "https://unicrab.org.br" },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} className="flex items-center gap-4 text-white/90 hover:text-white transition-colors" style={{ fontFamily: "'Gabarito', sans-serif" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                    <Icon size={18} />
                  </div>
                  <span className="font-semibold">{label}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-3xl p-6 md:p-8 shadow-xl" style={{ backgroundColor: C.white }}>
            <h3 className="text-xl font-black mb-6" style={{ color: C.green, fontFamily: "'Gabarito', sans-serif" }}>Envie sua mensagem</h3>
            <div className="space-y-4">
              {[
                { key: "nome", label: "Nome completo", type: "text" },
                { key: "email", label: "E-mail", type: "email" },
                { key: "assunto", label: "Assunto", type: "text" },
              ].map(({ key, label, type }) => (
                <div key={key}>
                  <label className="block text-sm font-bold mb-1.5" style={{ color: C.dark, fontFamily: "'Gabarito', sans-serif" }}>{label}</label>
                  <input type={type} value={(form as any)[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ backgroundColor: "#f5f7f2", border: `2px solid ${C.green}20`, color: C.dark, fontFamily: "'Gabarito', sans-serif" }}
                    onFocus={e => (e.target.style.borderColor = C.green)}
                    onBlur={e => (e.target.style.borderColor = `${C.green}20`)} />
                </div>
              ))}
              <div>
                <label className="block text-sm font-bold mb-1.5" style={{ color: C.dark, fontFamily: "'Gabarito', sans-serif" }}>Mensagem</label>
                <textarea rows={4} value={form.mensagem} onChange={e => setForm({ ...form, mensagem: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                  style={{ backgroundColor: "#f5f7f2", border: `2px solid ${C.green}20`, color: C.dark, fontFamily: "'Gabarito', sans-serif" }}
                  onFocus={e => (e.target.style.borderColor = C.green)}
                  onBlur={e => (e.target.style.borderColor = `${C.green}20`)} />
              </div>
              <button
                onClick={() => {
                  if (!form.nome || !form.email || !form.mensagem) { toast.error("Preencha todos os campos obrigatórios."); return; }
                  toast.success("Mensagem enviada!", { description: "Retornaremos em até 5 dias úteis para " + form.email, duration: 5000 });
                  setForm({ nome: "", email: "", assunto: "", mensagem: "" });
                }}
                className="w-full py-4 rounded-xl font-black text-white text-base hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition-all"
                style={{ backgroundColor: C.green, fontFamily: "'Gabarito', sans-serif" }}>
                Enviar Mensagem
              </button>
            </div>
          </div>
        </div>
      </div>
      <WaveSeparator topColor={C.lime} bottomColor={C.green} />
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ backgroundColor: C.green }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <UnicrabLogo size={44} white />
            <p className="text-white/70 text-sm leading-relaxed mt-4 mb-4" style={{ fontFamily: "'Gabarito', sans-serif" }}>
              União das Cooperativas e Associações de Reforma Agrária do Brasil. Fortalecendo o cooperativismo solidário em todo o Brasil.
            </p>
            <div className="text-white/70 text-sm space-y-1 mb-4" style={{ fontFamily: "'Gabarito', sans-serif" }}>
              <div className="flex items-center gap-2"><Phone size={13} /> (61) 3962-2474</div>
              <div className="flex items-center gap-2"><Mail size={13} /> unicrab@unicrab.com</div>
            </div>
          </div>
          {[
            { titulo: "Institucional", links: ["Quem Somos", "Diretoria", "Missão e Valores", "Estrutura Organizacional", "Linha do Tempo"] },
            { titulo: "Conteúdo", links: ["Nossas Ações", "Projetos", "Editais", "Galeria de Fotos", "Agenda de Eventos"] },
            { titulo: "Transparência", links: ["Estatuto Social", "Atas de Assembleia", "Relatórios Anuais", "Parcerias Institucionais", "Ouvidoria"] },
          ].map(col => (
            <div key={col.titulo}>
              <h4 className="font-black text-white mb-4" style={{ fontFamily: "'Gabarito', sans-serif" }}>{col.titulo}</h4>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l}><a href="#" className="text-white/65 text-sm hover:text-white transition-colors" style={{ fontFamily: "'Gabarito', sans-serif" }}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/50 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.12)", fontFamily: "'Gabarito', sans-serif" }}>
          <p>© 2026 UNICRAB — União das Cooperativas e Associações de Reforma Agrária do Brasil. Todos os direitos reservados.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">LGPD</a>
            <a href="#" className="hover:text-white transition-colors">Acessibilidade</a>
            <button onClick={() => (window as any).__openAdmin?.()} className="hover:text-white transition-colors flex items-center gap-1"><Lock size={10} />Admin</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Cookie Banner ────────────────────────────────────────────────────────────
function CookieBanner() {
  const [visible, setVisible] = useState(() => !localStorage.getItem("cookies-accepted"));
  if (!visible) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 rounded-2xl p-5 shadow-2xl" style={{ backgroundColor: C.dark }}>
      <p className="text-white/85 text-sm leading-relaxed mb-4" style={{ fontFamily: "'Gabarito', sans-serif" }}>
        Utilizamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa{" "}
        <a href="#" className="underline" style={{ color: C.yellow }}>Política de Privacidade</a>.
      </p>
      <div className="flex gap-3">
        <button onClick={() => { localStorage.setItem("cookies-accepted", "1"); setVisible(false); }}
          className="flex-1 py-2.5 rounded-xl font-bold text-sm" style={{ backgroundColor: C.lime, color: C.white, fontFamily: "'Gabarito', sans-serif" }}>
          Aceitar
        </button>
        <button onClick={() => setVisible(false)}
          className="flex-1 py-2.5 rounded-xl font-bold text-sm border border-white/20 text-white/70" style={{ fontFamily: "'Gabarito', sans-serif" }}>
          Rejeitar
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN PANEL
// ═══════════════════════════════════════════════════════════════════════════════

const ADMIN_PASSWORD = "unicrab2024";

function AdminPanel({ news, setNews, heroImg, setHeroImg, editais, setEditais, projetos, setProjectos, onLogout }: {
  news: NewsItem[]; setNews: (n: NewsItem[]) => void;
  heroImg: string; setHeroImg: (s: string) => void;
  editais: Edital[]; setEditais: (e: Edital[]) => void;
  projetos: Projeto[]; setProjectos: (p: Projeto[]) => void;
  onLogout: () => void;
}) {
  const [tab, setTab] = useState<"noticias" | "fotos" | "nova" | "editais" | "novo-edital" | "projetos" | "novo-projeto">("noticias");
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [newHero, setNewHero] = useState(heroImg);

  // Form state for new/edit news
  const emptyForm = { id: "", categoria: "Institucional", titulo: "", data: new Date().toLocaleDateString("pt-BR"), fonte: "UNICRAB", img: "", destaque: false, link: "" };
  const [form, setForm] = useState<NewsItem>({ ...emptyForm });

  // Editais state
  const emptyEdital: Edital = { id: "", titulo: "", numero: "", objeto: "", dataAbertura: "", dataEncerramento: "", status: "Aberto", arquivo: "", orgao: "" };
  const [editingEdital, setEditingEdital] = useState<Edital | null>(null);
  const [editalForm, setEditalForm] = useState<Edital>({ ...emptyEdital });

  const startEditEdital = (e: Edital) => { setEditingEdital(e); setEditalForm({ ...e }); setTab("novo-edital"); };
  const cancelEdital = () => { setEditingEdital(null); setEditalForm({ ...emptyEdital }); setTab("editais"); };
  const saveEdital = () => {
    if (!editalForm.titulo || !editalForm.numero) { toast.error("Preencha título e número do edital."); return; }
    if (editingEdital) {
      setEditais(editais.map(e => e.id === editingEdital.id ? { ...editalForm } : e));
      toast.success("Edital atualizado com sucesso!");
    } else {
      setEditais([{ ...editalForm, id: Date.now().toString() }, ...editais]);
      toast.success("Edital publicado com sucesso!");
    }
    cancelEdital();
  };
  const deleteEdital = (id: string) => {
    if (confirm("Excluir este edital?")) { setEditais(editais.filter(e => e.id !== id)); toast.success("Edital excluído."); }
  };

  const startEdit = (n: NewsItem) => { setEditing(n); setForm({ ...n }); setTab("nova"); };
  const cancelEdit = () => { setEditing(null); setForm({ ...emptyForm }); setTab("noticias"); };

  const saveNews = () => {
    if (!form.titulo || !form.categoria) { toast.error("Preencha título e categoria."); return; }
    if (editing) {
      setNews(news.map(n => n.id === editing.id ? { ...form } : n));
      toast.success("Notícia atualizada com sucesso!");
    } else {
      const novaNoticia = { ...form, id: Date.now().toString() };
      setNews([novaNoticia, ...news]);
      toast.success("Notícia publicada com sucesso!");
    }
    cancelEdit();
  };

  const deleteNews = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta notícia?")) {
      setNews(news.filter(n => n.id !== id));
      toast.success("Notícia excluída.");
    }
  };

  const toggleDestaque = (id: string) => {
    setNews(news.map(n => n.id === id ? { ...n, destaque: !n.destaque } : n));
    toast.success("Destaque atualizado.");
  };

  const saveHero = () => {
    setHeroImg(newHero);
    toast.success("Foto do hero atualizada em tempo real!");
  };

  // ── Projeto state ──
  const emptyProjeto: Projeto = { id: "", titulo: "", resumo: "", territorio: "", parceiros: "", status: "Em andamento", tema: "Institucional", img: "", link: "" };
  const [editingProjeto, setEditingProjeto] = useState<Projeto | null>(null);
  const [projetoForm, setProjetoForm] = useState<Projeto>({ ...emptyProjeto });
  const startEditProjeto = (p: Projeto) => { setEditingProjeto(p); setProjetoForm({ ...p }); setTab("novo-projeto"); };
  const cancelProjeto = () => { setEditingProjeto(null); setProjetoForm({ ...emptyProjeto }); setTab("projetos"); };
  const saveProjeto = () => {
    if (!projetoForm.titulo) { toast.error("Preencha o título do projeto."); return; }
    if (editingProjeto) {
      setProjectos(projetos.map(p => p.id === editingProjeto.id ? { ...projetoForm } : p));
      toast.success("Projeto atualizado com sucesso!");
    } else {
      setProjectos([{ ...projetoForm, id: Date.now().toString() }, ...projetos]);
      toast.success("Projeto publicado com sucesso!");
    }
    cancelProjeto();
  };
  const deleteProjeto = (id: string) => {
    if (confirm("Excluir este projeto?")) { setProjectos(projetos.filter(p => p.id !== id)); toast.success("Projeto excluído."); }
  };

  const tabs = [
    { key: "noticias", label: "Notícias", icon: Newspaper },
    { key: "nova", label: editing ? "Editar Notícia" : "Nova Notícia", icon: Plus },
    { key: "projetos", label: "Projetos", icon: Sprout },
    { key: "editais", label: "Editais", icon: FileText },
    { key: "fotos", label: "Fotos & Hero", icon: ImageIcon },
  ] as const;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a1f08", fontFamily: "'Gabarito', sans-serif" }}>
      {/* Admin header */}
      <div className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between border-b" style={{ backgroundColor: C.green, borderColor: "rgba(255,255,255,0.1)" }}>
        <div className="flex items-center gap-4">
          <UnicrabLogo size={32} white />
          <div className="h-6 w-px bg-white/20" />
          <div className="flex items-center gap-2">
            <Settings size={16} className="text-white/70" />
            <span className="text-white font-bold text-sm">Painel Administrativo</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => (window as any).__closeAdmin?.()}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white hover:bg-white/10 transition-colors">
            <Eye size={15} /> Ver Site
          </button>
          <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors hover:bg-red-600"
            style={{ backgroundColor: C.red, color: C.white }}>
            <LogOut size={15} /> Sair
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white/5 rounded-2xl p-1.5 w-fit">
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button key={t.key} onClick={() => { setTab(t.key); setEditing(null); setForm({ ...emptyForm }); setEditingEdital(null); setEditalForm({ ...emptyEdital }); setEditingProjeto(null); setProjetoForm({ ...emptyProjeto }); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all"
                style={{ backgroundColor: tab === t.key ? C.lime : "transparent", color: tab === t.key ? C.white : "rgba(255,255,255,0.6)" }}>
                <Icon size={15} /> {t.label}
              </button>
            );
          })}
        </div>

        {/* ── TAB: Notícias ── */}
        {tab === "noticias" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white">Gerenciar Notícias</h2>
              <button onClick={() => { setEditing(null); setForm({ ...emptyForm }); setTab("nova"); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm"
                style={{ backgroundColor: C.lime, color: C.white }}>
                <Plus size={16} /> Nova Notícia
              </button>
            </div>
            <div className="space-y-4">
              {news.map(n => (
                <div key={n.id} className="rounded-2xl p-4 flex gap-4 items-center" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white/10">
                    <img src={n.img} alt={n.titulo} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ backgroundColor: `${C.lime}30`, color: C.lime }}>{n.categoria}</span>
                      {n.destaque && <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ backgroundColor: `${C.yellow}30`, color: C.yellow }}>⭐ Destaque</span>}
                    </div>
                    <p className="text-white font-bold text-sm line-clamp-2 leading-snug">{n.titulo}</p>
                    <p className="text-white/50 text-xs mt-1">{n.data} · {n.fonte}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => toggleDestaque(n.id)} title="Alternar destaque"
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-yellow-500/20"
                      style={{ color: n.destaque ? C.yellow : "rgba(255,255,255,0.4)" }}>
                      <Star size={16} fill={n.destaque ? C.yellow : "none"} />
                    </button>
                    <button onClick={() => startEdit(n)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-white/10"
                      style={{ color: C.lime }}>
                      <Edit3 size={16} />
                    </button>
                    <button onClick={() => deleteNews(n.id)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-red-500/20"
                      style={{ color: C.red }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {news.length === 0 && (
                <div className="text-center py-16 text-white/40" style={{ fontFamily: "'Gabarito', sans-serif" }}>
                  <Newspaper size={40} className="mx-auto mb-4 opacity-30" />Nenhuma notícia cadastrada.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB: Nova / Editar Notícia ── */}
        {tab === "nova" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <button onClick={cancelEdit} className="text-white/50 hover:text-white transition-colors"><ChevronDown size={20} className="rotate-90" /></button>
              <h2 className="text-2xl font-black text-white">{editing ? "Editar Notícia" : "Nova Notícia"}</h2>
            </div>
            <div className="rounded-2xl p-6 md:p-8 space-y-5" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { key: "titulo", label: "Título da Notícia *", type: "text", full: true },
                  { key: "categoria", label: "Categoria *", type: "select" },
                  { key: "fonte", label: "Fonte / Veículo", type: "text" },
                  { key: "data", label: "Data", type: "text" },
                  { key: "img", label: "URL da Imagem", type: "text" },
                  { key: "link", label: "Link da Notícia", type: "text" },
                ].map(f => (
                  <div key={f.key} className={f.full ? "md:col-span-2" : ""}>
                    <label className="block text-sm font-bold mb-2 text-white/70">{f.label}</label>
                    {f.type === "select" ? (
                      <select value={(form as any)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: C.white, fontFamily: "'Gabarito', sans-serif" }}>
                        {categorias.map(c => <option key={c} value={c} style={{ backgroundColor: C.dark }}>{c}</option>)}
                      </select>
                    ) : (
                      <input type={f.type} value={(form as any)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: C.white, fontFamily: "'Gabarito', sans-serif" }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Preview imagem */}
              {form.img && (
                <div>
                  <label className="block text-sm font-bold mb-2 text-white/70">Preview da Imagem</label>
                  <div className="w-full h-48 rounded-xl overflow-hidden bg-white/10">
                    <img src={form.img} alt="preview" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                </div>
              )}

              {/* Destaque toggle */}
              <div className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                <button onClick={() => setForm({ ...form, destaque: !form.destaque })}
                  className="w-14 h-7 rounded-full transition-all relative flex-shrink-0"
                  style={{ backgroundColor: form.destaque ? C.lime : "rgba(255,255,255,0.2)" }}>
                  <span className="absolute top-1 transition-all w-5 h-5 bg-white rounded-full shadow-sm"
                    style={{ left: form.destaque ? "calc(100% - 24px)" : "4px" }} />
                </button>
                <div>
                  <div className="text-white font-bold text-sm">Marcar como destaque</div>
                  <div className="text-white/50 text-xs">Esta notícia aparecerá em destaque na seção de notícias</div>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button onClick={saveNews}
                  className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: C.green }}>
                  <Save size={16} /> {editing ? "Salvar Alterações" : "Publicar Notícia"}
                </button>
                <button onClick={cancelEdit}
                  className="px-8 py-3 rounded-full font-bold transition-all"
                  style={{ color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: Projetos ── */}
        {tab === "projetos" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white">Projetos que Transformam</h2>
              <button onClick={() => { setEditingProjeto(null); setProjetoForm({ ...emptyProjeto }); setTab("novo-projeto"); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm"
                style={{ backgroundColor: C.lime, color: C.white }}>
                <Plus size={16} /> Novo Projeto
              </button>
            </div>
            <div className="space-y-4">
              {projetos.map(p => (
                <div key={p.id} className="rounded-2xl p-4 flex gap-4 items-center" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white/10">
                    <img src={p.img} alt={p.titulo} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: p.status === "Em andamento" ? C.lime : p.status === "Planejado" ? C.yellow : C.green }}>{p.status}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ backgroundColor: `${C.yellow}30`, color: C.yellow }}>{p.tema}</span>
                    </div>
                    <p className="text-white font-bold text-sm line-clamp-1 leading-snug">{p.titulo}</p>
                    <p className="text-white/50 text-xs mt-0.5">{p.territorio} · {p.parceiros}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => startEditProjeto(p)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
                      style={{ color: C.lime }}>
                      <Edit3 size={16} />
                    </button>
                    <button onClick={() => deleteProjeto(p.id)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-red-500/20 transition-colors"
                      style={{ color: C.red }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {projetos.length === 0 && (
                <div className="text-center py-16 text-white/40">
                  <Sprout size={40} className="mx-auto mb-4 opacity-30" />
                  <p style={{ fontFamily: "'Gabarito', sans-serif" }}>Nenhum projeto cadastrado.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB: Novo / Editar Projeto ── */}
        {tab === "novo-projeto" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <button onClick={cancelProjeto} className="text-white/50 hover:text-white transition-colors"><ChevronDown size={20} className="rotate-90" /></button>
              <h2 className="text-2xl font-black text-white">{editingProjeto ? "Editar Projeto" : "Novo Projeto"}</h2>
            </div>
            <div className="rounded-2xl p-6 md:p-8 space-y-5" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="grid md:grid-cols-2 gap-5">
                {([
                  { key: "titulo", label: "Título do Projeto *", full: true },
                  { key: "territorio", label: "Território / Local" },
                  { key: "parceiros", label: "Parceiros" },
                  { key: "img", label: "URL da Imagem" },
                  { key: "link", label: "Link Externo (Saiba mais)" },
                ] as { key: keyof Projeto; label: string; full?: boolean }[]).map(f => (
                  <div key={f.key} className={f.full ? "md:col-span-2" : ""}>
                    <label className="block text-sm font-bold mb-2 text-white/70" style={{ fontFamily: "'Gabarito', sans-serif" }}>{f.label}</label>
                    <input type="text" value={projetoForm[f.key] as string} onChange={e => setProjetoForm({ ...projetoForm, [f.key]: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: C.white, fontFamily: "'Gabarito', sans-serif" }} />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-2 text-white/70" style={{ fontFamily: "'Gabarito', sans-serif" }}>Resumo / Descrição</label>
                  <textarea rows={3} value={projetoForm.resumo} onChange={e => setProjetoForm({ ...projetoForm, resumo: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: C.white, fontFamily: "'Gabarito', sans-serif" }} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-white/70" style={{ fontFamily: "'Gabarito', sans-serif" }}>Tema / Categoria</label>
                  <select value={projetoForm.tema} onChange={e => setProjetoForm({ ...projetoForm, tema: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: C.white, fontFamily: "'Gabarito', sans-serif" }}>
                    {TEMAS_PROJETOS.filter(t => t !== "Todos").map(t => (
                      <option key={t} value={t} style={{ backgroundColor: C.dark }}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-white/70" style={{ fontFamily: "'Gabarito', sans-serif" }}>Status</label>
                  <select value={projetoForm.status} onChange={e => setProjetoForm({ ...projetoForm, status: e.target.value as Projeto["status"] })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: C.white, fontFamily: "'Gabarito', sans-serif" }}>
                    {(["Em andamento", "Concluído", "Planejado"] as Projeto["status"][]).map(s => (
                      <option key={s} value={s} style={{ backgroundColor: C.dark }}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              {projetoForm.img && (
                <div>
                  <label className="block text-sm font-bold mb-2 text-white/70">Preview da Imagem</label>
                  <div className="w-full h-40 rounded-xl overflow-hidden bg-white/10">
                    <img src={projetoForm.img} alt="preview" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                </div>
              )}
              <div className="flex gap-4 pt-2">
                <button onClick={saveProjeto}
                  className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white hover:opacity-90"
                  style={{ backgroundColor: C.green, fontFamily: "'Gabarito', sans-serif" }}>
                  <Save size={16} /> {editingProjeto ? "Salvar Alterações" : "Publicar Projeto"}
                </button>
                <button onClick={cancelProjeto}
                  className="px-8 py-3 rounded-full font-bold transition-all"
                  style={{ color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.2)", fontFamily: "'Gabarito', sans-serif" }}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: Editais ── */}
        {tab === "editais" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white">Editais e Chamadas</h2>
              <button onClick={() => { setEditingEdital(null); setEditalForm({ ...emptyEdital }); setTab("novo-edital"); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm"
                style={{ backgroundColor: C.lime, color: C.white }}>
                <Plus size={16} /> Novo Edital
              </button>
            </div>
            <div className="space-y-4">
              {editais.map(ed => (
                <div key={ed.id} className="rounded-2xl p-5 flex gap-4 items-start"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: ed.status === "Aberto" ? C.lime : ed.status === "Em análise" ? C.yellow : ed.status === "Homologado" ? C.green : "#6b7280" }}>
                        {ed.status}
                      </span>
                      <span className="text-white/50 text-xs">Nº {ed.numero} · {ed.orgao}</span>
                    </div>
                    <p className="text-white font-bold text-sm mb-1">{ed.titulo}</p>
                    <p className="text-white/50 text-xs leading-relaxed line-clamp-2">{ed.objeto}</p>
                    <div className="flex gap-4 mt-2 text-white/40 text-xs">
                      <span>Abertura: {ed.dataAbertura}</span>
                      <span>Encerramento: {ed.dataEncerramento}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => startEditEdital(ed)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
                      style={{ color: C.lime }}>
                      <Edit3 size={16} />
                    </button>
                    <button onClick={() => deleteEdital(ed.id)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-red-500/20 transition-colors"
                      style={{ color: C.red }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {editais.length === 0 && (
                <div className="text-center py-16 text-white/40">
                  <FileText size={40} className="mx-auto mb-4 opacity-30" />
                  <p style={{ fontFamily: "'Gabarito', sans-serif" }}>Nenhum edital cadastrado.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB: Novo / Editar Edital ── */}
        {tab === "novo-edital" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <button onClick={cancelEdital} className="text-white/50 hover:text-white transition-colors"><ChevronDown size={20} className="rotate-90" /></button>
              <h2 className="text-2xl font-black text-white">{editingEdital ? "Editar Edital" : "Novo Edital"}</h2>
            </div>
            <div className="rounded-2xl p-6 md:p-8 space-y-5" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { key: "titulo", label: "Título do Edital *", full: true },
                  { key: "numero", label: "Número (ex: 001/2026)" },
                  { key: "orgao", label: "Órgão / Parceiro" },
                  { key: "dataAbertura", label: "Data de Abertura" },
                  { key: "dataEncerramento", label: "Data de Encerramento" },
                  { key: "arquivo", label: "URL do arquivo PDF (opcional)" },
                ].map(f => (
                  <div key={f.key} className={(f as any).full ? "md:col-span-2" : ""}>
                    <label className="block text-sm font-bold mb-2 text-white/70" style={{ fontFamily: "'Gabarito', sans-serif" }}>{f.label}</label>
                    <input type="text" value={(editalForm as any)[f.key]} onChange={e => setEditalForm({ ...editalForm, [f.key]: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: C.white, fontFamily: "'Gabarito', sans-serif" }} />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-2 text-white/70" style={{ fontFamily: "'Gabarito', sans-serif" }}>Objeto / Descrição</label>
                  <textarea rows={3} value={editalForm.objeto} onChange={e => setEditalForm({ ...editalForm, objeto: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: C.white, fontFamily: "'Gabarito', sans-serif" }} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-white/70" style={{ fontFamily: "'Gabarito', sans-serif" }}>Status</label>
                  <select value={editalForm.status} onChange={e => setEditalForm({ ...editalForm, status: e.target.value as Edital["status"] })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: C.white, fontFamily: "'Gabarito', sans-serif" }}>
                    {["Aberto", "Em análise", "Homologado", "Encerrado"].map(s => (
                      <option key={s} value={s} style={{ backgroundColor: C.dark }}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-4 pt-2">
                <button onClick={saveEdital}
                  className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white hover:opacity-90"
                  style={{ backgroundColor: C.green, fontFamily: "'Gabarito', sans-serif" }}>
                  <Save size={16} /> {editingEdital ? "Salvar Alterações" : "Publicar Edital"}
                </button>
                <button onClick={cancelEdital}
                  className="px-8 py-3 rounded-full font-bold transition-all"
                  style={{ color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.2)", fontFamily: "'Gabarito', sans-serif" }}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: Fotos ── */}
        {tab === "fotos" && (
          <div>
            <h2 className="text-2xl font-black text-white mb-6">Fotos & Imagens</h2>
            <div className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <h3 className="text-lg font-black text-white mb-2">Foto do Hero (Banner Principal)</h3>
              <p className="text-white/50 text-sm mb-5">Cole a URL de uma imagem para atualizar o banner principal do site em tempo real.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-white/70">URL da nova imagem</label>
                  <input type="text" value={newHero} onChange={e => setNewHero(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: C.white, fontFamily: "'Gabarito', sans-serif" }} />
                </div>
                {newHero && (
                  <div>
                    <label className="block text-sm font-bold mb-2 text-white/70">Preview</label>
                    <div className="w-full h-56 rounded-xl overflow-hidden bg-white/5">
                      <img src={newHero} alt="preview hero" className="w-full h-full object-cover"
                        onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    </div>
                  </div>
                )}
                <button onClick={saveHero}
                  className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white"
                  style={{ backgroundColor: C.lime }}>
                  <Save size={16} /> Atualizar Banner em Tempo Real
                </button>
              </div>

              {/* Sugestões Unsplash */}
              <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <h4 className="font-bold text-white/70 text-sm mb-4">Sugestões de imagens (clique para usar)</h4>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    "https://images.unsplash.com/photo-1735504646725-0a5e69c4c9ac?w=800&h=500&fit=crop&auto=format",
                    "https://images.unsplash.com/photo-1735504646590-88988726512d?w=800&h=500&fit=crop&auto=format",
                    "https://images.unsplash.com/photo-1767103593977-217ae79c9de3?w=800&h=500&fit=crop&auto=format",
                    "https://images.unsplash.com/photo-1781453640352-6c351cb604fb?w=800&h=500&fit=crop&auto=format",
                    "https://images.unsplash.com/photo-1737154758445-7fcae87148ed?w=800&h=500&fit=crop&auto=format",
                    "https://images.unsplash.com/photo-1655390390632-6f69c439c64a?w=800&h=500&fit=crop&auto=format",
                  ].map((url, i) => (
                    <button key={i} onClick={() => setNewHero(url)}
                      className="rounded-xl overflow-hidden h-20 hover:ring-2 hover:ring-lime-400 transition-all"
                      style={{ border: newHero === url ? `2px solid ${C.lime}` : "2px solid transparent" }}>
                      <img src={url} alt={`sugestão ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Admin Login ──────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);
  const handle = () => {
    if (pwd === ADMIN_PASSWORD) { onLogin(); setErr(false); }
    else { setErr(true); toast.error("Senha incorreta."); }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#0a1f08" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <UnicrabLogo size={52} white />
          <div className="mt-4 text-white/60 text-sm" style={{ fontFamily: "'Gabarito', sans-serif" }}>Painel Administrativo</div>
        </div>
        <div className="rounded-3xl p-8" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <h2 className="text-2xl font-black text-white mb-6 text-center" style={{ fontFamily: "'Gabarito', sans-serif" }}>Acesso Restrito</h2>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-white/70" style={{ fontFamily: "'Gabarito', sans-serif" }}>Senha</label>
            <div className="relative">
              <input type={show ? "text" : "password"} value={pwd} onChange={e => setPwd(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handle()}
                placeholder="Digite a senha"
                className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none"
                style={{ backgroundColor: "rgba(255,255,255,0.08)", border: `1px solid ${err ? C.red : "rgba(255,255,255,0.15)"}`, color: C.white, fontFamily: "'Gabarito', sans-serif" }} />
              <button onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {err && <p className="text-xs mt-2" style={{ color: C.red, fontFamily: "'Gabarito', sans-serif" }}>Senha incorreta. Tente novamente.</p>}
          </div>
          <button onClick={handle}
            className="w-full py-3.5 rounded-xl font-black text-white transition-all hover:opacity-90"
            style={{ backgroundColor: C.green, fontFamily: "'Gabarito', sans-serif" }}>
            Entrar
          </button>
          <div className="mt-4 text-center">
            <a href="#/" className="text-white/40 text-xs hover:text-white transition-colors" style={{ fontFamily: "'Gabarito', sans-serif" }}>← Voltar ao site</a>
          </div>
        </div>
        <p className="text-center text-white/20 text-xs mt-6" style={{ fontFamily: "'Gabarito', sans-serif" }}>Senha padrão: unicrab2024</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════
// Clear stale news with broken image URLs (v2 migration — runs once at module load)
if (typeof localStorage !== "undefined" && localStorage.getItem("unicrab-news-v") !== "2") {
  localStorage.removeItem("unicrab-news");
  localStorage.setItem("unicrab-news-v", "2");
}

export default function App() {
  useEffect(() => { document.title = "UNICRAB – Cooperar para o Brasil Alimentar"; }, []);
  const [news, setNews] = useStore<NewsItem[]>("unicrab-news", DEFAULT_NEWS);
  const [heroImg, setHeroImg] = useStore<string>("unicrab-hero-img", DEFAULT_HERO_IMG);
  const [editais, setEditais] = useStore<Edital[]>("unicrab-editais", DEFAULT_EDITAIS);
  const [projetos, setProjectos] = useStore<Projeto[]>("unicrab-projetos", DEFAULT_PROJETOS);
  const [adminAuth, setAdminAuth] = useState(() => sessionStorage.getItem("admin-auth") === "1");
  const [showAdmin, setShowAdmin] = useState(() => {
    const h = window.location.hash;
    const p = window.location.pathname;
    return h.includes("admin") || p.includes("admin");
  });

  useEffect(() => {
    const sync = () => {
      const h = window.location.hash;
      const p = window.location.pathname;
      setShowAdmin(h.includes("admin") || p.includes("admin"));
    };
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  // Also expose global toggle so the secret button works
  useEffect(() => {
    (window as any).__openAdmin = () => setShowAdmin(true);
    (window as any).__closeAdmin = () => {
      setShowAdmin(false);
      window.location.hash = "";
    };
  }, []);

  const isAdmin = showAdmin;

  const handleLogin = () => { sessionStorage.setItem("admin-auth", "1"); setAdminAuth(true); };
  const handleLogout = () => {
    sessionStorage.removeItem("admin-auth");
    setAdminAuth(false);
    setShowAdmin(false);
    window.location.hash = "";
  };

  if (isAdmin) {
    if (!adminAuth) return (
      <>
        <Toaster richColors position="bottom-right" />
        <AdminLogin onLogin={handleLogin} />
      </>
    );
    return (
      <>
        <Toaster richColors position="bottom-right" />
        <AdminPanel news={news} setNews={setNews} heroImg={heroImg} setHeroImg={setHeroImg} editais={editais} setEditais={setEditais} projetos={projetos} setProjectos={setProjectos} onLogout={handleLogout} />
      </>
    );
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Gabarito', sans-serif" }}>
      <Toaster richColors position="bottom-right" />
      <Header />
      <HeroSection heroImg={heroImg} />
      <QuemSomosSection />
      <DiretoriaSection />
      <RedeSection />
      <NossasAcoesSection projetos={projetos} />
      <ParceriasSection />
      <NoticiasSection news={news} />
      <TransparenciaSection editais={editais} />
      <ContatoSection />
      <Footer />
      <CookieBanner />
    </div>
  );
}

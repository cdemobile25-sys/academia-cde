"use client";
import { useState, useEffect } from 'react';
import { Playfair_Display, Lato } from 'next/font/google';
import Papa from 'papaparse';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCxd7G4z9I-T76CFTvho76G0SM2xhdeVEUZIMhl-c0ty4yDM6sTZ3aFd4Uxk1adULozrvPh_tooEoi/pub?output=csv&gid=0";

type Curso = {
  id: string;
  titulo: string;
  descripcion: string;
  precio: string;
  link_pago: string;
  url_pdf: string;
  temario: string;
};

export default function Home() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [openTemario, setOpenTemario] = useState<string | null>(null);

  useEffect(() => {
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        setCursos(results.data as Curso[]);
        setLoading(false);
      }
    });
  }, []);

  if (loading) return (
    <main className={`min-h-screen bg-[#F0F2F5] flex items-center justify-center ${lato.className}`}>
      <p className="text-xl text-gray-600 animate-pulse">Cargando catálogo...</p>
    </main>
  );

  return (
    <main className={`min-h-screen bg-[#F0F2F5] relative overflow-hidden ${lato.className}`}>
      
      {/* COLUMNAS ROMANAS */}
      <div className="fixed left-0 top-0 w-16 md:w-24 h-full bg-[#E6E9F0] border-r-4 border-[#D4AF37] z-0 flex flex-col justify-between py-8 opacity-70">
        <div className="h-1/4 w-full bg-repeat-y bg-center" style={{backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"100\" height=\"200\" viewBox=\"0 0 100 200\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"10\" width=\"80\" height=\"200\" fill=\"%23D1D5DB\"/><rect x=\"20\" y=\"10\" width=\"60\" height=\"10\" fill=\"%23B0B0B0\"/></svg>')"}}></div>
      </div>
      
      <div className="fixed right-0 top-0 w-16 md:w-24 h-full bg-[#E6E9F0] border-l-4 border-[#D4AF37] z-0 flex flex-col justify-between py-8 opacity-70">
        <div className="h-1/4 w-full bg-repeat-y bg-center" style={{backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"100\" height=\"200\" viewBox=\"0 0 100 200\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"10\" width=\"80\" height=\"200\" fill=\"%23D1D5DB\"/><rect x=\"20\" y=\"10\" width=\"60\" height=\"10\" fill=\"%23B0B0B0\"/></svg>')"}}></div>
      </div>

      {/* CONTENIDO */}
      <div className="relative z-10 px-20 md:px-32 py-12">
        
        {/* --- HERO --- */}
        <header className="text-center mb-12 py-8 border-b-2 border-t-2 border-[#1B3A57] bg-white shadow-lg">
          
          {/* LLAMADOR TOPE */}
          <div className="bg-[#D4AF37] text-[#1B3A57] text-xs font-bold py-1 px-4 inline-block mb-4 uppercase tracking-widest">
            🚀 Inscripción abierta - Cupos limitados
          </div>

          <div className="inline-block mb-2 text-6xl">🏛️</div>
          <h1 className={`${playfair.className} text-5xl md:text-6xl font-bold text-[#1B3A57] tracking-wide`}>
            Academia Workfast
          </h1>
          <p className="text-gray-600 mt-2 text-lg font-semibold">Aprende un oficio con rápida salida laboral</p>
        </header>

        {/* --- BENEFICIOS (Iconos) --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 text-center">
          <div className="bg-white p-4 border border-gray-200 shadow-sm">
            <span className="text-3xl">⚡</span>
            <h4 className={`${playfair.className} text-[#1B3A57] font-bold mt-2`}>Salida Rápida</h4>
            <p className="text-xs text-gray-500">Aprende y trabaja en semanas, no años.</p>
          </div>
          <div className="bg-white p-4 border border-gray-200 shadow-sm">
            <span className="text-3xl">📚</span>
            <h4 className={`${playfair.className} text-[#1B3A57] font-bold mt-2`}>A Tu Ritmo</h4>
            <p className="text-xs text-gray-500">Estudia cuando quieras, acceso de por vida.</p>
          </div>
          <div className="bg-white p-4 border border-gray-200 shadow-sm">
            <span className="text-3xl">📜</span>
            <h4 className={`${playfair.className} text-[#1B3A57] font-bold mt-2`}>Certificado</h4>
            <p className="text-xs text-gray-500">Avala tus conocimientos al terminar.</p>
          </div>
        </section>

        {/* --- GRILLA DE CURSOS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {cursos.map((curso) => (
            curso.id && (
              <div key={curso.id} className="bg-white border border-gray-300 rounded-none shadow-md hover:shadow-xl transition-all flex flex-col relative">
                
                {/* Badge de oferta */}
                <div className="absolute top-2 right-2 bg-[#D4AF37] text-[#1B3A57] text-[10px] font-bold px-2 py-1 uppercase z-10">
                  ¡Oferta!
                </div>

                <div className="w-full h-2 bg-[#D4AF37]"></div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className={`${playfair.className} text-2xl font-bold mb-2 text-[#1B3A57]`}>{curso.titulo}</h3>
                  <div className="w-16 h-1 bg-[#D4AF37] mb-4 opacity-50"></div>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{curso.descripcion}</p>
                  
                  {/* TEMARIO DESPLEGABLE */}
                  {curso.temario && (
                    <div className="mb-4">
                      <button 
                        onClick={() => setOpenTemario(openTemario === curso.id ? null : curso.id)}
                        className="text-[#1B3A57] text-xs font-bold uppercase flex items-center gap-1 hover:underline"
                      >
                        {openTemario === curso.id ? '▼ Ocultar Temario' : '▶ Ver Temario'}
                      </button>
                      
                      {openTemario === curso.id && (
                        <div className="mt-2 bg-gray-50 p-3 border-l-2 border-[#D4AF37] text-xs text-gray-700 space-y-1">
                          {curso.temario.split('-').map((item, i) => (
                            <p key={i}>• {item.trim()}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mb-6 border-t border-gray-200 pt-4 mt-auto">
                    <span className="text-sm text-gray-500 block">Inversión del curso:</span>
                    <span className={`${playfair.className} text-4xl font-bold text-[#1B3A57]`}>$ {curso.precio}</span>
                    <span className="text-xs text-gray-400 line-through ml-2">$99999</span>
                  </div>

                  <a 
                    href={curso.link_pago}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#1B3A57] hover:bg-[#152a3d] text-white font-bold py-4 uppercase text-center tracking-widest text-sm transition-colors shadow-lg"
                  >
                    Comprar Ahora
                  </a>
                </div>
              </div>
            )
          ))}
        </div>

        {/* --- SECCIÓN "QUÉ INCLUYE" --- */}
        <section className="bg-[#1B3A57] text-white p-8 mb-16 text-center">
          <h2 className={`${playfair.className} text-3xl mb-6`}>¿Qué incluye tu compra?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-2">
              <span className="block text-2xl mb-2">📄</span>
              PDF de alta calidad
            </div>
            <div className="p-2">
              <span className="block text-2xl mb-2">♾️</span>
              Acceso de por vida
            </div>
            <div className="p-2">
              <span className="block text-2xl mb-2">💬</span>
              Soporte por WhatsApp
            </div>
            <div className="p-2">
              <span className="block text-2xl mb-2">🎓</span>
              Certificado digital
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-16 text-center text-gray-500 text-xs pb-8 border-t pt-8">
          <p>Academia Workfast © 2024 - Todos los derechos reservados.</p>
          <p className="mt-2">¿Dudas? Escribinos al WhatsApp haciendo clic en el botón verde abajo a la derecha.</p>
        </footer>

      </div>

      {/* BOTÓN FLOTANTE WP (Simulado, acordate de cambiar el número) */}
      <a 
        href="https://wa.me/542246516868?text=Hola! Quiero info sobre los cursos" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white text-4xl w-16 h-16 flex items-center justify-center rounded-full shadow-lg z-50 transition-all hover:scale-110 border-2 border-white/20"
      >
        💬
      </a>

    </main>
  );
}
"use client";
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Playfair_Display, Lato } from 'next/font/google';
import Papa from 'papaparse';
import { Suspense } from 'react';
import html2canvas from 'html2canvas'; // La magia para crear el PDF

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700', '900'] });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCxd7G4z9I-T76CFTvho76G0SM2xhdeVEUZIMhl-c0ty4yDM6sTZ3aFd4Uxk1adULozrvPh_tooEoi/pub?output=csv&gid=0";

type Curso = {
  id: string;
  titulo: string;
  url_pdf: string;
};

// Componente del Diploma (El diseño visual)
function Diploma({ nombre, curso }: { nombre: string, curso: string }) {
  const diplomaRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!diplomaRef.current) return;
    
    // Captura el diploma como imagen
    const canvas = await html2canvas(diplomaRef.current, {
      scale: 2, // Mejor calidad
      useCORS: true,
    });
    
    // Crea el link de descarga
    const link = document.createElement('a');
    link.download = `Diploma-${curso}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="mt-8">
      <div 
        ref={diplomaRef}
        className="bg-white p-8 border-[8px] border-double border-[#D4AF37] text-center relative overflow-hidden"
        style={{ width: '600px', maxWidth: '100%', margin: '0 auto' }}
      >
        {/* Fondo decorativo */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20 0L40 20L20 40L0 20Z\" fill=\"%23D4AF37\"/></svg>')"}}></div>

        <div className="relative z-10">
          <h2 className={`${playfair.className} text-xl text-gray-400 uppercase tracking-[0.3em] mb-2`}>Academia Workfast</h2>
          
          <div className="text-4xl my-4">🎓</div>
          
          <p className="text-gray-600 text-sm uppercase tracking-wider">Certifica que</p>
          
          <h1 className={`${playfair.className} text-4xl md:text-5xl text-[#1B3A57] my-4 border-b-2 border-gray-200 pb-2 inline-block px-8`}>
            {nombre}
          </h1>
          
          <p className="text-gray-600 text-sm uppercase tracking-wider mt-4">ha completado exitosamente el curso de</p>
          
          <h2 className={`${playfair.className} text-2xl text-[#D4AF37] font-bold mt-2`}>
            {curso}
          </h2>
          
          <div className="mt-8 flex justify-between text-xs text-gray-500 px-4">
            <div>
              <div className="w-16 border-t border-gray-400 mb-1"></div>
              Fecha
            </div>
            <div>
              <div className="w-16 border-t border-gray-400 mb-1"></div>
              Director
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button 
          onClick={handleDownload}
          className="bg-[#D4AF37] text-white font-bold py-3 px-6 rounded hover:bg-[#b8962e] transition-colors text-sm"
        >
          📥 Descargar Diploma (Imagen)
        </button>
      </div>
    </div>
  );
}

// Componente Interno
function GraciasContent() {
  const searchParams = useSearchParams();
  const cursoId = searchParams.get('curso_id'); 
  const [curso, setCurso] = useState<Curso | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Estado para el diploma
  const [nombreAlumno, setNombreAlumno] = useState("");
  const [mostrarDiploma, setMostrarDiploma] = useState(false);

  useEffect(() => {
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        const data = results.data as Curso[];
        const found = data.find(c => c.id === cursoId);
        setCurso(found || null);
        setLoading(false);
      }
    });
  }, [cursoId]);

  if (loading) return <main className="min-h-screen bg-[#F0F2F5] flex items-center justify-center font-sans text-gray-600">Verificando pago...</main>;
  if (!curso) return <main className="min-h-screen bg-[#F0F2F5] flex items-center justify-center font-sans text-red-600">No encontramos tu curso.</main>;

  return (
    <main className={`min-h-screen bg-[#F0F2F5] flex flex-col items-center justify-center p-8 ${lato.className}`}>
      <div className="bg-white border-2 border-[#D4AF37] p-8 md:p-12 max-w-2xl w-full text-center shadow-2xl relative">
        
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#1B3A57] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
          Pago Aprobado
        </div>

        <h1 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#1B3A57] mb-6 mt-4`}>
          ¡Bienvenido, Alumno!
        </h1>
        
        <p className="text-gray-600 mb-2">Tu acceso al curso:</p>
        <h2 className={`${playfair.className} text-xl md:text-2xl font-bold text-[#D4AF37] mb-6`}>{curso.titulo}</h2>
        
        <a 
          href={curso.url_pdf} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-[#1B3A57] hover:bg-[#152a3d] text-white font-bold py-3 px-8 uppercase text-sm tracking-wide transition-colors mb-8"
        >
          📄 Descargar Curso (PDF)
        </a>

        {/* SECCIÓN DIPLOMA */}
        <div className="border-t border-gray-200 pt-8 mt-4">
          <h3 className={`${playfair.className} text-xl font-bold text-[#1B3A57] mb-4`}>
            Obtené tu Diploma
          </h3>
          
          {!mostrarDiploma ? (
            <div className="space-y-3">
              <p className="text-xs text-gray-500">Ingresá tu nombre tal como querés que aparezca en el diploma.</p>
              <input 
                type="text" 
                placeholder="Tu Nombre Completo" 
                value={nombreAlumno}
                onChange={(e) => setNombreAlumno(e.target.value)}
                className="w-full border border-gray-300 p-2 text-center rounded text-sm focus:border-[#D4AF37] outline-none"
              />
              <button 
                onClick={() => nombreAlumno.length > 2 && setMostrarDiploma(true)}
                disabled={nombreAlumno.length < 3}
                className="bg-[#D4AF37] text-white font-bold py-2 px-6 rounded text-sm hover:bg-[#b8962e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generar Diploma
              </button>
            </div>
          ) : (
            <Diploma nombre={nombreAlumno} curso={curso.titulo} />
          )}
        </div>

      </div>
    </main>
  );
}

// Exportación con Suspense
export default function GraciasPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#F0F2F5] flex items-center justify-center font-sans text-gray-600">Cargando...</main>}>
      <GraciasContent />
    </Suspense>
  );
}
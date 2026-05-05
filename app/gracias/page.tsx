"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Playfair_Display, Lato } from 'next/font/google';
import Papa from 'papaparse';
import { Suspense } from 'react';

// FUENTES
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700', '900'] });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCxd7G4z9I-T76CFTvho76G0SM2xhdeVEUZIMhl-c0ty4yDM6sTZ3aFd4Uxk1adULozrvPh_tooEoi/pub?output=csv&gid=0";

type Curso = {
  id: string;
  titulo: string;
  url_pdf: string;
};

function GraciasContent() {
  const searchParams = useSearchParams();
  const cursoId = searchParams.get('curso_id'); 
  const [curso, setCurso] = useState<Curso | null>(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) return <main className="min-h-screen bg-[#F0F2F5] flex items-center justify-center font-sans text-gray-600">Verificando...</main>;
  if (!curso) return <main className="min-h-screen bg-[#F0F2F5] flex items-center justify-center font-sans text-red-600">No encontramos tu curso.</main>;

  return (
    <main className={`min-h-screen bg-[#F0F2F5] flex flex-col items-center justify-center p-8 ${lato.className}`}>
      <div className="bg-white border-2 border-[#D4AF37] p-8 md:p-12 max-w-2xl w-full text-center shadow-2xl relative">
        
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#1B3A57] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
          Pago Aprobado
        </div>

        <h1 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#1B3A57] mb-6 mt-4`}>¡Bienvenido, Alumno!</h1>
        <p className="text-gray-600 mb-2">Tu acceso al curso:</p>
        <h2 className={`${playfair.className} text-xl md:text-2xl font-bold text-[#D4AF37] mb-6`}>{curso.titulo}</h2>
        
        <a href={curso.url_pdf} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#1B3A57] hover:bg-[#152a3d] text-white font-bold py-3 px-8 uppercase text-sm tracking-wide transition-colors mb-8">
          📄 Descargar Curso (PDF)
        </a>

        {/* SECCIÓN DIPLOMA (Versión segura) */}
        <div className="border-t border-gray-200 pt-8 mt-4">
          <h3 className={`${playfair.className} text-xl font-bold text-[#1B3A57] mb-4`}>Obtené tu Diploma</h3>
          
          {!mostrarDiploma ? (
            <div className="space-y-3">
              <p className="text-xs text-gray-500">Ingresá tu nombre tal como querés que aparezca.</p>
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
                className="bg-[#D4AF37] text-white font-bold py-2 px-6 rounded text-sm hover:bg-[#b8962e] transition-colors disabled:opacity-50"
              >
                Generar Diploma
              </button>
            </div>
          ) : (
            <div className="mt-4">
              {/* Diploma visible directamente */}
              <div className="bg-white p-6 border-[4px] border-double border-[#D4AF37] text-center relative overflow-hidden shadow-lg">
                <h2 className={`${playfair.className} text-sm text-gray-400 uppercase tracking-[0.2em] mb-1`}>Academia Workfast</h2>
                <div className="text-2xl my-2">🎓</div>
                <p className="text-gray-500 text-xs uppercase">Certifica que</p>
                <h1 className={`${playfair.className} text-2xl md:text-3xl text-[#1B3A57] my-2 border-b border-gray-200 pb-1 inline-block px-4`}>
                  {nombreAlumno}
                </h1>
                <p className="text-gray-500 text-xs uppercase mt-2">ha completado el curso de</p>
                <h2 className={`${playfair.className} text-lg text-[#D4AF37] font-bold`}>{curso.titulo}</h2>
              </div>
              
              <p className="text-xs text-gray-400 mt-4 bg-gray-50 p-2 rounded">
                💡 <strong>Para guardar el diploma:</strong> Hacé clic derecho sobre la imagen &gt; "Guardar imagen como..." o usá la opción "Captura de pantalla" de tu celular.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function GraciasPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#F0F2F5] flex items-center justify-center font-sans text-gray-600">Cargando...</main>}>
      <GraciasContent />
    </Suspense>
  );
}
"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Playfair_Display, Lato } from 'next/font/google';
import Papa from 'papaparse';
import { Suspense } from 'react'; // IMPORTANTE: Soluciona la pantalla en blanco

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCxd7G4z9I-T76CFTvho76G0SM2xhdeVEUZIMhl-c0ty4yDM6sTZ3aFd4Uxk1adULozrvPh_tooEoi/pub?output=csv&gid=0";

type Curso = {
  id: string;
  titulo: string;
  url_pdf: string;
};

// Componente que contiene la lógica y la UI
function GraciasContent() {
  const searchParams = useSearchParams();
  const cursoId = searchParams.get('curso_id'); 
  const [curso, setCurso] = useState<Curso | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return (
    <main className="min-h-screen bg-[#F0F2F5] flex items-center justify-center font-sans text-gray-600">
      Verificando pago...
    </main>
  );
  
  if (!curso) return (
    <main className="min-h-screen bg-[#F0F2F5] flex items-center justify-center font-sans text-red-600">
      No encontramos tu curso. Contactanos por WhatsApp.
    </main>
  );

  return (
    <main className={`min-h-screen bg-[#F0F2F5] flex items-center justify-center p-8 ${lato.className}`}>
      <div className="bg-white border-2 border-[#D4AF37] p-12 max-w-lg w-full text-center shadow-2xl relative">
        
        {/* Sello de aprobación */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#1B3A57] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
          Pago Aprobado
        </div>

        <h1 className={`${playfair.className} text-4xl font-bold text-[#1B3A57] mb-6 mt-4`}>
          ¡Bienvenido, Alumno!
        </h1>
        
        <p className="text-gray-600 mb-2">Tu acceso al curso:</p>
        <h2 className={`${playfair.className} text-2xl font-bold text-[#D4AF37] mb-8`}>
          {curso.titulo}
        </h2>
        
        <p className="text-gray-500 text-sm mb-8">
          Haz clic en el botón para descargar tu material de estudio.
        </p>

        <a 
          href={curso.url_pdf} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-[#1B3A57] hover:bg-[#152a3d] text-white font-bold py-4 px-10 uppercase text-lg tracking-wide transition-colors"
        >
          Descargar PDF
        </a>
      </div>
    </main>
  );
}

// Componente Principal que envuelve todo en Suspense
export default function GraciasPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#F0F2F5] flex items-center justify-center font-sans text-gray-600">
        Cargando...
      </main>
    }>
      <GraciasContent />
    </Suspense>
  );
}
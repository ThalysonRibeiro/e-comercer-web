import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';


export default function NotFound() {

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="animate-pulse">
          <h1 className="text-[250px] font-bold tracking-tight">404</h1>
          <h2 className="text-3xl font-medium">Página não encontrada</h2>
        </div>

        <div className="space-y-4 flex flex-col items-center justify-center">
          <p className="text-lg">
            Parece que esta página se perdeu na tinta. Talvez ainda esteja na fase de esboço?
          </p>

          <div className="w-80 flex items-center justify-center">
            <Link
              href="/"
              className="bg-primary border hover:bg-accent px-6 py-3 rounded-lg flex items-center justify-center gap-2 mx-auto transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar para o inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

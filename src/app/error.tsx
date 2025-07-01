"use client"
import { Button } from '@/components/ui/button';
import { AlertOctagon, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface ErrorProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

export default function Error({ error, resetErrorBoundary }: ErrorProps) {

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="animate-pulse">
          <AlertOctagon className="w-24 h-24 mx-auto mb-4 text-destructive" />
          <h1 className="text-6xl font-bold tracking-tight mb-2">Oops!</h1>
          <h2 className="text-2xl font-medium mb-8">Algo deu errado</h2>
        </div>

        <div className="space-y-4">
          <p className="text-lg">
            Parece que alguem esbarrou em alguns cabos. Não se preocupe, nós vamos consertar.
          </p>

          {error && (
            <div className="border border-primary/20 rounded-lg p-4 mx-auto max-w-lg">
              <p className="text-destructive font-mono text-sm">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/"
              className="relative bg-primary border hover:bg-hover px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar para a página inicial
            </Link>

            {resetErrorBoundary && (
              <Button
                onClick={resetErrorBoundary}
                className='w-fit'
              >
                <RefreshCw className="w-5 h-5" />
                Tentar novamente
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

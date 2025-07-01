"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/axios';

export function ConfirmEmailConmponent() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // Faz a requisição POST para o back-end com o token
      api.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/email-verification/confirm-email`, { token })
        .then(response => {
          setMessage('Email confirmado com sucesso!');
        })
        .catch(error => {
          setMessage('Erro ao confirmar email. O link pode ter expirado ou já foi utilizado.');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setMessage('Token de confirmação não encontrado.');
      setLoading(false);
    }
  }, [searchParams]);


  if (loading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}
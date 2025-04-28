'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ReloadOnParamChange() {
  const searchParams = useSearchParams();
  const hasReloaded = useRef(false);

  useEffect(() => {
    if (hasReloaded.current) {
      window.location.reload();
    } else {
      hasReloaded.current = true;
    }
  }, [searchParams.toString()]);

  return null;
}

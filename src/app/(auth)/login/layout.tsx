import React from 'react';
import BgAuth from '@/assets/img/bg-auth.png';
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-cover bg-center h-screen bg-red-500/90" style={{ backgroundImage: `url(${BgAuth.src})` }}>
      {children}
    </div>
  );
}

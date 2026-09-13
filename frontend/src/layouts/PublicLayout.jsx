import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

export default function PublicLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="bg-surface font-body-regular text-body-regular text-on-surface antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed min-h-screen flex flex-col justify-between">
      <PublicHeader />
      <main className={`w-full flex-grow ${isHome ? 'pt-0' : 'pt-16 md:pt-20'} bg-surface`}>
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}

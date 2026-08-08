import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { BackgroundField } from '@/components/BackgroundField';

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="min-h-screen">
      <BackgroundField />
      <div className="relative z-10">
        <NavBar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

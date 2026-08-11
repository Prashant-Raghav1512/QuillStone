import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { WhatWeDoPage } from '@/pages/WhatWeDoPage';
import { OurWorkPage } from '@/pages/OurWorkPage';
import { HowItWorksPage } from '@/pages/HowItWorksPage';
import { ContactPage } from '@/pages/ContactPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="what-we-do" element={<WhatWeDoPage />} />
          <Route path="our-work" element={<OurWorkPage />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

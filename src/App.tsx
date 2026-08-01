import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { DualityPage } from '@/pages/DualityPage';
import { PublishingPage } from '@/pages/PublishingPage';
import { MarketingPage } from '@/pages/MarketingPage';
import { ContactPage } from '@/pages/ContactPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/duality" element={<DualityPage />} />
          <Route path="/publishing" element={<PublishingPage />} />
          <Route path="/marketing" element={<MarketingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

import React, { useState } from 'react';
import { TabType } from './types';
import { Header } from './components/Header';
import { ExecutiveKpiBanner } from './components/ExecutiveKpiBanner';
import { Navigation } from './components/Navigation';
import { SummaryTab } from './components/tabs/SummaryTab';
import { OpticsTab } from './components/tabs/OpticsTab';
import { ControlTab } from './components/tabs/ControlTab';
import { ProductsTab } from './components/tabs/ProductsTab';
import { MediaTab } from './components/tabs/MediaTab';
import { DesignGuideTab } from './components/tabs/DesignGuideTab';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('summary');
  const [targetId, setTargetId] = useState<string | undefined>(undefined);

  const handleNavigate = (tab: TabType, id?: string) => {
    setActiveTab(tab);
    setTargetId(id);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setTargetId(undefined);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Global Header with Search Bar */}
      <Header onNavigate={handleNavigate} />

      {/* KPI Banner */}
      <ExecutiveKpiBanner />

      {/* Sticky Tab Navigation */}
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main Dynamic View Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'summary' && <SummaryTab />}
        {activeTab === 'optics' && <OpticsTab targetWavelength={targetId} />}
        {activeTab === 'control' && <ControlTab />}
        {activeTab === 'products' && <ProductsTab targetProductId={targetId} />}
        {activeTab === 'media' && <MediaTab targetId={targetId} />}
        {activeTab === 'design' && <DesignGuideTab />}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

import React, { useState } from 'react';
import { Activity, Rocket, List } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import MonitorTab from './components/MonitorTab';
import LaunchTab from './components/LaunchTab';
import EventsTab from './components/EventsTab';
import { cn } from './lib/utils';

type Tab = 'monitor' | 'launch' | 'events';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('monitor');
  const [isRunning, setIsRunning] = useState(false);

  // Mock unread count for events
  const unreadEvents = 3;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Mobile App Container */}
      <div className="max-w-md mx-auto h-screen relative bg-slate-950 shadow-2xl overflow-hidden flex flex-col border-x border-white/5">
        
        {/* Header */}
        <header className="bg-slate-950/80 backdrop-blur-xl border-b border-white/10 p-4 sticky top-0 z-20">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <h1 className="text-lg font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              ПАНЕЛЬ УПРАВЛЕНИЯ
            </h1>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="h-full"
            >
              {activeTab === 'monitor' && <MonitorTab isRunning={isRunning} setIsRunning={setIsRunning} />}
              {activeTab === 'launch' && <LaunchTab setIsRunning={(val) => { setIsRunning(val); setActiveTab('monitor'); }} />}
              {activeTab === 'events' && <EventsTab />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 w-full bg-slate-950/90 backdrop-blur-xl border-t border-white/10 pb-safe z-20">
          <div className="flex justify-around items-center h-16 px-2">
            <button 
              onClick={() => setActiveTab('monitor')}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-all duration-300",
                activeTab === 'monitor' ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" : "text-slate-500 hover:text-slate-300"
              )}
            >
              <Activity className="w-5 h-5" />
              <span className="text-[10px] font-medium tracking-wider uppercase">Мониторинг</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('launch')}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-all duration-300",
                activeTab === 'launch' ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" : "text-slate-500 hover:text-slate-300"
              )}
            >
              <Rocket className="w-5 h-5" />
              <span className="text-[10px] font-medium tracking-wider uppercase">Запуск</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('events')}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-all duration-300 relative",
                activeTab === 'events' ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" : "text-slate-500 hover:text-slate-300"
              )}
            >
              <div className="relative">
                <List className="w-5 h-5" />
                {unreadEvents > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-cyan-500 text-slate-950 text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                    {unreadEvents}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium tracking-wider uppercase">События</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

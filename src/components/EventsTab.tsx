import React, { useState } from 'react';
import { CheckCircle2, XCircle, Clock, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const MOCK_EVENTS = [
  { id: 'evt_1', type: 'success', item: 'пользователь_782', time: '10:42:05', session: 'Nightly_Sync' },
  { id: 'evt_2', type: 'error', item: 'платеж_91', time: '10:42:03', session: 'Nightly_Sync', detail: 'Таймаут' },
  { id: 'evt_3', type: 'success', item: 'пользователь_781', time: '10:42:01', session: 'Nightly_Sync' },
  { id: 'evt_4', type: 'success', item: 'пользователь_780', time: '10:41:58', session: 'Nightly_Sync' },
  { id: 'evt_5', type: 'error', item: 'платеж_90', time: '10:41:55', session: 'Nightly_Sync', detail: 'Неверный формат' },
  { id: 'evt_6', type: 'success', item: 'пользователь_779', time: '10:41:50', session: 'Nightly_Sync' },
];

export default function EventsTab() {
  const [filter, setFilter] = useState<'all' | 'success' | 'error'>('all');

  const filteredEvents = MOCK_EVENTS.filter(e => filter === 'all' || e.type === filter);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header & Filters */}
      <div className="p-4 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">Журнал событий</h2>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5" /> Фильтр
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all",
              filter === 'all' 
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_8px_rgba(34,211,238,0.3)]" 
                : "bg-slate-900 text-slate-400 border border-white/5 hover:bg-slate-800"
            )}
          >
            Все
          </button>
          <button 
            onClick={() => setFilter('success')}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all",
              filter === 'success' 
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.3)]" 
                : "bg-slate-900 text-slate-400 border border-white/5 hover:bg-slate-800"
            )}
          >
            Успешно
          </button>
          <button 
            onClick={() => setFilter('error')}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all",
              filter === 'error' 
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/50 shadow-[0_0_8px_rgba(244,63,94,0.3)]" 
                : "bg-slate-900 text-slate-400 border border-white/5 hover:bg-slate-800"
            )}
          >
            Ошибки
          </button>
        </div>
      </div>

      {/* Event List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
        <AnimatePresence mode="popLayout">
          {filteredEvents.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-10 text-slate-500 text-sm"
            >
              Нет событий, соответствующих фильтру.
            </motion.div>
          ) : (
            filteredEvents.map((evt, i) => (
              <motion.div 
                key={evt.id}
                layout
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="bg-slate-900/50 backdrop-blur-md p-3 rounded-xl border border-white/5 flex items-start gap-3 relative overflow-hidden group"
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${evt.type === 'success' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]'}`} />
                <div className="mt-0.5 pl-1">
                  {evt.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_4px_rgba(16,185,129,0.5)]" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 drop-shadow-[0_0_4px_rgba(244,63,94,0.5)]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-sm text-slate-200 truncate pr-2">
                      {evt.item}
                    </div>
                    <div className="text-xs text-slate-500 font-mono flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3" /> {evt.time}
                    </div>
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 mt-1.5 flex items-center justify-between">
                    <span>{evt.session}</span>
                    {evt.detail && <span className="text-rose-400 font-medium">{evt.detail}</span>}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

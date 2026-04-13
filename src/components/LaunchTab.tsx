import React, { useState } from 'react';
import { Play, Plus, Minus, Bell } from 'lucide-react';
import { motion } from 'motion/react';

export default function LaunchTab({ setIsRunning }: { setIsRunning: (val: boolean) => void }) {
  const [threads, setThreads] = useState(4);
  const [stopMode, setStopMode] = useState('infinite');
  const [notifications, setNotifications] = useState(true);

  const handleLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRunning(true);
  };

  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto pb-24">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Новая задача</h2>
        <p className="text-sm text-slate-400 mt-1">Настройка и запуск нового фонового процесса.</p>
      </motion.div>

      <form onSubmit={handleLaunch} className="space-y-5">
        {/* Data Source */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-1.5"
        >
          <label className="text-xs uppercase tracking-wider text-slate-400 font-medium ml-1">Источник данных (URL или путь)</label>
          <input 
            type="text" 
            placeholder="например, s3://bucket/data.csv" 
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all placeholder:text-slate-600 font-mono text-sm"
            required
          />
        </motion.div>

        {/* Session Name */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-1.5"
        >
          <label className="text-xs uppercase tracking-wider text-slate-400 font-medium ml-1">Имя сессии</label>
          <input 
            type="text" 
            placeholder="например, Nightly_Sync" 
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all placeholder:text-slate-600 font-mono text-sm"
            required
          />
        </motion.div>

        {/* Thread Count */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-1.5"
        >
          <label className="text-xs uppercase tracking-wider text-slate-400 font-medium ml-1">Количество потоков</label>
          <div className="flex items-center justify-between bg-slate-900/50 border border-white/10 rounded-xl p-1">
            <button 
              type="button"
              onClick={() => setThreads(Math.max(1, threads - 1))}
              className="p-3 text-slate-500 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-lg font-bold font-mono text-cyan-400 w-12 text-center drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">{threads}</span>
            <button 
              type="button"
              onClick={() => setThreads(Math.min(32, threads + 1))}
              className="p-3 text-slate-500 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Stop Mode */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-1.5"
        >
          <label className="text-xs uppercase tracking-wider text-slate-400 font-medium ml-1">Условие остановки</label>
          <select 
            value={stopMode}
            onChange={(e) => setStopMode(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all appearance-none text-sm"
          >
            <option value="infinite">Обрабатывать до конца</option>
            <option value="count">Остановить после N элементов</option>
            <option value="errors">Остановить после N ошибок</option>
          </select>
        </motion.div>

        {/* Conditional Limit */}
        {stopMode !== 'infinite' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-1.5"
          >
            <label className="text-xs uppercase tracking-wider text-slate-400 font-medium ml-1">Лимит</label>
            <input 
              type="number" 
              placeholder="1000" 
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-900/50 text-slate-100 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all placeholder:text-slate-600 font-mono text-sm"
            />
          </motion.div>
        )}

        {/* Notifications Toggle */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between p-4 bg-slate-900/50 border border-white/10 rounded-xl"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
              <Bell className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="font-medium text-slate-200 text-sm">Push-уведомления</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">Оповещать о завершении</div>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full transition-colors relative border ${notifications ? 'bg-cyan-500/20 border-cyan-500/50' : 'bg-slate-800 border-white/10'}`}
          >
            <div className={`w-4 h-4 rounded-full absolute top-[3px] transition-transform shadow-[0_0_8px_rgba(34,211,238,0.8)] ${notifications ? 'translate-x-7 bg-cyan-400' : 'translate-x-1 bg-slate-500 shadow-none'}`} />
          </button>
        </motion.div>

        {/* Submit Button */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="pt-4"
        >
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-4 rounded-xl font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] border border-cyan-400/50"
          >
            <Play className="w-4 h-4 fill-current" /> Запустить задачу
          </button>
        </motion.div>
      </form>
    </div>
  );
}

import React from 'react';
import { Play, Pause, Square, Activity } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

const mockChartData = [
  { speed: 12 }, { speed: 18 }, { speed: 15 }, { speed: 25 }, 
  { speed: 22 }, { speed: 30 }, { speed: 28 }, { speed: 35 }, 
  { speed: 32 }, { speed: 40 }
];

export default function MonitorTab({ isRunning, setIsRunning }: { isRunning: boolean, setIsRunning: (val: boolean) => void }) {
  if (!isRunning) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-full p-6 text-center space-y-6"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl animate-pulse" />
          <div className="w-24 h-24 bg-slate-900/80 border border-white/10 rounded-full flex items-center justify-center relative z-10">
            <Activity className="w-12 h-12 text-cyan-500 opacity-50" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-100 mb-2">Нет активных задач</h2>
          <p className="text-slate-400 text-sm max-w-[250px] mx-auto leading-relaxed">
            В данный момент нет запущенных фоновых процессов. Перейдите на вкладку «Запуск», чтобы начать.
          </p>
        </div>
      </motion.div>
    );
  }

  const progress = 68;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col h-full p-4 space-y-6 overflow-y-auto pb-24">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-lg font-bold text-slate-100 tracking-wide">Сессия: <span className="text-cyan-400">Data_Sync_Nightly</span></h2>
        <p className="text-xs text-slate-400 font-mono mt-1">Время работы: 00:14:23</p>
      </motion.div>

      {/* Circular Progress */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative flex items-center justify-center py-4"
      >
        <div className="absolute inset-0 bg-cyan-500/5 rounded-full blur-2xl" />
        <svg className="transform -rotate-90 w-48 h-48 drop-shadow-[0_0_12px_rgba(34,211,238,0.3)]">
          <circle 
            cx="96" cy="96" r={radius} 
            stroke="currentColor" strokeWidth="8" fill="transparent" 
            className="text-slate-800" 
          />
          <circle 
            cx="96" cy="96" r={radius} 
            stroke="currentColor" strokeWidth="8" fill="transparent" 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset} 
            className="text-cyan-400 transition-all duration-1000 ease-out" 
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-slate-100 font-mono tracking-tighter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            {progress}<span className="text-2xl text-cyan-500">%</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">Завершено</span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Обработано', value: '1,432', color: 'text-emerald-400' },
          { label: 'Ошибки', value: '24', color: 'text-rose-400' },
          { label: 'Скорость', value: '42/с', color: 'text-cyan-400' }
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="bg-slate-900/50 backdrop-blur-md p-3 rounded-xl border border-white/5 text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className={`text-xl font-bold font-mono ${stat.color} drop-shadow-[0_0_8px_currentColor]`}>{stat.value}</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Current Item */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-900/50 backdrop-blur-md p-4 rounded-xl border border-white/5 relative overflow-hidden"
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
        <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5 pl-2">Текущий элемент</div>
        <div className="font-mono text-sm text-slate-200 truncate pl-2">
          запись_8f72a9b1...
        </div>
      </motion.div>

      {/* Sparkline Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-slate-900/50 backdrop-blur-md p-4 rounded-xl border border-white/5"
      >
        <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-3 flex justify-between">
          <span>График скорости (эл/сек)</span>
          <span className="text-cyan-400 animate-pulse">Live</span>
        </div>
        <div className="h-16 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockChartData}>
              <Line 
                type="monotone" 
                dataKey="speed" 
                stroke="#22d3ee" 
                strokeWidth={2} 
                dot={false} 
                isAnimationActive={true} 
                style={{ filter: 'drop-shadow(0 0 4px rgba(34,211,238,0.5))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex gap-3 pt-2"
      >
        <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors border border-white/5">
          <Pause className="w-4 h-4" /> Пауза
        </button>
        <button 
          onClick={() => setIsRunning(false)}
          className="flex-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors border border-rose-500/20"
        >
          <Square className="w-4 h-4" /> Остановить
        </button>
      </motion.div>
    </div>
  );
}

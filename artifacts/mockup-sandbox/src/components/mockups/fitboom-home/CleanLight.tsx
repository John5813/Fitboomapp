import React from 'react';
import { Plus, Globe, MapPin, ArrowRight, Home, Dumbbell, Calendar, UserCircle } from 'lucide-react';

export function CleanLight() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-8 font-sans">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div 
        style={{ width: 390, height: 844, position: 'relative' }}
        className="bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] rounded-[40px] border-[6px] border-slate-200 overflow-hidden flex flex-col"
      >
        <div className="flex-1 overflow-y-auto hide-scrollbar pb-24">
          {/* Top Safe Area Spacing */}
          <div className="h-12 w-full"></div>

          {/* Header */}
          <div className="px-6 flex items-center justify-between mb-8">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Fit<span className="text-blue-600">Boom</span>
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Yaqin atrofdagi sport zallari</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 rounded-full border border-slate-200">
                <Globe size={14} className="text-slate-600" />
                <span className="text-[10px] font-bold text-slate-700">UZB</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden">
                <UserCircle size={24} className="text-slate-400" />
              </button>
            </div>
          </div>

          {/* Credit Balance Card */}
          <div className="px-6 mb-10">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 text-white shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-blue-200 text-sm font-medium mb-1">Hisobingiz</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold tracking-tight">12</span>
                    <span className="text-blue-100 text-lg font-medium">kredit</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                  <p className="text-xs font-medium">23 kun qoldi</p>
                </div>
              </div>
              <button className="w-full bg-white text-blue-700 hover:bg-blue-50 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <Plus size={18} strokeWidth={2.5} />
                To'ldirish
              </button>
            </div>
          </div>

          {/* Section Header */}
          <div className="px-6 flex items-end justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-0.5">Yaqin zallar</h2>
              <p className="text-sm text-slate-500 font-medium">Masofaga ko'ra</p>
            </div>
            <button className="flex items-center gap-1 text-sm font-semibold text-blue-600 mb-0.5">
              Hammasi <ArrowRight size={16} />
            </button>
          </div>

          {/* Gym List */}
          <div className="px-6 flex flex-col gap-5 pb-6">
            {/* Gym Card 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="h-40 relative">
                <img 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800" 
                  alt="PowerHouse Gym" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/20 shadow-sm">
                  <span className="text-xs font-bold text-slate-900">1 kredit</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">PowerHouse Gym</h3>
                  <div className="flex items-center gap-1 text-slate-500 bg-slate-100 px-2 py-0.5 rounded text-xs font-medium">
                    <MapPin size={12} />
                    1.2 km
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-4 font-medium">Bodybuilding, Cardio, Yoga</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-slate-100 text-slate-700 font-semibold py-2.5 rounded-xl text-sm border border-slate-200">
                    Batafsil
                  </button>
                  <button className="flex-1 bg-blue-600 text-white font-semibold py-2.5 rounded-xl text-sm shadow-sm">
                    Band qilish
                  </button>
                </div>
              </div>
            </div>

            {/* Gym Card 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="h-40 relative">
                <img 
                  src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800" 
                  alt="Fitness Pro" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/20 shadow-sm">
                  <span className="text-xs font-bold text-slate-900">2 kredit</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">Fitness Pro</h3>
                  <div className="flex items-center gap-1 text-slate-500 bg-slate-100 px-2 py-0.5 rounded text-xs font-medium">
                    <MapPin size={12} />
                    2.4 km
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-4 font-medium">CrossFit, HIIT, Sauna</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-slate-100 text-slate-700 font-semibold py-2.5 rounded-xl text-sm border border-slate-200">
                    Batafsil
                  </button>
                  <button className="flex-1 bg-blue-600 text-white font-semibold py-2.5 rounded-xl text-sm shadow-sm">
                    Band qilish
                  </button>
                </div>
              </div>
            </div>

            {/* Gym Card 3 */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="h-40 relative">
                <img 
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800" 
                  alt="Iron Temple" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/20 shadow-sm">
                  <span className="text-xs font-bold text-slate-900">1 kredit</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">Iron Temple</h3>
                  <div className="flex items-center gap-1 text-slate-500 bg-slate-100 px-2 py-0.5 rounded text-xs font-medium">
                    <MapPin size={12} />
                    3.8 km
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-4 font-medium">Powerlifting, Boxing</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-slate-100 text-slate-700 font-semibold py-2.5 rounded-xl text-sm border border-slate-200">
                    Batafsil
                  </button>
                  <button className="flex-1 bg-blue-600 text-white font-semibold py-2.5 rounded-xl text-sm shadow-sm">
                    Band qilish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tab Bar */}
        <div className="absolute bottom-0 w-full bg-white border-t border-slate-200 px-6 pt-3 pb-8 flex justify-between">
          <button className="flex flex-col items-center gap-1 w-16">
            <Home size={24} className="text-blue-600 fill-blue-50" />
            <span className="text-[10px] font-bold text-blue-600">Bosh sahifa</span>
          </button>
          <button className="flex flex-col items-center gap-1 w-16">
            <Dumbbell size={24} className="text-slate-400" />
            <span className="text-[10px] font-medium text-slate-500">Zallar</span>
          </button>
          <button className="flex flex-col items-center gap-1 w-16">
            <Calendar size={24} className="text-slate-400" />
            <span className="text-[10px] font-medium text-slate-500">Bron</span>
          </button>
          <button className="flex flex-col items-center gap-1 w-16">
            <UserCircle size={24} className="text-slate-400" />
            <span className="text-[10px] font-medium text-slate-500">Profil</span>
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { 
  Zap, 
  Plus, 
  Globe, 
  User, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Home, 
  Dumbbell, 
  Calendar, 
  UserCircle,
  Search,
  Flame
} from 'lucide-react';

export function BoldEnergy() {
  return (
    <div className="min-h-screen w-full bg-slate-200 flex items-center justify-center p-4 sm:p-8 font-sans">
      {/* Mobile Frame Container */}
      <div 
        style={{ width: 390, height: 844 }}
        className="bg-[#F0F4FF] relative overflow-hidden shadow-2xl rounded-[40px] ring-8 ring-white flex flex-col"
      >
        {/* Custom Styles */}
        <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .blob-shape {
            animation: float 6s ease-in-out infinite;
          }
          @keyframes float {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(10px, -20px) scale(1.05); }
            66% { transform: translate(-10px, 10px) scale(0.95); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
        `}</style>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto hide-scrollbar pb-24 relative">
          
          {/* Header */}
          <div className="pt-14 pb-4 px-6 flex justify-between items-center sticky top-0 bg-[#F0F4FF]/90 backdrop-blur-md z-20">
            <div>
              <h1 className="text-2xl font-black tracking-tight">
                <span className="text-slate-900">Fit</span>
                <span className="text-blue-600">Boom</span>
              </h1>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Yaqin atrofdagi sport zallari</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs font-bold text-slate-700">UZB</span>
              </div>
              <button className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 p-0.5 shadow-md shadow-blue-500/20">
                <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-slate-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
              </button>
            </div>
          </div>

          <div className="px-5 pb-6 space-y-4">
            
            {/* Bento Grid Top: Hero Credit Card */}
            <div className="relative w-full rounded-[32px] overflow-hidden bg-blue-600 p-6 shadow-xl shadow-blue-600/30">
              {/* Background abstract blobs */}
              <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-blue-500 rounded-full mix-blend-screen opacity-50 blur-2xl blob-shape" />
              <div className="absolute bottom-[-20%] left-[-10%] w-40 h-40 bg-blue-400 rounded-full mix-blend-screen opacity-50 blur-xl blob-shape" style={{ animationDelay: '1s' }} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 border border-white/10">
                    <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                    <span className="text-white text-xs font-bold tracking-wide uppercase">Balans</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-orange-500/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-orange-400/30">
                    <Flame className="w-3.5 h-3.5 text-white" />
                    <span className="text-white text-xs font-bold">23 kun qoldi</span>
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-white tracking-tighter">12</span>
                      <span className="text-blue-100 font-bold text-lg">kredit</span>
                    </div>
                  </div>
                  <button className="bg-white text-blue-600 px-5 py-3 rounded-[20px] font-black text-sm flex items-center gap-2 shadow-lg shadow-black/10 active:scale-95 transition-transform">
                    <Plus className="w-5 h-5" />
                    To'ldirish
                  </button>
                </div>
              </div>
            </div>

            {/* Bento Grid Middle: 2 Quick Action Tiles */}
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-white rounded-[28px] p-5 flex flex-col gap-4 shadow-sm border border-slate-100 active:scale-95 transition-transform text-left">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Yangi zal</h3>
                  <p className="text-slate-500 text-xs font-medium mt-0.5">Topish va band qilish</p>
                </div>
              </button>
              
              <button className="bg-white rounded-[28px] p-5 flex flex-col gap-4 shadow-sm border border-slate-100 active:scale-95 transition-transform text-left">
                <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Bronlarim</h3>
                  <p className="text-slate-500 text-xs font-medium mt-0.5">Yaqin mashg'ulotlar</p>
                </div>
              </button>
            </div>

            {/* Section Header */}
            <div className="flex justify-between items-end mt-4 mb-2">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Yaqin zallar</h2>
                <p className="text-slate-500 text-xs font-bold mt-0.5">Masofaga ko'ra</p>
              </div>
              <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:text-blue-700">
                Hammasi
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Gym List - Horizontal Cards */}
            <div className="space-y-4">
              
              {/* Gym Card 1 */}
              <div className="bg-white rounded-[28px] p-2.5 flex gap-4 shadow-sm border border-slate-100 items-center">
                <div className="relative w-28 h-28 rounded-[22px] overflow-hidden shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800" 
                    alt="PowerHouse Gym" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-xl flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-600" />
                    <span className="text-[10px] font-bold text-slate-800">1.2 km</span>
                  </div>
                </div>
                
                <div className="flex-1 py-1 pr-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-black text-slate-900 leading-tight">PowerHouse Gym</h3>
                  </div>
                  <p className="text-slate-500 text-[11px] font-semibold mt-1">Yunusobod, Toshkent</p>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-2 py-1 rounded-lg">Bodybuilding</span>
                    <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-2 py-1 rounded-lg">Cardio</span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                        <Zap className="w-3 h-3 text-blue-600 fill-blue-600" />
                      </div>
                      <span className="font-black text-sm text-blue-600">1 <span className="text-xs font-bold">kr</span></span>
                    </div>
                    <button className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-blue-600/20 active:scale-95 transition-transform">
                      Band qilish
                    </button>
                  </div>
                </div>
              </div>

              {/* Gym Card 2 */}
              <div className="bg-white rounded-[28px] p-2.5 flex gap-4 shadow-sm border border-slate-100 items-center">
                <div className="relative w-28 h-28 rounded-[22px] overflow-hidden shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800" 
                    alt="Fitness Pro" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-xl flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-600" />
                    <span className="text-[10px] font-bold text-slate-800">2.5 km</span>
                  </div>
                </div>
                
                <div className="flex-1 py-1 pr-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-black text-slate-900 leading-tight">Fitness Pro</h3>
                  </div>
                  <p className="text-slate-500 text-[11px] font-semibold mt-1">Chilonzor, Toshkent</p>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-2 py-1 rounded-lg">Yoga</span>
                    <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-2 py-1 rounded-lg">Pilates</span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                        <Zap className="w-3 h-3 text-blue-600 fill-blue-600" />
                      </div>
                      <span className="font-black text-sm text-blue-600">2 <span className="text-xs font-bold">kr</span></span>
                    </div>
                    <button className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-blue-600/20 active:scale-95 transition-transform">
                      Band qilish
                    </button>
                  </div>
                </div>
              </div>

              {/* Gym Card 3 */}
              <div className="bg-white rounded-[28px] p-2.5 flex gap-4 shadow-sm border border-slate-100 items-center">
                <div className="relative w-28 h-28 rounded-[22px] overflow-hidden shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800" 
                    alt="Iron Temple" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-xl flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-600" />
                    <span className="text-[10px] font-bold text-slate-800">4.1 km</span>
                  </div>
                </div>
                
                <div className="flex-1 py-1 pr-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-black text-slate-900 leading-tight">Iron Temple</h3>
                  </div>
                  <p className="text-slate-500 text-[11px] font-semibold mt-1">Mirobod, Toshkent</p>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-2 py-1 rounded-lg">Crossfit</span>
                    <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-2 py-1 rounded-lg">Powerlifting</span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                        <Zap className="w-3 h-3 text-blue-600 fill-blue-600" />
                      </div>
                      <span className="font-black text-sm text-blue-600">3 <span className="text-xs font-bold">kr</span></span>
                    </div>
                    <button className="bg-slate-100 text-slate-800 text-xs font-bold px-4 py-2 rounded-xl active:scale-95 transition-transform">
                      Batafsil
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Floating Bottom Tab Bar */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-white rounded-full shadow-2xl shadow-blue-900/20 border border-slate-100 flex items-center justify-between px-2 py-2">
            
            <button className="flex flex-col items-center justify-center gap-1 w-16 h-14 relative group">
              <div className="absolute inset-0 bg-blue-100 rounded-full scale-100 opacity-100" />
              <Home className="w-6 h-6 text-blue-600 relative z-10" />
              <span className="text-[10px] font-bold text-blue-600 relative z-10">Bosh</span>
            </button>
            
            <button className="flex flex-col items-center justify-center gap-1 w-16 h-14 group">
              <Dumbbell className="w-6 h-6 text-slate-400 group-active:scale-95 transition-transform" />
              <span className="text-[10px] font-bold text-slate-500">Zallar</span>
            </button>
            
            <button className="flex flex-col items-center justify-center gap-1 w-16 h-14 group">
              <Calendar className="w-6 h-6 text-slate-400 group-active:scale-95 transition-transform" />
              <span className="text-[10px] font-bold text-slate-500">Bron</span>
            </button>
            
            <button className="flex flex-col items-center justify-center gap-1 w-16 h-14 group">
              <UserCircle className="w-6 h-6 text-slate-400 group-active:scale-95 transition-transform" />
              <span className="text-[10px] font-bold text-slate-500">Profil</span>
            </button>
            
          </div>
        </div>

      </div>
    </div>
  );
}

import React from "react";
import { 
  Globe, 
  UserCircle, 
  Plus, 
  ArrowRight, 
  MapPin, 
  Dumbbell, 
  Home, 
  Calendar, 
  User 
} from "lucide-react";

export function PremiumDark() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 font-sans selection:bg-blue-500/30">
      <style dangerouslySetInnerHTML={{__html: `
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .hero-glow {
          box-shadow: 0 0 80px -20px rgba(37, 99, 235, 0.5);
        }
        .tab-glow {
          box-shadow: 0 -20px 40px -20px rgba(37, 99, 235, 0.15);
        }
        .text-glow {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }
        /* Custom scrollbar for webkit */
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
        .hide-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* Phone Container */}
      <div 
        style={{ width: 390, height: 844 }}
        className="relative bg-[#0A0E1A] rounded-[40px] overflow-hidden shadow-2xl ring-1 ring-white/10"
      >
        {/* Scrollable Content */}
        <div className="h-full overflow-y-auto hide-scroll pb-24">
          
          {/* Header */}
          <header className="px-6 pt-14 pb-4 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white mb-1 flex items-center">
                <span>Fit</span><span className="text-blue-500">Boom</span>
              </h1>
              <p className="text-xs text-white/50 font-medium tracking-wide uppercase">
                Yaqin atrofdagi sport zallari
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="glass-panel flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-white/80">
                <Globe className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold tracking-wider">UZB</span>
              </div>
              <button className="glass-panel p-1 rounded-full text-white/80 hover:text-white transition-colors">
                <UserCircle className="w-7 h-7" />
              </button>
            </div>
          </header>

          {/* Hero: Credit Balance */}
          <div className="px-5 mb-8 mt-2">
            <div className="relative rounded-3xl overflow-hidden hero-glow">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-[#0A0E1A] opacity-90" />
              
              {/* Decorative shapes */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl mix-blend-overlay" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl mix-blend-overlay" />
              
              {/* Card Content */}
              <div className="relative p-6 glass-panel border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-blue-100/70 text-sm font-medium tracking-wide">
                    Hisobingiz
                  </span>
                  <div className="bg-white/10 px-3 py-1 rounded-full border border-white/10">
                    <span className="text-xs font-semibold text-white tracking-wide">
                      23 kun qoldi
                    </span>
                  </div>
                </div>
                
                <div className="flex items-baseline gap-2 mb-6 mt-2">
                  <span className="text-6xl font-bold tracking-tighter text-white text-glow">
                    12
                  </span>
                  <span className="text-xl font-semibold text-blue-100/80">
                    kredit
                  </span>
                </div>
                
                <button className="w-full bg-white text-blue-900 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98]">
                  <Plus className="w-5 h-5" />
                  <span>To'ldirish</span>
                </button>
              </div>
            </div>
          </div>

          {/* Section: Yaqin zallar */}
          <div className="px-5 mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold text-white mb-0.5">Yaqin zallar</h2>
              <p className="text-xs text-white/50 font-medium">Masofaga ko'ra</p>
            </div>
            <button className="text-xs font-bold text-blue-400 flex items-center gap-1 hover:text-blue-300">
              Hammasi <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Gym List */}
          <div className="px-5 flex flex-col gap-5 pb-8">
            
            {/* Gym Card 1 */}
            <div className="group rounded-3xl overflow-hidden glass-panel relative">
              <div className="h-44 relative">
                <img 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800" 
                  alt="PowerHouse Gym" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/60 to-transparent" />
                
                <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-blue-400" />
                  <span className="text-[10px] font-bold text-white">1.2 km uzoqlikda</span>
                </div>
                
                <div className="absolute top-3 right-3 bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)] px-3 py-1 rounded-full">
                  <span className="text-[11px] font-bold text-white">1 kredit</span>
                </div>
              </div>
              
              <div className="p-4 relative -mt-8">
                <h3 className="text-lg font-bold text-white mb-1">PowerHouse Gym</h3>
                <p className="text-xs text-white/50 font-medium mb-4 flex items-center gap-1.5">
                  Yunusobod, Toshkent <span className="w-1 h-1 rounded-full bg-white/30" /> Bodybuilding, Cardio
                </p>
                
                <div className="flex gap-2">
                  <button className="flex-1 glass-panel py-2.5 rounded-xl text-xs font-semibold text-white/90">
                    Batafsil
                  </button>
                  <button className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold shadow-[0_4px_20px_-5px_rgba(37,99,235,0.5)]">
                    Band qilish
                  </button>
                </div>
              </div>
            </div>

            {/* Gym Card 2 */}
            <div className="group rounded-3xl overflow-hidden glass-panel relative">
              <div className="h-44 relative">
                <img 
                  src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800" 
                  alt="Iron Temple" 
                  className="w-full h-full object-cover grayscale-[20%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/60 to-transparent" />
                
                <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-blue-400" />
                  <span className="text-[10px] font-bold text-white">2.5 km uzoqlikda</span>
                </div>
                
                <div className="absolute top-3 right-3 bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)] px-3 py-1 rounded-full">
                  <span className="text-[11px] font-bold text-white">2 kredit</span>
                </div>
              </div>
              
              <div className="p-4 relative -mt-8">
                <h3 className="text-lg font-bold text-white mb-1">Iron Temple</h3>
                <p className="text-xs text-white/50 font-medium mb-4 flex items-center gap-1.5">
                  Mirzo Ulug'bek, Toshkent <span className="w-1 h-1 rounded-full bg-white/30" /> CrossFit, Weights
                </p>
                
                <div className="flex gap-2">
                  <button className="flex-1 glass-panel py-2.5 rounded-xl text-xs font-semibold text-white/90">
                    Batafsil
                  </button>
                  <button className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold shadow-[0_4px_20px_-5px_rgba(37,99,235,0.5)]">
                    Band qilish
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Tab Bar */}
        <div className="absolute bottom-0 w-full glass-panel tab-glow border-t border-white/10 pb-6 pt-4 px-6 z-10 bg-[#0A0E1A]/80 backdrop-blur-xl">
          <div className="flex justify-between items-center">
            
            {/* Active Tab */}
            <div className="flex flex-col items-center gap-1.5 relative">
              <div className="absolute -top-4 w-8 h-1 bg-blue-500 rounded-b-full shadow-[0_0_10px_rgba(37,99,235,1)]" />
              <Home className="w-6 h-6 text-blue-500 drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]" />
              <span className="text-[10px] font-bold text-blue-500">Bosh sahifa</span>
            </div>
            
            <div className="flex flex-col items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
              <Dumbbell className="w-6 h-6 text-white" />
              <span className="text-[10px] font-medium text-white">Zallar</span>
            </div>
            
            <div className="flex flex-col items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
              <Calendar className="w-6 h-6 text-white" />
              <span className="text-[10px] font-medium text-white">Bron</span>
            </div>
            
            <div className="flex flex-col items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
              <User className="w-6 h-6 text-white" />
              <span className="text-[10px] font-medium text-white">Profil</span>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
}

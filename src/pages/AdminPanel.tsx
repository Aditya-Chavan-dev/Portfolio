import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0c0c0b] text-[#7fffb2] font-mono p-8">
      <header className="flex justify-between items-center border-b border-[#7fffb2]/30 pb-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter">ADMIN_DASHBOARD_v1.0</h1>
          <p className="text-xs opacity-50 uppercase mt-1">Status: Active // Session: Secure</p>
        </div>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xs"
        >
          [TERMINATE_SESSION]
        </button>
      </header>
      
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="border border-[#7fffb2]/20 p-6 rounded bg-[#7fffb2]/5">
          <h2 className="text-lg mb-4 border-b border-[#7fffb2]/10 pb-2">Live_Metrics</h2>
          <div className="space-y-2 opacity-70">
            <p>[+] Site_Reach: 0%</p>
            <p>[+] Engagement_Flux: N/A</p>
            <p>[+] Interaction_Logs: [EMPTY]</p>
          </div>
        </section>

        <section className="border border-[#7fffb2]/20 p-6 rounded bg-[#7fffb2]/5">
          <h2 className="text-lg mb-4 border-b border-[#7fffb2]/10 pb-2">Content_Kernel</h2>
          <p className="text-sm opacity-60 italic mb-4">Edit mode offline. Build in progress.</p>
          <button className="w-full py-2 border border-[#7fffb2]/30 text-xs opacity-50 cursor-not-allowed">
            MANAGE_PORTFOLIO_CORE
          </button>
        </section>
      </main>

      <footer className="mt-12 text-[10px] opacity-30 text-center uppercase tracking-widest">
        Antigravity Covert Access System // End_of_Line
      </footer>
    </div>
  );
};

export default AdminPanel;

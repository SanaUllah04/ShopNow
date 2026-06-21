import Navbar from "@/components/Navbar";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#020617] text-white flex flex-col justify-between">
            <div>
                <Navbar />
                {children}
            </div>
            <footer className="border-t border-white/5 bg-slate-950/50 backdrop-blur-xl py-8 mt-16 text-center text-sm text-slate-500">
                © {new Date().getFullYear()} ShopNow. All rights reserved.
            </footer>
        </div>
    );
}

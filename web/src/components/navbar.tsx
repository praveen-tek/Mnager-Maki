import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-zinc-50/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
        
        <Link href="/" className="text-xl instrument-serif-regular text-black tracking-tight">
          Manger Maki
        </Link>
        
        <div className="flex items-center gap-6">
          <Link href="/legal" className="text-xs uppercase tracking-widest text-zinc-500 hover:text-black transition-colors font-light">
            Legal
          </Link>
          <Link href="/pricing" className="text-xs uppercase tracking-widest text-zinc-500 hover:text-black transition-colors font-light">
            Pricing
          </Link>
          <Link href="https://github.com/praveen-tek/Manger-Maki" className="border border-black/10 text-black px-4 py-1 rounded-full text-xs hover:bg-black hover:text-white transition-all duration-300">
            Download
          </Link>
        </div>

      </div>
    </nav>
  );
}
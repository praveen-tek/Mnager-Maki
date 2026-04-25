import { GithubLogo, TwitterLogo, ShieldCheck } from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-zinc-200 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-end">
        

        <div className="flex flex-col gap-2">
          <span className="text-2xl instrument-serif-regular text-black leading-none">
            Manger Maki
          </span>
          <p className="text-sm text-zinc-500 font-medium">
            © 2026 Praveen-tek. All rights reserved.
          </p>
        </div>
        

        <div className="flex items-center gap-6 text-zinc-400">
          <a href="#" className="hover:text-black transition-colors" aria-label="Twitter">
            <TwitterLogo size={24} weight="regular" />
          </a>
          <a href="#" className="hover:text-black transition-colors" aria-label="GitHub">
            <GithubLogo size={24} weight="regular" />
          </a>
          <a href="/legal" className="hover:text-black transition-colors" aria-label="Privacy">
            <ShieldCheck size={24} weight="regular" />
          </a>
        </div>

      </div>
    </footer>
  );
}
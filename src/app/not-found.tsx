import Link from "next/link";
import { Terminal, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center px-4 selection:bg-[#FFB020]/40 selection:text-black">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="w-20 h-20 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center mx-auto shadow-sm">
          <Terminal className="w-10 h-10 text-amber-500" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-black text-gray-900 tracking-tight">404</h1>
          <h2 className="text-2xl font-bold text-gray-800">Resource Node Not Found</h2>
          <p className="text-gray-600 font-medium max-w-md mx-auto leading-relaxed">
            The compiled AST path you requested does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gray-900 hover:bg-black text-white font-bold transition-all shadow-md hover:shadow-lg transform active:scale-95 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Platform Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

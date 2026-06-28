import { Metadata } from "next";
import { Suspense } from "react";
import AuthContainer from "@/components/auth/AuthContainer";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Authentication — CodeZilaa",
  description: "Sign in or create an account to start practicing coding, visualizing algorithm execution, and preparing for technical interviews.",
};

function AuthLoading() {
  return (
    <div className="min-h-screen bg-[#090909] flex flex-col items-center justify-center text-white">
      <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mb-3" />
      <p className="text-sm font-mono text-gray-400">Loading CodeZilaa Auth...</p>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<AuthLoading />}>
      <AuthContainer />
    </Suspense>
  );
}

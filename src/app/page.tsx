"use client";

import React, { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useAuthStore, useNavigationStore } from "@/lib/auth-store";
import { AuthScreen } from "@/components/auth/auth-screen";
import { Sidebar } from "@/components/layout/sidebar";
import { Dashboard } from "@/components/dashboard/dashboard";
import { CuriosidadesSection } from "@/components/curiosidades/curiosidades-section";
import { QuizSection } from "@/components/quiz/quiz-section";
import { RankingSection } from "@/components/ranking/ranking-section";
import { Loader2 } from "lucide-react";

function AppContent() {
  const { data: session, status } = useSession();
  const { isAuthenticated, login, setLoading, isLoading } = useAuthStore();
  const activeSection = useNavigationStore((s) => s.activeSection);

  // Sync NextAuth session with Zustand store
  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
      return;
    }
    if (session?.user) {
      login({
        id: (session.user as { id?: string }).id || "",
        email: session.user.email || "",
        name: session.user.name || "",
      });
    } else {
      setLoading(false);
    }
  }, [session, status, login, setLoading]);

  // Loading state
  if (isLoading && status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
          <p className="text-gray-500 text-sm mt-3">Carregando...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - show login/register
  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  // Render active section
  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "curiosidades":
        return <CuriosidadesSection />;
      case "quiz":
        return <QuizSection />;
      case "ranking":
        return <RankingSection />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex">
      <Sidebar />
      <main className="flex-1 lg:ml-0 pt-14 lg:pt-0">
        <div className="max-w-6xl mx-auto p-4 lg:p-6 pb-20">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <SessionProvider>
      <AppContent />
    </SessionProvider>
  );
}

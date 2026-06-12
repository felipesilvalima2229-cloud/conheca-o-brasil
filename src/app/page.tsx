"use client";

import React, { useEffect, useCallback } from "react";
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
  const { isAuthenticated, isLoading, login, logout, setLoading } = useAuthStore();
  const activeSection = useNavigationStore((s) => s.activeSection);

  // Sync NextAuth session with Zustand store
  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
      return;
    }

    if (status === "authenticated" && session?.user) {
      login({
        id: (session.user as { id?: string }).id || "",
        email: session.user.email || "",
        name: session.user.name || "",
      });
    } else if (status === "unauthenticated") {
      // Only logout if we were previously authenticated
      if (isAuthenticated) {
        logout();
      }
      setLoading(false);
    }
  }, [session, status, login, logout, isAuthenticated, setLoading]);

  // Loading state - only show for initial session check
  if (isLoading && status === "loading" && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-yellow-50">
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
    <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus={true}>
      <AppContent />
    </SessionProvider>
  );
}

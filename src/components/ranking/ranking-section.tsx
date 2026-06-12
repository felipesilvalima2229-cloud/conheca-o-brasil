"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/lib/auth-store";
import { Trophy, Medal, RefreshCw, Crown, Star, Award } from "lucide-react";

interface RankingEntry {
  id: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
  user: {
    name: string | null;
    email: string;
  };
}

export function RankingSection() {
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useAuthStore((s) => s.user);

  const fetchRankings = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/ranking");
      if (res.ok) {
        const data = await res.json();
        setRankings(data);
      }
    } catch (error) {
      console.error("Error fetching rankings:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRankings();
  }, [fetchRankings]);

  const getMedalIcon = (position: number) => {
    if (position === 0) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (position === 1) return <Medal className="w-5 h-5 text-gray-400" />;
    if (position === 2) return <Award className="w-5 h-5 text-amber-600" />;
    return null;
  };

  const getPositionBadge = (position: number) => {
    if (position === 0) return "bg-yellow-100 text-yellow-800 border-yellow-300";
    if (position === 1) return "bg-gray-100 text-gray-700 border-gray-300";
    if (position === 2) return "bg-amber-100 text-amber-800 border-amber-300";
    return "bg-gray-50 text-gray-500 border-gray-200";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-emerald-600";
    if (percentage >= 70) return "text-emerald-500";
    if (percentage >= 50) return "text-amber-600";
    if (percentage >= 30) return "text-orange-600";
    return "text-red-500";
  };

  // Top 3 for the podium
  const top3 = rankings.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ranking</h2>
          <p className="text-gray-500 text-sm mt-1">
            Leaderboard dos melhores resultados no Quiz
          </p>
        </div>
        <button
          onClick={fetchRankings}
          disabled={isLoading}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          Atualizar
        </button>
      </div>

      {/* Podium for top 3 */}
      {top3.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {/* 2nd place */}
          {top3[1] && (
            <Card className="border-0 shadow-sm mt-8">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center">
                  <Medal className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {top3[1].user.name || top3[1].user.email.split("@")[0]}
                </p>
                <p className="text-xl font-bold text-gray-600 mt-1">
                  {top3[1].percentage.toFixed(0)}%
                </p>
                <p className="text-xs text-gray-400">
                  {top3[1].score}/{top3[1].totalQuestions}
                </p>
              </CardContent>
            </Card>
          )}

          {/* 1st place */}
          {top3[0] && (
            <Card className="border-0 shadow-md bg-gradient-to-b from-yellow-50 to-white">
              <CardContent className="p-4 text-center">
                <div className="w-14 h-14 rounded-full bg-yellow-100 mx-auto mb-2 flex items-center justify-center shadow-inner">
                  <Crown className="w-7 h-7 text-yellow-500" />
                </div>
                <p className="text-sm font-bold text-gray-900 truncate">
                  {top3[0].user.name || top3[0].user.email.split("@")[0]}
                </p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">
                  {top3[0].percentage.toFixed(0)}%
                </p>
                <p className="text-xs text-gray-400">
                  {top3[0].score}/{top3[0].totalQuestions}
                </p>
                <Badge className="mt-2 bg-yellow-500 text-white border-0 text-[10px]">
                  1º Lugar
                </Badge>
              </CardContent>
            </Card>
          )}

          {/* 3rd place */}
          {top3[2] && (
            <Card className="border-0 shadow-sm mt-12">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-amber-100 mx-auto mb-2 flex items-center justify-center">
                  <Award className="w-6 h-6 text-amber-600" />
                </div>
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {top3[2].user.name || top3[2].user.email.split("@")[0]}
                </p>
                <p className="text-xl font-bold text-amber-600 mt-1">
                  {top3[2].percentage.toFixed(0)}%
                </p>
                <p className="text-xs text-gray-400">
                  {top3[2].score}/{top3[2].totalQuestions}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Full ranking list */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Trophy className="w-4 h-4 text-emerald-600" />
            Classificação Completa
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                  <div className="flex-1 h-4 bg-gray-200 rounded" />
                  <div className="w-16 h-4 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ) : rankings.length === 0 ? (
            <div className="text-center py-8">
              <Star className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">
                Nenhum resultado ainda. Seja o primeiro a completar o Quiz!
              </p>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto custom-scrollbar">
              <div className="space-y-1">
                {rankings.map((entry, i) => {
                  const isCurrentUser = user?.email === entry.user.email;
                  return (
                    <div
                      key={entry.id}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                        isCurrentUser
                          ? "bg-emerald-50 border border-emerald-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {/* Position */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border ${getPositionBadge(
                          i
                        )}`}
                      >
                        {i < 3 ? getMedalIcon(i) : `${i + 1}`}
                      </div>

                      {/* User info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {entry.user.name || entry.user.email.split("@")[0]}
                          {isCurrentUser && (
                            <Badge
                              variant="secondary"
                              className="ml-2 text-[10px] bg-emerald-100 text-emerald-700 border-0"
                            >
                              Você
                            </Badge>
                          )}
                        </p>
                        <p className="text-[11px] text-gray-400 truncate">
                          {formatDate(entry.completedAt)}
                        </p>
                      </div>

                      {/* Score */}
                      <div className="text-right shrink-0">
                        <p
                          className={`text-sm font-bold ${getScoreColor(
                            entry.percentage
                          )}`}
                        >
                          {entry.percentage.toFixed(0)}%
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {entry.score}/{entry.totalQuestions}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

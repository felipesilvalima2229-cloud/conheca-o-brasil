"use client";

import React, { useState, useMemo } from "react";
import { curiosidades, type Curiosidade } from "@/lib/ibge-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingDown, TrendingUp, Users, Home, GraduationCap, Heart, Scale, Utensils } from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  Pobreza: TrendingDown,
  Desigualdade: Scale,
  Renda: Users,
  Educação: GraduationCap,
  Infraestrutura: Home,
  "Política Social": Heart,
  "Segurança Alimentar": Utensils,
  Habitação: Home,
  Demografia: Users,
};

const categoryColors: Record<string, string> = {
  Pobreza: "bg-red-50 text-red-700 border-red-200",
  Desigualdade: "bg-amber-50 text-amber-700 border-amber-200",
  Renda: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Educação: "bg-blue-50 text-blue-700 border-blue-200",
  Infraestrutura: "bg-purple-50 text-purple-700 border-purple-200",
  "Política Social": "bg-pink-50 text-pink-700 border-pink-200",
  "Segurança Alimentar": "bg-orange-50 text-orange-700 border-orange-200",
  Habitação: "bg-teal-50 text-teal-700 border-teal-200",
  Demografia: "bg-cyan-50 text-cyan-700 border-cyan-200",
};

export function CuriosidadesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");

  const categories = useMemo(() => {
    const cats = new Set(curiosidades.map((c) => c.category));
    return ["Todas", ...Array.from(cats)];
  }, []);

  const filtered = useMemo(() => {
    if (selectedCategory === "Todas") return curiosidades;
    return curiosidades.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Curiosidades</h2>
        <p className="text-gray-500 text-sm mt-1">
          Insights e fatos interessantes extraídos dos dados do IBGE sobre condições de vida no Brasil
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedCategory === cat
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Curiosidades grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((curiosidade, i) => {
          const Icon = categoryIcons[curiosidade.category] || Lightbulb;
          const colorClass = categoryColors[curiosidade.category] || "bg-gray-50 text-gray-700 border-gray-200";

          return (
            <Card
              key={curiosidade.id}
              className="border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
            >
              <CardContent className="p-0">
                <div className="flex">
                  {/* Left accent bar */}
                  <div className="w-1 bg-gradient-to-b from-emerald-400 to-emerald-600 group-hover:from-emerald-500 group-hover:to-emerald-700 transition-colors" />

                  <div className="flex-1 p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${colorClass.split(" ").slice(0, 2).join(" ")}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Badge variant="outline" className={`text-[10px] ${colorClass}`}>
                            {curiosidade.category}
                          </Badge>
                          {curiosidade.year && (
                            <span className="text-[10px] text-gray-400">{curiosidade.year}</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {curiosidade.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Stats summary */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-emerald-50 to-yellow-50">
        <CardContent className="p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {curiosidades.length} curiosidades sobre o Brasil
              </p>
              <p className="text-xs text-gray-500">
                Baseado nos dados da Síntese de Indicadores Sociais e PNAD Contínua do IBGE
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

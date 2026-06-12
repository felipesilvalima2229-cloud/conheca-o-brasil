"use client";

import React, { useState, useCallback, useMemo } from "react";
import { quizQuestions, type QuizQuestion } from "@/lib/ibge-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuthStore } from "@/lib/auth-store";
import {
  Brain,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Clock,
  Target,
} from "lucide-react";

type QuizState = "idle" | "playing" | "result";

export function QuizSection() {
  const [quizState, setQuizState] = useState<QuizState>("idle");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [score, setScore] = useState(0);
  const user = useAuthStore((s) => s.user);

  const QUESTIONS_PER_QUIZ = 10;

  const startQuiz = useCallback(() => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, QUESTIONS_PER_QUIZ));
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers(new Array(QUESTIONS_PER_QUIZ).fill(null));
    setShowResult(false);
    setQuizState("playing");
    setScore(0);
  }, []);

  const handleSelectOption = useCallback(
    (optionIndex: number) => {
      if (showResult) return;
      setSelectedOption(optionIndex);
    },
    [showResult]
  );

  const handleConfirm = useCallback(() => {
    if (selectedOption === null) return;

    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedOption;
    setAnswers(newAnswers);

    const isCorrect = selectedOption === questions[currentIndex].correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setShowResult(true);
  }, [selectedOption, answers, currentIndex, questions]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setQuizState("result");
    }
  }, [currentIndex, questions.length]);

  const submitResult = useCallback(async () => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      const finalScore = answers.filter(
        (a, i) => a === questions[i]?.correctIndex
      ).length;
      const percentage = (finalScore / questions.length) * 100;

      await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          score: finalScore,
          totalQuestions: questions.length,
          percentage,
        }),
      });
    } catch (error) {
      console.error("Error submitting quiz result:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [user, answers, questions]);

  const finalScore = useMemo(() => {
    return answers.filter((a, i) => a === questions[i]?.correctIndex).length;
  }, [answers, questions]);

  const percentage = questions.length > 0 ? (finalScore / questions.length) * 100 : 0;

  const getScoreEmoji = (pct: number) => {
    if (pct >= 90) return "🏆";
    if (pct >= 70) return "🌟";
    if (pct >= 50) return "👍";
    if (pct >= 30) return "📚";
    return "💪";
  };

  const getScoreMessage = (pct: number) => {
    if (pct >= 90) return "Excelente! Você é um expert nos dados do Brasil!";
    if (pct >= 70) return "Muito bom! Você conhece bem a realidade brasileira!";
    if (pct >= 50) return "Bom! Continue aprendendo sobre o Brasil!";
    if (pct >= 30) return "Continue estudando! Os dados do IBGE são fascinantes!";
    return "Não desista! Tente novamente e aprenda mais sobre o Brasil!";
  };

  // Idle state
  if (quizState === "idle") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quiz — Conheça o Brasil</h2>
          <p className="text-gray-500 text-sm mt-1">
            Teste seus conhecimentos sobre condições de vida, desigualdade e pobreza no Brasil
          </p>
        </div>

        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 p-8 text-white text-center">
            <Brain className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-2">Quiz do Brasil</h3>
            <p className="text-emerald-100 text-sm max-w-md mx-auto">
              Responda {QUESTIONS_PER_QUIZ} perguntas sobre os dados do IBGE e descubra o quanto você conhece sobre a realidade brasileira.
            </p>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 rounded-xl bg-gray-50">
                <Target className="w-5 h-5 mx-auto text-emerald-600 mb-1" />
                <p className="text-lg font-bold text-gray-900">{QUESTIONS_PER_QUIZ}</p>
                <p className="text-xs text-gray-500">Perguntas</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-gray-50">
                <Clock className="w-5 h-5 mx-auto text-amber-600 mb-1" />
                <p className="text-lg font-bold text-gray-900">~5 min</p>
                <p className="text-xs text-gray-500">Duração</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-gray-50">
                <Trophy className="w-5 h-5 mx-auto text-purple-600 mb-1" />
                <p className="text-lg font-bold text-gray-900">Ranking</p>
                <p className="text-xs text-gray-500">Competição</p>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Categorias</p>
              <div className="flex flex-wrap gap-1.5">
                {["Pobreza", "Desigualdade", "Renda", "Educação", "Emprego", "Infraestrutura"].map((cat) => (
                  <Badge key={cat} variant="secondary" className="text-[10px] bg-gray-100">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              onClick={startQuiz}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-base font-semibold"
              size="lg"
            >
              Começar Quiz
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Playing state
  if (quizState === "playing" && questions[currentIndex]) {
    const question = questions[currentIndex];
    const progress = ((currentIndex + (showResult ? 1 : 0)) / questions.length) * 100;

    return (
      <div className="space-y-6">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              Pergunta {currentIndex + 1} de {questions.length}
            </span>
            <Badge variant="outline" className="text-[10px]">
              {question.category}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question card */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((option, i) => {
              const isSelected = selectedOption === i;
              const isCorrect = i === question.correctIndex;
              const isAnswered = showResult;

              let optionStyle = "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50";

              if (isAnswered) {
                if (isCorrect) {
                  optionStyle = "border-emerald-500 bg-emerald-50";
                } else if (isSelected && !isCorrect) {
                  optionStyle = "border-red-500 bg-red-50";
                } else {
                  optionStyle = "border-gray-100 opacity-60";
                }
              } else if (isSelected) {
                optionStyle = "border-emerald-500 bg-emerald-50";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelectOption(i)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                      isAnswered && isCorrect
                        ? "bg-emerald-500 text-white"
                        : isAnswered && isSelected && !isCorrect
                        ? "bg-red-500 text-white"
                        : isSelected
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {isAnswered && isCorrect ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : isAnswered && isSelected && !isCorrect ? (
                        <XCircle className="w-4 h-4" />
                      ) : (
                        String.fromCharCode(65 + i)
                      )}
                    </span>
                    <span className="text-sm">{option}</span>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Action buttons */}
        <div className="flex justify-end gap-3">
          {!showResult ? (
            <Button
              onClick={handleConfirm}
              disabled={selectedOption === null}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Confirmar
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {currentIndex < questions.length - 1 ? (
                <>
                  Próxima <ArrowRight className="w-4 h-4 ml-1" />
                </>
              ) : (
                "Ver Resultado"
              )}
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Result state
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 p-8 text-white text-center">
          <div className="text-5xl mb-3">{getScoreEmoji(percentage)}</div>
          <h3 className="text-2xl font-bold mb-2">Quiz Finalizado!</h3>
          <p className="text-emerald-100">{getScoreMessage(percentage)}</p>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 rounded-xl bg-emerald-50">
              <p className="text-3xl font-bold text-emerald-700">{finalScore}</p>
              <p className="text-xs text-emerald-600">Acertos</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-amber-50">
              <p className="text-3xl font-bold text-amber-700">{questions.length - finalScore}</p>
              <p className="text-xs text-amber-600">Erros</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-purple-50">
              <p className="text-3xl font-bold text-purple-700">{percentage.toFixed(0)}%</p>
              <p className="text-xs text-purple-600">Aproveitamento</p>
            </div>
          </div>

          {/* Review answers */}
          <div className="space-y-2 mb-6">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Suas Respostas</p>
            {questions.map((q, i) => {
              const userAnswer = answers[i];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className={`flex items-start gap-2 p-2.5 rounded-lg text-sm ${
                    isCorrect ? "bg-emerald-50" : "bg-red-50"
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-700 text-xs leading-relaxed">{q.question}</p>
                    {!isCorrect && (
                      <p className="text-emerald-700 text-[10px] mt-0.5">
                        Resposta correta: {q.options[q.correctIndex]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={startQuiz}
              variant="outline"
              className="flex-1"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Jogar Novamente
            </Button>
            <Button
              onClick={submitResult}
              disabled={isSubmitting}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              {isSubmitting ? "Salvando..." : "Salvar no Ranking"}
              <Trophy className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

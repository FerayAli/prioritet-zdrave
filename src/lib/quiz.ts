import type { MessageKey } from "@/i18n/keys";
import type { PostQuery } from "@/lib/content/types";

export const quizOptionScores = [0, 1, 2, 3] as const;

export type QuizBand = "low" | "medium" | "high";

export type QuizQuestion = {
  id: string;
  promptKey: MessageKey;
  optionKeys: [MessageKey, MessageKey, MessageKey, MessageKey];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "after-meals",
    promptKey: "quiz.q1.prompt",
    optionKeys: ["quiz.q1.a0", "quiz.q1.a1", "quiz.q1.a2", "quiz.q1.a3"],
  },
  {
    id: "cravings",
    promptKey: "quiz.q2.prompt",
    optionKeys: ["quiz.q2.a0", "quiz.q2.a1", "quiz.q2.a2", "quiz.q2.a3"],
  },
  {
    id: "afternoon",
    promptKey: "quiz.q3.prompt",
    optionKeys: ["quiz.q3.a0", "quiz.q3.a1", "quiz.q3.a2", "quiz.q3.a3"],
  },
  {
    id: "thirst",
    promptKey: "quiz.q4.prompt",
    optionKeys: ["quiz.q4.a0", "quiz.q4.a1", "quiz.q4.a2", "quiz.q4.a3"],
  },
  {
    id: "family",
    promptKey: "quiz.q5.prompt",
    optionKeys: ["quiz.q5.a0", "quiz.q5.a1", "quiz.q5.a2", "quiz.q5.a3"],
  },
];

export const quizMaxScore = quizQuestions.length * quizOptionScores[3];

export type QuizAnswers = Record<string, number>;

export function scoreQuiz(answers: QuizAnswers): number {
  return quizQuestions.reduce((total, question) => {
    const choice = answers[question.id];
    if (choice === undefined) return total;
    return total + (quizOptionScores[choice] ?? 0);
  }, 0);
}

export function quizBand(score: number): QuizBand {
  if (score <= 5) return "low";
  if (score <= 10) return "medium";
  return "high";
}

export function quizRecommendation(score: number): PostQuery {
  const band = quizBand(score);
  if (band === "low") return { everyday: true };
  return { focus: ["blood-sugar"] };
}

export function quizResultKeys(band: QuizBand): {
  titleKey: MessageKey;
  bodyKey: MessageKey;
} {
  if (band === "low") {
    return { titleKey: "quiz.results.low.title", bodyKey: "quiz.results.low.body" };
  }
  if (band === "medium") {
    return {
      titleKey: "quiz.results.medium.title",
      bodyKey: "quiz.results.medium.body",
    };
  }
  return { titleKey: "quiz.results.high.title", bodyKey: "quiz.results.high.body" };
}

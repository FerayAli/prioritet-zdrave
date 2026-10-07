import { describe, expect, it } from "vitest";
import {
  quizBand,
  quizMaxScore,
  quizQuestions,
  quizRecommendation,
  scoreQuiz,
} from "@/lib/quiz";

describe("insulin start-here quiz", () => {
  it("has five questions with four scored answers", () => {
    expect(quizQuestions).toHaveLength(5);
    expect(quizMaxScore).toBe(15);
  });

  it("sums option scores in question order", () => {
    expect(
      scoreQuiz({
        "after-meals": 0,
        cravings: 1,
        afternoon: 2,
        thirst: 3,
        family: 1,
      }),
    ).toBe(7);
  });

  it("maps scores to bands and search recommendations", () => {
    expect(quizBand(0)).toBe("low");
    expect(quizBand(5)).toBe("low");
    expect(quizBand(6)).toBe("medium");
    expect(quizBand(10)).toBe("medium");
    expect(quizBand(11)).toBe("high");
    expect(quizRecommendation(4)).toEqual({ everyday: true });
    expect(quizRecommendation(9)).toEqual({ focus: ["blood-sugar"] });
    expect(quizRecommendation(15)).toEqual({ focus: ["blood-sugar"] });
  });
});

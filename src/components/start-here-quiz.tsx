"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PostCards } from "@/components/post-cards";
import { filterPosts } from "@/lib/content/filter";
import { toSearchHref } from "@/lib/content/query";
import type { Focus, Format, Post } from "@/lib/content/types";
import {
  quizBand,
  quizMaxScore,
  quizRecommendation,
  scoreQuiz,
  type QuizAnswers,
} from "@/lib/quiz";

export type QuizQuestionView = {
  id: string;
  prompt: string;
  options: string[];
};

export type QuizCopy = {
  start: string;
  back: string;
  next: string;
  seeResults: string;
  restart: string;
  progress: string;
  score: string;
  recommend: string;
  openSearch: string;
  disclaimer: string;
  empty: string;
  results: Record<"low" | "medium" | "high", { title: string; body: string }>;
};

export function StartHereQuiz({
  intro,
  questions,
  copy,
  posts,
  formatLabels,
  focusLabels,
  extraLabels,
}: {
  intro: string;
  questions: QuizQuestionView[];
  copy: QuizCopy;
  posts: Post[];
  formatLabels: Record<Format, string>;
  focusLabels: Record<Focus, string>;
  extraLabels: { everyday: string; featured: string };
}) {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [done, setDone] = useState(false);

  const question = questions[index];
  const selected = question ? answers[question.id] : undefined;
  const isLast = index === questions.length - 1;
  const answeredHere = selected !== undefined;

  const score = useMemo(() => scoreQuiz(answers), [answers]);
  const band = quizBand(score);
  const query = quizRecommendation(score);
  const recommended = useMemo(
    () => (done ? filterPosts(posts, query) : []),
    [done, posts, query],
  );

  function fill(template: string, vars: Record<string, string>) {
    let value = template;
    for (const [name, replacement] of Object.entries(vars)) {
      value = value.replaceAll(`{${name}}`, replacement);
    }
    return value;
  }

  function restart() {
    setStarted(false);
    setIndex(0);
    setAnswers({});
    setDone(false);
  }

  function choose(optionIndex: number) {
    if (!question) return;
    setAnswers((current) => ({ ...current, [question.id]: optionIndex }));
    if (isLast) {
      setDone(true);
      return;
    }
    setIndex((current) => current + 1);
  }

  function goNext() {
    if (!answeredHere) return;
    if (isLast) {
      setDone(true);
      return;
    }
    setIndex((current) => current + 1);
  }

  if (!started) {
    return (
      <div>
        <p className="mt-6 text-lg leading-relaxed">{intro}</p>
        <p className="mt-4 text-sm leading-relaxed">{copy.disclaimer}</p>
        <button
          type="button"
          className="mt-8 bg-plum px-6 py-3 font-nav text-sm font-bold tracking-widest text-white uppercase"
          onClick={() => setStarted(true)}
        >
          {copy.start}
        </button>
      </div>
    );
  }

  if (done) {
    const result = copy.results[band];
    return (
      <div className="mt-8">
        <p className="font-slab text-xs uppercase tracking-[0.25em] text-plum">
          {fill(copy.score, {
            score: String(score),
            max: String(quizMaxScore),
          })}
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink">
          {result.title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed">{result.body}</p>
        <p className="mt-4 text-sm leading-relaxed">{copy.disclaimer}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            className="border border-line px-5 py-3 font-nav text-sm font-bold tracking-widest text-ink uppercase"
            onClick={() => {
              setDone(false);
              setIndex(Math.max(0, questions.length - 1));
            }}
          >
            {copy.back}
          </button>
          <button
            type="button"
            className="border border-line px-5 py-3 font-nav text-sm font-bold tracking-widest text-ink uppercase"
            onClick={restart}
          >
            {copy.restart}
          </button>
          <Link
            href={toSearchHref(query)}
            className="bg-plum px-5 py-3 font-nav text-sm font-bold tracking-widest text-white uppercase"
          >
            {copy.openSearch}
          </Link>
        </div>
        <h3 className="mt-10 font-slab text-sm uppercase tracking-widest text-ink">
          {copy.recommend}
        </h3>
        <PostCards
          posts={recommended}
          emptyLabel={copy.empty}
          tagsFor={(post) =>
            [
              formatLabels[post.format],
              ...post.focus.map((focus) => focusLabels[focus]),
              post.everyday ? extraLabels.everyday : null,
              post.featured ? extraLabels.featured : null,
            ]
              .filter(Boolean)
              .join(" · ")
          }
        />
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="mt-8">
      <p className="font-slab text-xs uppercase tracking-[0.25em] text-plum">
        {fill(copy.progress, {
          current: String(index + 1),
          total: String(questions.length),
        })}
      </p>
      <h2 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {question.prompt}
      </h2>
      <div className="mt-6 flex flex-col gap-3" role="group">
        {question.options.map((label, optionIndex) => {
          const active = selected === optionIndex;
          return (
            <button
              key={`${question.id}-${optionIndex}`}
              type="button"
              aria-pressed={active}
              className={`border px-4 py-3 text-left leading-relaxed ${
                active
                  ? "border-plum bg-plum text-white"
                  : "border-line bg-white text-ink hover:border-plum"
              }`}
              onClick={() => choose(optionIndex)}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          className="border border-line px-5 py-3 font-nav text-sm font-bold tracking-widest text-ink uppercase disabled:opacity-40"
          disabled={index === 0}
          onClick={() => setIndex((current) => Math.max(0, current - 1))}
        >
          {copy.back}
        </button>
        <button
          type="button"
          className="bg-plum px-5 py-3 font-nav text-sm font-bold tracking-widest text-white uppercase disabled:opacity-40"
          disabled={!answeredHere}
          onClick={goNext}
        >
          {isLast ? copy.seeResults : copy.next}
        </button>
      </div>
    </div>
  );
}

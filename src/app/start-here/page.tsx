import { StartHereQuiz } from "@/components/start-here-quiz";
import { t } from "@/i18n/messages";
import { listPosts } from "@/lib/content/posts";
import { focusLabelKey, formatLabelKey } from "@/lib/hero";
import { quizQuestions, quizResultKeys } from "@/lib/quiz";

export const dynamic = "force-static";

export function generateMetadata() {
  return { title: t("startHere.title") };
}

export default function StartHerePage() {
  const posts = listPosts();
  const formatLabels = {
    "essential-oils": t(formatLabelKey["essential-oils"]),
    recipes: t(formatLabelKey.recipes),
    movement: t(formatLabelKey.movement),
    stories: t(formatLabelKey.stories),
  };
  const focusLabels = {
    "blood-sugar": t(focusLabelKey["blood-sugar"]),
    sleep: t(focusLabelKey.sleep),
    stress: t(focusLabelKey.stress),
    back: t(focusLabelKey.back),
    energy: t(focusLabelKey.energy),
    digestion: t(focusLabelKey.digestion),
  };

  return (
    <article className="mx-auto max-w-2xl px-5 pt-8 sm:px-8 sm:pt-10">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {t("startHere.title")}
      </h1>
      <StartHereQuiz
        intro={t("startHere.body")}
        questions={quizQuestions.map((question) => ({
          id: question.id,
          prompt: t(question.promptKey),
          options: question.optionKeys.map((key) => t(key)),
        }))}
        copy={{
          start: t("quiz.start"),
          back: t("quiz.back"),
          next: t("quiz.next"),
          seeResults: t("quiz.seeResults"),
          restart: t("quiz.restart"),
          progress: t("quiz.progress"),
          score: t("quiz.score"),
          recommend: t("quiz.recommend"),
          openSearch: t("quiz.openSearch"),
          disclaimer: t("quiz.disclaimer"),
          empty: t("search.empty"),
          results: {
            low: {
              title: t(quizResultKeys("low").titleKey),
              body: t(quizResultKeys("low").bodyKey),
            },
            medium: {
              title: t(quizResultKeys("medium").titleKey),
              body: t(quizResultKeys("medium").bodyKey),
            },
            high: {
              title: t(quizResultKeys("high").titleKey),
              body: t(quizResultKeys("high").bodyKey),
            },
          },
        }}
        posts={posts}
        formatLabels={formatLabels}
        focusLabels={focusLabels}
        extraLabels={{
          everyday: t("topic.everyday"),
          featured: t("topic.mostLoved"),
        }}
      />
    </article>
  );
}

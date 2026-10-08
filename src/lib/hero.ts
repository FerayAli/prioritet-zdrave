import type { MessageKey } from "@/i18n/keys";
import type { Focus, Format, PostQuery } from "@/lib/content/types";

export type HeroLink = {
  labelKey: MessageKey;
  image: string;
  query: PostQuery;
  /** CSS object-position when the subject is off-center in a landscape photo */
  imageObjectPosition?: string;
  /** Keep on desktop; skip in the mobile compact row so the 2-col grid stays even */
  hideOnMobile?: boolean;
};

export const heroTiles: HeroLink[] = [
  {
    labelKey: "hero.tile.oils",
    image: "/images/hero/essential-oils.jpg",
    query: { format: "essential-oils" },
  },
  {
    labelKey: "hero.tile.recipes",
    image: "/images/hero/recipes.jpg",
    query: { format: "recipes" },
  },
  {
    labelKey: "hero.tile.movement",
    image: "/images/hero/movement.jpg",
    query: { format: "movement" },
    imageObjectPosition: "82% 42%",
  },
  {
    labelKey: "hero.tile.stories",
    image: "/images/hero/stories.jpg",
    query: { format: "stories" },
    hideOnMobile: true,
  },
];

export const heroCircles: HeroLink[] = [
  {
    labelKey: "topic.bloodSugar",
    image: "/images/hero/blood-sugar.jpg",
    query: { focus: ["blood-sugar"] },
  },
  {
    labelKey: "topic.sleep",
    image: "/images/hero/sleep.jpg",
    query: { focus: ["sleep"] },
  },
  {
    labelKey: "topic.stress",
    image: "/images/hero/stress.jpg",
    query: { focus: ["stress"] },
  },
  {
    labelKey: "topic.back",
    image: "/images/hero/back.jpg",
    query: { format: "movement", focus: ["back"] },
  },
  {
    labelKey: "topic.energy",
    image: "/images/hero/energy.jpg",
    query: { focus: ["energy"] },
  },
  {
    labelKey: "topic.digestion",
    image: "/images/hero/digestion.jpg",
    query: { focus: ["digestion"] },
  },
  {
    labelKey: "topic.everyday",
    image: "/images/hero/everyday.jpg",
    query: { everyday: true },
  },
  {
    labelKey: "topic.mostLoved",
    image: "/images/hero/most-loved.jpg",
    query: { featured: true },
  },
];

export const formatLabelKey: Record<Format, MessageKey> = {
  "essential-oils": "hero.tile.oils",
  recipes: "hero.tile.recipes",
  movement: "hero.tile.movement",
  stories: "hero.tile.stories",
};

export const focusLabelKey: Record<Focus, MessageKey> = {
  "blood-sugar": "topic.bloodSugar",
  sleep: "topic.sleep",
  stress: "topic.stress",
  back: "topic.back",
  energy: "topic.energy",
  digestion: "topic.digestion",
};

export const navLinks: { href: string; labelKey: MessageKey }[] = [
  { href: "/", labelKey: "nav.home" },
  { href: "/events", labelKey: "nav.events" },
  { href: "/book", labelKey: "nav.book" },
  { href: "/start-here", labelKey: "nav.startHere" },
  { href: "/contact", labelKey: "nav.contacts" },
  { href: "/search", labelKey: "nav.search" },
];

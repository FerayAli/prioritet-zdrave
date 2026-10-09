export const formats = [
  "essential-oils",
  "recipes",
  "movement",
  "stories",
  "science",
  "body-map",
] as const;

export type Format = (typeof formats)[number];

export const focuses = [
  "blood-sugar",
  "sleep",
  "stress",
  "back",
  "energy",
  "digestion",
] as const;

export type Focus = (typeof focuses)[number];

/** Systems on the body map. Order is the reading order of the homepage list. */
export const bodySystems = [
  "nervous",
  "endocrine",
  "respiratory",
  "cardiovascular",
  "immune",
  "lymphatic",
  "digestive",
  "urinary",
  "musculoskeletal",
  "skin",
  "womens-health",
  "sensory",
] as const;

export type BodySystem = (typeof bodySystems)[number];

export type Post = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  body: string;
  cover?: string;
  format: Format;
  /** Set on body-map posts. Groups the homepage list and the icon that opens the guide. */
  system?: BodySystem;
  /** The post an icon opens. Exactly one guide per system that has any posts. */
  guide: boolean;
  focus: Focus[];
  oils: string[];
  everyday: boolean;
  featured: boolean;
};

export type PostQuery = {
  format?: Format;
  focus?: Focus[];
  everyday?: boolean;
  featured?: boolean;
};

export const applicationMethods = [
  "diffuse",
  "topical-diluted",
  "inhale",
] as const;

export type ApplicationMethod = (typeof applicationMethods)[number];

export type BlendLine = {
  slug: string;
  drops: number;
};

export type Symptom = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  focus: Focus[];
  oils: BlendLine[];
  schedule: string;
  method: ApplicationMethod;
  relatedProtocol?: string;
};

export type ProtocolPhase = {
  title: string;
  duration: string;
  oils: BlendLine[];
  schedule: string;
  method: ApplicationMethod;
};

export type Protocol = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  focus: Focus[];
  severity?: string;
  phases: ProtocolPhase[];
};

export function isApplicationMethod(value: string): value is ApplicationMethod {
  return (applicationMethods as readonly string[]).includes(value);
}

export function isFormat(value: string): value is Format {
  return (formats as readonly string[]).includes(value);
}

export function isFocus(value: string): value is Focus {
  return (focuses as readonly string[]).includes(value);
}

export function isBodySystem(value: string): value is BodySystem {
  return (bodySystems as readonly string[]).includes(value);
}

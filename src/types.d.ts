// ZAH Workshop — the content contract.
//
// A deck is ONE object of this shape. Every word on screen comes from it; the
// engine (src/scenes.js) owns the layout, the motion and the behaviour, and a
// client's colours come in through `theme`. If a scene needs something this
// file cannot say, extend the contract here (in this repo), never in a site.

/** A button or a clickable area. Exactly one of href / modal. */
export type Action = {
  label: string;
  /** Opens in a new tab (window.open). Relative paths resolve on the host site. */
  href?: string;
  /** Opens the modal of this name from `Content.modals`. */
  modal?: string;
  /** Show a trailing arrow icon (offer cards do). */
  arrow?: boolean;
  /** Colour of the button: accent (default), ink, or white-on-colour. */
  tone?: "accent" | "ink" | "white";
};

/**
 * Brand colours and fonts. Give `accent`, `ink` and `paper`; everything else
 * is derived from them unless you override it. Defaults are ZAH's own.
 */
export type Theme = {
  accent?: string;
  ink?: string;
  paper?: string;
  /** Light section background and card borders. */
  panel?: string;
  /** Body text on light sections. */
  muted?: string;
  /** Second colour of the ink gradients (slightly lighter than ink). */
  ink2?: string;
  /** Darker ink: product screens, dashboard header, pairing badge. */
  inkDeep?: string;
  /** The intro veil that fades off the cover. */
  inkVeil?: string;
  /** Light text on ink. */
  soft?: string;
  soft2?: string;
  soft3?: string;
  /** Eyebrow text on ink. */
  dim?: string;
  /** Neutral grey: inactive numbers, unchecked boxes. */
  grey?: string;
  /** Fine print. */
  grey2?: string;
  /** Gear colour on the cover. */
  gearLight?: string;
  /** CSS font-family values. */
  fontDisplay?: string;
  fontBody?: string;
  /** A stylesheet URL for the fonts (Google Fonts), or null to load none. */
  fontsUrl?: string | null;
};

export type Brand = {
  name: string;
  /** Logo for light backgrounds. */
  logo: string;
  /** Logo for dark backgrounds (cover, side panel). Defaults to `logo`. */
  logoOnDark?: string;
  /** Shown as fine print on the side panel. */
  site?: string;
};

export type Receipt = {
  /** Text before the number: "$". */
  pre?: string;
  /** The number the counter climbs to. */
  value: number;
  /** Decimal places while counting. */
  decimals?: number;
  /** Text after the number: "M", "x", "+", "K". */
  post?: string;
  /** Bold line under the number. */
  context: string;
  /** Quiet line under that. */
  label: string;
};

export type ProductScreen =
  | { image: string; alt?: string; background?: string }
  | { icon: string; alt?: string; background?: string; size?: number; glow?: string; shadow?: boolean };

export type ProductCard = {
  name: string;
  blurb: string;
  /** Small square mark next to the name. */
  icon: string;
  screen: ProductScreen;
  button: Action;
};

export type DashboardScreen = {
  kind: "dashboard";
  title: string;
  subtitle?: string;
  live?: string;
  /** Initial in the avatar circle. */
  avatar?: string;
  logo?: string;
  metrics: { label: string; pre?: string; value: number; post?: string; accent?: boolean }[];
  chart?: { title: string; delta?: string; bars: number[] };
  list?: { title: string; rows: { initial: string; name: string; status: string; tone?: "green" | "amber" | "blue" }[] };
};

export type ImageScreen = { kind: "image"; image: string; alt?: string };

export type OfferHeader = {
  image: string;
  alt?: string;
  name: string;
  sub?: string;
  /** CSS background of the band. Defaults to the ink gradient. */
  background?: string;
  nameColor?: string;
  nameFont?: string;
  subColor?: string;
  imageRadius?: string;
  imageShadow?: boolean;
};

export type OfferCard =
  /** The big gradient card at the top: an image with a pulse, a badge, a title, copy, a white button. */
  | { kind: "feature"; image: string; alt?: string; badge: string; title: string; body: string; button: Action }
  /** Text beside an image that opens a lightbox or a link. */
  | { kind: "book"; title: string; badge?: string; badgeTone?: "ink" | "accent"; name: string; body: string; image: string; alt?: string; imageBackground?: string; imageSide?: "left" | "right"; imageAction?: Action; button?: Action }
  /** A card with a branded band on top (a product, a partner). */
  | { kind: "brand"; header: OfferHeader; title: string; badge?: string; badgeColor?: string; body: string; button?: Action; /** Space between the copy and the button, px (default 18). */ bodyGap?: number }
  /** One line: an icon, a title, copy, a button on the right. */
  | { kind: "simple"; icon?: "calendar" | "heart" | "star" | "spark"; title: string; badge?: string; body: string; button: Action };

export type Panel = {
  /** Headline over the QR, lines joined with a break. */
  headline: string[];
  qr: { image: string; alt?: string };
  lines?: string[];
  button?: Action;
};

export type SceneBase = {
  /** The dot-nav label. Defaults per scene type. */
  label?: string;
  /** Turn the gears off on this scene. */
  gears?: boolean;
};

export type Scene =
  | (SceneBase & { type: "cover"; headline: string[]; tagline: string; chips: string[]; ticker: string[]; hint?: string })
  | (SceneBase & { type: "receipts"; eyebrow: string; headline: string; headlineAccent?: string; intro: string; items: Receipt[]; outro?: string })
  | (SceneBase & { type: "meet"; photo: string; photoAlt?: string; eyebrow: string; headline: string; paragraphs: string[]; credential?: { icon: string; label: string } })
  | (SceneBase & { type: "learn"; eyebrow: string; headline: string[]; items: { title: string; body: string }[] })
  | (SceneBase & { type: "products"; eyebrow: string; headline: string[]; intro: string; items: ProductCard[] })
  | (SceneBase & { type: "spotlight"; logo: string; name: string; intro: string; features: { title: string; body: string }[]; screen: DashboardScreen | ImageScreen; button?: Action })
  | (SceneBase & { type: "person"; watermark?: string; eyebrow: string; headline: string[]; photo: string; photoAlt?: string; name: string; titles: string[]; paragraphs: string[] })
  | (SceneBase & { type: "pairing"; left: { image: string; name: string; alt?: string }; right: { image: string; name: string; alt?: string }; tagline: string; taglineAccent?: string })
  | (SceneBase & { type: "statement"; logo?: string; eyebrow: string; headline: string[]; sub?: string })
  | (SceneBase & { type: "build"; eyebrow: string; headline: string; headlineAccent?: string; items: { title: string; body: string }[]; outro?: string })
  | (SceneBase & { type: "offer"; hero: { image: string; alt?: string }; eyebrow: string; headline: string[]; sub: string; rows: (OfferCard | OfferCard[])[]; panel?: Panel });

export type Modal =
  /** A lightbox: the image, big, on a dark veil. */
  | { image: string; alt?: string }
  /** Anything else: your own markup inside the standard veil (a closeModal button is added). */
  | { html: string };

export type Content = {
  /** Namespaces the remembered scroll position. */
  id?: string;
  title?: string;
  brand: Brand;
  theme?: Theme;
  scenes: Scene[];
  modals?: Record<string, Modal>;
  /** The floating "scan me" chip, hidden on the offer scene. Omit for no chip. */
  qr?: { image: string; alt?: string; label?: string };
  /** The prompt under the cover headline. */
  navHint?: string;
};

export type RenderOptions = {
  /** Prefix for asset paths that start with "/". */
  assetBase?: string;
};

export type Rendered = { html: string; css: string; fontsUrl: string | null };

export function renderDeck(content: Content, options?: RenderOptions): Rendered;
export function renderPromotions(content: Content, options?: RenderOptions): Rendered;
export function themeCss(theme?: Theme): string;
export function resolveTheme(theme?: Theme): Required<Theme>;
export function pageHtml(rendered: Rendered, options?: { title?: string; wireSrc?: string; mount?: "deck" | "promotions" }): string;
export const baseCss: string;

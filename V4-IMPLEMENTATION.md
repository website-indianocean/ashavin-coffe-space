# V4 design implementation

Color system: Obsidian Espresso #0A0806; Dark Roast #15100C; Deep Walnut #20140D; Antique Bronze #765039; Champagne Copper #E9B68A; Warm Ivory #F5F1EE; Soft Taupe #C8BAAD.

Design grid: 1440px max content, gutters clamp(20px, 5vw, 76px), spacing increments 4/8/12/16/24/32/48/64/96.

Component dimensions: 52px buttons, 44px accessible navigation/pause controls, 46px icon buttons, 10/16/24px card/control radius, 999px pill radius, 1px bronze borders.

Responsive widths: 320/350/390/420/720/950/1199/1440+; mobile category two-column and single column on narrow screens; mobile two-action bottom dock respects safe area and clears footer.

Motion durations: 180–280ms control transitions; 46s review marquee linear infinite; reduced motion disables continuous animation; pointer hover and focus-within pause.

The source's two CSS files are the normalized structural foundation and single visual design authority. No premium.css or v3-luxury.css cascading patches remain.

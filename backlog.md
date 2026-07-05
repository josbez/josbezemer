# Backlog — audit-fixes josbezemer.nl

Resultaat van de site-audit (juli 2026). Elke taak is geschreven als zelfstandige opdracht
voor een AI-agent (Claude Opus of Sonnet), inclusief exacte stappen, valkuilen en
acceptatiecriteria. Rol taken binnen dezelfde *wave* gerust parallel uit; waves zelf
zijn volgordelijk (latere waves raken bestanden die eerdere waves wijzigen).

---

## Spelregels voor élke agent (in elke prompt meesturen)

1. **Werk op een eigen branch** vanaf `main`, naam: `fix/<taak-id>`. Geen PR aanmaken tenzij expliciet gevraagd.
2. **Verifieer elke wijziging met een build:** `npm ci && npm run build` moet slagen zónder nieuwe warnings, en controleer daarna het relevante bestand in `dist/` (niet alleen de source). Een fix die alleen "er goed uitziet" in de source telt niet.
3. **Blijf binnen de taak.** Geen refactors, geen dependency-upgrades, geen stijl-aanpassingen buiten de opdracht. Als je iets anders kapots tegenkomt: noteren in je eindrapport, niet fixen.
4. **Raak de schrijfstijl van de content niet aan** tenzij de taak dat expliciet zegt. De posts zijn in de stem van de auteur geschreven; "verbeteren" is hier verslechteren.
5. De site is **Engelstalig** (`lang="en"`); alle nieuwe user-facing tekst in het Engels.
6. Commit-messages: kort, imperatief, Engels (bestaande stijl: "Add article: …", "Remove template license").

### Algemene valkuilen per model

**Sonnet — common mistakes:**
- Fix doorvoeren zonder de build te draaien of `dist/`-output te controleren → altijd stap 2 afdwingen.
- Te letterlijk: het genoemde regelnummer fixen maar de identieke fout drie regels verderop laten staan → vraag altijd "zoek alle voorkomens" (grep) in de prompt.
- Bij onduidelijkheid zelf een aanname doen en doorgaan → in de prompt de aannames al dichttimmeren (dat is hieronder gedaan).
- Template-kennis toepassen die hier niet geldt (bijv. Tailwind v3-syntax; dit project gebruikt **Tailwind v4 met `@theme` en CSS-variabelen**, geen `tailwind.config.js`).

**Opus — common mistakes:**
- Scope creep: "nu ik hier toch ben"-refactors, extra componenten, abstracties die niemand vroeg. Expliciet verbieden.
- Copy herschrijven in een gladde marketing-stem die niet van de auteur is. De stem is direct, licht eigenwijs, zonder buzzwords — behouden.
- Te veel opties aandragen in plaats van de gevraagde beslissing uitvoeren.
- Over-engineered oplossingen (bijv. een compleet i18n-systeem waar één string volstaat).

---

## WAVE 1 — Kritieke bugs (klein, onafhankelijk, direct uitrollen)

### TAAK 1.1 — RSS-feed linkt naar niet-bestaande `/blog/`-URL's
**Model: Sonnet** (mechanische fix, exact omschreven, geen ontwerpkeuzes)

**Probleem:** `src/pages/rss.xml.js` bouwt itemlinks als `` `/blog/${item.id}/` ``, maar posts staan op `/notes/…`. Elke link in de feed is een 404.

**Doe exact dit:**
1. In `src/pages/rss.xml.js`: verander `` link: `/blog/${item.id}/` `` in `` link: `/notes/${item.id}/` ``.
2. Fix in hetzelfde bestand de pubDate-regel: `pubDate: item.data.publishDate.setUTCHours(0)` muteert het Date-object en retourneert een getal. Vervang door `pubDate: item.data.publishDate`.
3. Build en open `dist/rss.xml`: alle `<link>`- en `<guid>`-waarden moeten beginnen met `https://josbezemer.nl/notes/` en elke URL moet als bestand bestaan in `dist/notes/<slug>/index.html`.

**Valkuilen:**
- Sonnet: alléén de link fixen en de guid vergeten (guid wordt afgeleid van link — controleer beide in de output).
- Niet verifiëren dat de slugs in de feed exact overeenkomen met de mappen in `dist/notes/`.

**Klaar wanneer:** `dist/rss.xml` bevat uitsluitend URL's die als pagina bestaan in `dist/`.

---

### TAAK 1.2 — Redirect oude post-URL wijst naar 404
**Model: Sonnet**

**Probleem:** `astro.config.mjs` bevat `redirects: { '/notes/Judgement for designers': '/notes/Judgement as a learnable skill' }`. Het redirect-target bestaat niet; de echte slug is `/notes/judgement-as-a-learnable-skill`.

**Doe exact dit:**
1. Verander het target in `'/notes/judgement-as-a-learnable-skill'`. Laat de bron-URL (met spaties) ongewijzigd — dat is de oude URL die ooit live stond.
2. Build en open `dist/notes/Judgement for designers/index.html`: de meta-refresh en canonical moeten naar `/notes/judgement-as-a-learnable-skill` wijzen, en die pagina moet bestaan in `dist/`.

**Valkuilen:**
- Sonnet: "netjes" ook de bron-URL hernoemen → dan is de redirect voor bestaande oude links kapot. Bron ongemoeid laten.
- De redirect helemaal verwijderen omdat hij "fout" is.

**Klaar wanneer:** oude URL → werkende pagina, geverifieerd in `dist/`.

---

### TAAK 1.3 — Contactpagina is leeg
**Model: Sonnet** (de inhoud staat hieronder al vast; er valt niets te bedenken)

**Probleem:** `src/content/pages/contact.md` bevat alleen frontmatter en een lege body. De pagina toont "Get in touch" en verder niets.

**Doe exact dit:**
1. Vul de body van `src/content/pages/contact.md` met (Engels, kort, geen extra secties):
   - E-mail: [jos@josbezemer.nl](mailto:jos@josbezemer.nl) — als primaire actie.
   - LinkedIn: https://www.linkedin.com/in/josbezemer/
   - GitHub: https://github.com/josbez
   - Eén inleidend zinnetje, feitelijk van toon, bijv.: "The fastest way to reach me is email." Geen formulier bouwen.
2. Vervang de template-meta description in de frontmatter (`"Get in touch through email or social media! Let me know how I can help."`) door iets specifieks, bijv.: `"Contact Jos Bezemer, Lead UX Designer — reach out via email or LinkedIn."` (max 160 tekens).
3. Build en controleer `dist/contact/index.html`: body bevat de mailto-link.

**Valkuilen:**
- Sonnet: een contactformulier of Netlify-form toevoegen → verboden, dit is een statische GitHub Pages-site zonder backend.
- Enthousiaste marketing-copy ("I'd love to hear from you!!") → toon van de rest van de site aanhouden: droog en direct.

**Klaar wanneer:** contactpagina bevat e-mail + LinkedIn + GitHub en een niet-template meta description.

---

### TAAK 1.4 — Lege `/projects/`-sectie verwijderen (tot er cases zijn)
**Model: Sonnet** (de beslissing — verwijderen, niet vullen — is al genomen)

**Probleem:** de projects-collectie is leeg. `/projects/` wordt als lege pagina gebouwd, staat in de sitemap, en de build geeft warnings ("The collection projects does not exist or is empty"). De nav linkt er niet eens naartoe.

**Doe exact dit:**
1. Verwijder `src/pages/projects/[...page].astro` en `src/pages/projects/[id].astro`.
2. Verwijder in `src/pages/index.astro` de projects-logica: de `getCollection('projects')`-regels en het hele `featuredProjects`-blok inclusief de "View All Projects"-knop en de nu ongebruikte imports (`ProjectPreview`, `Button`).
3. Laat staan: `src/content.config.ts` (projects-collectie definitie), `src/content/projects/.gitkeep`, `src/components/ProjectPreview.astro` en `projectsPerPage` in `site-config.ts` — die zijn nodig zodra er wél cases komen. De build-warning over de lege collectie in `content.config` is acceptabel; alleen de pagina's moeten weg.
4. Build: `/projects/` mag niet meer in `dist/` of `dist/sitemap-0.xml` staan; homepage bouwt zonder errors.

**Valkuilen:**
- Sonnet: te veel verwijderen (component, config, collectie-definitie) waardoor herintroductie later pijn doet — de lijst in stap 3 is limitatief.
- Import-resten laten staan → build-error of lint-ruis; controleer dat `index.astro` geen ongebruikte imports heeft.

**Klaar wanneer:** geen `/projects/` in `dist/` en sitemap; build slaagt.

---

## WAVE 2 — Content & copy (oordeel en stem vereist)

### TAAK 2.1 — Redactienotitie en taalfouten in gepubliceerde posts
**Model: Opus** (raakt de tekst van de auteur; vereist terughoudendheid en gevoel voor stem)

**Probleem + exacte fixes** in `src/content/blog/No more hiding behind the execution.md`:
1. De zin *"…as I've talked about before (link to [judgement post](/notes/judgement-as-a-learnable-skill))."* is een blijven-hangen redactienotitie. Herschrijf naar een gewone lopende verwijzing, bijv.: *"…as I've [talked about before](/notes/judgement-as-a-learnable-skill)."* Link-target ongewijzigd laten (die klopt).
2. `"an other stakeholder"` → `"another stakeholder"`.
3. `"lets not forget"` → `"let's not forget"`.
4. `"(And lets not forget this is a Figma survey, there's a bias.)"` — alleen de apostrof fixen, de zin zelf niet herschrijven.

En in `src/data/site-config.ts` (hero.text):
5. `"Hi, I'm Jos, as UX designer I work on the architecture underneath the interface."` → `"Hi, I'm Jos. As a UX designer I work on the architecture underneath the interface."` — alleen de zinsbouw/lidwoord-fix, geen andere woorden veranderen.

**Valkuilen:**
- **Opus: dit is de gevaarlijkste taak van de backlog.** De verleiding is groot om "nog even" meer te polijsten: zinnen glad te strijken, Brits/Amerikaans te normaliseren ("focussing"), interpunctie te standaardiseren. **Niet doen.** Alleen de vijf genoemde wijzigingen; de licht eigenzinnige toon is een feature.
- De markdown-link kapotmaken (spaties in target, vergeten haakjes).

**Klaar wanneer:** exact deze vijf edits, diff toont niets anders, build slaagt.

---

### TAAK 2.2 — Template-metateksten vervangen
**Model: Opus** (copy die het merk vertegenwoordigt in Google/LinkedIn-previews)

**Probleem:** Dante-template placeholders staan nog live:
- `src/content/pages/about.md` seo.description: *"Learn more about the person behind the website and embark on a journey of inspiration and shared experiences."*
- `src/content/pages/about.md` seo.image alt: *"A person sitting at a desk in front of a computer"* — controleer of dit klopt bij `src/assets/images/about.jpg` en maak het specifiek.

**Doe exact dit:**
1. Schrijf een nieuwe about-description (max 160 tekens) die aansluit op wie hij is: Lead UX Designer, werkt aan informatie-architectuur, objectmodellen en de structuur onder interfaces. Feitelijk, geen superlatieven. Voorbeeldrichting: *"About Jos Bezemer, Lead UX Designer working on information architecture and the structural foundations of digital products."*
2. De about-pagina zelf (`about.md` body) is één regel over hobby's. Voeg **maximaal één korte alinea** toe vóór de bestaande regel over wat hij professioneel doet (materiaal: de hero-tekst en site-description in `src/data/site-config.ts`). De bestaande hobbyregel en emoji's behouden.
3. Subscribe-teksten in `site-config.ts` staan in het Nederlands op een Engelse site. De feature staat uit (`enabled: false`), dus alleen de strings vertalen naar het Engels zodat er geen taal-mismatch klaarstaat: `"Subscribe to the newsletter"` / `"One update per week. New posts straight to your inbox."`

**Valkuilen:**
- Opus: de about-pagina uitbouwen tot een volwaardige bio-pagina met secties, cv en skills-lijst → verboden; max één alinea erbij.
- De meta description langer dan 160 tekens maken (wordt afgekapt in de zoekresultaten).
- Sonnet zou dit ook kunnen, maar levert hier vaak generieke LinkedIn-achtige copy ("passionate about creating delightful experiences") — precies wat we verwijderen. Daarom Opus, met de instructie: geen adjectieven die de auteur zelf niet gebruikt.

**Klaar wanneer:** geen template-strings meer in `dist/about/index.html`, description ≤160 tekens, alle site-strings Engels.

---

### TAAK 2.3 — Site-identiteit op subpagina's (naam nergens zichtbaar)
**Model: Opus** (kleine ontwerpbeslissing met site-brede impact)

**Probleem:** de `Header`-component (avatar + "Jos Bezemer / UX Designer") wordt op geen enkele pagina gerenderd — alle pagina's geven `showHeader={false}` door aan `BaseLayout`. Wie via Google op een note landt, ziet nergens wiens site dit is behalve de copyrightregel in de footer.

**Doe exact dit (gekozen richting):**
1. Voeg in `src/components/Nav.astro` links in de navigatiebalk een compacte brand-link toe: naam "Jos Bezemer" (font-serif, zelfde stijl als navlinks), linkend naar `/`. Geen avatar-afbeelding in de nav (houd het licht). Desktop: naam links, navlinks + theme-toggle rechts of ernaast — sluit aan op de bestaande flex-structuur. Mobiel: naam zichtbaar naast de hamburger, niet ín het uitklapmenu.
2. Verwijder daarna "Home" uit `headerNavLinks` in `site-config.ts` (de naam ís nu de home-link; "Home" + brand-link is dubbel).
3. De `Header`-component en `showHeader`-prop **niet** verwijderen en niet activeren — buiten scope.
4. Controleer op elke paginasoort in `dist/` (home, note, notes-index, about, contact) dat de naam in de nav staat, en test visueel dat mobiel (menu open/dicht) en desktop niet breken. Let op: de site gebruikt Astro view transitions (`ClientRouter`) — het menu-script bindt opnieuw via `astro:after-swap`; die structuur intact laten.

**Valkuilen:**
- **Opus: dit uitbouwen tot een redesign van de nav** (sticky headers, avatars, animaties). Eén tekstlink toevoegen, klaar.
- Het mobiele menu-JS of de aria-attributen (`aria-expanded`, `aria-controls`) slopen bij het herstructureren van de markup.
- Tailwind v4: styling via bestaande utility-classes en CSS-variabelen (`text-main`, `border-main`); geen nieuwe config.
- Sonnet is hier riskant: de Nav heeft absolute positionering, een custom hamburger-animatie en view-transition-hooks; zonder goed ruimtelijk overzicht breekt de mobiele layout stilletjes. Vandaar Opus + expliciete mobiele test.

**Klaar wanneer:** naam klikbaar op elke pagina, "Home"-link weg, mobiel menu werkt (handmatig geverifieerd met `npm run preview` of screenshots).

---

## WAVE 3 — SEO-infrastructuur (raakt vooral `BaseHead.astro`; NIET parallel binnen deze wave draaien)

### TAAK 3.1 — Ontbrekende meta-tags + RSS-autodiscovery + favicon.svg
**Model: Sonnet** (standaardpatronen, exact omschreven)

**Doe exact dit, alles in `src/components/BaseHead.astro`:**
1. Voeg toe na de bestaande Open Graph-tags:
   - `<meta property="og:site_name" content={siteConfig.title} />`
   - `<meta name="twitter:card" content="summary_large_image" />`
   - `<meta name="twitter:title" content={title} />`
   - `{description && <meta name="twitter:description" content={description} />}`
   - `{resolvedImage?.src && <meta name="twitter:image" content={resolvedImage.src} />}`
2. RSS-autodiscovery bij de andere `<link>`-tags: `<link rel="alternate" type="application/rss+xml" title={siteConfig.title} href={new URL('rss.xml', Astro.site)} />`
3. Favicon: voeg `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />` toe ná de bestaande `.ico`-regel (`public/favicon.svg` bestaat al).
4. Fix de no-op in `formatCanonicalURL`: regel `path.replace(/\/?$/, '');` doet niets (resultaat wordt weggegooid). Maak er `return path.replace(/\/?$/, '');` van binnen de if, zodat query-URL's zonder trailing slash terugkomen.
5. Verwijder in `src/pages/notes/[id].astro` de keywords-meta (`{keywords && <meta slot="head" name="keywords" …/>}`) en de bijbehorende `const keywords`-regel — zoekmachines negeren dit sinds 2009.
6. Voeg in `src/pages/notes/[id].astro` via het head-slot article-metadata toe: `<meta slot="head" property="article:published_time" content={publishDate.toISOString()} />` en, indien `updatedDate` bestaat, idem `article:modified_time`.
7. Build en verifieer in `dist/index.html` én `dist/notes/prompt-reviewing/index.html` dat alle nieuwe tags aanwezig zijn en er geen dubbele tags ontstaan.

**Valkuilen:**
- Sonnet: `twitter:site`/`twitter:creator` toevoegen met een verzonnen handle → er is geen X-account bekend; weglaten.
- De slot-mechaniek: meta-tags in `[id].astro` moeten `slot="head"` hebben, anders belanden ze in de body.
- `formatCanonicalURL` "verbeteren" door hem te herschrijven → alleen de return-bug fixen.

**Klaar wanneer:** tags zichtbaar in de genoemde dist-bestanden; W3C-valide (geen dubbele og-tags).

---

### TAAK 3.2 — robots.txt + eigen 404-pagina
**Model: Sonnet**

**Doe exact dit:**
1. Maak `public/robots.txt`:
   ```
   User-agent: *
   Allow: /

   Sitemap: https://josbezemer.nl/sitemap-index.xml
   ```
2. Maak `src/pages/404.astro` in de stijl van de bestaande pagina's: gebruik `BaseLayout` met `title="Page not found"`, `showHeader={false}`, een `<h1>` ("Page not found"), één zin ("This page doesn't exist or has moved.") en een link naar `/` en `/notes`. Kijk naar `src/pages/[...id].astro` voor de markup-conventies (`article`, heading-classes).
3. Build: `dist/robots.txt` en `dist/404.html` bestaan. GitHub Pages pakt `404.html` automatisch op.

**Valkuilen:**
- Sonnet: een creatieve 404 met zoekfunctie/illustratie bouwen → twee links volstaan.
- `Disallow:` regels toevoegen die niets doen, of de sitemap-URL hardcoden met http of zonder `-index`.
- 404-pagina noindexen is niet nodig (404-status regelt dat), maar de pagina moet géén `<meta name="robots" noindex>`-hack krijgen.

**Klaar wanneer:** beide bestanden in `dist/`, 404 gebruikt de site-layout.

---

### TAAK 3.3 — JSON-LD structured data
**Model: Sonnet** (schema's staan hieronder vast)

**Doe exact dit:**
1. Homepage (`src/pages/index.astro`), via `slot="head"`: een `Person`-schema:
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Person",
     "name": "Jos Bezemer",
     "jobTitle": "Lead UX Designer",
     "url": "https://josbezemer.nl",
     "sameAs": ["https://github.com/josbez", "https://www.linkedin.com/in/josbezemer/"]
   }
   ```
   Waarden uit `siteConfig` halen, niet hardcoden.
2. Notes (`src/pages/notes/[id].astro`), via `slot="head"`: een `BlogPosting`-schema met `headline` (title), `datePublished` (ISO), `dateModified` (updatedDate ?? publishDate), `description` (de al berekende `description`), `author` (`Person`, name uit siteConfig, url naar site) en `url` (canonical van de post).
3. In Astro: gebruik `<script type="application/ld+json" set:html={JSON.stringify(schema)} />` — let op `set:html`, anders wordt de JSON ge-escaped.
4. Build en valideer de JSON uit `dist/` (bijv. door het script-blok te extraheren en door `JSON.parse` te halen). Optioneel: check met https://validator.schema.org.

**Valkuilen:**
- Sonnet: `is:inline` vergeten is hier niet nodig maar `set:html` wél; zonder dat rendert Astro `&quot;`.
- Datums als `Date`-object in `JSON.stringify` werken (ISO), maar wees expliciet met `.toISOString()`.
- Geen `aggregateRating`/`image`-velden verzinnen die er niet zijn.

**Klaar wanneer:** valide JSON-LD in dist-HTML van home + alle notes.

---

### TAAK 3.4 — og-image: 957KB PNG-met-jpg-extensie vervangen
**Model: Sonnet** (met tooling-instructie)

**Probleem:** `public/og-image.jpg` is in werkelijkheid een PNG van 1200×630, 957KB. Traag en misleidend gelabeld; sommige scrapers haken af boven ~300KB.

**Doe exact dit:**
1. Converteer het bestand naar echte JPEG, kwaliteit ~80, zelfde afmetingen (1200×630), doel: onder 200KB. Gebruik `sharp` (staat al in `node_modules` via Astro):
   ```bash
   node -e "require('sharp')('public/og-image.jpg').jpeg({quality:80,mozjpeg:true}).toFile('public/og-image-new.jpg').then(()=>{})"
   ```
   en vervang daarna het origineel (zelfde bestandsnaam `og-image.jpg` behouden — de referentie staat in `site-config.ts`).
2. Verifieer: `file public/og-image.jpg` zegt JPEG, afmetingen 1200×630, grootte <300KB, en het beeld is visueel intact (bekijk het bestand).
3. Build; geen verdere wijzigingen nodig (pad blijft gelijk).

**Valkuilen:**
- Sonnet: alleen de extensie hernoemen zonder te converteren → het bestand blijft een PNG.
- De bestandsnaam wijzigen en `site-config.ts` vergeten → kapotte og:image op elke pagina.
- Overcompressie (<q60) → artefacten in een afbeelding die je merk vertegenwoordigt; visueel controleren.

**Klaar wanneer:** echte JPEG <300KB op hetzelfde pad, visueel in orde.

---

## WAVE 4 — Toegankelijkheid & performance

### TAAK 4.1 — Linkcontrast onder WCAG AA
**Model: Sonnet** (waarde staat vast, verificatie is een berekening)

**Probleem:** accent `#C4623A` op achtergrond `#f4efe6` = 3.56:1; WCAG AA voor lopende tekst vereist 4.5:1. Alle links in artikelen gebruiken deze kleur. Dark mode (`#D4724A` op `#1c1714` = 5.33:1) is al in orde.

**Doe exact dit:**
1. Verander in `src/styles/global.css` alléén de light-mode `--accent` van `#C4623A` naar `#A84E2B` (zelfde tint, donkerder).
2. Verifieer computationeel dat de nieuwe waarde ≥4.5:1 haalt tegen `#f4efe6` én tegen `#ece6da` (`--bg-muted`); schrijf desnoods een klein Node-script met de WCAG-luminantieformule.
3. Dark-mode accent **niet** aanpassen.
4. Build en bekijk een note-pagina (preview of screenshot): links moeten nog duidelijk "warm oranjebruin" ogen, passend bij het palet.

**Valkuilen:**
- Sonnet: beide modes aanpassen, of de tint verschuiven naar bruin/rood waardoor het palet verandert.
- Vergeten dat links óók op `--bg-muted` kunnen staan; tegen beide achtergronden checken.
- Contrast "op gevoel" beoordelen in plaats van uitrekenen.

**Klaar wanneer:** berekend contrast ≥4.5:1 op beide achtergronden, dark mode onaangeroerd.

---

### TAAK 4.2 — Skip-link, focus-states, theme-toggle status, menu-gedrag
**Model: Opus** (vier kleine ingrepen verspreid over interactieve componenten; samenhang en testdiscipline nodig)

**Doe exact dit:**
1. **Skip-link** in `src/layouts/BaseLayout.astro`: als eerste element in `<body>` een `<a href="#main-content">Skip to content</a>` die visueel verborgen is tot focus (Tailwind: `sr-only focus:not-sr-only` + zichtbare styling bij focus, passend bij het palet). Geef `<main>` het id `main-content` en `tabindex="-1"`.
2. **Focus-reveal** in `src/components/PostPreview.astro` (en `ProjectPreview.astro`, ook al is die nu ongebruikt): de "Read Note →"-hint heeft `opacity-0 group-hover:opacity-100`; voeg `group-focus-visible:opacity-100` toe zodat toetsenbordgebruikers hetzelfde zien.
3. **Theme-toggle** (`src/components/ThemeToggle.astro` + `public/theme-toggle.js`): geef de knop een statusindicatie: zet in `theme-toggle.js` bij `applyTheme()` en bij de click-handler `aria-pressed` op de knop (`true` = dark) en update `aria-label` naar "Switch to light theme"/"Switch to dark theme". Let op: dit script draait ook vóór de knop bestaat (het is een blocking head-script); guard op `document.getElementById` zoals de bestaande code al doet, en zorg dat de status ook na `astro:after-swap` klopt.
4. **Mobiel menu** (`src/components/Nav.astro`): sluit het menu bij `Escape` (focus terug naar de toggle-knop) en bij een klik buiten het menu. Registreer listeners zó dat ze na view-transitions (`astro:after-swap`) niet dubbel stapelen — het bestaande script heeft dit stapel-risico al; gebruik bijv. één gedelegeerde listener op `document` of ruim oude listeners op.
5. Test met `npm run preview`: tab door de homepage (skip-link verschijnt, previews tonen hint), toggle het thema (aria-pressed wisselt), open het mobiele menu en sluit met Escape. Navigeer tussen twee pagina's en test opnieuw (view-transition-herbinding!).

**Valkuilen:**
- **Opus: de theme-toggle of nav "even netjes" herschrijven** → alleen de genoemde gedragingen toevoegen.
- Dubbele event-listeners na `astro:after-swap` — de bestaande code voegt bij elke swap opnieuw een click-listener toe op dezelfde knop; maak het niet erger, en fixen mag alleen als het binnen de menu-wijziging valt.
- `aria-pressed` op een knop die van label wisselt: kies één patroon (label wisselen óf pressed-state) en documenteer de keuze in de commit; beide tegelijk is verwarrend voor screenreaders — voorkeur: dynamisch `aria-label` + `aria-pressed` weglaten.
- Sonnet-risico hier: past de vier plekken los aan zonder de view-transition-lifecycle te begrijpen → daarom Opus.

**Klaar wanneer:** alle vijf testscenario's uit stap 5 slagen, ook ná een paginanavigatie.

---

### TAAK 4.3 — Fonts self-hosten (performance + AVG/GDPR)
**Model: Sonnet** (bekend recept met Fontsource)

**Probleem:** fonts laden via fonts.googleapis.com — extra render-blocking connecties en een AVG-aandachtspunt (IP-doorgifte aan Google; Duitse jurisprudentie). 

**Doe exact dit:**
1. `npm install @fontsource/syne @fontsource/epilogue`
2. Vervang in `src/components/BaseHead.astro` de drie font-`<link>`-regels (preconnect ×2 + stylesheet) door niets; importeer in plaats daarvan in `src/styles/global.css` bovenaan de benodigde gewichten — exact wat de huidige Google Fonts-URL laadt:
   - Syne: 400, 500, 600, 700 → `@import '@fontsource/syne/400.css';` etc.
   - Epilogue: 300, 400, 500 + italic 300, 400 → `@import '@fontsource/epilogue/300.css';` … `@import '@fontsource/epilogue/300-italic.css';` `@import '@fontsource/epilogue/400-italic.css';`
3. Build en controleer: (a) geen enkele verwijzing naar `googleapis`/`gstatic` meer in `dist/` (grep!), (b) woff2-bestanden in `dist/_astro/`, (c) headings renderen in Syne, body in Epilogue (preview/screenshot — Syne is herkenbaar aan de brede, geometrische letters).
4. Controleer dat de fontbestanden `font-display: swap` gebruiken (Fontsource-default).

**Valkuilen:**
- Sonnet: gewichten vergeten (vooral de italics van Epilogue — de blog gebruikt cursief) → tekst valt terug op faux-italic of systeemfont.
- `@import` ná andere CSS-regels plaatsen → CSS-spec vereist imports bovenaan; Vite waarschuwt hier niet altijd over.
- Variable-font-versie (`/variable.css`) mengen met statische gewichten.
- De grep-verificatie overslaan en een achtergebleven preconnect laten staan.

**Klaar wanneer:** nul externe font-requests in `dist/`, alle gewichten/stijlen renderen correct.

---

## WAVE 5 — Opruimen & borging (ná alle andere waves)

### TAAK 5.1 — Dode assets en dead code verwijderen
**Model: Sonnet** (limitatieve lijst hieronder; géén eigen inschatting)

**Doe exact dit — verwijder uitsluitend:**
1. `src/assets/images/post-1.jpg` t/m `post-14.jpg` en `project-1.jpg` t/m `project-7.jpg` (ongebruikte Dante-templatebeelden, ~3.2MB).
2. `public/icon-192.png` en `public/icon-512.png` — nergens gerefereerd (er is geen webmanifest). **Tenzij** een eerdere taak een manifest heeft toegevoegd; check eerst met grep.
3. Het redundante inline theme-script in `src/layouts/BaseLayout.astro` (regels met `if (localStorage.theme === 'dark')`) — `public/theme-toggle.js` (blocking, direct erna) doet hetzelfde vollediger, inclusief system preference. Verifieer daarna handmatig dat er géén flash-of-wrong-theme is: zet OS op dark, laad de site zonder localStorage; herhaal met localStorage `light`.
4. In `src/utils/data-utils.ts`: `getAllTags` en `getPostsByTag` + de dan ongebruikte `slugify`-import (en check of `common-utils.ts` daarmee helemaal ongebruikt wordt; zo ja, óók verwijderen).

**NIET verwijderen:** `Header.astro`, `Subscribe.astro`, `ProjectPreview.astro`, `avatar.jpg`, `hero.jpg`, `about.jpg`, de projects-collectie in `content.config.ts`, `footerNavLinks`/`subscribe`-config. Die zijn bewust geparkeerd voor later.

**Valkuilen:**
- Sonnet: grep-loos verwijderen. Vóór elke deletie: `grep -rn "<bestandsnaam>" src/ public/ astro.config.mjs` — nul hits vereist.
- Het theme-script verwijderen zonder de FOUC-test uit stap 3 → visueel regressierisico dat een build niet vangt.
- "Terwijl ik bezig ben" ook geparkeerde componenten weggooien.

**Klaar wanneer:** build slaagt, grep bevestigt nul references, FOUC-test gedaan en beschreven in het eindrapport.

---

### TAAK 5.2 — CI-borging: astro check + prettier in de workflow
**Model: Sonnet**

**Doe exact dit:**
1. `npm install --save-dev @astrojs/check typescript` (vereist voor `astro check`).
2. Voeg scripts toe aan `package.json`: `"check": "astro check"` en `"format:check": "prettier --check ."`.
3. Draai beide lokaal. **Verwacht:** er kunnen bestaande fouten uitkomen (bijv. type-issues of niet-geformatteerde bestanden). Fix formatting via `prettier --write .` alléén als de diff puur whitespace/quotes betreft; rapporteer type-errors zonder ze te "fixen" met `any` of `@ts-ignore` — als een type-error een echte fix vergt die buiten deze taak valt, noteer hem en laat `astro check` dan nog níet toevoegen aan CI (alleen prettier), met een TODO in het eindrapport.
4. Voeg in `.github/workflows/deploy.yml` in de build-job, ná `npm ci` en vóór `npm run build`, twee stappen toe: `npm run check` (indien groen in stap 3) en `npm run format:check`.
5. Verifieer dat `npm run build` nog steeds slaagt.

**Valkuilen:**
- Sonnet: type-errors wegdrukken met `any`/`@ts-ignore` om CI groen te krijgen → expliciet verboden, zie stap 3.
- Een grote prettier-reformat door de hele codebase heen committen samen met de workflow-wijziging → splits in twee commits (format-commit apart), anders is de diff onleesbaar.
- Prettier-plugins (astro, tailwindcss) staan al in devDependencies; niet opnieuw installeren of de `.prettierrc` aanpassen.

**Klaar wanneer:** workflow bevat de checks, lokaal groen, build groen.

---

## Uitrol-spiekbriefje

| Taak | Model | Reden | Parallel veilig? |
|---|---|---|---|
| 1.1 RSS-links | Sonnet | mechanisch, exact | ja (wave 1 onderling) |
| 1.2 Redirect | Sonnet | één regel + verificatie | ja |
| 1.3 Contact | Sonnet | inhoud vastgelegd | ja |
| 1.4 Projects weg | Sonnet | beslissing al genomen | ja |
| 2.1 Copy-fixes posts | **Opus** | stem van de auteur, terughoudendheid | ja (eigen bestanden) |
| 2.2 Meta-copy | **Opus** | merk-copy, anti-generiek | niet samen met 2.1 (beide raken about/site-config) |
| 2.3 Brand in nav | **Opus** | ontwerpbeslissing, fragiele nav | ja binnen wave 2 |
| 3.1 Meta-tags | Sonnet | standaardpatronen | **nee** — wave 3 serieel (BaseHead) |
| 3.2 robots+404 | Sonnet | triviaal | mag parallel (raakt BaseHead niet) |
| 3.3 JSON-LD | Sonnet | schema's vastgelegd | na 3.1 (zelfde pagina-heads) |
| 3.4 og-image | Sonnet | tooling-recept | ja |
| 4.1 Contrast | Sonnet | waarde vastgelegd | ja |
| 4.2 A11y-gedrag | **Opus** | view-transition-lifecycle | ja |
| 4.3 Fonts | Sonnet | bekend recept | niet samen met 3.1 (BaseHead) |
| 5.1 Cleanup | Sonnet | limitatieve lijst | laatste, ná alles |
| 5.2 CI | Sonnet | recept + rapporteer-regel | laatste, ná alles |

**Vuistregel achteraf:** review elke agent-branch op (a) diff-omvang — groter dan de taak beschrijft = scope creep, terugsturen; (b) is de dist-verificatie daadwerkelijk uitgevoerd (staat in het eindrapport); (c) bij Opus-taken: is er copy veranderd die niet in de opdracht stond.

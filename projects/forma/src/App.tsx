import { FormEvent, useEffect, useMemo, useState } from "react";

type Language = "pl" | "en";

function getInitialLanguage(): Language {
  return new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "pl";
}

const content = {
  pl: {
    menu: ["Realizacje", "Oferta", "Proces"], cta: "Umów pomiar",
    heroEyebrow: "Pracownia mebli na wymiar · Warmia i Mazury", heroTitle: <>Meble, które<br />domykają wnętrze.</>, heroCopy: "Projektujemy, wykonujemy i montujemy zabudowy dopasowane do rytmu domu — od pierwszego szkicu po ostatni detal.", heroButton: "Bezpłatny pomiar", heroLink: "Zobacz realizacje", scroll: "Przewiń", heroPlace: "Olsztyn, 2026",
    approach: "Nasze podejście", manifest: <>Nie wypełniamy przestrzeni.<br /><em>Porządkujemy ją.</em></>, manifestCopy: "Wierzymy, że dobre meble zaczynają się od słuchania. Poznajemy sposób, w jaki mieszkasz, gotujesz i odpoczywasz — dopiero potem projektujemy.", stats: [["12", "lat doświadczenia"], ["340+", "ukończonych wnętrz"], ["5 lat", "gwarancji"]],
    projectsLabel: "Wybrane realizacje", filters: ["Wszystkie", "Kuchnie", "Garderoby", "Zabudowy"], askSimilar: "Zapytaj o projekt podobny do",
    projects: [
      { type: "Kuchnie", name: "Kuchnia Sienna", place: "Olsztyn · 2026", image: "./images/forma-kitchen.webp", meta: "Dąb naturalny · spiek kwarcowy" },
      { type: "Garderoby", name: "Garderoba No. 04", place: "Lidzbark Warmiński · 2026", image: "./images/forma-wardrobe.webp", meta: "Orzech · szkło dymione" },
      { type: "Zabudowy", name: "Salon Linea", place: "Bartoszyce · 2026", image: "./images/forma-living.webp", meta: "Fornir dębowy · lakier matowy" },
    ],
    servicesLabel: "Co projektujemy", servicesTitle: <>Jedna pracownia.<br />Całe wnętrze.</>, services: [["01", "Kuchnie", "Ergonomia, materiały i detal dopracowane pod codzienny rytm."], ["02", "Szafy i garderoby", "Maksimum przechowywania bez wizualnego ciężaru."], ["03", "Zabudowy salonu", "Spójne ściany meblowe, biblioteki i strefy multimedialne."], ["04", "Meble łazienkowe", "Odporne materiały i rozwiązania dopasowane co do milimetra."]],
    processLabel: "Jak pracujemy", processTitle: <>Od rozmowy<br />do gotowego wnętrza.</>, process: [["01", "Rozmowa i pomiar", "Poznajemy potrzeby, budżet i przestrzeń. Pomiar wykonujemy na miejscu."], ["02", "Projekt i materiały", "Przygotowujemy układ, wizualizacje oraz próbki materiałów i okuć."], ["03", "Produkcja", "Każdy element powstaje w naszej pracowni pod kontrolą jednego zespołu."], ["04", "Montaż", "Dostarczamy, montujemy i zostawiamy wnętrze gotowe do użytkowania."]],
    detailEyebrow: "Detal ma znaczenie", detailTitle: "Materiały, które dobrze się starzeją.", detailCopy: "Pracujemy na naturalnych fornirach, trwałych laminatach, lakierach o podwyższonej odporności i okuciach sprawdzonych europejskich producentów.", detailList: ["Próbki przed decyzją", "Sprawdzone systemy okuć", "Pełna dokumentacja projektu"],
    quoteEyebrow: "Twój projekt", quoteTitle: <>Zacznijmy od<br />krótkiej rozmowy.</>, quoteCopy: "Opisz, czego potrzebujesz. Wrócimy z pytaniami i propozycją terminu bezpłatnego pomiaru.", thanks: "Dziękujemy.", demoForm: "To wersja demonstracyjna formularza. W gotowej stronie wiadomość trafiłaby bezpośrednio do pracowni.", again: "Wyślij kolejne zapytanie", projectQuestion: "Co chcesz wykonać?", projectTypes: ["Kuchnia", "Szafa / garderoba", "Zabudowa salonu", "Inne"], name: "Imię", namePlaceholder: "Jan", phone: "Telefon", interior: "Opowiedz krótko o wnętrzu", interiorPlaceholder: "Pomieszczenie ma około 12 m²...", submit: "Wyślij zapytanie", note: "Wysyłając formularz, akceptujesz kontakt w sprawie wyceny.",
    footerLine: "Meble na wymiar · Warmia i Mazury", footerLinks: ["Realizacje", "Oferta", "Kontakt"], concept: "Projekt koncepcyjny VOIDLAB Studio. Marka, dane i realizacje są fikcyjne.",
  },
  en: {
    menu: ["Projects", "Services", "Process"], cta: "Book a measure-up",
    heroEyebrow: "Bespoke furniture studio · Warmia and Mazury", heroTitle: <>Furniture that<br />completes the interior.</>, heroCopy: "We design, craft and install bespoke furniture shaped around the rhythm of your home — from the first sketch to the final detail.", heroButton: "Free measure-up", heroLink: "View projects", scroll: "Scroll", heroPlace: "Olsztyn, 2026",
    approach: "Our approach", manifest: <>We do not fill space.<br /><em>We bring order to it.</em></>, manifestCopy: "We believe good furniture begins with listening. We learn how you live, cook and unwind — only then do we start designing.", stats: [["12", "years of experience"], ["340+", "completed interiors"], ["5 years", "warranty"]],
    projectsLabel: "Selected projects", filters: ["All", "Kitchens", "Wardrobes", "Built-ins"], askSimilar: "Ask about a project similar to",
    projects: [
      { type: "Kitchens", name: "Sienna Kitchen", place: "Olsztyn · 2026", image: "./images/forma-kitchen.webp", meta: "Natural oak · sintered stone" },
      { type: "Wardrobes", name: "Wardrobe No. 04", place: "Lidzbark Warmiński · 2026", image: "./images/forma-wardrobe.webp", meta: "Walnut · smoked glass" },
      { type: "Built-ins", name: "Linea Living Room", place: "Bartoszyce · 2026", image: "./images/forma-living.webp", meta: "Oak veneer · matt lacquer" },
    ],
    servicesLabel: "What we design", servicesTitle: <>One studio.<br />The entire interior.</>, services: [["01", "Kitchens", "Ergonomics, materials and details refined for everyday life."], ["02", "Wardrobes", "Maximum storage without visual weight."], ["03", "Living room built-ins", "Cohesive feature walls, libraries and media units."], ["04", "Bathroom furniture", "Durable materials and made-to-measure solutions down to the millimetre."]],
    processLabel: "How we work", processTitle: <>From the first conversation<br />to a finished interior.</>, process: [["01", "Consultation and measure-up", "We learn about your needs, budget and space, then measure everything on site."], ["02", "Design and materials", "We prepare the layout, visualisations, and samples of materials and fittings."], ["03", "Production", "Every component is made in our workshop under the supervision of one team."], ["04", "Installation", "We deliver, install and leave your interior ready to use."]],
    detailEyebrow: "Details matter", detailTitle: "Materials designed to age beautifully.", detailCopy: "We work with natural veneers, durable laminates, high-resistance lacquers and fittings from trusted European manufacturers.", detailList: ["Samples before you decide", "Trusted hardware systems", "Complete project documentation"],
    quoteEyebrow: "Your project", quoteTitle: <>Let’s start with<br />a short conversation.</>, quoteCopy: "Tell us what you need. We’ll get back to you with a few questions and a proposed date for a free measure-up.", thanks: "Thank you.", demoForm: "This is a demonstration form. On a finished website, your message would be sent directly to the studio.", again: "Send another enquiry", projectQuestion: "What would you like us to make?", projectTypes: ["Kitchen", "Wardrobe", "Living room built-in", "Other"], name: "Name", namePlaceholder: "John", phone: "Phone", interior: "Tell us briefly about your interior", interiorPlaceholder: "The room is approximately 12 m²...", submit: "Send enquiry", note: "By submitting the form, you agree to be contacted about your quote.",
    footerLine: "Bespoke furniture · Warmia and Mazury", footerLinks: ["Projects", "Services", "Contact"], concept: "A concept project by VOIDLAB Studio. The brand, contact details and projects are fictional.",
  },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const t = content[language];
  const [activeFilter, setActiveFilter] = useState<string>(content.pl.filters[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectType, setProjectType] = useState<string>(content.pl.projectTypes[0]);
  const [sent, setSent] = useState(false);

  const visibleProjects = useMemo(
    () => t.projects.filter((project) => activeFilter === t.filters[0] || project.type === activeFilter),
    [activeFilter, t],
  );

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === "pl" ? "FORMA — Meble na wymiar" : "FORMA — Bespoke furniture";
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) {
      description.content = language === "pl"
        ? "Kuchnie, garderoby i zabudowy projektowane na wymiar na Warmii i Mazurach."
        : "Bespoke kitchens, wardrobes and built-ins designed and made in Warmia and Mazury.";
    }
    setActiveFilter(t.filters[0]);
    setProjectType(t.projectTypes[0]);
  }, [language, t.filters, t.projectTypes]);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    setMenuOpen(false);
    const url = new URL(window.location.href);
    if (nextLanguage === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    window.history.replaceState({}, "", url);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#start" aria-label={language === "pl" ? "FORMA — strona główna" : "FORMA — home"}>
          <span className="brand-mark">F</span><span>FORMA</span>
        </a>
        <button className="menu-toggle" type="button" aria-label={language === "pl" ? "Otwórz menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          <span /><span />
        </button>
        <nav className={menuOpen ? "nav-open" : ""} aria-label={language === "pl" ? "Główna nawigacja" : "Main navigation"}>
          <a href="#realizacje" onClick={() => setMenuOpen(false)}>{t.menu[0]}</a>
          <a href="#oferta" onClick={() => setMenuOpen(false)}>{t.menu[1]}</a>
          <a href="#proces" onClick={() => setMenuOpen(false)}>{t.menu[2]}</a>
          <a className="nav-cta" href="#wycena" onClick={() => setMenuOpen(false)}>{t.cta}</a>
          <div className="language-switch" aria-label={language === "pl" ? "Wybór języka" : "Language selection"}>
            <button type="button" aria-pressed={language === "pl"} className={language === "pl" ? "active" : ""} onClick={() => changeLanguage("pl")}>PL</button>
            <span>/</span>
            <button type="button" aria-pressed={language === "en"} className={language === "en" ? "active" : ""} onClick={() => changeLanguage("en")}>EN</button>
          </div>
        </nav>
      </header>

      <section className="hero" id="start">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow light">{t.heroEyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-copy">{t.heroCopy}</p>
          <div className="hero-actions">
            <a className="button button-light" href="#wycena">{t.heroButton} <span>↗</span></a>
            <a className="text-link light-link" href="#realizacje">{t.heroLink} <span>↓</span></a>
          </div>
        </div>
        <div className="hero-meta"><span>01</span><p>{t.projects[0].name}<br /><b>{t.heroPlace}</b></p></div>
        <a className="scroll-cue" href="#manifest">{t.scroll} <span>↓</span></a>
      </section>

      <section className="manifest section-pad" id="manifest">
        <div className="section-label"><span>01</span><p>{t.approach}</p></div>
        <div className="manifest-copy">
          <h2>{t.manifest}</h2>
          <div className="manifest-grid">
            <p>{t.manifestCopy}</p>
            <div className="stat-row">
              {t.stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="projects section-pad" id="realizacje">
        <div className="projects-head">
          <div className="section-label"><span>02</span><p>{t.projectsLabel}</p></div>
          <div className="filter-row" aria-label={language === "pl" ? "Filtr realizacji" : "Project filter"}>
            {t.filters.map((filter) => (
              <button className={filter === activeFilter ? "active" : ""} type="button" key={filter} onClick={() => setActiveFilter(filter)}>{filter}</button>
            ))}
          </div>
        </div>
        <div className="project-grid">
          {visibleProjects.map((project) => (
            <article className="project-card" key={project.name}>
              <div className="project-image-wrap">
                <img src={project.image} alt={`${project.name} — ${project.meta}`} />
                <span className="project-number">0{t.projects.indexOf(project) + 1}</span>
                <a href="#wycena" aria-label={`${t.askSimilar} ${project.name}`}>↗</a>
              </div>
              <div className="project-info">
                <div><p>{project.type}</p><h3>{project.name}</h3></div>
                <div><p>{project.place}</p><span>{project.meta}</span></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="services" id="oferta">
        <div className="services-intro section-pad">
          <div className="section-label light-label"><span>03</span><p>{t.servicesLabel}</p></div>
          <h2>{t.servicesTitle}</h2>
        </div>
        <div className="service-list section-pad">
          {t.services.map(([number, title, text]) => (
            <a className="service-row" href="#wycena" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p><b>↗</b></a>
          ))}
        </div>
      </section>

      <section className="process section-pad" id="proces">
        <div className="process-head">
          <div className="section-label"><span>04</span><p>{t.processLabel}</p></div>
          <h2>{t.processTitle}</h2>
        </div>
        <div className="process-grid">
          {t.process.map(([number, title, text]) => (
            <article className="process-step" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="detail-story">
        <div className="detail-image" aria-hidden="true" />
        <div className="detail-copy">
          <p className="eyebrow">{t.detailEyebrow}</p>
          <h2>{t.detailTitle}</h2>
          <p>{t.detailCopy}</p>
          <ul>{t.detailList.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ul>
        </div>
      </section>

      <section className="quote section-pad" id="wycena">
        <div className="quote-copy">
          <p className="eyebrow">{t.quoteEyebrow}</p>
          <h2>{t.quoteTitle}</h2>
          <p>{t.quoteCopy}</p>
          <div className="contact-lines"><a href="tel:+48555123456">+48 555 123 456</a><a href="mailto:pracownia@forma-demo.pl">pracownia@forma-demo.pl</a></div>
        </div>
        {sent ? (
          <div className="success-card" role="status">
            <span>✓</span><h3>{t.thanks}</h3>
            <p>{t.demoForm}</p>
            <button type="button" onClick={() => setSent(false)}>{t.again}</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>{t.projectQuestion}</legend>
              <div className="choice-grid">
                {t.projectTypes.map((type) => (
                  <button className={projectType === type ? "selected" : ""} type="button" key={type} onClick={() => setProjectType(type)}><span>{projectType === type ? "●" : "○"}</span>{type}</button>
                ))}
              </div>
            </fieldset>
            <div className="input-row">
              <label>{t.name}<input name="name" required placeholder={t.namePlaceholder} /></label>
              <label>{t.phone}<input name="phone" required inputMode="tel" placeholder="500 000 000" /></label>
            </div>
            <label>{t.interior}<textarea name="message" rows={4} placeholder={t.interiorPlaceholder} /></label>
            <button className="button button-dark submit-button" type="submit">{t.submit} <span>↗</span></button>
            <p className="form-note">{t.note}</p>
          </form>
        )}
      </section>

      <footer>
        <a className="brand footer-brand" href="#start"><span className="brand-mark">F</span><span>FORMA</span></a>
        <p>{t.footerLine}</p>
        <div><a href="#realizacje">{t.footerLinks[0]}</a><a href="#oferta">{t.footerLinks[1]}</a><a href="#wycena">{t.footerLinks[2]}</a></div>
        <p className="concept-note">{t.concept}</p>
      </footer>
    </main>
  );
}

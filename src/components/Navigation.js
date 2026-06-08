function Navigation() {
  return (
    <header className="top-bar">
      <div className="brand-block">
        <h1 className="brand-title">Lønnskalkulator</h1>
        <p className="brand-subtitle">Regn ut offshoretillegg, trekk og netto utbetaling.</p>
      </div>
      <div className="status-pill" aria-label="Automatisk beregning er aktiv">
        <span className="status-dot" />
        Automatisk beregning
      </div>
    </header>
  );
}

export default Navigation;

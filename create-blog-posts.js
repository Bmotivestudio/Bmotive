// Script rapido per creare i 3 articoli SEO richiesti
const articles = [
  {
    title: "Branding PMI: Come Creare un'Identità Visiva Vincente nel 2025",
    slug: "branding-pmi-identita-visiva-2025",
    excerpt: "Guida completa per PMI italiane: strategie di branding, identità visiva e posizionamento per crescere nel mercato digitale.",
    content: "## Branding per PMI: La Strategia Vincente\n\nLe PMI italiane che investono in branding professionale vedono un aumento del fatturato del 23% nel primo anno.\n\n### 1. Analisi Mercato Italiano\n- Studio della concorrenza locale\n- Positioning unico nel mercato\n- Value proposition differenziante\n\n### 2. Identità Visiva Professionale\n- Logo versatile e scalabile\n- Palette colori distintiva\n- Typography coordinata\n- Brand guidelines complete\n\n### 3. Implementazione Digitale\n- Sito web responsive\n- Social media coordinati\n- Materiali marketing\n- Packaging design\n\n### ROI del Branding per PMI\n- +40% riconoscibilità brand\n- +25% lead qualificati\n- +30% fedeltà clienti\n\n**Contatta Bmotive Studio** per una strategia di branding su misura per la tua PMI.",
    categoryId: 1,
    tags: []
  },
  {
    title: "Freelance Italia 2025: Personal Branding e Marketing per Professionisti",
    slug: "freelance-italia-personal-branding-2025", 
    excerpt: "Strategie concrete per freelance italiani: personal branding, portfolio online e client acquisition nel mercato digitale.",
    content: "## Personal Branding per Freelance Italiani\n\nIl mercato freelance italiano vale oltre 15 miliardi di euro. Ecco come posizionarti:\n\n### 1. Portfolio Professionale\n- Sito web personale ottimizzato\n- Case study dettagliati\n- Testimonianze clienti\n- Portfolio visivo accattivante\n\n### 2. SEO per Freelance Locali\n- Ottimizzazione per città specifiche\n- Content marketing di settore\n- Google My Business per freelance\n- Local SEO specialist\n\n### 3. Network e Referral\n- LinkedIn marketing strategico\n- Eventi di networking\n- Sistema referral automatizzato\n- Partnership strategiche\n\n### Tariffe Competitive 2025\n- Graphic Design: €30-60/ora\n- Web Development: €40-80/ora\n- Marketing Consulting: €50-90/ora\n\n**Bmotive Studio** aiuta freelance a costruire brand professionali e portfolio vincenti.",
    categoryId: 3,
    tags: []
  },
  {
    title: "Marketing Digitale PMI: ROI Garantito con Budget Limitato",
    slug: "marketing-digitale-pmi-roi-budget-limitato",
    excerpt: "Strategie di marketing digitale ad alto ROI per PMI italiane. Come ottenere risultati concreti con investimenti sostenibili.",
    content: "## Digital Marketing per PMI: Strategia ROI-Focused\n\nLe PMI che applicano queste strategie ottengono un ROI medio del 400%.\n\n### 1. Budget Allocation Ottimale\n- 40% Google Ads (ricerche locali)\n- 25% Social Media Marketing\n- 20% SEO e Content Marketing\n- 15% Email Marketing\n\n### 2. Google Ads per PMI\n- Keywords locali ad alta conversione\n- Campagne geo-localizzate\n- Ad extensions complete\n- Landing page ottimizzate\n\n### 3. Social Media ROI\n- Facebook/Instagram advertising\n- Content strategy territoriale\n- Community building locale\n- Influencer marketing micro\n\n### 4. SEO Locale Avanzata\n- Google My Business ottimizzato\n- Recensioni management\n- Local citations\n- Schema markup LocalBusiness\n\n### Case Study: Ristorante Roma\n- Budget: €800/mese\n- Risultati: +180% prenotazioni\n- ROI: 520% in 6 mesi\n\n**Bmotive Studio** crea strategie digital su misura per PMI italiane.",
    categoryId: 2,
    tags: []
  }
];

async function createArticles() {
  console.log('Creazione 3 articoli SEO per il blog...');
  
  for (const article of articles) {
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...article,
          featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
          status: "published",
          metaTitle: `${article.title} | Bmotive Studio`,
          metaDescription: article.excerpt
        })
      });
      
      if (response.ok) {
        console.log(`✅ Creato: ${article.title}`);
      } else {
        console.log(`❌ Errore: ${article.title}`);
      }
    } catch (error) {
      console.log(`❌ Errore nella creazione di ${article.title}:`, error.message);
    }
  }
  
  console.log('🎉 Processo completato!');
}

createArticles();
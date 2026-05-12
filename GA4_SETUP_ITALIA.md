
# Setup Google Analytics 4 per SEO Italia - Bmotive Studio

## Configurazione Richiesta

### 1. Creazione Proprietà GA4
- Vai su [Google Analytics](https://analytics.google.com)
- Crea nuova proprietà per "Bmotive Studio"
- Imposta paese: Italia
- Valuta: EUR
- Fuso orario: Europe/Rome

### 2. Stream di Dati Web
- Crea stream per bmotivestudio.it
- Copia il Measurement ID (formato: G-XXXXXXXXXX)
- Sostituisci in `client/src/lib/analytics.ts`

### 3. Eventi Personalizzati Configurati

#### Conversioni Business (High Value)
- `consulenza_richiesta` - Richiesta consulenza gratuita
- `preventivo_richiesto` - Richiesta preventivo
- `contatto_whatsapp` - Contatto via WhatsApp

#### Engagement Utenti
- `servizio_visualizzato` - Visualizzazione pagina servizio
- `faq_aperta` - Interazione con FAQ
- `chat_ai_avviata` - Avvio chat Moty

### 4. Obiettivi Consigliati GA4

#### Obiettivi di Conversione
1. **Lead Generation**: consulenza_richiesta + preventivo_richiesto
2. **Communication**: contatto_whatsapp
3. **Engagement**: faq_aperta + chat_ai_avviata

#### Audience Personalizzate
1. **PMI Italia Interessate**: Utenti che visualizzano servizi
2. **Lead Qualificati**: Utenti che richiedono consulenza
3. **Visitatori Roma**: Geo-targeting su Roma e Lazio

### 5. Report Personalizzati

#### Dashboard SEO Italia
- Traffico organico da ricerche italiane
- Conversioni per keyword italiana
- Performance pagine servizi
- Comportamento utenti mobile vs desktop

#### Report Conversioni PMI
- Funnel da visita a contatto
- Valore per canale di acquisizione
- Performance campagne local SEO
- ROI investimenti marketing digitale

### 6. Integrazione Search Console
- Collega account Search Console
- Analizza query di ricerca italiane
- Monitora CTR per keyword locali
- Ottimizza contenuti basandosi sui dati

## Implementazione Tecnica

### File Creati
- `client/src/lib/analytics.ts` - Configurazione GA4
- `client/src/components/analytics/GoogleAnalytics.tsx` - Componente React

### Utilizzo Componente
```tsx
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';

// In layout o app
<GoogleAnalytics measurementId="G-TUOID" />
```

### Tracking Eventi Personalizzati
```tsx
import { trackEvent } from '@/lib/analytics';

// Esempio tracking consulenza
const handleConsulenzaSubmit = () => {
  trackEvent('consulenza_richiesta', {
    service_type: 'web_development',
    company_size: 'pmi'
  });
};
```

## Benefici per SEO Italia

✅ **Tracking Conversioni Locali**: Misura efficacia SEO per PMI italiane
✅ **Ottimizzazione Contenuti**: Data-driven content strategy
✅ **Performance Monitoring**: Velocità sito e Core Web Vitals
✅ **Comportamento Utenti**: Heatmap e user journey italiani
✅ **ROI Misurazione**: Calcolo retorno investimento marketing

## Prossimi Passi

1. Sostituire Measurement ID placeholder
2. Aggiungere componente al layout principale
3. Configurare obiettivi in GA4
4. Creare dashboard personalizzate
5. Impostare alert per conversioni
6. Integrare con Google Ads per remarketing PMI

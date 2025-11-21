
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'bett-001',
    name: 'Echtholz Bett',
    price: 1299.00,
    tagline: 'Schlafende Architektur.',
    description: 'Zeitloses, nachhaltiges Bett aus deutschem Echtholz – individuell handgefertigt. Die Konstruktion verzichtet auf unnötige Metallverbindungen und setzt auf klassische Holzverbindungen.',
    material: 'Echtholz, deutsche Eiche, geölt.',
    dimensions: 'B: 180 cm, L: 200 cm, H: 40 cm',
    sustainability: 'Holz aus nachhaltiger deutscher Forstwirtschaft (FSC zertifiziert).',
    images: [
      'https://images.unsplash.com/photo-1616594039964-408e4900d6e0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617325247661-675ab4b64ae8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693396355-d6f22d366f98?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'stuhl-002',
    name: 'Stuhl Minimal',
    price: 499.00,
    tagline: 'Reduktion auf das Wesentliche.',
    description: 'Schlichter, moderner Stuhl aus deutscher Eiche – langlebig, stabil und nachhaltig handgefertigt. Die Lehne ist ergonomisch geneigt, ohne die geometrische Strenge zu brechen.',
    material: 'Echtholz, deutsche Eiche / Esche.',
    dimensions: 'H: 90 cm, Sitzhöhe: 45 cm, B: 48 cm',
    sustainability: 'Lokale Fertigung, kurze Transportwege.',
    images: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503602642458-2321114458c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'tisch-003',
    name: 'Kleiner Beistelltisch',
    price: 399.00,
    tagline: 'Der stille Begleiter.',
    description: 'Multifunktionaler Beistelltisch bzw. Nachttisch – gefertigt aus nachhaltiger deutscher Eiche. Passt sich durch seine schlichte Kubatur jedem Raum an.',
    material: 'Massive Eiche.',
    dimensions: 'B: 40 cm, T: 35 cm, H: 43 cm',
    sustainability: 'Restverwertung aus der Möbelproduktion (Zero Waste Ansatz).',
    images: [
      'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&w=1200&q=80'
    ]
  }
];

export const LEGAL_TEXTS = {
  imprint: {
    title: "Impressum",
    content: `
**Architekt & Meister**
Buchenstraße 20, 01097 Dresden, Deutschland

Telefon: +49 151 22807682
E-Mail: david.immanuel.hartel@gmail.com

Vertreten durch: Lukas Westphalen
Mitarbeiter für Kundenservice: Niclas Schlötke
Unternehmensform: Einzelunternehmen

**Haftung für Inhalte**
Die Inhalte unserer Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität übernehmen wir jedoch keine Gewähr.

**Urheberrecht**
Sämtliche Inhalte sind urheberrechtlich geschützt. Jede Nutzung bedarf unserer vorherigen schriftlichen Zustimmung.`
  },
  terms: {
    title: "AGB",
    content: `
**Allgemeine Geschäftsbedingungen**

**§1 Geltungsbereich**
Diese AGB gelten für alle Bestellungen über den Onlineshop von Architekt & Meister.

**§2 Vertragspartner**
Vertragspartner: Einzelunternehmen Lukas Westphalen.

**§3 Vertragsschluss**
Die Produktdarstellungen sind unverbindlich. Mit Absenden der Bestellung gibst du ein verbindliches Angebot ab.

**§4 Preise & Zahlungsbedingungen**
Alle Preise inkl. gesetzlicher Umsatzsteuer. Vorkasse bei Produktionsbeginn.

**§5 Lieferbedingungen**
Fertigungszeit ca. 4–6 Wochen nach Zahlungseingang.

**§6 Widerrufsrecht**
Verbrauchern steht grundsätzlich ein Widerrufsrecht von 14 Tagen zu (außer bei Maßanfertigung).`
  },
  privacy: {
    title: "Datenschutz",
    content: `
**Datenschutzerklärung**

**Verantwortlicher**
Lukas Westphalen, Buchenstraße 20, 01097 Dresden.

**Erhobene Daten**
Wir erheben nur Daten, die für die Vertragsabwicklung oder den technischen Betrieb der Website notwendig sind (IP-Adresse, Bestelldaten).

**Weitergabe**
Daten werden nur an Versanddienstleister weitergegeben.`
  },
  withdrawal: {
    title: "Widerrufsbelehrung",
    content: `
**Widerrufsrecht**
Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.

**Folgen des Widerrufs**
Wir erstatten Ihnen alle Zahlungen binnen 14 Tagen. Rücksendekosten trägt der Käufer.`
  },
  shipping: {
    title: "Versand & Retouren",
    content: `
**Versand**
Wir liefern nach Deutschland, EU und in die Schweiz. Kosten werden im Checkout berechnet.

**Retouren**
14 Tage Rückgaberecht für Standardware. Maßanfertigungen sind vom Umtausch ausgeschlossen.`
  }
};

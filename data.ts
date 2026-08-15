
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'bett-001',
    name: 'Echtholz Bett',
    price: 1399.00,
    tagline: 'Schlafende Architektur.',
    description: 'Ein Bett, das länger lebt als die Bäume, aus denen es gefertigt wurde.\n\nIn Handarbeit aus deutschem Echtholz gefügt, mit klassischen Holzverbindungen statt Metall – zeitlos in Konstruktion wie Erscheinung.',
    material: 'Echtholz, deutsche Fichte (Eiche optional gegen Aufpreis), geölt.',
    dimensions: 'B: 120–180 cm, L: 200 cm, H: 20 cm',
    sustainability: 'Holz aus nachhaltiger deutscher Forstwirtschaft (FSC zertifiziert).',
    features: ['Massivholz: Fichte / Eiche', 'Klassische Holzverbindungen statt Metall', 'Individuell handgefertigt', 'FSC-zertifiziertes Holz'],
    images: [
      '/images/echtholzbett_2.png',
      '/images/echtholzbett_1.jpg',
      '/images/echtholzbett_drawing_1.jpg',
      '/images/echtholzbett_drawing_2.jpg',
      '/images/echtholzbett_drawing_3.jpg',
      '/images/echtholzbett_drawing_4.jpg',
      '/images/echtholzbett_drawing_5.jpg'
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
    comingSoon: true,
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
    comingSoon: true,
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
E-Mail: architektundmeister@gmail.com

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
Gemäß § 19 UStG wird keine Umsatzsteuer berechnet und ausgewiesen (Kleinunternehmerregelung). Vorkasse bei Produktionsbeginn.

**§5 Lieferbedingungen**
Fertigungszeit ca. 4–6 Wochen nach Zahlungseingang.

**§6 Widerrufsrecht**
Da alle Produkte ausschließlich individuell auf Bestellung nach den Vorgaben bzw. Wünschen des Kunden gefertigt werden, besteht gemäß § 312g Abs. 2 Nr. 1 BGB kein gesetzliches Widerrufsrecht. Hierauf weisen wir vor Vertragsschluss ausdrücklich hin.

Unabhängig davon räumen wir Ihnen freiwillig die Möglichkeit ein, Ihre Bestellung bis zum Beginn der Fertigung kostenfrei zu stornieren. Kontaktieren Sie uns hierfür unter architektundmeister@gmail.com. Nach Beginn der Fertigung ist eine Stornierung nicht mehr möglich.`
  },
  privacy: {
    title: "Datenschutz",
    content: `
**Datenschutzerklärung**

**Verantwortlicher**
Lukas Westphalen, Buchenstraße 20, 01097 Dresden, architektundmeister@gmail.com.

**Erhobene Daten**
Wir erheben nur Daten, die für die Vertragsabwicklung oder den technischen Betrieb der Website notwendig sind: bei Bestellungen Name, E-Mail-Adresse, Telefonnummer und Lieferadresse; beim Website-Besuch technisch bedingt die IP-Adresse.

**Hosting**
Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf der Seite wird Ihre IP-Adresse technisch bedingt an Vercel übermittelt.

**Schriftarten (Google Fonts)**
Wir binden Schriftarten von Google Fonts ein, die beim Laden der Seite von Servern der Google LLC geladen werden. Dabei wird Ihre IP-Adresse an Google übertragen.

**Bestellabwicklung**
Bei einer Bestellung werden Ihre Angaben (Name, E-Mail, Telefon, Lieferadresse, Bestelldetails) in einer Datenbank bei Neon gespeichert und die Bestellbestätigung per E-Mail über den Dienstleister Resend versendet.

**Weitergabe**
Eine Weitergabe Ihrer Daten erfolgt nur an die oben genannten technischen Dienstleister sowie an Versanddienstleister zur Zustellung Ihrer Bestellung.

**Ihre Rechte**
Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten sowie ein Beschwerderecht bei der zuständigen Datenschutzaufsichtsbehörde.`
  },
  withdrawal: {
    title: "Widerrufsbelehrung",
    content: `
**Kein gesetzliches Widerrufsrecht bei Maßanfertigungen**
Da es sich bei unseren Produkten um Waren handelt, die nicht vorgefertigt sind und für deren Herstellung eine individuelle Auswahl oder Bestimmung durch Sie maßgeblich ist bzw. die eindeutig auf Ihre persönlichen Bedürfnisse zugeschnitten sind, besteht gemäß § 312g Abs. 2 Nr. 1 BGB kein gesetzliches Widerrufsrecht.

**Freiwillige Stornomöglichkeit**
Wir räumen Ihnen dennoch die Möglichkeit ein, Ihre Bestellung bis zum Beginn der Fertigung kostenfrei zu stornieren. Kontaktieren Sie uns hierfür unter architektundmeister@gmail.com. Nach Beginn der Fertigung ist eine Stornierung nicht mehr möglich.`
  },
  shipping: {
    title: "Versand & Retouren",
    content: `
**Versand**
Wir liefern nach Deutschland, EU und in die Schweiz. Kosten werden im Checkout berechnet.

**Retouren**
Da alle unsere Produkte individuell auf Bestellung gefertigt werden, ist ein Widerrufs- oder Rückgaberecht gemäß § 312g Abs. 2 Nr. 1 BGB gesetzlich ausgeschlossen. Ein Umtausch ist daher grundsätzlich nicht möglich. Bei Mängeln oder Transportschäden gelten selbstverständlich die gesetzlichen Gewährleistungsrechte. Eine kostenfreie Stornierung ist bis zum Beginn der Fertigung möglich (siehe AGB §6).`
  }
};

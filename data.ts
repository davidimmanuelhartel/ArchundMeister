
import { Product, FaqItem, WoodOption } from './types';

/** Aufpreis für Eiche und Eiche schwarz gegenüber Fichte (Bett). */
export const EICHE_AUFPREIS = 200;

// Bilder je Holzart: gemacht (Hauptbild), Gestell, Detail der Lattenenden
const bettBilder = (holz: string) => ['gemacht', 'gestell', 'detail'].map((motiv) => `/images/echtholzbett_${holz}_${motiv}.jpg`);

const BETT_HOLZARTEN: WoodOption[] = [
  { id: 'fichte', name: 'Fichte', note: 'Standard', surcharge: 0, swatch: '/images/holz_fichte.jpg', images: bettBilder('fichte') },
  { id: 'eiche', name: 'Eiche', note: 'geölt', surcharge: EICHE_AUFPREIS, swatch: '/images/holz_eiche.jpg', images: bettBilder('eiche') },
  { id: 'eiche-schwarz', name: 'Eiche schwarz', note: 'schwarz gebeizt', surcharge: EICHE_AUFPREIS, swatch: '/images/holz_eiche-schwarz.jpg', images: bettBilder('eiche-schwarz') },
];

export const PRODUCTS: Product[] = [
  {
    id: 'bett-001',
    name: 'Echtholz Bett',
    price: 1699.00,
    tagline: 'Schlafende Architektur.',
    // Der erste Absatz steht auch in der Meta-Beschreibung und im Produkt-Schema (seo.ts)
    description: 'Ein Massivholzbett, das wir erst nach Ihrer Bestellung in Dresden bauen.\n\nWir verwenden Fichte oder Eiche aus deutscher Forstwirtschaft, ölen das Holz und fügen die Teile mit Holzverbindungen, ohne Schrauben. Ein Schreiner kann das Bett deshalb später reparieren.',
    material: 'Echtholz: deutsche Fichte, Eiche oder Eiche schwarz gebeizt, geölt.',
    // geschützte Leerzeichen (\u00a0): Zahl und Einheit bleiben zusammen, umgebrochen wird nur nach einem Komma
    dimensions: 'B:\u00a0140, 160 oder 180\u00a0cm, L:\u00a0200\u00a0cm, H:\u00a020\u00a0cm',
    sustainability: 'FSC-zertifiziertes Holz aus deutscher Forstwirtschaft.',
    features: ['Massivholz: Fichte, Eiche oder Eiche schwarz', 'Holzverbindungen ohne Schrauben', 'Von Hand gebaut in Dresden', 'FSC-zertifiziertes Holz'],
    care: 'Stauben Sie das Holz trocken ab. Bei Flecken wischen Sie mit einem leicht feuchten Tuch darüber und reiben die Stelle gleich trocken. Verwenden Sie keine Mikrofasertücher, Scheuermittel oder scharfen Reiniger. Je nach Beanspruchung reicht es, die Oberfläche etwa einmal im Jahr mit einem handelsüblichen Hartwachsöl nachzuölen; kleine Gebrauchsspuren behandeln Sie dabei mit. Stellen Sie das Bett nicht direkt an die Heizung oder in pralle Sonne, damit das Holz gleichmäßig arbeitet.',
    woodOptions: BETT_HOLZARTEN,
    // vorausgewählt ist 180, in dieser Breite sind alle Produktbilder gerendert
    widths: [140, 160, 180],
    // Alle Bilder (für Suchmaschinen und Vorschau); die Produktseite zeigt die Bilder der gewählten Holzart
    // und danach die Konstruktionszeichnungen
    images: [
      ...BETT_HOLZARTEN.flatMap((holz) => holz.images),
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

/**
 * Haeufige Fragen. Bewusst faktisch gehalten – jede Antwort deckt sich mit den
 * Angaben in den Produktdaten und den Rechtstexten. Wird auf der Produktseite
 * ausgegeben und als FAQPage-Schema ausgeliefert.
 */
export const FAQ: FaqItem[] = [
  {
    question: 'Wie lange dauert die Fertigung?',
    answer:
      'Wir beginnen mit dem Bau erst nach Ihrer Bestellung. Die Fertigung dauert in der Regel 4 bis 6 Wochen ab Zahlungseingang, danach verschicken wir Ihr Bett.',
  },
  {
    question: 'Aus welchem Holz ist das Bett?',
    answer:
      `Aus deutscher Fichte. Für ${EICHE_AUFPREIS} € Aufpreis bauen wir es aus Eiche, natur oder schwarz gebeizt. Das Holz stammt aus deutscher Forstwirtschaft und ist FSC-zertifiziert. Wir ölen die Oberfläche.`,
  },
  {
    question: 'Verwenden Sie Schrauben oder Metallbeschläge?',
    answer:
      'Nein. Wir fügen das Bett mit Holzverbindungen. Ein Schreiner kann es deshalb später reparieren.',
  },
  {
    question: 'Welche Maße sind möglich?',
    answer:
      'Das Bett gibt es in 140, 160 oder 180 cm Breite, jeweils 200 cm lang und 20 cm hoch. Andere Maße bauen wir als Sonderanfertigung nach Absprache.',
  },
  {
    question: 'Gibt es ein Rückgaberecht?',
    answer:
      'Für unsere Standardprodukte haben Sie als Verbraucher ein gesetzliches Widerrufsrecht von 14 Tagen ab Erhalt der Ware; die Kosten der Rücksendung tragen Sie. Bei echten Sonderanfertigungen nach Ihren individuellen Vorgaben ist das Widerrufsrecht gesetzlich ausgeschlossen. Unabhängig davon können Sie jede Bestellung bis zum Beginn der Fertigung kostenfrei stornieren.',
  },
  {
    question: 'Wohin liefert Architekt & Meister?',
    answer:
      'Wir liefern nach Deutschland, in die EU und in die Schweiz. Die Versandkosten berechnen wir gesondert, sie kommen zum Preis hinzu.',
  },
  {
    question: 'Wer steckt hinter Architekt & Meister?',
    answer:
      'Niclas Schlötke entwirft die Möbel als Architekt, Lukas Westphalen baut sie als Schreiner. Beide arbeiten in Dresden.',
  },
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
Die Produktdarstellungen sind unverbindlich. Mit Absenden der Bestellung geben Sie ein verbindliches Angebot ab.

**§4 Preise & Zahlungsbedingungen**
Gemäß § 19 UStG wird keine Umsatzsteuer berechnet und ausgewiesen (Kleinunternehmerregelung). Vorkasse bei Produktionsbeginn.

**§5 Lieferbedingungen**
Fertigungszeit ca. 4–6 Wochen nach Zahlungseingang.

**§6 Widerrufsrecht**
Für die in unserem Onlineshop als Standardprodukt angebotenen Artikel (aktuell: das Modell „Echtholz Bett") steht Ihnen als Verbraucher ein gesetzliches Widerrufsrecht zu. Die Einzelheiten ergeben sich aus unserer Widerrufsbelehrung.

Für Sonderanfertigungen, die wir auf Ihre ausdrücklichen individuellen Vorgaben hin fertigen (z. B. abweichende Maße, Holzart oder sonstige individuelle Anpassungen außerhalb des Standardangebots), besteht gemäß § 312g Abs. 2 Nr. 1 BGB kein gesetzliches Widerrufsrecht, da diese Waren eindeutig auf Ihre persönlichen Bedürfnisse zugeschnitten sind. Hierauf weisen wir Sie vor Abschluss eines solchen Vertrags gesondert und ausdrücklich hin.

Unabhängig vom Widerrufsrecht räumen wir Ihnen bei allen Bestellungen zusätzlich die Möglichkeit ein, bis zum Beginn der Fertigung jederzeit kostenfrei zu stornieren. Kontaktieren Sie uns hierfür unter architektundmeister@gmail.com.`
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
**Geltungsbereich**
Diese Widerrufsbelehrung gilt für den Kauf unserer als Standardprodukt angebotenen Artikel (aktuell: das Modell „Echtholz Bett"). Für Sonderanfertigungen, die auf Ihre ausdrücklichen individuellen Vorgaben hin gefertigt werden, besteht gemäß § 312g Abs. 2 Nr. 1 BGB kein Widerrufsrecht; hierauf weisen wir Sie in diesem Fall vor Vertragsschluss gesondert hin.

**Widerrufsrecht**
Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.

Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.

Um Ihr Widerrufsrecht auszuüben, müssen Sie uns

Architekt & Meister
Lukas Westphalen
Buchenstraße 20, 01097 Dresden, Deutschland
E-Mail: architektundmeister@gmail.com
Telefon: +49 151 22807682

mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das untenstehende Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.

Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.

**Folgen des Widerrufs**
Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet. Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt ist.

Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden oder zu übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen absenden.

Sie tragen die unmittelbaren Kosten der Rücksendung der Waren. Da es sich um ein sperriges Möbelstück handelt, können diese Kosten erheblich sein; bitte nehmen Sie vor einer Rücksendung Kontakt mit uns auf, damit wir die Rücksendung gemeinsam mit Ihnen organisieren können.

Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang mit ihnen zurückzuführen ist.

**Freiwillige Stornomöglichkeit**
Unabhängig vom Widerrufsrecht räumen wir Ihnen zusätzlich die Möglichkeit ein, Ihre Bestellung bis zum Beginn der Fertigung jederzeit kostenfrei zu stornieren. Kontaktieren Sie uns hierfür unter architektundmeister@gmail.com.

**Muster-Widerrufsformular**
(Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus und senden Sie es zurück.)

An Architekt & Meister, Lukas Westphalen, Buchenstraße 20, 01097 Dresden, E-Mail: architektundmeister@gmail.com:

Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*):

Bestellt am (*)/erhalten am (*):

Name des/der Verbraucher(s):

Anschrift des/der Verbraucher(s):

Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):

Datum:

(*) Unzutreffendes streichen.`
  },
  shipping: {
    title: "Versand & Retouren",
    content: `
**Versand**
Wir liefern nach Deutschland, EU und in die Schweiz. Kosten werden im Checkout berechnet.

**Retouren**
Für unsere Standardprodukte (aktuell: das Modell „Echtholz Bett") steht Ihnen ein gesetzliches 14-tägiges Widerrufsrecht zu, siehe unsere Widerrufsbelehrung. Die unmittelbaren Kosten der Rücksendung tragen Sie als Kunde; da es sich um ein sperriges Möbelstück handelt, nehmen Sie hierfür bitte vorab Kontakt mit uns auf.

Für Sonderanfertigungen nach Ihren individuellen Vorgaben ist ein Widerrufsrecht gemäß § 312g Abs. 2 Nr. 1 BGB gesetzlich ausgeschlossen; hierauf weisen wir Sie in diesem Fall vor Vertragsschluss gesondert hin. Bei Mängeln oder Transportschäden gelten in jedem Fall die gesetzlichen Gewährleistungsrechte. Eine kostenfreie Stornierung ist bei allen Bestellungen bis zum Beginn der Fertigung möglich (siehe AGB §6).`
  }
};

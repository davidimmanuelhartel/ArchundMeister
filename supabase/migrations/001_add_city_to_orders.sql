-- Migration 001: Ort (city) als eigene Spalte in "orders"
-- Ausfuehren im Neon SQL Editor: https://console.neon.tech
--
-- WICHTIG: Diese Migration muss laufen, BEVOR die neue Version nach main
-- gemergt und von Vercel deployed wird. Sonst schlaegt das INSERT in
-- api/order.ts fehl und es gehen Bestellungen verloren.

ALTER TABLE orders ADD COLUMN IF NOT EXISTS city TEXT;

-- Hinweis zu Altbestellungen:
-- Vor diesem Fix schrieb das Checkout-Feld mit dem Platzhalter "ORT" seinen
-- Wert nach house_number. In allen Zeilen, die vor dieser Migration entstanden
-- sind, steht also der Ortsname in house_number und die echte Hausnummer fehlt
-- komplett. Das laesst sich nicht automatisch rekonstruieren, deshalb werden
-- Altdaten hier bewusst nicht angefasst.
--
-- Manuelle Bereinigung, Zeile fuer Zeile und nur nach Ruecksprache mit dem
-- Kunden (die Hausnummer muss neu erfragt werden):
--   UPDATE orders
--      SET city = house_number,
--          house_number = '<nachgefragte Hausnummer>'
--    WHERE reference = 'AM-2026-XXXXX';
--
-- Erst wenn jede Zeile einen Ort hat, kann die Spalte hart gesetzt werden
-- (dann entspricht die Tabelle wieder supabase/schema-neon.sql):
--   ALTER TABLE orders ALTER COLUMN city SET NOT NULL;

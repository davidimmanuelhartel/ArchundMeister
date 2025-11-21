-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reference TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  street TEXT NOT NULL,
  house_number TEXT NOT NULL,
  postcode TEXT NOT NULL,
  country TEXT NOT NULL,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_price NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on reference for faster lookups
CREATE INDEX IF NOT EXISTS idx_orders_reference ON orders(reference);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert orders (for public form submissions)
CREATE POLICY "Allow public insert" ON orders
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow service role to read all orders (for admin/backend)
CREATE POLICY "Allow service role read" ON orders
  FOR SELECT
  TO service_role
  USING (true);

-- Policy: Allow service role to update orders
CREATE POLICY "Allow service role update" ON orders
  FOR UPDATE
  TO service_role
  USING (true);


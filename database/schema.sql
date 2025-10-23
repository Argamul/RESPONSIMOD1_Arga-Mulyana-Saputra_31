
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS shoe_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  shoe_type TEXT NOT NULL,
  status TEXT DEFAULT 'Menunggu' CHECK (status IN ('Menunggu', 'Dalam Pengerjaan', 'Selesai')),
  received_date DATE DEFAULT CURRENT_DATE,
  completed_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_shoe_items_status ON shoe_items(status);
CREATE INDEX IF NOT EXISTS idx_shoe_items_received_date ON shoe_items(received_date);
CREATE INDEX IF NOT EXISTS idx_shoe_items_customer_name ON shoe_items(customer_name);


CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_shoe_items_updated_at 
    BEFORE UPDATE ON shoe_items 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

INSERT INTO shoe_items (customer_name, shoe_type, status, received_date) VALUES
('Arga Moel', 'Nike Air Max', 'Menunggu', '2024-01-15'),
('Mulyono', 'Adidas Stan Smith', 'Dalam Pengerjaan', '2024-01-14'),
('Cielo Wijaya', 'Converse Chuck Taylor', 'Selesai', '2024-01-13'),
('Rhea Khaer', 'Vans Old Skool', 'Menunggu', '2024-01-16'),
('keisha Rosevv', 'Puma Suede', 'Selesai', '2024-01-12');

-- Grant necessary permissions (adjust as needed for your setup)
-- GRANT ALL ON shoe_items TO authenticated;
-- GRANT ALL ON shoe_items TO anon;


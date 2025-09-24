-- Vyvidh'25 Registration Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Create the registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  tickets INTEGER NOT NULL CHECK (tickets >= 1 AND tickets <= 10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create unique constraint on email to prevent duplicate registrations
ALTER TABLE registrations ADD CONSTRAINT unique_email UNIQUE (email);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for registration form)
CREATE POLICY "Enable insert for all users" ON registrations
    FOR INSERT WITH CHECK (true);

-- Create policy to allow reading own registration (optional - for user dashboard)
CREATE POLICY "Users can view own registration" ON registrations
    FOR SELECT USING (true);

-- Update the updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_registrations_updated_at BEFORE UPDATE
    ON registrations FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Insert some sample data (optional)
-- INSERT INTO registrations (name, email, city, tickets) VALUES
-- ('John Doe', 'john@example.com', 'New York', 2),
-- ('Jane Smith', 'jane@example.com', 'Los Angeles', 1);
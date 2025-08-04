-- Disable RLS Completely for Development
-- Run this in Supabase SQL Editor to fix all recursion issues

-- ===========================================
-- 1. DISABLE RLS ON ALL TABLES
-- ===========================================

-- Disable RLS on all tables to avoid any recursion issues
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE transport_types DISABLE ROW LEVEL SECURITY;
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events DISABLE ROW LEVEL SECURITY;

-- ===========================================
-- 2. DROP ALL EXISTING POLICIES
-- ===========================================

-- Drop all policies from all tables
DROP POLICY IF EXISTS "profiles_all_auth" ON profiles;
DROP POLICY IF EXISTS "profiles_select_policy" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_policy" ON profiles;
DROP POLICY IF EXISTS "profiles_update_policy" ON profiles;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON profiles;
DROP POLICY IF EXISTS "Enable update for users based on id" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

DROP POLICY IF EXISTS "transport_types_read_all" ON transport_types;
DROP POLICY IF EXISTS "Enable read access for all users" ON transport_types;
DROP POLICY IF EXISTS "Users can view transport types" ON transport_types;

DROP POLICY IF EXISTS "bookings_simple_auth" ON bookings;
DROP POLICY IF EXISTS "bookings_all_auth" ON bookings;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON bookings;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON bookings;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON bookings;
DROP POLICY IF EXISTS "Users can view own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can create bookings" ON bookings;
DROP POLICY IF EXISTS "Users can update own bookings" ON bookings;

DROP POLICY IF EXISTS "payments_auth" ON payments;
DROP POLICY IF EXISTS "analytics_auth" ON analytics_events;

-- ===========================================
-- 3. VERIFICATION
-- ===========================================

-- Check that RLS is disabled on all tables
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('profiles', 'transport_types', 'bookings', 'payments', 'analytics_events')
ORDER BY tablename;

-- Test basic queries (run these separately)
SELECT 'profiles' as table_name, COUNT(*) as count FROM profiles LIMIT 1;

SELECT 'transport_types' as table_name, COUNT(*) as count FROM transport_types LIMIT 1;

SELECT 'bookings' as table_name, COUNT(*) as count FROM bookings LIMIT 1;

SELECT 'payments' as table_name, COUNT(*) as count FROM payments LIMIT 1;

SELECT 'analytics_events' as table_name, COUNT(*) as count FROM analytics_events LIMIT 1;

-- Test bookings query specifically
SELECT 
  b.id,
  b.user_id,
  b.pickup_location,
  b.dropoff_location,
  b.estimated_price,
  b.status,
  b.created_at
FROM bookings b
WHERE b.user_id = 'cb090bfc-ecbc-49a5-8f56-29c04c8d9bd2'
LIMIT 5; 
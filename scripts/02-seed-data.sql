-- Insert transport types
INSERT INTO transport_types (name, description, base_price, price_per_km, icon) VALUES
('Car', 'Private car ride', 5.00, 2.50, 'car'),
('Bus', 'Shared bus service', 2.00, 0.80, 'bus'),
('Shared Ride', 'Carpooling service', 3.00, 1.50, 'users'),
('Delivery', 'Package delivery service', 4.00, 2.00, 'package'),
('Premium', 'Luxury vehicle service', 10.00, 4.00, 'crown'),
('Bike', 'Motorcycle ride', 3.00, 1.80, 'bike');

-- Insert sample admin user (you'll need to create this user in Supabase Auth first)
-- INSERT INTO profiles (id, email, full_name, role, wallet_balance) VALUES
-- ('your-admin-user-id', 'admin@transport.com', 'Admin User', 'admin', 1000.00);

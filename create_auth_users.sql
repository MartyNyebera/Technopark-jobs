-- This must be run in Supabase SQL Editor
-- Create auth users directly in auth.users table

-- Admin user
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role)
VALUES (
  gen_random_uuid(),
  'admin@limatechpark.com',
  crypt('Admin@2025', gen_salt('bf')),
  now(), now(), now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Park Administrator"}',
  false, 'authenticated'
);

-- Company users
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role)
VALUES (
  gen_random_uuid(),
  'hr@novatech.ph',
  crypt('Company@2025', gen_salt('bf')),
  now(), now(), now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"NovaTech HR Manager","company_id":1}',
  false, 'authenticated'
);

INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role)
VALUES (
  gen_random_uuid(),
  'careers@voyager.ph',
  crypt('Company@2025', gen_salt('bf')),
  now(), now(), now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Voyager HR Lead","company_id":2}',
  false, 'authenticated'
);

INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role)
VALUES (
  gen_random_uuid(),
  'talent.cebu@accenture.com',
  crypt('Company@2025', gen_salt('bf')),
  now(), now(), now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Accenture Talent Manager","company_id":3}',
  false, 'authenticated'
);

INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role)
VALUES (
  gen_random_uuid(),
  'jobs@pixelforge.io',
  crypt('Company@2025', gen_salt('bf')),
  now(), now(), now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"PixelForge Recruiter","company_id":4}',
  false, 'authenticated'
);

INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role)
VALUES (
  gen_random_uuid(),
  'careers@shieldnet.ph',
  crypt('Company@2025', gen_salt('bf')),
  now(), now(), now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"ShieldNet HR","company_id":5}',
  false, 'authenticated'
);

INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role)
VALUES (
  gen_random_uuid(),
  'careers@carthub.ph',
  crypt('Company@2025', gen_salt('bf')),
  now(), now(), now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"CartHub Talent Lead","company_id":6}',
  false, 'authenticated'
);

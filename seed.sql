-- Lima TechPark Jobs Seed Data
-- Insert dummy data from HTML files into the database

-- Insert companies (from ADMIN_PORTAL.html)
INSERT INTO companies (id, name, industry, description, tags, color, logo_initials, email, phone, location, joined_since, is_active, created_at) VALUES
(1, 'NovaTech Solutions', 'Software Development', 'Enterprise software firm building high-performance web products for clients across APAC.', ARRAY['React', 'Node.js', 'Cloud'], '#6366f1', 'NT', 'hr@novatech.ph', '+63 32 234 5678', 'Tower 3, Floor 8', '2022-01-15', true, NOW()),
(2, 'Voyager Innovations', 'Fintech', 'Philippine fintech pioneer powering inclusive digital payment infrastructure.', ARRAY['Python', 'ML', 'Payments'], '#06b6d4', 'VI', 'careers@voyager.ph', '+63 32 400 8800', 'Tower 1, Floor 5', '2022-03-10', true, NOW()),
(3, 'Accenture Cebu', 'BPO / Customer Support', 'Global professional services giant with a major operations hub inside the park.', ARRAY['CX', 'Tech Support', 'Sales'], '#a855f7', 'AC', 'talent.cebu@accenture.com', '+63 32 411 8888', 'Tower 1, Fl. 10-14', '2020-06-01', true, NOW()),
(4, 'PixelForge Games', 'Game Development', 'Indie game studio creating immersive mobile and PC gaming experiences.', ARRAY['Unity', 'C#', '3D Art'], '#f59e0b', 'PF', 'jobs@pixelforge.io', '+63 32 555 1234', 'Tower 2, Floor 3', '2021-11-20', true, NOW()),
(5, 'ShieldNet Security', 'Cybersecurity', 'Cybersecurity consultancy providing enterprise security solutions and compliance.', ARRAY['Security', 'Compliance', 'Risk'], '#ef4444', 'SS', 'careers@shieldnet.ph', '+63 32 777 4321', 'Tower 3, Floor 6', '2021-08-05', true, NOW()),
(6, 'CartHub PH', 'E-commerce', 'Fast-growing platform enabling thousands of Philippine SMEs to sell online.', ARRAY['E-commerce', 'Logistics', 'API'], '#10b981', 'CH', 'careers@carthub.ph', '+63 32 500 1234', 'Tower 2, Floor 5', '2022-02-14', true, NOW()),
(7, 'NHK Philippines', 'BPO / Customer Support', 'Japanese BPO operations that have since ceased operations in the park.', ARRAY['Japanese', 'CX', 'Operations'], '#64748b', 'NH', NULL, NULL, 'Tower 3, Floor 2', '2019-08-12', false, NOW());

-- Insert admin users
INSERT INTO admin_users (id, email, password_hash, full_name, created_at) VALUES
(1, 'admin@limatechpark.com', 'hashed_password_placeholder', 'Park Administrator', NOW());

-- Insert company users (sample users for each company)
INSERT INTO company_users (id, company_id, email, password_hash, full_name, created_at) VALUES
(1, 1, 'hr@novatech.ph', 'hashed_password_placeholder', 'NovaTech HR Manager', NOW()),
(2, 2, 'careers@voyager.ph', 'hashed_password_placeholder', 'Voyager HR Lead', NOW()),
(3, 3, 'talent.cebu@accenture.com', 'hashed_password_placeholder', 'Accenture Talent Manager', NOW()),
(4, 4, 'jobs@pixelforge.io', 'hashed_password_placeholder', 'PixelForge Recruiter', NOW()),
(5, 5, 'careers@shieldnet.ph', 'hashed_password_placeholder', 'ShieldNet HR', NOW()),
(6, 6, 'careers@carthub.ph', 'hashed_password_placeholder', 'CartHub Talent Lead', NOW());

-- Insert applicants
INSERT INTO applicants (id, email, password_hash, first_name, last_name, phone, photo_url, created_at) VALUES
(1, 'maria.santos@gmail.com', 'hashed_password_placeholder', 'Maria', 'Santos', '+63 917 123 4567', NULL, NOW()),
(2, 'carlo.reyes@email.com', 'hashed_password_placeholder', 'Carlo', 'Reyes', '+63 918 234 5678', NULL, NOW()),
(3, 'anna.lim@outlook.com', 'hashed_password_placeholder', 'Anna', 'Lim', '+63 919 345 6789', NULL, NOW()),
(4, 'john.cruz@gmail.com', 'hashed_password_placeholder', 'John', 'Cruz', '+63 916 456 7890', NULL, NOW()),
(5, 'sarah.gomez@outlook.com', 'hashed_password_placeholder', 'Sarah', 'Gomez', '+63 915 567 8901', NULL, NOW()),
(6, 'mike.domingo@email.com', 'hashed_password_placeholder', 'Mike', 'Domingo', '+63 925 901 2345', NULL, NOW()),
(7, 'kaye.domingo@gmail.com', 'hashed_password_placeholder', 'Kaye', 'Domingo', '+63 925 901 2345', NULL, NOW()),
(8, 'david.lee@gmail.com', 'hashed_password_placeholder', 'David', 'Lee', '+63 926 012 3456', NULL, NOW()),
(9, 'liza.wong@outlook.com', 'hashed_password_placeholder', 'Liza', 'Wong', '+63 927 123 4567', NULL, NOW()),
(10, 'james.tan@gmail.com', 'hashed_password_placeholder', 'James', 'Tan', '+63 928 234 5678', NULL, NOW());

-- Insert jobs (from ADMIN_PORTAL.html)
INSERT INTO jobs (id, company_id, title, department, type, salary, description, requirements, status, posted_at, created_at) VALUES
(1, 1, 'Frontend Developer', 'Engineering', 'Full-time', '₱45K–₱75K/mo', 'Build beautiful, performant interfaces for enterprise clients across APAC.', ARRAY['3+ years React or Vue.js', 'Strong HTML/CSS', 'REST APIs', 'Git & CI/CD', 'Good English communication'], 'active', '2025-03-01', NOW()),
(2, 1, 'Backend Engineer', 'Engineering', 'Full-time', '₱50K–₱80K/mo', 'Design and maintain scalable backend services and APIs for high-traffic applications.', ARRAY['Node.js or Python', 'Database design', 'Cloud services', 'API development', 'System architecture'], 'active', '2025-02-28', NOW()),
(3, 1, 'QA Engineer Intern', 'Engineering', 'Internship', '₱15K–₱20K/mo', 'Learn and apply testing methodologies while working with our development team.', ARRAY['Computer Science student', 'Attention to detail', 'Basic programming knowledge', 'Willingness to learn', 'Good communication'], 'active', '2025-03-05', NOW()),
(4, 1, 'DevOps Engineer', 'Engineering', 'Full-time', '₱60K–₱90K/mo', 'Build and maintain CI/CD pipelines, manage cloud infrastructure, and ensure system reliability.', ARRAY['Docker/Kubernetes', 'AWS/Azure/GCP', 'CI/CD tools', 'Linux/Unix', 'Scripting skills'], 'active', '2025-02-25', NOW()),
(5, 2, 'Data Engineer', 'Engineering', 'Full-time', '₱60K–₱90K/mo', 'Architect and maintain the data pipelines powering our fintech analytics platform.', ARRAY['Python', 'Spark', 'Cloud platforms', 'Strong SQL & data modeling', 'Financial data background a plus'], 'active', '2025-02-28', NOW()),
(6, 2, 'Product Manager', 'Product', 'Full-time', '₱70K–₱100K/mo', 'Drive product strategy and execution for our digital payment solutions.', ARRAY['5+ years product management', 'Fintech experience', 'Strong analytical skills', 'Cross-functional leadership', 'User research'], 'active', '2025-02-20', NOW()),
(7, 3, 'Customer Service Rep', 'Operations', 'Full-time', '₱18K–₱22K/mo', 'Provide exceptional customer support for global clients in a fast-paced BPO environment.', ARRAY['Excellent English', 'Customer service experience', 'Problem-solving skills', 'Computer literacy', 'Flexible schedule'], 'active', '2025-03-01', NOW()),
(8, 3, 'Technical Support Specialist', 'Operations', 'Full-time', '₱25K–₱35K/mo', 'Handle complex technical issues for enterprise software clients.', ARRAY['IT support experience', 'Network knowledge', 'Troubleshooting skills', 'Customer service', 'Technical certifications'], 'active', '2025-02-15', NOW()),
(9, 4, 'Unity Game Developer', 'Development', 'Full-time', '₱40K–₱65K/mo', 'Create engaging gameplay mechanics and systems for mobile and PC games.', ARRAY['Unity 3D', 'C# programming', 'Game design principles', 'Physics and animations', 'Mobile development'], 'active', '2025-02-26', NOW()),
(10, 4, '3D Artist', 'Art', 'Full-time', '₱35K–₱55K/mo', 'Design and create 3D models, textures, and animations for game assets.', ARRAY['3D modeling software', 'Texturing skills', 'Animation knowledge', 'Art portfolio', 'Game development understanding'], 'active', '2025-02-22', NOW()),
(11, 5, 'Security Analyst', 'Security', 'Full-time', '₱45K–₱70K/mo', 'Monitor and respond to security incidents, conduct vulnerability assessments.', ARRAY['Security certifications', 'Incident response', 'Risk assessment', 'Compliance knowledge', 'Technical security skills'], 'active', '2025-02-18', NOW()),
(12, 6, 'Full Stack Developer', 'Engineering', 'Full-time', '₱40K–₱65K/mo', 'Build and maintain e-commerce platforms and logistics systems.', ARRAY['Web development', 'Database management', 'API integration', 'E-commerce knowledge', 'Problem-solving'], 'active', '2025-02-24', NOW());

-- Insert events (from ADMIN_PORTAL.html)
INSERT INTO events (id, date, type, title, organizer, details, is_upcoming, created_at) VALUES
(1, '2025-03-18', 'Job Fair', 'Lima TechPark Career Day', 'Lima Techno Park Admin', ARRAY['9:00 AM', 'Event Hall A', '48 Companies'], true, NOW()),
(2, '2025-03-25', 'Workshop', 'Resume Writing & Interview Skills', 'Career Services', ARRAY['2:00 PM', 'Training Room B', 'Limited seats'], true, NOW()),
(3, '2025-04-02', 'Seminar', 'Tech Trends 2025', 'Industry Partners', ARRAY['10:00 AM', 'Main Auditorium', 'Open to all'], true, NOW()),
(4, '2025-04-15', 'Networking', 'Tech Professionals Meetup', 'Community', ARRAY['6:00 PM', 'Rooftop Lounge', 'Casual atmosphere'], true, NOW()),
(5, '2025-04-20', 'Competition', 'Hackathon Weekend', 'Innovation Lab', ARRAY['48 hours', 'Prizes worth ₱50K', 'Teams of 3-5'], true, NOW()),
(6, '2025-05-01', 'Training', 'Cloud Certification Prep', 'Training Partners', ARRAY['9:00 AM', 'Lab Room 3', '3-day intensive'], true, NOW());

-- Insert activity log (from ADMIN_PORTAL.html)
INSERT INTO activity_log (id, type, icon, message, sub_text, created_at) VALUES
(1, 'company', '🏢', 'NovaTech Solutions registered as a new tenant', 'Admin · System', '2025-03-01 08:00:00'),
(2, 'job', '📋', 'NovaTech posted Frontend Developer position', 'Job Posting · NovaTech Solutions', '2025-03-01 09:30:00'),
(3, 'application', '📄', 'Maria Santos applied to Frontend Developer', 'Application · NovaTech Solutions', '2025-03-01 10:15:00'),
(4, 'company', '🏢', 'Voyager Innovations expanded operations', 'Admin · System', '2025-03-02 14:20:00'),
(5, 'job', '📋', 'Voyager posted Data Engineer position', 'Job Posting · Voyager Innovations', '2025-03-02 15:45:00'),
(6, 'application', '📄', 'Carlo Reyes applied to Data Engineer', 'Application · Voyager Innovations', '2025-03-02 16:30:00'),
(7, 'event', '📅', 'Career Day event scheduled', 'Events · Admin', '2025-03-03 11:00:00'),
(8, 'company', '🏢', 'Accenture Cebu renewed lease agreement', 'Admin · System', '2025-03-04 09:00:00'),
(9, 'job', '📋', 'Accenture posted Customer Service Rep', 'Job Posting · Accenture Cebu', '2025-03-04 10:30:00'),
(10, 'application', '📄', 'Anna Lim applied to Customer Service Rep', 'Application · Accenture Cebu', '2025-03-04 11:15:00'),
(11, 'warning', '⚠️', 'Unusual login activity detected', 'Security · System', '2025-03-05 03:45:00'),
(12, 'company', '🏢', 'PixelForge Games expanded operations', 'Admin · System', '2025-03-10 15:20:00');

-- Reset sequences for proper auto-increment
SELECT pg_catalog.setval(pg_get_serial_sequence('companies', 'id'), MAX(id), true) FROM companies;
SELECT pg_catalog.setval(pg_get_serial_sequence('admin_users', 'id'), MAX(id), true) FROM admin_users;
SELECT pg_catalog.setval(pg_get_serial_sequence('company_users', 'id'), MAX(id), true) FROM company_users;
SELECT pg_catalog.setval(pg_get_serial_sequence('applicants', 'id'), MAX(id), true) FROM applicants;
SELECT pg_catalog.setval(pg_get_serial_sequence('jobs', 'id'), MAX(id), true) FROM jobs;
SELECT pg_catalog.setval(pg_get_serial_sequence('applications', 'id'), MAX(id), true) FROM applications;
SELECT pg_catalog.setval(pg_get_serial_sequence('events', 'id'), MAX(id), true) FROM events;
SELECT pg_catalog.setval(pg_get_serial_sequence('activity_log', 'id'), MAX(id), true) FROM activity_log;

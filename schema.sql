-- Lima TechPark Jobs Database Schema
-- Create all tables for the job portal system

-- Drop all existing tables first
DROP TABLE IF EXISTS activity_log CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS applicants CASCADE;
DROP TABLE IF EXISTS company_users CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS companies CASCADE;

-- Companies table - stores company information
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    industry VARCHAR(255),
    description TEXT,
    tags TEXT[], -- Array of tags
    color VARCHAR(7), -- Hex color code
    logo_initials VARCHAR(5),
    email VARCHAR(255),
    phone VARCHAR(50),
    location VARCHAR(255),
    joined_since DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin users table - stores admin account information
CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Company users table - stores company account information
CREATE TABLE company_users (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Applicants table - stores job applicant information
CREATE TABLE applicants (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone VARCHAR(50),
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Jobs table - stores job postings
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    type VARCHAR(50), -- Full-time, Part-time, Internship, Contract
    salary VARCHAR(100),
    description TEXT,
    requirements TEXT[], -- Array of requirements
    status VARCHAR(20) DEFAULT 'active', -- active, paused, closed
    posted_at DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Applications table - stores job applications
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
    applicant_id INTEGER REFERENCES applicants(id) ON DELETE CASCADE,
    cover_letter TEXT,
    resume_url TEXT,
    portfolio_url TEXT,
    photo_url TEXT,
    status VARCHAR(20) DEFAULT 'pending', -- pending, reviewed, accepted, declined
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table - stores park events
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    date DATE,
    time TIME,
    location VARCHAR(255),
    organizer VARCHAR(255),
    details TEXT[], -- Array of event details
    is_upcoming BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity log table - stores system activity
CREATE TABLE activity_log (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50), -- company, job, app, warning, event
    icon VARCHAR(10), -- Emoji icon
    message TEXT NOT NULL,
    sub_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_companies_is_active ON companies(is_active);
CREATE INDEX idx_jobs_company_id ON jobs(company_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_applications_job_id ON applications(job_id);
CREATE INDEX idx_applications_applicant_id ON applications(applicant_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_company_users_company_id ON company_users(company_id);
CREATE INDEX idx_events_is_upcoming ON events(is_upcoming);
CREATE INDEX idx_activity_log_type ON activity_log(type);

-- Explicitly disable RLS on every table (as per SonarLint recommendation)
ALTER TABLE companies DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE company_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE applicants DISABLE ROW LEVEL SECURITY;
ALTER TABLE jobs DISABLE ROW LEVEL SECURITY;
ALTER TABLE applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE events DISABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log DISABLE ROW LEVEL SECURITY;

-- Create updated_at trigger function (optional, for auto-updating timestamps)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.created_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

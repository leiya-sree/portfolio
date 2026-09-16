/*
# Portfolio — projects + contact_messages tables

1. Overview
   Creates the data layer for Leiya Sree M's full-stack developer portfolio.
   - `projects` stores portfolio project entries (read publicly by all visitors).
   - `contact_messages` stores submissions from the site contact form.
   This is a single-tenant, no-auth public site, so reads and the public contact
   insert are allowed for the anon role used by the frontend Supabase client.

2. New Tables
   - `projects`
     - `id`            uuid, primary key
     - `title`         text, unique, not null — project name
     - `description`   text, not null — project summary
     - `tech_stack`    text[], default '{}' — list of technologies
     - `features`      text[], default '{}' — notable features
     - `github_url`    text — link to source code
     - `demo_url`      text — link to live demo
     - `image`         text — illustration / cover image URL
     - `featured`      boolean, default false — marks the hero project card
     - `sort_order`    int, default 0 — display ordering
     - `created_at`    timestamptz, default now()
   - `contact_messages`
     - `id`          uuid, primary key
     - `name`        text, not null — sender name
     - `email`       text, not null — sender email
     - `subject`     text, not null — message subject
     - `message`     text, not null — message body
     - `created_at`  timestamptz, default now()

3. Security (RLS)
   - Both tables enable Row Level Security.
   - `projects`: public read (anon + authenticated SELECT), no public writes.
   - `contact_messages`: public INSERT (anon + authenticated) so the site contact
     form works without login; no public SELECT/UPDATE/DELETE to protect message privacy.

4. Seed Data
   - Inserts the two portfolio projects (Road Quality Monitoring, College Placement Portal).

5. Notes
   - Idempotent: uses IF NOT EXISTS and DROP POLICY IF EXISTS so re-running is safe.
   - A UNIQUE constraint on projects.title enables ON CONFLICT for seed idempotency.
   - No user_id / auth coupling — this is a public portfolio, not a multi-user app.
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text UNIQUE NOT NULL,
  description text NOT NULL,
  tech_stack text[] NOT NULL DEFAULT '{}',
  features text[] NOT NULL DEFAULT '{}',
  github_url text,
  demo_url text,
  image text,
  featured boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- projects: public read only
DROP POLICY IF EXISTS "public_select_projects" ON projects;
CREATE POLICY "public_select_projects"
ON projects FOR SELECT
TO anon, authenticated USING (true);

-- contact_messages: public insert only (form submissions), no public reads
DROP POLICY IF EXISTS "public_insert_contact_messages" ON contact_messages;
CREATE POLICY "public_insert_contact_messages"
ON contact_messages FOR INSERT
TO anon, authenticated WITH CHECK (true);

-- Seed the two portfolio projects (idempotent via ON CONFLICT on unique title)
INSERT INTO projects (title, description, tech_stack, features, github_url, demo_url, featured, sort_order)
VALUES
  (
    'AI-Based Road Quality Monitoring System',
    'AI-powered road quality monitoring platform using the YOLOv8 object detection model to identify potholes and road defects from uploaded images. Integrated GPS-based location tracking and built a dashboard for visualization and reporting.',
    ARRAY['React', 'Tailwind CSS', 'Python', 'FastAPI', 'MySQL', 'YOLOv8'],
    ARRAY['Image Upload', 'Object Detection', 'Confidence Score', 'Dashboard', 'GPS Mapping', 'Detection Reports'],
    'https://github.com/leiya-sree/road-quality-monitoring',
    'https://road-quality-monitoring.demo.app',
    true,
    0
  ),
  (
    'AI-Powered College Placement Portal',
    'AI-driven placement portal with resume screening, job-role matching, resume feedback and personalized upskilling recommendations.',
    ARRAY['React', 'FastAPI', 'MongoDB', 'REST API'],
    ARRAY['Resume Screening', 'Job-Role Matching', 'Resume Feedback', 'Upskilling Recommendations'],
    'https://github.com/leiya-sree/college-placement-portal',
    'https://college-placement-portal.demo.app',
    false,
    1
  )
ON CONFLICT (title) DO NOTHING;

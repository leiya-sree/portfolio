-- Leiya Sree M — Portfolio MySQL schema
-- Run this once to create the database + tables for the FastAPI backend.

CREATE DATABASE IF NOT EXISTS portfolio
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE portfolio;

CREATE TABLE IF NOT EXISTS projects (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(255) NOT NULL UNIQUE,
  description LONGTEXT     NOT NULL,
  tech_stack  LONGTEXT     NULL,                          -- comma-separated tech
  github_url  VARCHAR(512) NULL,
  demo_url    VARCHAR(512) NULL,
  image       VARCHAR(512) NULL,
  featured    TINYINT(1)   NOT NULL DEFAULT 0,
  sort_order  INT          NOT NULL DEFAULT 0,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_projects_sort (sort_order),
  INDEX idx_projects_title (title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contact_messages (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(120) NOT NULL,
  email       VARCHAR(160) NOT NULL,
  subject     VARCHAR(200) NOT NULL,
  message     LONGTEXT     NOT NULL,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_contact_email (email),
  INDEX idx_contact_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed the two portfolio projects
INSERT INTO projects (title, description, tech_stack, github_url, demo_url, image, featured, sort_order)
VALUES
  (
    'AI-Based Road Quality Monitoring System',
    'AI-powered road quality monitoring platform using the YOLOv8 object detection model to identify potholes and road defects from uploaded images. Integrated GPS-based location tracking and built a dashboard for visualization and reporting.',
    'React,Tailwind CSS,Python,FastAPI,MySQL,YOLOv8',
    'https://github.com/leiya-sree/road-quality-monitoring',
    'https://road-quality-monitoring.demo.app',
    'https://images.pexels.com/photos/2599538/pexels-photo-2599538.jpeg?auto=compress&cs=tinysrgb&w=1200',
    1,
    0
  ),
  (
    'AI-Powered College Placement Portal',
    'AI-driven placement portal with resume screening, job-role matching, resume feedback and personalized upskilling recommendations.',
    'React,FastAPI,MongoDB,REST API',
    'https://github.com/leiya-sree/college-placement-portal',
    'https://college-placement-portal.demo.app',
    'https://images.pexels.com/photos/590573/pexels-photo-590573.jpeg?auto=compress&cs=tinysrgb&w=1200',
    0,
    1
  )
ON DUPLICATE KEY UPDATE title = title;

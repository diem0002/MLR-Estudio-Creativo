-- Add security question and answer fields to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS security_question TEXT,
ADD COLUMN IF NOT EXISTS security_answer TEXT;

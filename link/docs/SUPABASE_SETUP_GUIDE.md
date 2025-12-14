# Supabase Setup Guide

This guide will walk you through setting up Supabase for your application.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Fill in:
   - **Project Name**: Choose a name (e.g., "file-linket")
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
5. Click "Create new project"
6. Wait for the project to be set up (takes 1-2 minutes)

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** (gear icon in sidebar)
2. Click on **API** in the settings menu
3. You'll see:
   - **Project URL**: Copy this (looks like `https://xxxxx.supabase.co`)
   - **anon/public key**: Copy this (long string starting with `eyJ...`)

## Step 3: Update config.js

1. Open `config.js` in your project
2. Replace the placeholder values:

```javascript
const SUPABASE_URL = "https://your-project-id.supabase.co";
const SUPABASE_ANON_KEY = "your-anon-key-here";
```

3. Save the file

## Step 4: Create the Database Table

1. In Supabase dashboard, go to **SQL Editor** (in the sidebar)
2. Click "New query"
3. Copy and paste this SQL:

```sql
-- Create requests table
CREATE TABLE requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;

-- Policy: Users can insert their own requests
CREATE POLICY "Users can insert their own requests"
  ON requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can view their own requests
CREATE POLICY "Users can view their own requests"
  ON requests FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can update their own requests
CREATE POLICY "Users can update their own requests"
  ON requests FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own requests (optional)
CREATE POLICY "Users can delete their own requests"
  ON requests FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_requests_updated_at
  BEFORE UPDATE ON requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

4. Click "Run" (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

## Step 5: Configure Authentication

1. In Supabase dashboard, go to **Authentication** (in the sidebar)
2. Click on **Providers**
3. Make sure **Email** is enabled (it should be by default)
4. (Optional) Configure **Google** OAuth if you want Google sign-in:
   - Enable Google provider
   - Add your Google OAuth credentials
   - Add redirect URL: `http://localhost:5500` (or your domain)

## Step 6: Test Your Setup

1. Open `form page.html` in your browser
2. Try to sign up with a new email
3. Check your email for the verification link (if email confirmation is enabled)
4. Try logging in
5. Create a test request
6. Check if it appears in your requests list

## Troubleshooting

### "Invalid API key" error

- Double-check your `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `config.js`
- Make sure there are no extra spaces or quotes

### "relation 'requests' does not exist"

- Make sure you ran the SQL to create the table
- Check the SQL Editor for any errors

### "new row violates row-level security policy"

- Make sure you created the RLS policies
- Check that the user is authenticated before creating requests

### Can't sign up/login

- Check Authentication > Settings in Supabase dashboard
- Make sure email provider is enabled
- Check if email confirmation is required (you may need to disable it for testing)

### Requests not showing

- Make sure you're logged in
- Check browser console for errors
- Verify the table was created correctly in Supabase dashboard

## Next Steps

Once everything is working:

1. Customize the request form fields if needed
2. Add more categories
3. Set up email notifications (optional)
4. Deploy your application
5. Update redirect URLs for production

## Security Notes

- Never commit your Supabase keys to public repositories
- The `anon` key is safe to use in client-side code (it's public)
- Row Level Security (RLS) ensures users can only access their own data
- For production, consider using environment variables

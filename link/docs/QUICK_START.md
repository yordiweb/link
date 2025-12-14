# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Supabase Setup (2 minutes)

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Go to **Settings** → **API**
4. Copy your **Project URL** and **anon key**
5. Update `config.js` (✅ Already done if you see credentials there!)

### Step 2: Database Setup (2 minutes)

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New query**
3. Copy and paste this SQL:

```sql
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

ALTER TABLE requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own requests"
  ON requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own requests"
  ON requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own requests"
  ON requests FOR UPDATE
  USING (auth.uid() = user_id);
```

4. Click **Run** (or press Ctrl+Enter)

### Step 3: Test It! (1 minute)

1. Open `pages/form page.html` in your browser
2. Click "Sign up for free"
3. Create an account
4. Log in
5. Click "Post Service" or navigate to create a request
6. Fill out the form and submit
7. View your requests!

## ✅ That's It!

Your application is now fully functional. You can:

- ✅ Sign up and log in
- ✅ Create service requests
- ✅ View all your requests
- ✅ See request details

## 📁 File Overview

| File                        | Purpose                |
| --------------------------- | ---------------------- |
| `pages/form page.html`      | Login page             |
| `pages/signup.html`         | Sign up page           |
| `pages/front page.html`     | Home/Categories page   |
| `pages/create-request.html` | Create new request     |
| `pages/requests-list.html`  | View all requests      |
| `pages/request-detail.html` | View single request    |
| `js/config.js`              | Supabase configuration |
| `js/auth.js`                | Authentication helpers |

## 🐛 Troubleshooting

**"Invalid API key" error?**

- Check `js/config.js` has correct credentials
- Make sure no extra spaces

**"relation 'requests' does not exist"?**

- Run the SQL in Step 2 above

**Can't sign up?**

- Go to Supabase → Authentication → Settings
- Make sure Email provider is enabled
- Disable "Confirm email" for testing (optional)

**Requests not showing?**

- Make sure you're logged in
- Check browser console for errors
- Verify RLS policies were created

## 📚 More Help

- **Full Setup Guide**: See `docs/SUPABASE_SETUP_GUIDE.md`
- **Implementation Details**: See `docs/IMPLEMENTATION_SUMMARY.md`
- **Project Overview**: See `README.md`

## 🎯 Next Steps

1. Customize categories if needed
2. Add more form fields
3. Style to match your brand
4. Deploy to production

Happy coding! 🚀

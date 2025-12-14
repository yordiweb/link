# Supabase Integration Plan

## Current State Analysis

### Existing Files:

1. **index.html** - Company card display (static)
2. **signup.html** - Login page (no functionality, needs to be converted to signup)
3. **form page.html** - Login page (duplicate, needs functionality)
4. **front page.html** - Category selection page
5. **comany 1.html** - Company detail page

## What's Missing for Supabase Integration

### 1. **Supabase Setup**

- ❌ Supabase CDN library not included
- ❌ Supabase configuration (URL and anon key)
- ❌ Supabase client initialization

### 2. **Authentication Pages**

- ❌ Login page with Supabase auth integration
- ❌ Signup page (signup.html is currently a login page)
- ❌ Session management (check if user is logged in)
- ❌ Logout functionality
- ❌ Protected routes (redirect if not logged in)

### 3. **Form for Creating Requests**

- ❌ Request creation form page
- ❌ Form submission handler
- ❌ Form validation
- ❌ Success/error feedback

### 4. **Requests Display**

- ❌ Requests list page
- ❌ Request detail page
- ❌ Fetch requests from Supabase
- ❌ Display requests with proper styling

### 5. **Database Structure (to be created in Supabase)**

- ❌ `requests` table with fields:
  - id (uuid, primary key)
  - user_id (uuid, foreign key to auth.users)
  - title (text)
  - description (text)
  - category (text)
  - status (text, default: 'pending')
  - created_at (timestamp)
  - updated_at (timestamp)

### 6. **Navigation & Routing**

- ❌ Links between pages
- ❌ Navigation after login/signup
- ❌ Protected page access

### 7. **Error Handling**

- ❌ Error messages for auth failures
- ❌ Loading states
- ❌ Success notifications

## Implementation Checklist

### Phase 1: Supabase Setup

- [ ] Add Supabase CDN to all pages
- [ ] Create config.js with Supabase credentials
- [ ] Initialize Supabase client

### Phase 2: Authentication

- [ ] Fix login page (form page.html) with Supabase auth
- [ ] Create proper signup page
- [ ] Add session check utility
- [ ] Add logout functionality
- [ ] Add protected route wrapper

### Phase 3: Request Management

- [ ] Create request form page
- [ ] Implement form submission to Supabase
- [ ] Create requests list page
- [ ] Create request detail page
- [ ] Implement fetch requests functionality

### Phase 4: Database Setup (in Supabase Dashboard)

- [ ] Create `requests` table
- [ ] Set up Row Level Security (RLS) policies
- [ ] Enable real-time subscriptions (optional)

### Phase 5: UI/UX Improvements

- [ ] Add loading indicators
- [ ] Add error/success messages
- [ ] Link pages together
- [ ] Add navigation menu

## Required Supabase Configuration

### Environment Variables Needed:

```javascript
const SUPABASE_URL = "your-project-url";
const SUPABASE_ANON_KEY = "your-anon-key";
```

### Database Schema:

```sql
CREATE TABLE requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
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
```

## Files to Create/Modify

### New Files:

1. `config.js` - Supabase configuration
2. `auth.js` - Authentication utilities
3. `requests-list.html` - List all requests
4. `request-detail.html` - Show single request details
5. `create-request.html` - Form to create new request

### Files to Modify:

1. `form page.html` - Add login functionality
2. `signup.html` - Convert to proper signup page
3. `index.html` - Add navigation/links
4. `front page.html` - Add navigation/links

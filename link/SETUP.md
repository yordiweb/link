# Setup Instructions

## First Time Setup

### Step 1: Configure Supabase Credentials

1. **Copy the template file**:

   ```bash
   cp js/config.example.js js/config.js
   ```

2. **Get your Supabase credentials**:

   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Select your project (or create a new one)
   - Navigate to: **Settings** → **API**
   - Copy:
     - **Project URL** (e.g., `https://xxxxx.supabase.co`)
     - **anon public key** (long string starting with `eyJ...`)

3. **Update `js/config.js`**:
   ```javascript
   const SUPABASE_URL = "https://your-actual-project-id.supabase.co";
   const SUPABASE_ANON_KEY = "your-actual-anon-key-here";
   ```

### Step 2: Set Up Database

1. Go to Supabase Dashboard → **SQL Editor**
2. Click **New query**
3. Copy and paste the SQL from `docs/COMPANIES_DATABASE_SCHEMA.md`
4. Click **Run**

### Step 3: Set Up Storage (Optional - for logo uploads)

1. Go to Supabase Dashboard → **Storage**
2. Create a new bucket named `company-logos`
3. Make it **Public**
4. Set up RLS policies (see `docs/STORAGE_SETUP.md`)

### Step 4: Verify Git Ignore

Check that `js/config.js` is ignored:

```bash
git check-ignore js/config.js
```

Should output: `js/config.js`

If the file was already committed, remove it from git (but keep the local file):

```bash
git rm --cached js/config.js
git commit -m "Remove config.js from version control"
```

## Security Checklist

- ✅ `js/config.js` is in `.gitignore`
- ✅ `js/config.example.js` exists (template file)
- ✅ Never commit actual credentials
- ✅ Using anon key (not service role key)
- ✅ RLS policies are set up

## Testing

1. Open `pages/form page.html` in your browser
2. Try to sign up with a new account
3. Create a company
4. Verify everything works

## Need Help?

- See `docs/SECURITY_GUIDE.md` for security best practices
- See `docs/QUICK_START.md` for quick reference
- Check Supabase documentation: https://supabase.com/docs

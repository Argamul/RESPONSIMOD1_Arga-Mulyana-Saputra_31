# Deployment Guide

This guide will help you deploy the Shoe Laundry API to Vercel.

## Prerequisites

1. **Supabase Account**: Create a free account at [supabase.com](https://supabase.com)
2. **Vercel Account**: Create a free account at [vercel.com](https://vercel.com)
3. **GitHub Account**: For version control and easy deployment

## Step 1: Set Up Supabase Database

### 1.1 Create a New Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `shoe-laundry-api`
   - Database Password: (choose a strong password)
   - Region: (choose closest to your users)
5. Click "Create new project"

### 1.2 Set Up Database Schema
1. Go to the SQL Editor in your Supabase dashboard
2. Copy and paste the contents of `database/schema.sql`
3. Click "Run" to execute the SQL
4. Verify the table was created in the Table Editor

### 1.3 Get Your Supabase Credentials
1. Go to Settings → API in your Supabase dashboard
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project.supabase.co`)
   - **Anon Key** (long string starting with `eyJ...`)

## Step 2: Deploy to Vercel

### 2.1 Connect GitHub Repository
1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a Node.js project

### 2.2 Configure Environment Variables
In your Vercel project dashboard:
1. Go to Settings → Environment Variables
2. Add the following variables:

| Name | Value | Environment |
|------|-------|-------------|
| `SUPABASE_URL` | Your Supabase Project URL | Production, Preview, Development |
| `SUPABASE_ANON_KEY` | Your Supabase Anon Key | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

### 2.3 Deploy
1. Click "Deploy" in your Vercel dashboard
2. Wait for the deployment to complete
3. Your API will be available at: `https://your-project-name.vercel.app`

## Step 3: Test Your Deployment

### 3.1 Health Check
```bash
curl https://your-project-name.vercel.app/health
```

Expected response:
```json
{
  "success": true,
  "message": "Shoe Laundry API is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "production"
}
```

### 3.2 Test API Endpoints
```bash
# Get all items
curl https://your-project-name.vercel.app/api/items

# Create a new item
curl -X POST https://your-project-name.vercel.app/api/items \
  -H "Content-Type: application/json" \
  -d '{"customer_name": "Test User", "shoe_type": "Nike Air Max"}'
```

## Step 4: Configure CORS (Optional)

If you plan to use this API with a frontend application:

1. Update the CORS configuration in `src/index.js`
2. Add your frontend domain to the allowed origins:

```javascript
app.use(cors({
  origin: [
    'https://your-frontend-domain.com',
    'https://your-frontend-domain.vercel.app'
  ],
  credentials: true
}));
```

## Step 5: Set Up Custom Domain (Optional)

1. In your Vercel dashboard, go to Settings → Domains
2. Add your custom domain
3. Follow the DNS configuration instructions
4. Your API will be available at your custom domain

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify your Supabase URL and key are correct
   - Check that your Supabase project is active
   - Ensure the database schema was created properly

2. **CORS Errors**
   - Update the CORS configuration in `src/index.js`
   - Add your frontend domain to the allowed origins

3. **Environment Variables Not Working**
   - Verify all environment variables are set in Vercel
   - Redeploy after adding new environment variables
   - Check that variable names match exactly (case-sensitive)

4. **API Not Responding**
   - Check the Vercel function logs
   - Verify the `vercel.json` configuration
   - Ensure all dependencies are in `package.json`

### Debugging

1. **Check Vercel Logs**
   - Go to your Vercel dashboard
   - Click on your deployment
   - Check the "Functions" tab for error logs

2. **Test Locally**
   - Set up your `.env` file with Supabase credentials
   - Run `npm start` locally
   - Test with `node test-api.js`

3. **Database Issues**
   - Check Supabase dashboard for database logs
   - Verify table permissions
   - Test database connection in Supabase SQL editor

## Security Considerations

1. **Environment Variables**
   - Never commit `.env` files to version control
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **Database Security**
   - Use Row Level Security (RLS) in Supabase if needed
   - Limit database permissions
   - Monitor database usage

3. **API Security**
   - Consider adding authentication for production use
   - Implement rate limiting
   - Use HTTPS (automatically handled by Vercel)

## Monitoring and Maintenance

1. **Monitor API Usage**
   - Check Vercel analytics
   - Monitor Supabase usage
   - Set up alerts for errors

2. **Regular Updates**
   - Keep dependencies updated
   - Monitor for security vulnerabilities
   - Test after updates

3. **Backup Strategy**
   - Supabase automatically backs up your database
   - Consider additional backup strategies for critical data

## Support

If you encounter issues:

1. Check the [Vercel Documentation](https://vercel.com/docs)
2. Check the [Supabase Documentation](https://supabase.com/docs)
3. Review the API logs in Vercel dashboard
4. Test locally with the same environment variables

---

Your Shoe Laundry API should now be successfully deployed and accessible worldwide! 🚀

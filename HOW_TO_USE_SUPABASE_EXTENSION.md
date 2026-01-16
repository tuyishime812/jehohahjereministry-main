# How to Use Supabase Extension in VSCode

## Installing the Supabase Extension

1. Open Visual Studio Code
2. Go to Extensions (Ctrl+Shift+X or Cmd+Shift+X)
3. Search for "Supabase" in the marketplace
4. Install the official "Supabase" extension by Supabase
5. Restart VSCode after installation

## Setting Up Your Supabase Project

1. Create a Supabase account at [supabase.io](https://supabase.io)
2. Create a new project in your Supabase dashboard
3. Get your Project URL and API keys from Project Settings > API

## Connecting VSCode to Your Supabase Project

1. Open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P)
2. Type "Supabase: Link Project" and select it
3. Enter your Project Reference ID (found in Project Settings)
4. The extension will connect to your Supabase project

## Using the Supabase Extension Features

### Database Explorer
- View your database schema in the sidebar
- See tables, columns, and relationships
- Right-click on tables to insert, update, or delete records

### SQL Editor
- Open the SQL editor from the Supabase sidebar
- Write and execute SQL queries directly
- View results in a formatted table

### Authentication Management
- View and manage users
- Create, update, or delete user accounts
- Manage authentication providers

### Storage Management
- Upload and manage files in Supabase Storage
- Organize files in buckets
- Set access permissions

### Realtime Subscriptions
- Monitor database changes in real-time
- Set up subscriptions for specific tables
- Debug realtime functionality

## Common Commands

- `Supabase: Link Project` - Connect to a Supabase project
- `Supabase: Unlink Project` - Disconnect from project
- `Supabase: Run Migration` - Run database migrations
- `Supabase: Generate Types` - Generate TypeScript types
- `Supabase: Start Dev` - Start local development setup

## Local Development Setup

1. Install the Supabase CLI if you haven't already
2. Use `Supabase: Start Dev` to start local development
3. Your local database will sync with your Supabase project
4. Develop and test locally before deploying

## Tips

- Always backup your data before making major changes
- Use the SQL editor for complex queries
- Take advantage of the type generation feature for TypeScript projects
- Use the local development environment to test changes safely
- Monitor the realtime features to debug subscription issues

## Troubleshooting

If you encounter issues:
1. Verify your internet connection
2. Check that your Project Reference ID is correct
3. Ensure you have the necessary permissions
4. Check the VSCode console for error messages
5. Consult the Supabase documentation for specific issues
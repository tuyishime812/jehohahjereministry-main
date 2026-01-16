# JehoHahJere Ministry - Admin System

This project includes a standalone admin system that allows you to edit content without a backend server.

## Admin Access

### Login Credentials
- **Username**: admin (not required)
- **Password**: admin123

### Accessing Admin Panel
1. Navigate to `admin.html` in your browser
2. Enter the password: `admin123`
3. Click "Login" to access the professional CMS dashboard

## Features

### Content Management
The admin dashboard allows you to edit content for:
- Home page
- About page
- Contact page
- Missions page
- Team page
- Gallery page

### Image Management
- Upload custom logo image
- Upload custom hero background image
- Images are stored in browser's localStorage

### Real-time Preview
- See changes in real-time as you type
- Preview section shows how content will appear on the live site

### Live Updates
- All changes are saved to browser's localStorage
- Content updates appear immediately on the client-facing pages
- No server required - all data persists in the browser

## How It Works

1. **Editing**: Use the admin dashboard to edit content for each page
2. **Saving**: Content is automatically saved to browser's localStorage
3. **Display**: The `content-manager.js` script loads custom content when pages are viewed
4. **Fallback**: If no custom content exists, the original page content is displayed

## Technical Details

- **Storage**: Browser localStorage (no server required)
- **Script**: `content-manager.js` handles content loading
- **Pages**: All HTML pages include the content manager script
- **Persistence**: Content remains until cleared from browser storage

## Limitations

- Content only persists in the current browser
- Different browsers/devices will have separate content storages.
- Clearing browser data will remove all custom content.

## Customization

To customize the admin password, edit the login validation in `admin.html`.

To modify content areas, adjust selectors in `content-manager.js` to match your page structure.

## Support

For technical issues or questions, contact the developer who implemented this system.
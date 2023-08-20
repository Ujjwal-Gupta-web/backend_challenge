const express = require('express');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

const oauth2Client = new OAuth2Client(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'YOUR_REDIRECT_URI'
);

app.get('/auth/google', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  res.redirect(authUrl);
});

app.get('/auth/google/callback', async (req, res) => {
  const { tokens } = await oauth2Client.getToken(req.query.code);
  req.session.tokens = tokens;
  res.redirect('/create-sheet');
});

app.get('/create-sheet', async (req, res) => {
    try {
      const auth = new google.auth.OAuth2();
      auth.setCredentials(req.session.tokens);
  
      const sheets = google.sheets({ version: 'v4', auth });
  
      const request = {
        resource: {
          properties: {
            title: 'My New Google Sheet',
          },
        },
      };
  
      const response = await sheets.spreadsheets.create(request);
  
      // The created Google Sheet's ID
      const spreadsheetId = response.data.spreadsheetId;
  
      // Share the sheet with the authenticated user
      await sheets.spreadsheets.create({
        spreadsheetId,
        resource: {
          role: 'owner',
          type: 'user',
          emailAddress: 'user@example.com', // Replace with the user's email
        },
      });
  
      res.send(`Google Sheet created with ID: ${spreadsheetId}`);
    } catch (err) {
      console.error('Error creating Google Sheet:', err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  });
  
app.listen(port,()=>console.log(`server running on ${port}`))
# 🏔️ Dubz Gears - Outdoor Equipment POS System

A modern Point of Sale (POS) system for outdoor equipment and adventure gear management.

## ✨ Features

- **Landing Page**: Beautiful brand showcase with navigation
- **Admin Panel**: Product management with CRUD operations
- **POS Interface**: Shopping cart and payment processing
- **Image Upload**: Product image management
- **Stock Management**: Track inventory levels
- **Responsive Design**: Works on desktop and mobile

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/outdoor-pos.git
cd outdoor-pos
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
- Visit `http://localhost:3000` for the landing page
- Admin panel: `http://localhost:3000/admin/admin.html`
- POS interface: `http://localhost:3000/pos`

## 📁 Project Structure

```
outdoor-pos/
├── public/
│   ├── landing.html          # Landing page
│   ├── index.html            # POS interface
│   ├── style.css             # POS styles
│   ├── script.js             # POS functionality
│   ├── landing.css           # Landing page styles
│   ├── admin/
│   │   ├── admin.html        # Admin panel
│   │   ├── admin.css         # Admin styles
│   │   └── admin.js          # Admin functionality
│   └── images/               # Product images
├── server.js                 # Express server
├── db.js                     # Database configuration
├── package.json              # Dependencies
└── README.md                 # This file
```

## 🛠️ API Endpoints

- `GET /` - Landing page
- `GET /pos` - POS interface
- `GET /admin` - Admin panel
- `GET /products` - Get all products
- `POST /add-product` - Add new product
- `PUT /edit-product/:id` - Edit product
- `DELETE /delete-product/:id` - Delete product

## 🎨 Customization

### Branding
- Update "Dubz Gears" in `public/landing.html`
- Modify colors in CSS files
- Add your logo to `public/images/`

### Styling
- `public/landing.css` - Landing page styles
- `public/style.css` - POS interface styles
- `public/admin/admin.css` - Admin panel styles

## 🚀 Deployment

### Option 1: Render (Recommended)
1. Create account on [render.com](https://render.com)
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Deploy!

### Option 2: Railway
1. Create account on [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Auto-deploys on push

### Option 3: Heroku
1. Create account on [heroku.com](https://heroku.com)
2. Install Heroku CLI
3. Run: `heroku create your-app-name`
4. Push: `git push heroku main`

## 🛡️ Security Notes

- This is a demo application
- Add authentication for production use
- Implement proper input validation
- Use environment variables for sensitive data

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support, email support@dubzgears.com or create an issue on GitHub.

---

**Built with ❤️ for outdoor enthusiasts** 
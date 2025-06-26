# AR Compare

The Ultimate AR & AI Glasses Comparison website. A modern React application for comparing the latest AR and AI glasses from top manufacturers.

## 🚀 Features

- **Comprehensive Comparison**: Detailed specs, features, and reviews of AR/AI glasses
- **Modern Tech Stack**: Built with React 19, Vite, Tailwind CSS, and Radix UI
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Mode Support**: Built-in theme switching
- **SEO Optimized**: Ready for search engine optimization
- **Vercel Ready**: Configured for seamless Vercel deployment

## 🛠️ Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.7
- **UI Components**: Radix UI (complete component library)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router DOM
- **Animation**: Framer Motion
- **Package Manager**: pnpm

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/kavanaghpatrick/ar-compare.git
cd ar-compare
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Build

To build the project for production:

```bash
pnpm run build
```

The built files will be in the `dist` directory.

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the framework and build settings
3. Deploy with one click

The project includes a `vercel.json` configuration file for optimal deployment.

### Manual Deployment

1. Build the project: `pnpm run build`
2. Deploy the `dist` directory to your hosting provider

## 📁 Project Structure

```
ar-compare/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and static files
│   ├── components/
│   │   └── ui/           # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── App.jsx           # Main application component
│   ├── App.css           # Global styles
│   ├── index.css         # Base styles
│   └── main.jsx          # Application entry point
├── components.json        # Shadcn/ui configuration
├── vercel.json           # Vercel deployment config
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Customization

The project uses Tailwind CSS with a custom design system. You can customize:

- **Colors**: Modify the color palette in `src/App.css`
- **Components**: All UI components are in `src/components/ui/`
- **Layout**: Main layout is in `src/App.jsx`
- **Styling**: Global styles in `src/App.css` and `src/index.css`

## 📝 Development

### Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint

### Adding New Components

The project uses Shadcn/ui components. To add new components:

```bash
npx shadcn@latest add [component-name]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Open a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Repository**: [https://github.com/kavanaghpatrick/ar-compare](https://github.com/kavanaghpatrick/ar-compare)
- **Live Demo**: Deploy to see the live version
- **Issues**: [Report bugs or request features](https://github.com/kavanaghpatrick/ar-compare/issues)

## 📞 Support

For support, please open an issue on GitHub or contact the maintainers.

---

Built with ❤️ using modern web technologies.


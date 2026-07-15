<div align="center">
  <img src="./src/assets/logo.jpeg" alt="Drift & Bloom logo" width="150" />

  # Drift & Bloom

  **A calming, premium e-commerce experience for curated plant, candle, and Betta fish packages.**

  [![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![React Router](https://img.shields.io/badge/React_Router-6.30-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
</div>

## About the project

Drift & Bloom is a responsive front-end e-commerce application designed around meaningful, mood-based gift packages. Each collection combines natural and sensory elements such as plants, scented candles, story cards, and Betta fish setups to create a personalized calming experience.

The application includes a customer storefront, a custom package builder, a recommendation quiz, cart and checkout flows, mock authentication, and a UI-only admin dashboard.

> **Project status:** Front-end prototype. Product data, authentication, orders, and admin operations currently use local data, React state, and browser storage. No backend or payment gateway is connected.

## Main features

### Storefront

- Responsive premium landing page with branded animations
- Ten mood-based curated collections
- Best-seller packages and detailed product pages
- Product search, category filtering, and sorting
- Four-image product galleries
- Plant-option selection based on pet preference
- Related product recommendations

### Build Your Package

- Build a custom package using plants, candles, and fish setups
- Search and browse products by category
- Select multiple products and control quantities
- Add optional customizations
- View live progress, selections, and total price
- Add the completed custom package directly to the cart
- Package-builder state is saved in `localStorage`

### Find Your Soul quiz

- Multi-step lifestyle and mood questionnaire
- Progress tracking and keyboard navigation
- Recommendation scoring based on the user's answers
- Suggested collection, plant, mood palette, and secondary match
- Retake option for a new recommendation

### Cart and checkout

- Add, remove, and update cart items
- Persistent cart data using `localStorage`
- Free shipping for orders of EGP 3,000 or more
- English or Arabic instruction-card selection
- Gift-note support
- Customer information validation
- Payment-method selection and order-review flow
- Mock order confirmation

### Authentication and admin

- Mock customer login and registration
- Persistent mock session using `localStorage`
- Admin login with demo credentials
- Dashboard statistics and recent orders
- Product search, add, edit, preview, and delete interfaces
- Order search and status filtering
- Customer search and listing

## Technology stack

| Technology | Purpose |
| --- | --- |
| React 18 | Component-based user interface |
| Vite 8 | Development server and production build tool |
| Tailwind CSS 3 | Responsive styling and design system |
| React Router DOM 6 | Client-side routing |
| Framer Motion | Page and component animations |
| Lucide React | Interface icons |
| React Icons | Additional icon library |
| Context API | Cart, authentication, products, and package-builder state |
| Local Storage | Persistent cart, auth, language, and package selections |

## Getting started

### Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) `20.19+` or `22.12+`
- npm, included with Node.js
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/drift-and-bloom.git

# Enter the project directory
cd drift-and-bloom

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open the local URL printed in the terminal, usually:

```text
http://localhost:5173
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates an optimized production build in `dist/` |
| `npm run preview` | Serves the production build locally for testing |

## Demo accounts

### Customer account

Customer authentication is mocked. Any valid-looking name, email, and password can be used to register or log in.

### Admin account

```text
Email: admin@driftandbloom.com
Password: admin123
```

Admin changes are stored only in the current React session and are reset when the page is refreshed.

## Application routes

| Route | Description |
| --- | --- |
| `/` | Home page and brand sections |
| `/packages` | Searchable and filterable collection catalog |
| `/packages/:id` | Product details, gallery, options, and related products |
| `/build-your-package` | Custom package builder |
| `/build-package` | Alternate route for the package builder |
| `/find-your-soul` | Personalized collection recommendation quiz |
| `/cart` | Cart, customer information, payment, and review flow |
| `/support` | Contact form, contact details, and FAQs |
| `/login` | Mock customer login |
| `/register` | Mock customer registration |
| `/admin/login` | Mock admin login |
| `/admin` | Admin dashboard |
| `/admin/products` | Product management interface |
| `/admin/orders` | Order management interface |
| `/admin/customers` | Customer management interface |

## Project structure

```text
src/
├── assets/                  # Brand, collection, product, and page images
├── components/
│   ├── admin/               # Admin forms, cards, uploader, and badges
│   ├── build-package/       # Package-builder controls and review UI
│   ├── cart/                # Cart item component
│   ├── common/              # Shared navigation, buttons, layout, toast, etc.
│   ├── home/                # Home-page sections
│   ├── packages/            # Product and package cards
│   └── support/             # FAQ components
├── context/
│   ├── AuthContext.jsx      # Mock authentication state
│   ├── CartContext.jsx      # Cart totals, quantities, and persistence
│   ├── PackageContext.jsx   # Custom package selections and persistence
│   └── ProductContext.jsx   # Product catalog and mock CRUD operations
├── data/                    # Product, plant, quiz, and admin seed data
├── layouts/                 # Storefront, authentication, and admin layouts
├── pages/
│   ├── admin/               # Dashboard, products, orders, and customers
│   └── FindYourSoul/        # Quiz flow, scoring, progress, and results
├── routes/                  # Route protection helpers
├── utils/                   # Collection-image mapping utilities
├── App.jsx                  # Lazy-loaded route configuration
├── index.css                # Global styles and Tailwind layers
└── main.jsx                 # Application entry point and providers
```

## State and persistence

The application uses React Context for shared state:

- `AuthContext` manages mock customer and admin sessions.
- `ProductContext` manages the local product catalog and admin CRUD actions.
- `CartContext` manages cart items, totals, shipping, and instruction language.
- `PackageContext` manages custom package selections and quantities.

The following information persists in the browser through `localStorage`:

- Customer or admin session
- Cart items
- Preferred instruction-card language
- Custom package-builder selections

## Design system

The interface uses a calm, nature-inspired visual identity:

- Sage and olive primary colors
- Beige, cream, and ivory backgrounds
- Brown and gold accent colors
- Serif display typography with clean sans-serif body text
- Soft shadows, rounded cards, hover effects, and motion transitions
- Responsive layouts for mobile, tablet, and desktop screens

The custom Tailwind theme is defined in `tailwind.config.js`.

## Production integration roadmap

To turn this prototype into a production application, the main next steps are:

1. Connect the product catalog and admin pages to a REST API.
2. Replace mock authentication with secure JWT or cookie-based authentication.
3. Store customers, products, carts, and orders in a database.
4. Upload product images to cloud storage instead of browser memory.
5. Connect the checkout flow to a real payment provider.
6. Add server-side validation, authorization, logging, and error handling.
7. Add automated unit, integration, and end-to-end tests.
8. Configure environment variables and production deployment.

## Deployment

Create the optimized application bundle with:

```bash
npm run build
```

The generated `dist/` directory can be deployed to platforms such as Vercel, Netlify, Cloudflare Pages, GitHub Pages, or any static web server.

Because the application uses `BrowserRouter`, configure the hosting platform to redirect unknown routes to `index.html`. This ensures pages such as `/packages/return` continue to work after a browser refresh.

## Contributing

Contributions are welcome. Create a separate branch, make your changes, test the production build, and open a pull request with a clear description of the update.

```bash
git checkout -b feature/your-feature-name
npm run build
git commit -m "Add your feature"
git push origin feature/your-feature-name
```

---

<div align="center">
  Built for <strong>Drift & Bloom</strong> — thoughtful packages for calmer spaces.
</div>

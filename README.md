# EmmyBlaq Kicks — editable source project

This is the editable React/Vite project for the EmmyBlaq Kicks demo shoe storefront.

## Included features
- Responsive shoe catalogue, category filters and search
- EU size selection and favourites
- Shopping cart with quantity controls, remove action and subtotal
- Browser-local cart persistence using `localStorage`
- Checkout form and checklist
- Payment-method selection UI: bank transfer, card, or pay on delivery
- Demo order confirmation; **no actual order or payment is processed**

## Requirements
- Node.js 20 LTS or newer (includes npm)
- A code editor such as Visual Studio Code
- Internet connection for the remote Unsplash product photos and Google Fonts

## Run on Windows (HP laptop) or macOS/Linux
1. Install Node.js from https://nodejs.org/ (choose the LTS version).
2. Extract this ZIP to a folder, for example `Documents/emmyblaq-kicks`.
3. Open that folder in Visual Studio Code.
4. In VS Code, select **Terminal → New Terminal**.
5. Run `npm install` and wait for it to finish.
6. Run `npm run dev`.
7. Open the local URL Vite prints, commonly `http://localhost:5173`.
8. Edit `src/App.jsx` for products and behaviour, or `src/styles.css` for visual styling. Save files; the browser refreshes automatically.
9. To create a production build, run `npm run build`. The static output is written to `dist/`.
10. To preview the production build locally, run `npm run preview`.

## Where to edit
- `src/App.jsx`: product catalogue, prices, sizing, cart, checkout, checklist and demo order logic. Search for `PRODUCTS`.
- `src/styles.css`: colours, spacing, typography, layout and mobile styles.
- `index.html`: page title, description and browser metadata.
- `package.json`: scripts and library dependencies.
- `.env.example`: safe example configuration notes; no real secrets included.

## Dependencies
Runtime:
- React and React DOM (`react`, `react-dom`)
- Lucide icon components (`lucide-react`)

Development/build:
- Vite (`vite`)
- React Vite plugin (`@vitejs/plugin-react`)
- TypeScript tooling (`typescript`, `@types/react`, `@types/react-dom`)
- PostCSS and Autoprefixer (`postcss`, `autoprefixer`)
- Tailwind CSS is configured, although the current visual styles are plain CSS.

## Ownership and portability
The project files are editable and use standard React/Vite tooling. There is no AppDeploy SDK import and no proprietary runtime dependency in the app source. You can build the site locally and deploy the `dist/` folder to a static host that supports single-page apps.

The current live URL is hosted on AppDeploy, so that hosting account controls that deployment. You can independently host a build elsewhere, but transferring the existing hosted URL/domain requires access to the relevant hosting account and DNS provider.

## Important production gaps
This is a frontend demo, not yet a complete production store:
- Cart contents live only in the visitor's browser; there is no shared server-side cart.
- Orders are demo-only and are not sent to an owner/admin dashboard or database.
- Payment options are interface choices only. No bank transfer confirmation, card charge, or payment webhook is implemented.
- There is no login, inventory management, admin dashboard, email/SMS notification, shipping integration, or tax engine.
- Product photos are loaded from Unsplash URLs, and fonts are loaded from Google Fonts. Replace these with licensed, locally stored assets if desired.
- Before taking real customer data or payments, add a secure backend/database, privacy policy, real delivery rules, and a verified payment gateway such as Paystack or Flutterwave. Do not put secret keys in frontend code or `VITE_*` variables.

## Environment variables
No environment variables are required to run this version. `.env.example` is a template only. Private API keys must be kept on the backend, never committed to source control or embedded in client-side JavaScript.

## Independent deployment
1. Run `npm install`.
2. Run `npm run build`.
3. Upload the contents of `dist/` to a static hosting provider (for example Netlify, Vercel static hosting, Cloudflare Pages, or another provider).
4. Configure the provider to build with `npm run build` and publish `dist/` if you connect the Git repository instead of uploading the folder.
5. For updates, edit the source, test locally, rebuild, and redeploy `dist/`.

For real ecommerce operation, add backend/database and payment integration before advertising that customers can complete paid orders.

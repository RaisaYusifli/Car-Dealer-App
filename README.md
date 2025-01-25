This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

 Car Dealer Application

A Next.js application for browsing vehicle makes and models using the NHTSA API.

## Features

- Vehicle make selection from NHTSA database
- Model year filtering (2015-present)
- Dynamic image rendering using Imagin.studio API
- Server-side generation with Next.js
- Responsive design with Tailwind CSS

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- NHTSA Vehicle API
- Imagin.studio API

## Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd car-dealer-app
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` and add environment variables:
```env
NEXT_PUBLIC_IMAGIN_API_KEY=your_key
NEXT_PUBLIC_NHTSA_API_URL=https://vpic.nhtsa.dot.gov/api
```

4. Run development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── page.tsx            # Home page
│   └── result/[makeId]/[year]/
│       └── page.tsx        # Results page
├── components/
│   ├── VehicleList.tsx
│   └── Loading.tsx
├── types/
│   └── vehicle.ts
└── next.config.ts
```

## Development

- Run tests: `npm test`
- Format code: `npm run format`
- Lint code: `npm run lint`

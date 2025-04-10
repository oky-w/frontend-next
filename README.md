# Dashboard Frontend

## Overview

**Dashboard Frontend** is a client-side web application built using **Next.js**. It connects to a **Go-powered backend API** and provides users with a modern, responsive interface to:

- View and manage bank accounts
- Perform transactions (transfer & withdraw)
- View transaction history in real-time
- Access financial data: main accounts, pocket accounts, savings, and deposits

The project uses a **modular structure** and is styled with **Tailwind CSS** for clean and responsive design.

Additionally, I use API routes in Next.js as a proxy to connect the frontend with the Go backend API. This setup enables the application to interact with the backend through server-side routes. On the client-side, requests are made to port 3000, and although these may appear as such when inspected in the browser, they are actually forwarded to the backend on port 8080 through the Next.js server.

The key benefit here is that even if someone inspects the network requests in the browser, it will show requests going to port 3000. However, the Next.js server intercepts and forwards these requests to the Go backend, keeping the backend details hidden from the client.

The processing of these requests happens server-side, where they are intercepted by the Next.js API routes and forwarded to the Go backend. On the client-side, the user only interacts with the Next.js application on port 3000, while the actual request is handled and processed on the server. This ensures that sensitive information, such as credentials and backend details, remains hidden, improving the overall security.

---

## Roles & Permissions

The application supports two roles: `admin` and `user`.

### Admin

Admins have full access to the system, including:

- View and manage all users
- View and manage all customers
- View all transactions across the platform

```bash
username: admin
password: password
```

### User

Regular users have limited access and can only:

- View their own bank accounts
- Perform transactions limited to `transfer` and `withdraw`
- View their own transaction history

This role is meant for end-customers or clients using the banking platform.

```bash
username: user
password: password
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/okyws/next.git
cd next
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

---

Open your browser and navigate to:

[http://localhost:3000](http://localhost:3000)

---

## Environment Variables

Create a `.env.local` or `.env` file at the project root and configure the API URL:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

---

## Folder Structure

```bash
./
├── app                                   (Next.js app folder for client-side routes and components)
│   ├── page.js                           (Home page)
│   ├── layout.js                         (RootLayout)
│   ├── api                               (API routes folder as proxy for handling API requests from the backend)
│   ├── middleware.js                     (Middleware for handling authentication and authorization)
├── components                            (Components folder for reusable UI elements)
├── hooks                                 (Hooks folder for custom React hooks)
├── lib                                   (Utility functions folder)
├── store                                 (State management folder using Zustand)
├── tailwind.config.js                    (Tailwind CSS configuration file)
├── next.config.js                        (Next.js configuration file)
├── package.json                          (Project package metadata)
├── README.md                             (Project documentation file)
├── .env                                  (Environment variables file)
└── .gitignore                            (Git ignore file)
```

---

## Dependencies

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [daisyUI](https://daisyui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Zustand](https://github.com/pmndrs/zustand)

---

## Key Features

- ✅ Transfer and withdraw transactions
- ✅ Form auto-submit with success/fail messages
- ✅ Dynamic routes
- ✅ Tailwind CSS for styling
- ✅ Custom React hooks
- ✅ Reusable components

---

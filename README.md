# 🛡️ Centralized Backend Proxy API

<div align="center">
  <p align="center">
    <strong>A Secure, Token-Authorized Serverless API Gateway</strong><br />
    Built with Next.js (Route Handlers) and Supabase to safely proxy and aggregate data (GitHub metrics, project portfolios) for client-side applications.
  </p>
</div>

---

## 🚀 Overview

In modern web development, executing direct database queries or exposing administrative environment variables on the client side (`'use client'`) poses significant security risks.

This repository houses a **centralized backend utility API**. It acts as a secure intermediary/proxy layer between my various frontend applications and my data layers (Supabase database, GitHub APIs). By shifting data aggregation and administrative operations server-side, my other client applications can safely fetch data via a secured gateway without exposing sensitive environment variables.

### ⚡ Key Architectural Features

- **Token-Based Security:** Every single incoming request must pass a secure `Bearer` token validation layer before the API communicates with any backend service.
- **Centralized Single Point of Truth:** Multiple personal applications consume data from this single source, reducing code duplication and client-side bundle sizes.
- **Optimized Payloads:** Aggregates and cleans complex database rows server-side, returning optimized, lightweight JSON to the client.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router & Serverless Route Handlers)
- **Database Engine:** [Supabase](https://supabase.com/) (PostgreSQL backend)
- **Runtime Environment:** Node.js (Edge / Serverless compatible)
- **Security Protocol:** HTTP Authorization Header (Bearer Token validation)

---

## 📐 Data Flow Architecture

```text
┌──────────────────────┐   HTTP Request + Bearer Token   ┌─────────────────────────┐
│  Client Application  │ ──────────────────────────────> │   Next.js Proxy API     │
│  (No Supabase Env)   │ <────────────────────────────── │ (Validates Token first) │
└──────────────────────┘           Clean JSON            └─────────────────────────┘
                                                                   │
                                                   ┌───────────────┴───────────────┐
                                                   ▼                               ▼
                                      ┌─────────────────────────┐     ┌─────────────────────────┐
                                      │    Supabase Database    │     │    Supabase Database    │
                                      │  (Project Repositories) │     │      (Other Data)       │
                                      └─────────────────────────┘     └─────────────────────────┘
```

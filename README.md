[![banner](https://raw.githubusercontent.com/oceanprotocol/art/master/github/repo-banner%402x.png)](https://oceanprotocol.com)

<h1 align="center">status-frontend</h1>

> Frontend client for showing the status of Ocean Protocol services.

[![Netlify Status](https://api.netlify.com/api/v1/badges/70cdb7df-cc24-43a0-96fc-5ac501dc31ac/deploy-status)](https://app.netlify.com/sites/ocean-status/deploys)

- [🦑 Features](#-features)
- [🏄 Get Started](#-get-started)
- [✨ Code Style](#-code-style)
- [🛳 Production](#-production)
- [⬆️ Deployment](#️-deployment)
- [🏛 License](#-license)

## 🦑 Features

- Fetches and displays information for each of Ocean's remote components, grouped by network
- fetched from `https://status-api.oceanprotocol.com`, which is built with:
  - [oceanprotocol/status-api](https://github.com/oceanprotocol/status-api)
  - [oceanprotocol/status-monitoring-service](https://github.com/oceanprotocol/status-monitoring-service)

## 🏄 Get Started

The app is a React app built with [Next.js](https://nextjs.org). To start local development:

```bash
git clone git@github.com:oceanprotocol/status-frontend.git
cd status

npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ✨ Code Style

For linting checks you can use from the root of the project:

```bash
# lint all js with eslint
npm run lint
```

## 🛳 Production

To create a production build, run from the root of the project:

```bash
npm run build
```

Outputs to `./next`.

## ⬆️ Deployment

Every branch or Pull Request is automatically deployed by [Netlify](https://netlify.com) with their GitHub integration. A link to a deployment will appear under each Pull Request.

## 🏛 License

```text
Copyright ((C)) 2022 Ocean Protocol Foundation Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

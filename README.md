<h1 align="center">Point Of Sale System</h1>
A web-based Point of Sale (POS) system using Next.js

## Tech Stack
- Framework: Next.js
- Styling: Tailwind
- UI Components: Shadcn/ui
- Validation: zod
- Query fetching: React Query
- State Management: Redux-toolkit


## Getting Started Locally

### Step 1: Clone the Repository

```sh
git clone https://github.com/kyboahene/pos-system.git
cd https://github.com/kyboahene/pos-system.git
```

### Step 2: Install dependencies

```bash
npm install
# or
yarn 
# or
pnpm dev
# or
bun dev
```

### Step 3: Start development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Get Started with Docker

## Prerequisites

Ensure you have the following installed on your machine:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Step 1 : Build the Docker Image

```bash
docker build -t <image-name>:<tag> 
```

### Step 2: Run the Application Using Docker Compose

```bash
docker docker-compose up

```

### Step 4: Access the Application

```bash
http://localhost:<port>

```
Replace <port> with the port number configured in your docker-compose.yml.

### Step 5: Stopping the Application

```bash
docker-compose down
```
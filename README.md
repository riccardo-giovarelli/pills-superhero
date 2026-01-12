# Pills Superhero

The project aims to develop a web application for household medication management. The initial release (MVP) will focus on inventory tracking and smart refill reminders based on current stock and therapy schedules. Future updates will incorporate medication cost tracking.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher)
- [PNpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)

---

## Getting Started

Follow these steps to initialize the project locally after cloning the repository.

### 1. Environment Configuration
Create a `.env` file in the root directory and add the following configuration variables.

#### Database Connection

Use this default for the local Docker setup:

```bash
DATABASE_URL="postgresql://psh_user:psh_password@localhost:5432/psh_db?schema=public"
```

#### Authentication Secret

Auth.js requires a secret key to encrypt session cookies. You can generate a secure random string using the following command:

```bash
openssl rand -base64 32
```

Add the generated string to your .env file:

```bash
AUTH_SECRET="your_generated_secret_here"
```

### 2. Infrastructure Setup

Start the PostgreSQL database container using Docker Compose:

```bash
docker compose up -d
```

_(The `-d` flag runs the container in the background)._

### 3. Installation

Install the project dependencies using pnpm:

```bash
pnpm install
```

### 4. Database Initialization

Since this project uses __Prisma 7__, follow these steps to set up the schema and populate the database with the initial seed data:

```bash
# 1. Apply migrations to create the database schema
pnpm prisma migrate dev --name init_schema

# 2. Generate the Prisma Client
pnpm prisma generate

# 3. Seed the database (executes prisma/seed.ts to create the initial user)
pnpm prisma db seed
```

### 5. Development Server
Launch the Next.js development server:

```bash
pnpm dev
```

Open http://localhost:3000 in your browser to view the application.


## Additional Tools

### Prisma Studio

To explore and edit the data in your database via a GUI:

```bash
pnpm prisma studio
```

## Tech Stack

![pnpm](https://img.shields.io/badge/pnpm-%234e5d99.svg?style=for-the-badge&logo=pnpm&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007acc.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Next-Intl](https://img.shields.io/badge/Next--Intl-000000?style=for-the-badge&logo=international-organization&logoColor=white)
![Next-Auth](https://img.shields.io/badge/Next--Auth-black?style=for-the-badge&logo=next.js&logoColor=white)
![Material UI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443e38?style=for-the-badge&logo=react&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/Postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-%233E67B1.svg?style=for-the-badge&logo=zod&logoColor=white)

## Author

| Riccardo Giovarelli | [![LinkedIn](https://img.shields.io/badge/Linkedin-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/riccardo-giovarelli) [![github](https://img.shields.io/badge/github-181717.svg?logo=github&logoColor=white)](https://github.com/riccardo-giovarelli) |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

## License

[GPL-3.0 license](https://www.gnu.org/licenses/gpl-3.0.html)

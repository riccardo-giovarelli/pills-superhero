# Pills Superhero
The project aims to develop a web application for household medication management. The initial release (MVP) will focus on inventory tracking and smart refill reminders based on current stock and therapy schedules. Future updates will incorporate medication cost tracking.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [PNpm](https://pnpm.io/)

## Environment

### First run

- With your terminal from the project root:

```bash
docker compose up
```

```bash
pnpm install
```

```bash
pnpm dlx prisma migrate dev --name init_schema
```

```bash
pnpm dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser.

### Run

- With your terminal from the project root:

```bash
pnpm dev
```
- Open [http://localhost:3000](http://localhost:3000) with your browser.

### Prisma Studio

- With your terminal from the project root:

```bash
pnpm dlx prisma studio
```

## Author

| Riccardo Giovarelli | [![LinkedIn](https://img.shields.io/badge/Linkedin-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/riccardo-giovarelli) [![github](https://img.shields.io/badge/github-181717.svg?logo=github&logoColor=white)](https://github.com/riccardo-giovarelli) |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

## License

[GPL-3.0 license](https://www.gnu.org/licenses/gpl-3.0.html)
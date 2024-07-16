# Contributing to ThoughtSpot

Welcome to ThoughtSpot! We're excited that you're interested in contributing to our project. ThoughtSpot is a modern blogging platform where users can create, read, update, and delete blog posts. Our goal is to provide a seamless and intuitive blogging experience for writers and readers alike.

## About ThoughtSpot

ThoughtSpot is a blogging web application built with React.js for the frontend and Hono.js for the backend, with PostgreSQL as the database. It features user authentication, a publish endpoint for creating new blog posts, and a responsive design optimized for various devices.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```
   git clone https://github.com/your-username/ThoughtSpot.git
   ```
3. Navigate to the project directory:
   ```
   cd ThoughtSpot
   ```
## Local Setup

#### Backend

##### Pre-requisities:

- Create a copy of .env.example and name the file `.env`
- Set up Postgres DATABASE_URL in .env file. You can get a free PostgreSQL connection string from [Aiven.io](https://aiven.io/).
- Create a copy of wrangler.sample.toml and name the file `warngler.toml`
- Set up Prisma connection pool DATABASE_URL in wrangler.toml file. You can get this for free from [Prisma](https://www.prisma.io/data-platform/accelerate).
- Set up JWT Secret JWT_SECRET in wrangler.toml file. This can be any value.

```bash 

cd backend
npm install
npm run prisma:migrate
npx prisma generate
npm run dev

```

> Note: wrangler.toml is the environment configuration file for a serverless backend. .env is used by Prisma for connection pooling. Ensure you configure both environment files accordingly.

#### Frontend

- Navigate into the frontend directory using 
```bash

cd frontend
npm install
npm run dev

```

## Making Changes

1. Create a new branch:
   ```
   git checkout -b your-branch-name
   ```
2. Make your changes
3. Test your changes thoroughly
4. Commit your changes:
   ```
   git commit -m "Description of changes"
   ```
5. Push to your fork:
   ```
   git push origin your-branch-name
   ```

## Submitting a Pull Request

1. Go to the original ThoughtSpot repository on GitHub
2. Click on "New Pull Request"
3. Select your fork and the branch you created
4. Fill out the pull request template with details about your changes
5. Submit the pull request

## Development Guidelines

- Follow the existing code style and conventions
- Write clear, commented, and testable code
- Update documentation as necessary
- Test your changes thoroughly before submitting a pull request

## Areas for Contribution

- Frontend enhancements (React.js)
- Backend improvements (Hono.js)
- Database optimizations (PostgreSQL)
- User authentication and authorization
- New blog features
- Performance improvements
- Documentation updates

## Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project, you agree to abide by its terms.

## Questions?

If you have any questions or need further clarification, please feel free open an issue or tag the project maintainers.

Thank you for contributing to ThoughtSpot! Your efforts help make our blogging platform even better.

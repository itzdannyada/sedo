# Sedo

Sedo is a secure web application built with [Next.js](https://nextjs.org/) and TypeScript. It demonstrates secure authentication, session management, and CRUD operations using a modern stack.

## Features

- **Authentication:** Secure login and registration using [NextAuth.js](https://next-auth.js.org/) with the Credentials Provider.
- **Session Management:** JWT-based authentication and session handling.
- **Database:** Centralized data storage with [MongoDB](https://www.mongodb.com/).
- **Role-Based Access:** Supports both regular users and administrators.
- **CRUD Operations:** Users can browse, add, update, and delete records, with permissions enforced by user role.
- **Validation & Error Handling:** All forms include validation and display clear error messages for invalid input or actions.
- **Security:** Follows best practices to mitigate OWASP Top 10 vulnerabilities.

## Project Structure

- `src/app/utils/` – Utility files for authentication (`auth.ts`) and MongoDB connection (`mongo.ts`)
- `app/` – Main Next.js app directory
- `pages/api/` – API routes for authentication and data operations

## DevOps & Development Practices

- Modular code structure for maintainability and scalability
- Consistent naming conventions and code formatting
- Inline comments and documentation
- Sample data included for testing
- Centralized database for all users

## Security

- Input validation on both client and server
- Role-based access control
- Protection against common web vulnerabilities (OWASP Top 10)

---

This project fulfills the assignment requirements to design, develop, and test a secure, complex web application using modern web technologies and DevOps practices.
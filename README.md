# EduTrackr Backend

This is the backend for EduTrackr, a service for tracking student grades. It is built with Express.js and TypeScript.

## Features

*   User authentication
*   Upload and manage student records
*   API for accessing student data

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Bun](https://bun.sh/)
*   [Node.js](https://nodejs.org/)
*   A MongoDB database

### Installing

1.  Clone the repo:
    ```sh
    git clone https://github.com/your_username/edutrackr-backend.git
    ```
2.  Install NPM packages:
    ```sh
    bun install
    ```
3.  Create a `.env` file in the root directory and add the following environment variables:
    ```
    PORT=3000
    MONGO_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    ```
4.  Start the server:
    ```sh
    bun run dev
    ```

## API Documentation

The API documentation is generated with Swagger and can be accessed at `http://localhost:3000/api/docs`.

## Database Models

### User

| Field    | Type   | Description              |
| :------- | :----- | :----------------------- |
| `name`   | String | The user's name.        |
| `email`  | String | The user's email address. |
| `password` | String | The user's password.    |

### Record

| Field        | Type   | Description                               |
| :----------- | :----- | :---------------------------------------- |
| `userId`     | ObjectId | The ID of the user who uploaded the record. |
| `student_id` | String | The ID of the student.                    |
| `full_name`  | String | The full name of the student.             |
| `level`      | String | The level of the student.                 |
| `semester`   | String | The semester of the student.              |
| `cgpa`       | String | The CGPA of the student.                  |
| `courses`    | Map    | A map of course codes to grades.          |

## Deployment

This project can be deployed to any platform that supports Node.js applications. Here are the general steps:

1.  Build the project:
    ```sh
    bun run build
    ```
2.  Set the environment variables on your deployment platform.
3.  Start the server:
    ```sh
    bun run start
    ```

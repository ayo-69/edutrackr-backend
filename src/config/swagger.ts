// src/config/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'Backend API with Express and TypeScript',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`, // change if needed
      },
    ],
    components: {
      schemas: {
        Record: {
          type: 'object',
          properties: {
            userId: {
              type: 'string',
              description: 'The ID of the user who uploaded the record',
            },
            student_id: {
              type: 'string',
              description: 'The ID of the student',
            },
            full_name: {
              type: 'string',
              description: 'The full name of the student',
            },
            level: {
              type: 'string',
              description: 'The level of the student',
            },
            semester: {
              type: 'string',
              description: 'The semester of the student',
            },
            cgpa: {
              type: 'string',
              description: 'The CGPA of the student',
            },
            courses: {
              type: 'object',
              description: 'A map of course codes to grades',
              additionalProperties: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
  apis: ['src/routes/*.ts'], // files to scan for annotations
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

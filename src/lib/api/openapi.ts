import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';
import { registerUserDocs } from '@/features/users/user.openapi';

const registry = new OpenAPIRegistry();

// Register Feature Docs
registerUserDocs(registry);

export function getOpenApiDocument() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      title: 'Next.js Modular API',
      version: '1.0.0',
      description: 'API Documentation for User Module & Auth',
    },
    servers: [{ url: '/' }],
  });
}

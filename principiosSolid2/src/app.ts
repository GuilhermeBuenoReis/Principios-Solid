import fastify from 'fastify';
import { appRoutes } from './http/routes';
import { ZodError } from 'zod';
import { env } from './env';

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, request, replay) => {
  if (error instanceof ZodError) {
    return replay
      .status(400)
      .send({ message: 'Validation Error.', issues: error.format() });
  }

  if (env.NODE_ENV != 'production') {
    console.error(error);
  } else {
    //TODO
  }
  return replay.status(500).send({
    message: 'Internal Server Error',
  });
});

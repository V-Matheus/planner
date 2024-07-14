import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import dayjs from 'dayjs';

export async function createTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/trips',
    {
      schema: {
        body: z.object({
          destination: z.string().min(4),
          starts_at: z.coerce.date(),
          ends_at: z.coerce.date(),
        }),
      },
    },
    async (request) => {
      const { destination, ends_at, starts_at } = request.body;

      if (
        dayjs(starts_at).isBefore(new Date()) ||
        dayjs(ends_at).isBefore(starts_at)
      ) {
        throw new Error('Invalid trip start date.');
      }

      const trip = await prisma.trip.create({
        data: {
          destination,
          ends_at,
          starts_at,
        },
      });

      return {
        tripId: trip.id,
      };
    },
  );
}

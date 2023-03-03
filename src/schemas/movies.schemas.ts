import { optional, z } from "zod";

const movieSchema = z.object({
  name: z.string().min(1).max(50),
  description: optional(z.string().max(500)).nullable(),
  duration: z.number().int().positive(),
  price: z.number().int().positive(),
});

const returnMovieSchema = movieSchema.extend({
  id: z.number(),
});
const returnList = returnMovieSchema.array();

const returnListMoviesSchema = z.object({
  nextPage: optional(z.string().max(500)).nullable(),
  prevPage: optional(z.string().max(500)).nullable(),
  count: z.number().int(),
  data: returnList,
});

const movieUpdateSchema = movieSchema.partial();

export {
  movieSchema,
  returnMovieSchema,
  returnList,
  returnListMoviesSchema,
  movieUpdateSchema,
};

import { DeepPartial } from "typeorm/index";
import { z } from "zod";
import { Movie } from "../entities/movies.entity";
import {
  movieSchema,
  returnListMoviesSchema,
  returnMovieSchema,
} from "../schemas/movies.schemas";

type IMovieRequest = z.infer<typeof movieSchema>;
type IMovieReturn = z.infer<typeof returnMovieSchema>;
type IAllMoviesReturn = z.infer<typeof returnListMoviesSchema>;
type IMovieUpdate = DeepPartial<Movie>;

export { IMovieRequest, IMovieReturn, IAllMoviesReturn, IMovieUpdate };

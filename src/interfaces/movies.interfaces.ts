import { DeepPartial } from "typeorm/index";
import { z } from "zod";
import {
  movieSchema,
  returnListMoviesSchema,
  returnMovieSchema,
} from "../schemas/movies.schemas";

type IMovieRequest = z.infer<typeof movieSchema>;
type IMovieReturn = z.infer<typeof returnMovieSchema>;
type IAllMoviesReturn = z.infer<typeof returnListMoviesSchema>;
type IMovieUpdate = DeepPartial<IMovieRequest>;

export { IMovieRequest, IMovieReturn, IAllMoviesReturn, IMovieUpdate };

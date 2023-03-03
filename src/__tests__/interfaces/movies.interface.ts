import { DeepPartial, Repository } from 'typeorm';
import { z } from 'zod';
import { Movie } from '../../entities/movies.entity';
import { movieSchema } from '../../schemas/movies.schemas';

type iMovieCreate = z.infer<typeof movieSchema>;
type iMovieUpdate = DeepPartial<Movie>;
type iMovieRepo = Repository<Movie>;

export { iMovieCreate, iMovieUpdate, iMovieRepo };
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movies.entity";
import { IMovieReturn, IMovieUpdate } from "../../interfaces/movies.interfaces";
import { returnMovieSchema } from "../../schemas/movies.schemas";

// src/__tests__/integration/update.route.spec.ts
// × Success: Must be able to update a movie - Partial information (34 ms)

const updateMovieService = async (
  newMovieData: IMovieUpdate,
  movieId: number
): Promise<IMovieReturn> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const oldMovieData = await movieRepository.findOneBy({
    id: movieId,
  });

  const movie = movieRepository.create({
    ...oldMovieData,
    ...newMovieData,
  });

  await movieRepository.save(movie);

  const updatedMovie = returnMovieSchema.parse(movie);

  return updatedMovie;
};

export default updateMovieService;

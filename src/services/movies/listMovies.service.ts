import { FindManyOptions, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movies.entity";
import { IAllMoviesReturn } from "../../interfaces/movies.interfaces";
import { returnList } from "../../schemas/movies.schemas";

const listMoviesService = async (data: any): Promise<IAllMoviesReturn> => {
  const { page, perPage, sort, order } = data;

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  let pageResult: number = page && parseInt(page) > 0 ? parseInt(page) : 1;

  let perPageResult: number =
    perPage && parseInt(perPage) > 0 ? parseInt(perPage) : 5;

  if (perPageResult > 5) {
    perPageResult = 5;
  }

  let sortResult: string = sort === "price" || sort === "duration" ? sort : "id";

  let orderResult: string = order === "asc" || order === "desc" ? order : "ASC";

  if (sortResult === "id" || sort === null) {
    orderResult = "ASC";
  }

  const findOptions: FindManyOptions<Movie> = {
    take: perPageResult,
    skip: perPageResult * (pageResult - 1),
    order: {
      [sortResult]: orderResult,
    },
  };

  const [movies, count] = await movieRepository.findAndCount(findOptions);

  const totalPages = Math.ceil(count / perPageResult);

  const result: IAllMoviesReturn = {
    nextPage:
      pageResult < totalPages
        ? `http://localhost:3000/movies?page=${
            pageResult + 1
          }&perPage=${perPageResult}`
        : null,
    prevPage:
      pageResult > 1
        ? `http://localhost:3000/movies?page=${
            pageResult - 1
          }&perPage=${perPageResult}`
        : null,
    count,
    data: returnList.parse(movies),
  };

  return result;
};

export default listMoviesService;

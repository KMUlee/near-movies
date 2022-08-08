import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const getMovieData = async (query) => {
  const { results } = await (
    await fetch(`/movie/&query=${query}&page=1&include_adult=false`)
  ).json();
  return results;
};

const Poster = ({ name, rank, audiAcc }) => {
  const [results, setResults] = useState();
  const router = useRouter();
  const onClick = (id, title, poster_path) => {
    router.push(
      {
        pathname: `/movies/${title}/${id}`,
        query: {
          poster_path,
          audiAcc,
        },
      },
      `/movies/${title}/${id}`
    );
  };
  useEffect(() => {
    (async () => {
      let query = name.split(" ").join("+");
      let result;
      while (true) {
        result = await getMovieData(query);
        if (result.length !== 0) {
          break;
        } else {
          query = query.substr(0, query.length - 1);
        }
      }

      result?.sort(function (a, b) {
        if (a.release_date > b.release_date) {
          return -1;
        } else if (a.release_date > b.release_date) {
          return 1;
        } else {
          return 0;
        }
      });
      setResults(result[0]);
    })();
  }, []);
  return (
    <div
      onClick={() =>
        onClick(results.id, name.split(" ").join("+"), results.poster_path)
      }
      className="movie"
    >
      {results && (
        <img src={`https://image.tmdb.org/t/p/w500${results.poster_path}`} />
      )}
      <div className="poster">
        <h1>{rank <= 3 ? rank : ""}</h1>
      </div>
      <h4>
        <Link
          href={{
            pathname: `/movies/${name.split(" ").join("+")}/${results?.id}`,
            query: {
              poster_path: results?.poster_path,
              audiAcc,
            },
          }}
          as={`/movies/${name.split(" ").join("+")}/${results?.id}`}
        >
          <a>{name}</a>
        </Link>
      </h4>

      <style jsx global>{`
        .movie {
          text-align: center;
        }

        .movie img {
          max-width: 70%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }

        .poster {
          position: relative;
        }

        .poster h1 {
          color: white;
          font-size: 10rem;
          position: absolute;
          right: 15%;
          bottom: -170px;
          text-shadow: rgba(0, 0, 0, 0.8) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }

        .movie h4 {
          font-size: 22px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Poster;

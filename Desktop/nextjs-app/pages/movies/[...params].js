import { useRouter } from "next/router";
import Seo from "../../components/Seo";

export default function Details({ params, movieData }) {
  const router = useRouter();
  const [title, id] = params || [];
  const movieName = title.split("+").join(" ");
  const audiAcc =
    router.query.audiAcc.length >= 5
      ? router.query.audiAcc.slice(0, -4) +
        "만 " +
        router.query.audiAcc.slice(-4)
      : router.query.audiAcc;

  return (
    <div className="movie">
      <Seo title={movieName} />
      <img src={`https://image.tmdb.org/t/p/w500${router.query.poster_path}`} />
      <h4>{movieName}</h4>
      <div>
        <h4>개봉일 : {movieData.release_date}</h4>
        <h4>
          유저 평가(투표수) :
          {` ${movieData.vote_average}(${movieData.vote_count})`}
        </h4>
        <h4>누적 관객수 : {audiAcc}명</h4>
      </div>
      <style jsx>
        {`
          .description {
            display: flex;
            flex-flow: row wrap;
          }

          .movie {
            display: grid;
            grid-template-columns: 1fr;
            place-items: center;
            padding: 20px;
          }

          .movie img {
            max-width: 200px;
            border-radius: 12px;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
          }
          .movie h4 {
            font-size: 18px;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
}

export async function getServerSideProps({ params: { params } }) {
  const { release_date, vote_average, vote_count } = await (
    await fetch(`http://localhost:3000/movies/${params[1]}`)
  ).json();

  const movieData = { release_date, vote_average, vote_count };
  return {
    props: { params, movieData },
  };
}

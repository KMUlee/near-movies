import Seo from "../components/Seo";
import { wrapper } from "../store";
import Poster from "../components/Poster";
import cookies from "next-cookies";

// Date format
const DateFormat = (y, m, d) =>
  y +
  m.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false }) +
  d.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });

// get daily BoxOffice List with api
const getDailyBoxOfficeList = async (nation = "entire", multi = "entire") => {
  let today = new Date();
  today.setDate(today.getDate() - 1);
  const targetDt = DateFormat(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  const repNationCd = nation == "entire" ? "" : `&repNationCd=${nation}`;
  const multiMovieYn = multi == "entire" ? "" : `&multiMovieYn=${multi}`;

  const {
    boxOfficeResult: { dailyBoxOfficeList },
  } = await (
    await fetch(
      `http://localhost:3000/movies/daily/&targetDt=${targetDt}${repNationCd}${multiMovieYn}`
    )
  ).json();
  return dailyBoxOfficeList;
};

// get weekly BoxOffice List with api
const getWeeklyBoxOfficeList = async (nation = "entire", multi = "entire") => {
  let today = new Date();
  today.setDate(today.getDate() - 8);
  const targetDt = DateFormat(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  const repNationCd = nation == "entire" ? "" : `&repNationCd=${nation}`;
  const multiMovieYn = multi == "entire" ? "" : `&multiMovieYn=${multi}`;

  const {
    boxOfficeResult: { weeklyBoxOfficeList },
  } = await (
    await fetch(
      `http://localhost:3000/movies/weekly/&targetDt=${targetDt}${repNationCd}${multiMovieYn}`
    )
  ).json();
  return weeklyBoxOfficeList;
};

export default function Home({ movies }) {
  const mvNameArray = movies.map((movie) => movie.movieNm);
  const mvAudiAccArray = movies.map((movie) => movie.audiAcc);
  console.log(mvAudiAccArray);
  return (
    <div className="container">
      <Seo title="Home" />
      <div>
        <div>
          {mvNameArray?.map((name, index) => {
            return (
              <Poster
                key={name}
                name={name}
                rank={index + 1}
                audiAcc={mvAudiAccArray[index]}
              />
            );
          })}
        </div>
        <style jsx global>{`
          .container {
            display: grid;
            grid-template-columns: 1fr;
            place-items: center;
            padding: 20px;
          }
        `}</style>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  console.log(cookies(ctx));
  let nation = "";
  const multi = cookies(ctx).multi;

  switch (cookies(ctx).nation) {
    case "korea":
      nation = "K";
      break;
    case "foreign":
      nation = "F";
      break;
    default:
      nation = "entire";
      break;
  }

  const boxOffice =
    cookies(ctx).boxOffice === undefined
      ? false
      : JSON.parse(cookies(ctx).boxOffice);

  console.log(boxOffice, nation, multi);

  const movies = boxOffice
    ? await getWeeklyBoxOfficeList(nation, multi)
    : await getDailyBoxOfficeList(nation, multi);

  return {
    props: { movies },
  };
};

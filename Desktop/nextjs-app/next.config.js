/** @type {import('next').NextConfig} */

const dbApiKey = process.env.DB_API_KEY;
const apiKey = process.env.API_KEY;

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: `/movie/:path*`,
        destination: `https://api.themoviedb.org/3/search/movie?api_key=${dbApiKey}&language=kr:path*`,
      },
      {
        source: `/movies/:id`,
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${dbApiKey}&language=kr`,
      },
      {
        source: `/movies/daily/:params*`,
        destination: `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apiKey}:params*`,
      },
      {
        source: `/movies/weekly/:params*`,
        destination: `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${apiKey}:params*`,
      },
    ];
  },
};

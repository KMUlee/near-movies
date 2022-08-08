import LayOut from "../components/Layout";
import "../styles/globals.css";
import { wrapper } from "../store";
const App = ({ Component, pageProps }) => {
  return (
    <>
      <LayOut>
        <Component {...pageProps} />
      </LayOut>
    </>
  );
};

export default wrapper.withRedux(App);

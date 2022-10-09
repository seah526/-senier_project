import "../styles/globals.css";
import Navbars from "../components/Layout/Navbars";
function MyApp({ Component, pageProps }) {
  return (
    <Navbars>
      <Component {...pageProps} />
    </Navbars>
  );
}

export default MyApp;

import "../styles/globals.css";
import Navbars from "../components/Layout/Navbars";
import { useEffect, useState } from 'react';
function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  } else {
    return (
      <Navbars>
        <Component {...pageProps} />
      </Navbars>
    );
  }
  
}

export default MyApp;

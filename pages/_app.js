import AppLayout from 'components/AppLayout';
import '../styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default App;

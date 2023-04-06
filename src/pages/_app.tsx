import "styles/globals.css";
import type { AppProps } from "next/app";
import wrapper from "@/store";
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import muiTheme from '@/styles/muiTheme';
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/utils/styles/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <MuiThemeProvider theme={muiTheme}>
        <Component {...pageProps} />
      </MuiThemeProvider>
    </CacheProvider>
  )
}

export default wrapper.withRedux(App);

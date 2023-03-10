import React from "react";
import Header from "./header"
import Footer from "./Layouts/footer"
import type { ReactNode } from "react"
// import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { isDarkModeAtom } from '@/data/atoms';
import { useRecoilValue } from "recoil";

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });



export default function Layout({ children }: { children: ReactNode }) {

  const isDarkMode = useRecoilValue(isDarkModeAtom);



  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
        },
      }),
    [isDarkMode],
  );
  
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header/>
      <main >{children}</main>
      <Footer />
    </ThemeProvider>
  )
}
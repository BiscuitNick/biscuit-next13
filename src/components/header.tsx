import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/react"
import Switch from "@mui/material/Switch";
// import Button from '@mui/material/Button';
import { isDarkModeAtom } from '@/data/atoms';
import { useRecoilState } from "recoil";

export default function Header() {

  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkModeAtom);


  const HeaderLinks = [
    { label: "Home", href: "/" },
    { label: "Words", href: "/words" },
    { label: "Dice", href: "/dice" },
    { label: "X-Ordle", href: "/xordle" },
  ];

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>

      <nav
        style={{
          display: "grid",
          gridAutoFlow: "column",
          justifyContent: "space-around",
          padding: 5,
          height: 40,
          boxSizing: "border-box",
        }}
      >
        {HeaderLinks.map((link, index) => (
          <div
            key={index}
            style={{ color: isDarkMode ? "white" : "black" }}
          >
            <Link href={link.href}>{link.label}</Link>{" "}
          </div>
        ))}

        <Switch
          checked={isDarkMode}
          onChange={() => setIsDarkMode(!isDarkMode)}
          inputProps={{ "aria-label": "controlled" }}
          style={{ margin: "auto" }}
        />
      </nav>
    </header>
  );
}

/* <div >
        <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div> */

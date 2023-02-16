import Image from 'next/image'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>

        <div>
          <Link
            href="/"
            // target="_blank"
            rel="noopener noreferrer"
          >
            Powered By{' '}
            <Image
              src="/assets/biscuitland/favicon-32x32.png"
              alt="Biscuit Land"
              className={styles.vercelLogo}
              width={32}
              height={32}
              priority
            />
          </Link>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/assets/biscuitland/192x192.png"
          alt="Biscuit Land Logo"
          width={192}
          height={192}
          priority
        />
      </div>

      <div className={styles.grid}>
        <Link
          href="/docs"
          className={styles.card}
          // target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Docs <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            View documentation  
          </p>
        </Link>

        <Link
          href="/templates"
          className={styles.card}
        >
          <h2 className={inter.className}>
            Templates <span>-&gt;</span>
          </h2>
          <p className={inter.className}>Explore our templates</p>
        </Link>

        <a
          href="/about"
          className={styles.card}
        >
          <h2 className={inter.className}>
            About <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Learn more about Biscuit Land
          </p>
        </a>
      </div>
    </main>
  )
}

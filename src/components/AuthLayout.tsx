import Link from "next/link";
import styles from "./AuthLayout.module.css";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.page}>
      <Link href="/" className={styles.logo}>
        <img src="/logo-light.svg" alt="agent1o1" className={styles.logoImg} />
      </Link>

      <div className={styles.clerkWrap}>
        {children}
      </div>
    </div>
  );
}

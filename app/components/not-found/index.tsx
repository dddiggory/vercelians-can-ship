import Link from "next/link";
import {Block} from "../block";
import styles from "./not-found.module.css";

export function NotFound({username}: {username: string}) {
  return (
    <div className={styles.wrapper}>
      <Block className={styles.header} variant="light-gray">
        <h1>Profile not found</h1>
        <p>
          Are you sure <strong>{username}</strong> is your correct GitHub
          Username?
        </p>
      </Block>
      <Block>
        <p>
          Check{" "}
          <Link
            href="https://github.com/settings/profile"
            className="underline text-blue-800 dark:text-blue-300"
            target="_blank"
          >
            https://github.com/settings/profile
          </Link>{" "}
          to confirm, then update it at the top of{" "}
          <code className="font-mono font-bold">app/page.tsx</code>.
        </p>
      </Block>
    </div>
  );
}

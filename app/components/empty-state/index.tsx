import Link from "next/link";
import {Block} from "../block";
import styles from "./empty-state.module.css";

export function EmptyState() {
  return (
    <div className={styles.wrapper}>
      <Block variant="light-gray" className={styles.header}>
        <h1>Welcome!</h1>
        <p>This is a starting point for your personal Vercelian info page.</p>
      </Block>
      <Block>
        <p>
          Start by visiting the{" "}
          <Link
            href="https://github.com/dddiggory/vercelians-can-ship#welcome-vercelian"
            target="_blank"
          >
            Template repo on GitHub
          </Link>
          . Follow the instructions in the Readme to make your own copy and
          deploy it to Vercel.
        </p>
      </Block>
      <Block>
        <p>
          For some personalized starter content, go to <code>app/page.tsx</code>{" "}
          and insert your GitHub username into the slot on Line 1.
        </p>
      </Block>
      <Block variant="light-gray" className={styles.ship}>
        <span className={styles.icon}>🚢</span>
        <span>Happy shipping!</span>
      </Block>
    </div>
  );
}

import {getGithubProfile} from "@/lib/get-github-profile";
import {Block} from "../block";
import styles from "./main-content.module.css";
import Image from "next/image";
import Link from "next/link";

export async function MainContent({username, geo}: {username: string}) {
  const profileData = await getGithubProfile(username);

  return (
    <div className={styles.grid}>
      <Block className={styles.header} variant="medium-gray">
        <h1 className={styles.title}>
          <span>Welcome to the Vercelian profile page of </span>
          <strong>{profileData.name}</strong>
        </h1>
      </Block>

      <Block className={styles.avatar}>
        {/* TODO: placeholder avatar w/ initials */}
        {profileData.avatar_url ? (
          <Image
            className={styles.img}
            src={profileData.avatar_url}
            height={128}
            width={128}
            alt="a picture of the developer of this page"
          />
        ) : null}
      </Block>

      <Block className={styles.location} variant="green">
        {/* TODO: add background */}
        <div>
          {/* TODO: add icon */}
          <span className={styles.icon}>icon</span>
          {/* TODO: handle no city */}
          <h3>
            You're visiting from beautiful <strong>New York, NY</strong>.
          </h3>
          {/* TODO: conditional */}
          <span>
            Known to some as <br /> <strong>Wall Street</strong>.
          </span>
        </div>
        <p>
          Via{" "}
          <Link href="https://nextjs.org/docs/app/building-your-application/routing/middleware">
            Next.js Middleware
          </Link>
          .
          <br />
          Refresh the page to generate a fresh nickname.
        </p>
      </Block>

      <Block className={styles.info}>
        <div>
          icon{" "}
          <span>
            <Link href={`https://github.com/${username}`}>{username}</Link>
            <br />
            20 public repos
          </span>
        </div>
        <div>
          icon <span>location</span>
        </div>
        <div>
          icon <Link href="https://vercel.com/home">@vercel</Link>
        </div>
      </Block>

      <Block className={styles.v0} variant="light-gray">
        {/* TODO: plug in v0 component */}
        <h3>
          This would be a pretty good place for a{" "}
          <Link href="https://v0.dev/">v0 component</Link>, wouldn't it?
        </h3>
        <p>
          Go make one, then paste it into{" "}
          <code>app/components/MyV0Component.tsx</code>
        </p>

        {/* TODO: add v0 icon */}
      </Block>

      <Block className={styles.github} variant="purple">
        <div>
          {/* TODO: add icon */}
          {/* TODO: add date + datetime */}
          <span>
            <Link href={`https://github.com/${username}`}>{username}</Link>{" "}
            created a GitHub account on <time>date</time>.
          </span>
        </div>
        <span className={styles.h3}>
          {/* TODO: plug in number */}
          That's <strong>3,397 days of shipping</strong>, and counting!
        </span>
      </Block>

      <Block className={styles.vercel} variant="inverted">
        ▲
      </Block>

      <Block className={styles["powered-by"]}>
        Powered by next.js on vercel
      </Block>
    </div>
  );
}

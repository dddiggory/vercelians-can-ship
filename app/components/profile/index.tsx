import {getGithubProfile} from "@/lib/get-github-profile";
import {Block} from "../block";
import styles from "./profile.module.css";
import Image from "next/image";
import Link from "next/link";
import {Topography} from "./topography";
import {
  BuildingsIcon,
  GitHubIcon,
  GlobeIcon,
  LocationIcon,
  NextJsLogo,
  PullRequestIcon,
  VercelLogo,
} from "../symbols";
import MyV0Component from "../MyV0Component";
import {handleDate} from "@/lib/utils";

export async function Profile({
  username,
  geo,
}: {
  username: string;
  geo: {
    city?: string;
    country?: string;
    cityNickname?: string;
    region?: string;
  };
}) {
  const profileData = await getGithubProfile(username);

  if (profileData?.message?.startsWith("API rate limit exceeded")) {
    return `Rate limit for the GitHub API has been exceeded. Please wait a few moments and try again.`;
  }

  const {public_repos, name, location, company, created_at, login, html_url} =
    profileData ?? {};

  const daysOfShipping = handleDate(created_at).diffDays;

  const {city, country, cityNickname, region} = geo ?? {};

  const firstName = name.split(" ")[0];
  const restOfName = name.split(" ").slice(1).join(" ");

  return (
    <div className={styles.grid}>
      <Block className={styles.header} variant="medium-gray">
        <h1 className={styles.title}>
          <span>Welcome to the Vercelian profile page of </span>
          <strong>
            {firstName}
            <br />
            {restOfName}
          </strong>
        </h1>
      </Block>

      <Block className={styles.avatar}>
        {profileData.avatar_url ? (
          <div className={styles.img}>
            <Image
              src={profileData.avatar_url}
              fill
              alt="a picture of the developer of this page"
            />
          </div>
        ) : (
          <div className={styles.emoji}>😊</div>
        )}
      </Block>

      <Block className={styles.location} variant="green">
        <div aria-hidden className={styles.bg}>
          <Topography />
          <Topography />
        </div>

        <div>
          <span className={styles.icon}>
            <LocationIcon />
          </span>

          {city && city !== "undefined" ? (
            <>
              <h3>
                You're visiting from beautiful{" "}
                <strong>
                  {city}, {region}
                </strong>
                .
              </h3>
              {cityNickname && cityNickname !== "undefined" ? (
                <>
                  <span className={styles.mobile}>
                    Known to some as <strong>{cityNickname}</strong>.
                  </span>
                  <span className={styles.desktop}>
                    Known to some as <br />
                    <strong>{cityNickname}</strong>.
                  </span>
                </>
              ) : null}
            </>
          ) : (
            <p>
              Middleware wasn't able to geolocate your IP. You may want to try a
              different device or network.
            </p>
          )}
        </div>
        {city && city !== "undefined" ? (
          <p className={styles.details}>
            Via{" "}
            <Link
              href="https://nextjs.org/docs/app/building-your-application/routing/middleware"
              target="_blank"
            >
              Next.js Middleware
            </Link>
            .
            <br />
            {cityNickname && cityNickname !== "undefined"
              ? "Refresh the page to generate a fresh nickname."
              : `We don't have a fun nickname on file for ${city}, but I'm sure
            it's lovely :)`}
          </p>
        ) : null}
      </Block>

      <Block className={styles.info}>
        <div>
          <span className={styles.icon}>
            <GitHubIcon />
          </span>
          <span>
            <Link href={html_url} target="_blank">
              {login}
            </Link>
            <br />
            {public_repos} public repos
          </span>
        </div>
        {location ? (
          <div>
            <span className={styles.icon}>
              <GlobeIcon />
            </span>

            <Link
              href={`https://en.wikipedia.org/wiki/${location}`}
              target="_blank"
            >
              {location}
            </Link>
          </div>
        ) : null}

        {company ? (
          <div>
            <span className={styles.icon}>
              <BuildingsIcon />
            </span>
            <Link
              href={`https://duckduckgo.com/?q=!ducky+${profileData.company.replace(
                "@",
                ""
              )}`}
              target="_blank"
            >
              {company}
            </Link>
          </div>
        ) : null}
      </Block>

      <Block className={styles.v0} variant="light-gray">
        <MyV0Component />
      </Block>

      <Block className={styles.github} variant="purple">
        <div>
          <PullRequestIcon />
          <span>
            <Link href={html_url} target="_blank">
              {login}
            </Link>{" "}
            created a GitHub account on{" "}
            <time dateTime={created_at}>
              {handleDate(created_at).formattedDate}
            </time>
            .
          </span>
        </div>
        <span className={styles.h3}>
          That's{" "}
          <strong>
            {daysOfShipping.toLocaleString()}{" "}
            {daysOfShipping === 1 ? "day" : "days"} of shipping
          </strong>
          , and counting!
        </span>
      </Block>

      <Block className={styles.vercel} variant="inverted">
        ▲
      </Block>

      <Block className={styles["powered-by"]}>
        <div>
          <span>Powered by</span>
          <NextJsLogo />
        </div>
        <div>
          <span>on</span>
          <VercelLogo />
        </div>
      </Block>
    </div>
  );
}

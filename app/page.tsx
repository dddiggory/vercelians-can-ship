const yourGithubUsername = "dddiggory"; //<---for an initial starting point, insert your github username between
//the double quotes here.  Letter casing doesn't matter.

//During the workshop, leave the code below as-is. But when you're ready, don't be afraid to jump in, make edits, try new things, and make it your own!
import Image from "next/image";
import Link from "next/link";
import Suspense from "react";
// import map from '../public/map.svg';
// import vercelLight from '../public/vercel-icon-light.svg';
// import vercelDark from '../public/vercel-icon-dark.svg';
import MyV0Component from "@/components/MyV0Component";
import {EmptyState} from "./components/empty-state";
import {NotFound} from "./components/not-found";
import {MainContent} from "./components/main-content";
import {getGithubProfile} from "./lib/get-github-profile";
import styles from "./page.module.css";

const githubToken = process.env.GITHUB_TOKEN ? process.env.GITHUB_TOKEN : false;

export default async function Home(
  url: any,
  city: any,
  region: any,
  country: any,
  cityNickname: any
) {
  const profileData = await getGithubProfile(yourGithubUsername);

  // @ts-nocheck
  const geo = url.searchParams;

  const getContent = () => {
    if (!profileData) {
      return <EmptyState />;
    }
    if (profileData === "not-found") {
      return <NotFound username={yourGithubUsername} />;
    }
    return <MainContent username={yourGithubUsername} geo={geo} />;
  };

  // TODO: move main + styles to layout instead
  return <main className={styles.main}>{getContent()}</main>;
}

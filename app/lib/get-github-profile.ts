type ReqHeaders = {
  Authorization?: string;
};

let reqHeaders: ReqHeaders = {};

export async function getGithubProfile(yourGithubUsername: string) {
  if (!yourGithubUsername) {
    return false;
  }
  const github_profile_url =
    "https://api.github.com/users/" + yourGithubUsername;
  const res = await fetch(github_profile_url, {
    method: "GET",
    headers: reqHeaders,
    next: {
      revalidate: 3600,
    },
  });
  const githubProfile = await res.json();
  // console.log(githubProfile);
  if (githubProfile.message === "Not Found") {
    return "not-found";
  }
  if (!githubProfile.name && githubProfile.login) {
    githubProfile.name = githubProfile.login;
  }
  return githubProfile;
}

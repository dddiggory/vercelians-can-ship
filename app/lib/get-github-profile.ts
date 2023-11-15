export async function getGithubProfile(ghUsername: string) {
  if (!ghUsername) {
    return false;
  }

  const res = await fetch(`https://api.github.com/users/${ghUsername}`, {
    method: 'GET',
    next: {
      revalidate: 3600,
    },
  });

  const githubProfile = await res.json();

  if (githubProfile.message === 'Not Found') {
    return 'not-found';
  }

  if (!githubProfile.name && githubProfile.login) {
    githubProfile.name = githubProfile.login;
  }

  return githubProfile;
}

// For an initial starting point, insert your GitHub username between the double quotes here.
// Letter casing doesn't matter.
const yourGithubUsername = '';

// During the workshop, leave the code below as-is.
// But when you're ready, don't be afraid to jump in, make edits, try new things, and make it your own!
import { EmptyState } from './components/empty-state';
import { NotFound } from './components/not-found';
import { Profile } from './components/profile';
import { getGithubProfile } from './lib/get-github-profile';

export default async function Home({ searchParams }: { searchParams: any }) {
  const profileData = await getGithubProfile(yourGithubUsername);

  if (!profileData) {
    return <EmptyState />;
  }

  if (profileData === 'not-found') {
    return <NotFound username={yourGithubUsername} />;
  }

  return <Profile username={yourGithubUsername} searchParams={searchParams} />;
}

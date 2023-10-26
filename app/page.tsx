const yourGithubUsername = "joethehuman"; //<---for an initial starting point, insert your github username between 
//the double quotes here.  Letter casing doesn't matter.


//During the workshop, leave the code below as-is. But when you're ready, don't be afraid to jump in, make edits, try new things, and make it your own!
import Image from 'next/image';
import Link from 'next/link';
// import map from '../public/map.svg';
import MyV0Component from './components/MyV0Component'

let getRandomVercelian = false;
// const githubToken = process.env.GITHUB_TOKEN;
const githubToken = process.env.GITHUB_TOKEN ? process.env.GITHUB_TOKEN : false;
type ReqHeaders = {
    Authorization?: string;
};
let reqHeaders: ReqHeaders = {};

async function getGithubProfile(yourGithubUsername: string) {
  if (!yourGithubUsername) {
    return false;
  }
  const github_profile_url = "https://api.github.com/users/"+yourGithubUsername
  const res = await fetch(github_profile_url, {
    method: 'GET',
    headers: reqHeaders,
    next: {
      revalidate: 3600
    }
  })
  const githubProfile = await(res.json());
  // console.log(githubProfile);
  if (githubProfile.message === "Not Found") {
    return "not-found";
  }
  return githubProfile;
  
}

const handleDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  const formattedDate = monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return { formattedDate, diffDays };
}


export default async function Home(url: any, city: any, region: any, country: any, cityNickname: any) {

  const profileData = await getGithubProfile(yourGithubUsername);
  const daysOfShipping = handleDate(profileData.created_at).diffDays
  
  // @ts-nocheck
  const geo = url.searchParams
  console.log(geo);
  city = geo.city || undefined
  country = geo.country || undefined
  cityNickname = geo.cityNickname || undefined
  region = geo.region || undefined
  let cityWiki = "https://en.wikipedia.org/wiki/"+city+", "+region
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 lg:p-24">
      
      <div>
        {!profileData ? (
          <div>
            <p className="fixed left-0 top-0 w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          
            Welcome!  This is a starting point for your personal Vercelian info page.
            Start by visiting <a href="https://github.com/dddiggory/vercelians-can-ship#welcome-vercelian" target="_blank" className="underline text-blue-800">&apos;the Template repo on Github&apos;</a>. Follow the instructions in the Readme to make your own copy and deploy it to Vercel.
            <p className="pt-3">For some personalized starter content, go to <code className="font-mono font-bold">app/page.tsx</code> and insert your work email into the slot on Line 1.  <br />Happy shipping! 🚢
            </p>
          </p>
            
          </div>
        ) : profileData === 'not-found' ? (
          <h1>Profile not found! Are you sure {yourGithubUsername} is your correct Github Username?</h1>
        ) : (
          <div className="text-center py-4 px-4 bg-slate-100 rounded-lg border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            <div className="grid grid-cols-1 lg:grid-cols-5">
               <div className="col-span-1 min-w-[150px] px-4 sm:self-center mx-auto">
                {profileData.avatar_url ? (
                    <img 
                    src={profileData.avatar_url}
                    alt="Github profile picture of user"
                    width={150}
                    height={200}
                    className="rounded-full min-w-full outline outline-3 md:outline-4 outline-neutral-800" />
                  ) : (
                    <Image 
                    src="/vercel.png"
                    width={150}
                    height={100}
                    alt="Placeholder picture for user without profile picture uploaded"
                    className="outline-2 rounded-full outline-black self-end pr-5" />
                  )}
                </div>
                <div className="col-span-4 text-center pt-5 lg:pt-0 lg:text-left">
                 <h1 className="text-2xl lg:text-3xl">
                 Welcome to <br className="inline md:hidden" /> 
                  <span className="font-semibold text-emerald-600">{profileData.name}&apos;s</span> Vercelian profile page, <br /> <span className="text-base lg:text-3xl">powered by
                 <Image
                  className="w-16 md:w-28 inline dark:drop-shadow-[0_0_0.3rem_#ffffff70] ml-2 md:mx-4 my-4 align-middle dark:invert"
                  src="/next.svg"
                  alt="Next.js Logo"
                  width={0}
                  height={0}
                  priority
                /> on 
                <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className="w-16 md:w-28 inline ml-2 md:ml-4 mr-1 dark:invert"
                width={0}
                height={0}
                priority
              />.</span>
                </h1>
                <div className="text-md w-full md:w-1/2 pt-0 grid gap-y-1 grid-cols-2 sm:grid-cols-2">
                    {profileData.location ? (<div className="flex items-center">
                        <Link className="underline text-blue-500" href={"https://en.wikipedia.org/wiki/"+profileData.location} target="_blank">
                          <Image className="inline my-auto mx-1" src="globe-icon.svg" height="15" width="15" alt="globe icon"/>
                          {profileData.location}
                        </Link>
                      </div>) : null}
                    {profileData.company ? (
                      <div className="flex items-center">
                        <Link className="underline text-blue-500" href={"https://"+profileData.company.replace("@","")+".com/"} target="_blank">
                          <Image className="inline my-auto mx-1" src="building-icon.svg" height="15" width="15" alt="globe icon"/>
                          {profileData.company}
                        </Link>
                      </div>) : null}
                    <div className="flex items-center col-span-2">
                      <Link className="underline text-blue-500" target="_blank" href={profileData.html_url}>
                        <Image 
                        src="/github.png"
                        alt="Github profile link"
                        width={20}
                        height={80}
                        className="inline dark:hidden"
                        />
                        <Image 
                        src="/github-white.png"
                        alt="Github search"
                        width={20}
                        height={80}
                        className="hidden dark:inline"
                        />
                        <span className="pl-1">{profileData.login}</span>
                      </Link>
                      <span className="pl-1">({profileData.public_repos} public repos)</span>
                    </div>
                </div>
                <div className="my-4 text-sm md:text-lg">
                        {profileData.name} created a Github account on <br className="inline md:hidden" />{handleDate(profileData.created_at).formattedDate}. <br className="inline md:hidden" />{daysOfShipping} {daysOfShipping === 1 ? (<span>day</span>) : (<span>days</span>)} of shipping, and counting!
                </div>
            </div>
            </div>
          </div>
        )}

        {(profileData) ? (
        <div className={"grid grid-cols-8 pt-2 pb-24" + (profileData ? 'block' : 'hidden')}>
          <div className={"col-span-8 md:col-span-6"}>
            <MyV0Component />
          </div>
          <div className={"col-span-8 md:col-span-2 rounded-md border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl border bg-gray-200 p-4 lg:dark:bg-zinc-800/30"}>
            <div className="overflow-hidden rounded-md">
              <div className="bg-[url('/map.svg')] opacity-75">
              {city!=='undefined' ? (
                <div className="text-center text-sm">
                  <p className="">Next.js Middleware tells us that</p>
                  <p className="">you're visiting from beautiful</p>
                  <a href={cityWiki}>
                    <p className="font-bold text-purple-700 py-2 underline">
                      {city}, {region}!
                    </p>
                  </a>

                  {cityNickname!=='undefined' ? (
                    <div className="text-xs">
                      <p>Known by some as</p>
                      <p className="italic font-bold">"{cityNickname}"</p>
                      <p className="pt-1">Want a fresh nickname? <a href="" className="underline text-blue-500">Refresh the page</a> to generate a new one!</p>
                    </div>
                  ): null}
                </div>
              ): null}
            </div></div>
          </div>
        </div>
        ): null}
      </div>

      {/* boilerplate */}
        <div className="pt-20 flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>

        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Docs{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Find in-depth information about Next.js features and API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Learn{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Templates{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Explore the Next.js 13 playground.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Deploy{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Instantly deploy your Next.js site to a shareable URL with Vercel.
            </p>
          </a>
        </div>
    </main>
  )
}

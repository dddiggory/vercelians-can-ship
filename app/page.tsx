const yourGithubUsername = ""; //<---for an initial starting point, insert your github username between 
//the double quotes here.  Letter casing doesn't matter.

const yourCustomMessage = `
  //Between these lines, you can insert an optional message for visitors to your page!

  //end of message
`



import Image from 'next/image';
import Link from 'next/link';
import MyV0Component from './components/MyV0Component'

let getRandomVercelian = false;
// const githubToken = process.env.GITHUB_TOKEN;
const githubToken = process.env.GITHUB_TOKEN ? process.env.GITHUB_TOKEN : false;

async function getGithubProfile(yourGithubUsername: string) {
  if (!yourGithubUsername) {
    return false;
  }
  const github_profile_url = "https://api.github.com/users/"+yourGithubUsername
  const res = await fetch(github_profile_url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer '+githubToken
    },
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

export default async function Home() {

  const profileData = await getGithubProfile(yourGithubUsername);
  const daysOfShipping = handleDate(profileData.created_at).diffDays
  
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 lg:p-24">
      
      <div>
        {!profileData ? (
          <div>
            <p className="fixed left-0 top-0 w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          
            Welcome!  This is a starting point for your personal Vercelian info page.
            Start by clicking <a href="https://github.com/dddiggory/vercelians-can-code" className="underline text-blue-800">&apos;Use This Template&apos; on Github</a> to make your own copy and deploy it to Vercel.
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
          // <div className="hidden text-center flex py-4 px-4 bg-slate-100 rounded-lg border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          //   <div className="flex-auto min-w-fit">
          //     {profileData.avatar_url ? (
          //           <Image 
          //           src={profileData.photoUrl}
          //           alt="BambooHR profile picture of user"
          //           width={150}
          //           height={200}
          //           className="rounded-full outline outline-4 outline-slate-500" />
          //         ) : (
          //           <Image 
          //           src="/vercel.png"
          //           width={150}
          //           height={100}
          //           alt="Placeholder picture for user without profile picture uploaded"
          //           className="outline-2 rounded-full outline-black self-end pr-5" />
          //         )}
          //   </div>
          //   <div className="flex-auto min-w-fit ml-6 text-left">
          //       <h1 className="text-3xl">
          //       Welcome to <span className="font-semibold text-emerald-600">{profileData.preferredName}&apos;s</span> Vercelian profile page,<br /> powered by
          //       <Image
          //         className="inline dark:drop-shadow-[0_0_0.3rem_#ffffff70] mx-2 my-2 align-middle dark:invert"
          //         src="/next.svg"
          //         alt="Next.js Logo"
          //         width={70}
          //         height={8}
          //         priority
          //       /> and 
          //       <Image
          //       src="/vercel.svg"
          //       alt="Vercel Logo"
          //       className="inline mx-2 dark:invert"
          //       width={100}
          //       height={24}
          //       priority
          //     />.
          //       </h1>
          //       <p className="text-md pt-3">
          //       {profileData.preferredName} is a <span className="font-bold">{profileData.jobTitle}</span> in the {profileData.division} org, <br />working in <a href={'https://en.wikipedia.org/wiki/'+profileData.location.replace(" - Work From Home","")} className="underline text-blue-600 italic">{profileData.location.replace(" - Work From Home","")}.</a>
          //       </p>
          //       <div className="pt-4 grid grid-cols-8 w-1/5 gap-2">
          //         <div className="col-span-2">
          //           <a target="_blank" href={"https://www.google.com/search?q="+profileData.preferredName+"+"+profileData.lastName+"+vercel"}>
          //           <Image 
          //           src="/google.png"
          //           alt="Google search"
          //           width={20}
          //           height={80}
          //           className="pt-3"
          //         />
          //           </a>
          //         </div>
          //         <div className="col-span-2">
          //         <a target="_blank" href={"https://github.com/search?q="+profileData.preferredName+"+"+profileData.lastName+"&type=users"}>
          //           <Image 
          //           src="/github.png"
          //           alt="Github search"
          //           width={20}
          //           height={80}
          //           className="pt-3 block dark:hidden"
          //           />
          //           <Image 
          //           src="/github-white.png"
          //           alt="Github search"
          //           width={20}
          //           height={80}
          //           className="pt-3 hidden dark:block"
          //           />
          //         </a>
          //         </div>
          //         {/* <button onClick="randomize()">hey</button> */}
          //       </div>
          //   </div>

          // </div>
        )}

        <div className={"py-10 " + (profileData ? 'block' : 'hidden')}> 
          <MyV0Component />
        </div>
      </div>

      <div className="hidden z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed hidden left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="hidden pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
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

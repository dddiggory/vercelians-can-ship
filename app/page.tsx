const yourGithubUsername = "dddiggory"; //<---for an initial starting point, insert your github username between 
//the double quotes here.  Letter casing doesn't matter.


//During the workshop, leave the code below as-is. But when you're ready, don't be afraid to jump in, make edits, try new things, and make it your own!
import Image from 'next/image';
import Link from 'next/link';
import Suspense from 'react';
// import map from '../public/map.svg';
// import vercelLight from '../public/vercel-icon-light.svg';
// import vercelDark from '../public/vercel-icon-dark.svg';
import MyV0Component from '@/components/MyV0Component'

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
  if (!githubProfile.name && githubProfile.login) {
    githubProfile.name = githubProfile.login
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
  // console.log(geo);
  console.log(profileData);
  city = geo.city || undefined
  country = geo.country || undefined
  cityNickname = geo.cityNickname || undefined
  region = geo.regionName || undefined
  let cityWiki = "https://en.wikipedia.org/wiki/"+city+", "+region
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 lg:p-24">
        
        {
          !profileData ? (
            <div className="grid grid-cols-1">
            <div className={`col-span-1 text-2xl bg-amber-50 lg:dark:bg-zinc-800/30 space-y-2 fixed left-0 top-0 w-full p-8 justify-center border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto  lg:rounded-xl lg:border dark:bg-zinc-800/30 dark:from-inherit`}>
              <p>Welcome!  This is a starting point for your personal Vercelian info page.  <br />Start by visiting <a href="https://github.com/dddiggory/vercelians-can-ship#welcome-vercelian" target="_blank" className="underline text-blue-800 dark:text-blue-300">the Template repo on Github</a>. Follow the instructions in the Readme to make your own copy and deploy it to Vercel.</p>
              <p className="pt-3">For some personalized starter content, go to <code className="font-mono font-bold">app/page.tsx</code> and insert your Github Username into the slot on Line 1.  <br />Happy shipping! 🚢
              </p>
            </div>
            </div>

          ) 
          : profileData==="not-found" ? (
            <div className="grid grid-cols-1">
            <div className={`col-span-1 text-2xl bg-amber-50 space-y-2 fixed left-0 top-0 w-full p-8 justify-center border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto  lg:rounded-xl lg:border dark:bg-zinc-800/30 dark:from-inherit`}>
              <p>Profile not found! Are you sure {yourGithubUsername} is your correct Github Username?</p>
              <p>Check <Link href="https://github.com/settings/profile" className="underline text-blue-800 dark:text-blue-300" target="_blank">https://github.com/settings/profile</Link> to confirm, then update it at the top of <code className="font-mono font-bold">app/page.tsx</code>.</p>
              </div>
              </div>
          ) 
          : (
            //main content in completed state
            <div className="grid grid-cols-8 gap-4 mx-2 h-[120px] w-[500px] md:w-[720px] lg:w-[1000px] xl:w-[1200px] 2xl:w-[1500px] justify-center align-middle">
              <div className="col-span-5 row-span-1 rounded-3xl bg-white dark:bg-gradient-to-b from-black to-neutral-800 drop-shadow-md">
                <div className="grid grid-cols-2 lg:grid-cols-4 my-5 mx-0 pb-0">
                  <div className="flex place-self-center">
                  {profileData.avatar_url ? (
                    
                    <img 
                      src={profileData.avatar_url}
                      height="0"
                      width="0"
                      className="rounded-3xl border drop-shadow-sm w-[110px] md:w-[160px]" 
                      alt="a picture of the developer of this page" />

                  ) : (
                    null
                  )}
                  
                  </div>
                  
                  <div className={'lg:col-span-3 justify-left mt-4 align-middle'}>
                    <p className="text-xs">welcome to</p>
                    <div className={`text-4xl ${profileData.name.length <= 20 ? 'md:text-6xl lg:text-7xl' : 'md:text-6xl' } font-semibold pb-0 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent`}>
                      {profileData.name.includes(' ') ? (
                        <div>
                          <p>{profileData.name.split(' ')[0]}</p>
                          <p>{profileData.name.split(' ')[1]}&apos;s</p>
                        </div>  
                      ): (<p className="text-8xl py-7">{profileData.name}&apos;s</p>)}
                    </div>
                    <p className="text-lg">Vercelian profile page.  Powered by <Image
                      className="w-16 md:w-20 inline dark:drop-shadow-[0_0_0.3rem_#ffffff70] ml-1 md:mx-2 my-4 align-middle dark:invert"
                      src="/next.svg"
                      alt="Next.js Logo"
                      width={0}
                      height={0}
                      priority
                      /> 
                      on 
                      <Image
                        src="/vercel.svg"
                        alt="Vercel Logo"
                        className="w-16 md:w-20 inline ml-1 md:ml-2 mr-1 dark:invert"
                        width={0}
                        height={0}
                        priority
                      />.</p>
                  </div>
                </div>
              </div>
              <div className="relative flex rounded-3xl items-center justify-center col-span-2 row-span-1 drop-shadow-md bg-cover bg-white dark:bg-black dark:bg-opacity-10">
                <div className="absolute rounded-3xl inset-0 bg-cover bg-center bg-opacity-5 opacity-10 bg-[url('/topography.svg')] dark:bg-[url('/map.svg')]"></div>
                {city!=='undefined' ? (
                  <div className="bg-center drop-shadow-md mx-3 text-center text-base">
                  <a href="https://nextjs.org/docs/app/building-your-application/routing/middleware" target="_blank" className="underline text-blue-700 dark:text-blue-200 mr-1">
                    Next.js Middleware 
                  </a>
                  says that
                  you're visiting from beautiful
                  <Link href={cityWiki} target="_blank">
                    <p className="font-bold text-orange-700 hover:text-orange-300 hover:animate-pulse dark:text-red-400 text-base drop-shadow-md drop-shadow-white py-2 underline">{city}, {region}</p>
                  </Link>
                  {cityNickname!=='undefined' && cityNickname ? (
                    <div className="text-sm">
                      <p>Known to some as</p>
                      <p className="italic text-base font-bold">"{cityNickname}"!</p>
                      <p className="pt-1">
                        Want a fresh nickname? <a href="" className="underline text-blue-700 dark:text-blue-200">Refresh the page</a> to generate a new one.
                      </p>
                    </div>
                  ): (
                    <div className="text-sm">
                       <p>We don't have a fun nickname on file for {city}, but I'm sure it's lovely :)</p>
                    </div>
                  )}
                  </div>
                ) : (<div className="text-center text-xs">Middleware wasn't able to geolocate your IP; you may want to try a different device or network!</div>)}
                
              </div>
              <div className="row-span-1 col-span-1 rounded-3xl drop-shadow-md bg-transparent grid grid-cols-1 grid-rows-2 gap-y-2">
                    <div className="bg-black rounded-3xl flex items-center align-middle justify-center aspect-square drop-shadow-md">
                        <Image src="/vercel-icon-light.svg" width="0" height="0" className="w-1/2" alt="vercel logo" />
                    </div>
                    <div className="bg-blue-500 rounded-3xl aspect-square drop-shadow-md">
                      
                    </div>
              </div>
              <div className="row-span-1 col-span-2 rounded-3xl bg-white text-left justify-center text-base drop-shadow-md px-8 dark:text-black">
              <div className="absolute inset-0 bg-auto bg-opacity-5 opacity-5 rounded-3xl bg-[url('/jupiter.svg')] bg-repeat dark:bg-[url('/jupiter.svg')]"></div>
                <div className="my-4 gap-y-2 grid-cols-2 text-sm">
                  <div className="col-span-2 align-middle">
                    <Link className="underline text-blue-500" href={profileData.html_url} target="_blank">
                      <Image src="/github.png" alt="Github icon" width={20} height={80} className="inline mr-1" />
                        <span>{profileData.login}</span>
                    </Link>
                    <span className="italic ml-1">
                      ({profileData.public_repos} public repos)
                    </span>
                  </div>
                  {profileData.location ? (
                        <div>
                        <Link className="underline text-blue-500" href={"https://en.wikipedia.org/wiki/"+profileData.location} target="_blank">
                          <Image className="inline my-auto mx-1" src="globe-icon.svg" height="15" width="15" alt="globe icon"/>
                          {profileData.location}
                        </Link>
                        </div>
                      ) : null}
                  {profileData.company ? (
                    <div>
                      <Link className="underline text-blue-500" href={"https://duckduckgo.com/?q=!ducky+"+profileData.company.replace("@","")} target="_blank">
                        <Image className="inline my-auto mx-1" src="building-icon.svg" height="15" width="15" alt="globe icon"/>
                          {profileData.company}
                      </Link>
                    </div>
                    ) : null}
                </div>

                <p className="mt-3 align-middle justify-center">
                <span className="font-mono">{profileData.login}</span> created a Github<br className="inline" /> account on {handleDate(profileData.created_at).formattedDate}.</p>
                <p className="my-2 align-middle justify-center">
                That's {daysOfShipping} {daysOfShipping === 1 ? (<span>day</span>) : (<span>days</span>)} of <br />shipping, and counting!
                </p>
              </div>
              <div className="rounded-3xl col-span-6 row-span-5">
                <MyV0Component />
              </div>
              <div className="rounded-2xl col-span-2 row-span-4 bg-yellow-50 drop-shadow-md">
                
              </div>
            </div>

            // <div className={`hidden col-span-2 text-2xl h-52 w-52 pl-10 bg-white lg:dark:bg-zinc-800/30 space-y-4 p-8 pb-6 pt-8 backdrop-blur-2xl bg-center lg:static lg:w-auto  lg:rounded-xl dark:bg-zinc-800/30 dark:from-inherit ${true==false ? ' bg-gradient-to-b from-zinc-200  lg:bg-gray-200 lg:p-4 dark:border-neutral-800' : null}`}>
            //   <p className="text-sm font-semibold italic">welcome to
            //   <span className="text-6xl font-semibold text-emerald-400 px-5">{profileData.name}&apos;s</span> Vercelian profile page.</p>
            //   {!profileData.avatar_url ? (<p className="text-xs text-center align-middle"><Link href="https://github.com/settings/profile" className="underline text-blue-800 dark:text-blue-300">Upload a Github Avatar</Link> to complete this section</p>) : null}
            //   {/* ${profileData.avatar_url ? `bg-[url('https://avatars.githubusercontent.com/u/8182753?v=4')] bg-cover` : `bg-transparent`}  */}

            //   </div>
          )
        }
    </main>
  )
}
      

        // {!profileData ? (
        //   <div>
        //     <p className="fixed left-0 top-0 w-full p-8 justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          
        //     Welcome!  This is a starting point for your personal Vercelian info page.
        //     Start by visiting <a href="https://github.com/dddiggory/vercelians-can-ship#welcome-vercelian" target="_blank" className="underline text-blue-800">the Template repo on Github</a>. Follow the instructions in the Readme to make your own copy and deploy it to Vercel.
        //     <p className="pt-3">For some personalized starter content, go to <code className="font-mono font-bold">app/page.tsx</code> and insert your Github Username into the slot on Line 1.  <br />Happy shipping! 🚢
        //     </p>
        //   </p>
            
        //   </div>
        // )}


  
  


  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-between p-8 lg:p-24">
  //     <div className="grid grid-cols-4 gap-10 w-full mx-2 row-auto border h-[100px]">
  //       <div className="bg-gray rounded-lg bg-neutral-100 p-5">
  //         hi
  //       </div>
  //       <div>
  //         hi
  //       </div>
  //       <div>
  //         hi
  //       </div>
  //       <div>
  //         hi
  //       </div>
  //     </div>
  //     <div>
  //       {!profileData ? (
  //         <div>
  //           <p className="fixed left-0 top-0 w-full p-8 justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          
  //           Welcome!  This is a starting point for your personal Vercelian info page.
  //           Start by visiting <a href="https://github.com/dddiggory/vercelians-can-ship#welcome-vercelian" target="_blank" className="underline text-blue-800">the Template repo on Github</a>. Follow the instructions in the Readme to make your own copy and deploy it to Vercel.
  //           <p className="pt-3">For some personalized starter content, go to <code className="font-mono font-bold">app/page.tsx</code> and insert your Github Username into the slot on Line 1.  <br />Happy shipping! 🚢
  //           </p>
  //         </p>
            
  //         </div>
  //       ) : profileData === 'not-found' ? (
  //         <h1>Profile not found! Are you sure {yourGithubUsername} is your correct Github Username?</h1>
  //       ) : (
  //         <div className="text-center py-4 px-4 bg-slate-100 rounded-lg border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
  //           <div className="grid grid-cols-1 lg:grid-cols-5">
  //              <div className="col-span-1 min-w-[150px] px-4 sm:self-center mx-auto">
  //               {profileData.avatar_url ? (
  //                   <img 
  //                   src={profileData.avatar_url}
  //                   alt="Github profile picture of user"
  //                   width={150}
  //                   height={200}
  //                   className="rounded-full min-w-full outline outline-3 md:outline-4 outline-neutral-800" />
  //                 ) : (
  //                   <Image 
  //                   src="/vercel.png"
  //                   width={150}
  //                   height={100}
  //                   alt="Placeholder picture for user without profile picture uploaded"
  //                   className="outline-2 rounded-full outline-black self-end pr-5" />
  //                 )}
  //               </div>
  //               <div className="col-span-4 text-center pt-5 lg:pt-0 lg:text-left">
  //                <h1 className="text-2xl lg:text-3xl">
  //                Welcome to <br className="inline md:hidden" /> 
  //                 <span className="font-semibold text-emerald-600">{profileData.name}&apos;s</span> Vercelian profile page, <br /> <span className="text-base lg:text-3xl">powered by
  //                <Image
  //                 className="w-16 md:w-28 inline dark:drop-shadow-[0_0_0.3rem_#ffffff70] ml-2 md:mx-4 my-4 align-middle dark:invert"
  //                 src="/next.svg"
  //                 alt="Next.js Logo"
  //                 width={0}
  //                 height={0}
  //                 priority
  //               /> on 
  //               <Image
  //               src="/vercel.svg"
  //               alt="Vercel Logo"
  //               className="w-16 md:w-28 inline ml-2 md:ml-4 mr-1 dark:invert"
  //               width={0}
  //               height={0}
  //               priority
  //             />.</span>
  //               </h1>
  //               <div className="text-md w-full md:w-1/2 pt-0 grid gap-y-1 grid-cols-2 sm:grid-cols-2">
  //                   {profileData.location ? (<div className="flex items-center">
  //                       <Link className="underline text-blue-500" href={"https://en.wikipedia.org/wiki/"+profileData.location} target="_blank">
  //                         <Image className="inline my-auto mx-1" src="globe-icon.svg" height="15" width="15" alt="globe icon"/>
  //                         {profileData.location}
  //                       </Link>
  //                     </div>) : null}
  //                   {profileData.company ? (
  //                     <div className="flex items-center">
  //                       <Link className="underline text-blue-500" href={"https://duckduckgo.com/?q=!ducky+"+profileData.company.replace("@","")} target="_blank">
  //                         <Image className="inline my-auto mx-1" src="building-icon.svg" height="15" width="15" alt="globe icon"/>
  //                         {profileData.company}
  //                       </Link>
  //                     </div>) : null}
  //                   <div className="flex items-center col-span-2">
  //                     <Link className="underline text-blue-500" target="_blank" href={profileData.html_url}>
  //                       <Image 
  //                       src="/github.png"
  //                       alt="Github profile link"
  //                       width={20}
  //                       height={80}
  //                       className="inline dark:hidden"
  //                       />
  //                       <Image 
  //                       src="/github-white.png"
  //                       alt="Github search"
  //                       width={20}
  //                       height={80}
  //                       className="hidden dark:inline"
  //                       />
  //                       <span className="pl-1">{profileData.login}</span>
  //                     </Link>
  //                     <span className="pl-1">({profileData.public_repos} public repos)</span>
  //                   </div>
  //               </div>
  //               <div className="my-4 text-sm md:text-lg">
  //                       {profileData.name} created a Github account on <br className="inline md:hidden" />{handleDate(profileData.created_at).formattedDate}. <br className="inline lg:hidden" />{daysOfShipping} {daysOfShipping === 1 ? (<span>day</span>) : (<span>days</span>)} of shipping, and counting!
  //               </div>
  //           </div>
  //           </div>
  //         </div>
  //       )}

  //       {(profileData) ? (
  //       <div className={"grid grid-cols-8 pt-2 pb-0" + (profileData ? 'block' : 'hidden')}>
  //         <div className={"col-span-8 md:col-span-6"}>
  //           <MyV0Component />
  //         </div>
  //         <div className={"col-span-8 md:col-span-2 rounded-md border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl border bg-gray-200 p-4 lg:dark:bg-zinc-800/30 h-fit"}>
  //           <div className="overflow-hidden rounded-md">
  //             <div className="bg-[url('/map.svg')] dark:bg-[url('/map-dark.svg')] bg-no-repeat bg-center opacity-75">
  //             {city!=='undefined' ? (
  //               <div className="text-center text-sm">
  //                 <p className="">
  //                   <a href="https://nextjs.org/docs/app/building-your-application/routing/middleware" target="_blank" className="underline text-blue-700 dark:text-blue-200">
  //                     Next.js Middleware
  //                     </a> tells us that</p>
  //                 <p className="">you're visiting from beautiful</p>
  //                 <a href={cityWiki} target="_blank">
  //                   <p className="font-bold text-orange-700 dark:text-red-400 text-base drop-shadow-md drop-shadow-white py-2 underline">
  //                     {city}, {region}!
  //                   </p>
  //                 </a>

  //                 {cityNickname!=='undefined' && cityNickname ? (
  //                   <div className="text-xs">
  //                     <p>Known by some as</p>
  //                     <p className="italic font-bold">"{cityNickname}"</p>
  //                     <p className="pt-1">Want a fresh nickname? <a href="" className="underline text-blue-700 dark:text-blue-200">Refresh the page</a> to generate a new one!</p>
  //                   </div>
  //                 ): (
  //                   <div className="text-xs">
  //                     <p>We don't have a fun nickname on file for {city}, but I'm sure it's lovely :)</p>
  //                   </div>
  //                 )}
  //               </div>
  //             ): (
  //               <div className="text-center text-xs">Middleware wasn't able to geolocate your IP; you may want to try a different device or network!</div>
  //             )}
  //           </div></div>
  //         </div>
  //       </div>
  //       ): null}
  //     </div>

  //     {/* boilerplate */}
  //       <div className="pt-20 flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
  //         <Image
  //           className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
  //           src="/next.svg"
  //           alt="Next.js Logo"
  //           width={180}
  //           height={37}
  //           priority
  //         />
  //       </div>

  //       <div className="pt-32 lg:pt-0 mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
  //         <a
  //           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  //           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           <h2 className={`mb-3 text-2xl font-semibold`}>
  //             Docs{' '}
  //             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
  //               -&gt;
  //             </span>
  //           </h2>
  //           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
  //             Find in-depth information about Next.js features and API.
  //           </p>
  //         </a>

  //         <a
  //           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
  //           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           <h2 className={`mb-3 text-2xl font-semibold`}>
  //             Learn{' '}
  //             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
  //               -&gt;
  //             </span>
  //           </h2>
  //           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
  //             Learn about Next.js in an interactive course with&nbsp;quizzes!
  //           </p>
  //         </a>

  //         <a
  //           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  //           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           <h2 className={`mb-3 text-2xl font-semibold`}>
  //             Templates{' '}
  //             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
  //               -&gt;
  //             </span>
  //           </h2>
  //           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
  //             Explore the Next.js 13 playground.
  //           </p>
  //         </a>

  //         <a
  //           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  //           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           <h2 className={`mb-3 text-2xl font-semibold`}>
  //             Deploy{' '}
  //             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
  //               -&gt;
  //             </span>
  //           </h2>
  //           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
  //             Instantly deploy your Next.js site to a shareable URL with Vercel.
  //           </p>
  //         </a>
  //       </div>
  //   </main>
  // )

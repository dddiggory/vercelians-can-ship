const yourWorkEmail = "diggory.rycroft@vercel.com"; //<---for an initial starting point, insert your work email between the double-quotes here!


import Image from 'next/image';
import MyV0Component from './components/MyV0Component'

let getRandomVercelian = false;


async function getBambooHrData(yourWorkEmail: string) {
  if (!yourWorkEmail) {
    return false;
  }
  // const api_key = "14dbf861c9b59ffbc0051d2ba777c3b1e3f40436"
  const api_key = process.env.BAMBOOHR_KEY
  const directory_url = "https://api.bamboohr.com/api/gateway.php/vercel/v1/employees/directory"

  const vercelian_email = yourWorkEmail

  const res = await fetch(directory_url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Basic ' + Buffer.from(api_key + ':').toString('base64')
    },
    next: {
      revalidate: 3600
    }
  })
  const resJson = await res.json();
  const directory = resJson.employees;
  let vercelian = [];
  let urlParams
  if (urlParams){ //.has('randomize')) {
    vercelian.push(directory[Math.floor(Math.random() * directory.length)])
  } else {
    // vercelian.push(directory[Math.floor(Math.random() * directory.length)])
    vercelian = directory.filter(((vercelian: { workEmail: string }) => (vercelian.workEmail) == vercelian_email));
  }
  
  if (vercelian.length===0) {
    console.log("NO PROFILE");
    return "not-found";
  }
  console.log(vercelian);
  return vercelian[0];
  
}


//   const router = useRouter();

//   const addQueryParamAndRefresh = async () => {
//     const query = {...router.query, randomize: 'true'};

//     await router.push({
//       pathname: router.pathname,
//       query
//     });
//   }

// }

export default async function Home() {
  const profileData = await getBambooHrData(yourWorkEmail);

  console.log(profileData);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <AutomaticIntro /> */}
      
      <div>
        {!profileData ? (
          <div>
            <p className="fixed left-0 top-0 w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          
            <h1>Welcome!  This is a starting point for your personal Vercelian info page.
            Start by clicking <a href="" className="underline text-blue-800">&apos;Use This Template&apos; on Github</a> to make your own copy and deploy it to Vercel.</h1>
            <p className="pt-3">For some personalized starter content, go to <code className="font-mono font-bold">app/page.tsx</code> and insert your work email into the slot on Line 1.  <br />Happy shipping! 🚢
            </p>
          </p>
            
          </div>
        ) : profileData === 'not-found' ? (
          <h1>Profile not found! Are you sure {yourWorkEmail} is your correct work email?</h1>
        ) : (
          <div className="text-center flex py-4 px-4 bg-slate-100 rounded-lg border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            <div className="flex-auto min-w-fit">
              {profileData.photoUploaded ? (
                    <Image 
                    src={profileData.photoUrl}
                    alt="BambooHR profile picture of user"
                    width={150}
                    height={200}
                    className="rounded-full outline outline-4 outline-slate-500" />
                  ) : (
                    <Image 
                    src="/vercel.png"
                    width={150}
                    height={100}
                    alt="Placeholder picture for user without profile picture uploaded"
                    className="outline-2 rounded-full outline-black self-end pr-5" />
                  )}
            </div>
            <div className="flex-auto min-w-fit ml-6 text-left">
                <h1 className="text-3xl">
                Welcome to <span className="font-semibold text-emerald-600">{profileData.preferredName}&apos;s</span> Vercelian profile page,<br /> powered by
                <Image
                  className="inline dark:drop-shadow-[0_0_0.3rem_#ffffff70] mx-2 my-2 align-middle dark:invert"
                  src="/next.svg"
                  alt="Next.js Logo"
                  width={70}
                  height={8}
                  priority
                /> and 
                <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className="inline mx-2 dark:invert"
                width={100}
                height={24}
                priority
              />.
                </h1>
                <p className="text-md pt-3">
                {profileData.preferredName} is a <span className="font-bold">{profileData.jobTitle}</span> in the {profileData.division} org, <br />working in <a href={'https://en.wikipedia.org/wiki/'+profileData.location.replace(" - Work From Home","")} className="underline text-blue-600 italic">{profileData.location.replace(" - Work From Home","")}.</a>
                </p>
                <div className="pt-4 grid grid-cols-8 w-1/5 gap-2">
                  <div className="col-span-2">
                    <a target="_blank" href={"https://www.google.com/search?q="+profileData.preferredName+"+"+profileData.lastName+"+vercel"}>
                    <Image 
                    src="/google.png"
                    alt="Google search"
                    width={20}
                    height={80}
                    className="pt-3"
                  />
                    </a>
                  </div>
                  <div className="col-span-2">
                  <a target="_blank" href={"https://github.com/search?q="+profileData.preferredName+"+"+profileData.lastName+"&type=users"}>
                    <Image 
                    src="/github.png"
                    alt="Github search"
                    width={20}
                    height={80}
                    className="pt-3"
                    />
                  </a>
                  </div>
                  {/* <button onClick="randomize()">hey</button> */}
                </div>
            </div>

          </div>
        )}

        <div className="py-8">
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

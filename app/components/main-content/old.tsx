import {handleDate} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import MyV0Component from "../MyV0Component";

export function MainContent({profileData, geo}: {profileData: any; geo: any}) {
  const city = geo.city || undefined;
  const country = geo.country || undefined;
  const cityNickname = geo.cityNickname || undefined;
  const region = geo.regionName || undefined;
  let cityWiki = "https://en.wikipedia.org/wiki/" + city + ", " + region;

  const daysOfShipping = handleDate(profileData.created_at).diffDays;

  return (
    <div className="grid grid-cols-8 gap-4 mx-2 h-[120px] w-[500px] md:w-[720px] lg:w-[1000px] xl:w-[1200px] justify-center align-middle">
      <div className="col-span-5 row-span-1 rounded-3xl bg-white dark:bg-gradient-to-b from-black to-neutral-800 drop-shadow-md">
        <div className="grid grid-cols-2 lg:grid-cols-4 my-5 mx-0 pb-0">
          <div className="flex place-self-center">
            {profileData.avatar_url ? (
              <img
                src={profileData.avatar_url}
                height="0"
                width="0"
                className="rounded-3xl border drop-shadow-sm w-[110px] md:w-[160px]"
                alt="a picture of the developer of this page"
              />
            ) : null}
          </div>

          <div className={"lg:col-span-3 justify-left mt-4 align-middle"}>
            <p className="text-xs">welcome to</p>
            <div
              className={`text-4xl ${
                profileData.name.length <= 20
                  ? "md:text-6xl lg:text-7xl"
                  : "md:text-6xl"
              } font-semibold pb-0 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent`}
            >
              {profileData.name.includes(" ") ? (
                <div>
                  <p>{profileData.name.split(" ")[0]}</p>
                  <p>{profileData.name.split(" ")[1]}&apos;s</p>
                </div>
              ) : (
                <p className="text-8xl py-7">{profileData.name}&apos;s</p>
              )}
            </div>
            <p className="text-lg">
              Vercelian profile page. Powered by{" "}
              <Image
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
              />
              .
            </p>
          </div>
        </div>
      </div>
      <div className="relative flex rounded-3xl items-center justify-center col-span-2 row-span-1 drop-shadow-md bg-cover bg-white dark:bg-black dark:bg-opacity-10">
        <div className="absolute rounded-3xl inset-0 bg-cover bg-center bg-opacity-5 opacity-10 bg-[url('/topography.svg')] dark:bg-[url('/map.svg')]"></div>
        {city !== "undefined" ? (
          <div className="bg-center drop-shadow-md mx-3 text-center text-base">
            <a
              href="https://nextjs.org/docs/app/building-your-application/routing/middleware"
              target="_blank"
              className="underline text-blue-700 dark:text-blue-200 mr-1"
            >
              Next.js Middleware
            </a>
            says that you're visiting from beautiful
            <Link href={cityWiki} target="_blank">
              <p className="font-bold text-orange-700 hover:text-orange-300 hover:animate-pulse dark:text-red-400 text-base drop-shadow-md drop-shadow-white py-2 underline">
                {city}, {region}
              </p>
            </Link>
            {cityNickname !== "undefined" && cityNickname ? (
              <div className="text-sm">
                <p>Known to some as</p>
                <p className="italic text-base font-bold">"{cityNickname}"!</p>
                <p className="pt-1">
                  Want a fresh nickname?{" "}
                  <a
                    href=""
                    className="underline text-blue-700 dark:text-blue-200"
                  >
                    Refresh the page
                  </a>{" "}
                  to generate a new one.
                </p>
              </div>
            ) : (
              <div className="text-sm">
                <p>
                  We don't have a fun nickname on file for {city}, but I'm sure
                  it's lovely :)
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-xs">
            Middleware wasn't able to geolocate your IP; you may want to try a
            different device or network!
          </div>
        )}
      </div>
      <div className="row-span-1 col-span-1 rounded-3xl drop-shadow-md bg-transparent grid grid-cols-1 grid-rows-2 gap-y-2">
        <div className="bg-black rounded-3xl flex items-center align-middle justify-center aspect-square drop-shadow-md">
          <Image
            src="/vercel-icon-light.svg"
            width="0"
            height="0"
            className="w-1/2"
            alt="vercel logo"
          />
        </div>
        <div className="bg-blue-500 rounded-3xl aspect-square drop-shadow-md"></div>
      </div>
      <div className="row-span-1 col-span-2 rounded-3xl bg-white text-left justify-center text-base drop-shadow-md px-8 dark:text-black">
        <div className="absolute inset-0 bg-auto bg-opacity-5 opacity-5 rounded-3xl bg-[url('/jupiter.svg')] bg-repeat dark:bg-[url('/jupiter.svg')]"></div>
        <div className="my-4 gap-y-2 grid-cols-2 text-sm">
          <div className="col-span-2 align-middle">
            <Link
              className="underline text-blue-500"
              href={profileData.html_url}
              target="_blank"
            >
              <Image
                src="/github.png"
                alt="Github icon"
                width={20}
                height={80}
                className="inline mr-1"
              />
              <span>{profileData.login}</span>
            </Link>
            <span className="italic ml-1">
              ({profileData.public_repos} public repos)
            </span>
          </div>
          {profileData.location ? (
            <div>
              <Link
                className="underline text-blue-500"
                href={"https://en.wikipedia.org/wiki/" + profileData.location}
                target="_blank"
              >
                <Image
                  className="inline my-auto mx-1"
                  src="globe-icon.svg"
                  height="15"
                  width="15"
                  alt="globe icon"
                />
                {profileData.location}
              </Link>
            </div>
          ) : null}
          {profileData.company ? (
            <div>
              <Link
                className="underline text-blue-500"
                href={
                  "https://duckduckgo.com/?q=!ducky+" +
                  profileData.company.replace("@", "")
                }
                target="_blank"
              >
                <Image
                  className="inline my-auto mx-1"
                  src="building-icon.svg"
                  height="15"
                  width="15"
                  alt="globe icon"
                />
                {profileData.company}
              </Link>
            </div>
          ) : null}
        </div>

        <p className="mt-3 align-middle justify-center">
          <span className="font-mono">{profileData.login}</span> created a
          Github
          <br className="inline" /> account on{" "}
          {handleDate(profileData.created_at).formattedDate}.
        </p>
        <p className="my-2 align-middle justify-center">
          That's {daysOfShipping}{" "}
          {daysOfShipping === 1 ? <span>day</span> : <span>days</span>} of{" "}
          <br />
          shipping, and counting!
        </p>
      </div>
      <div className="rounded-3xl col-span-6 row-span-5">
        <MyV0Component />
      </div>
      <div className="rounded-2xl col-span-2 row-span-4 bg-yellow-50 drop-shadow-md"></div>
    </div>
  );
}

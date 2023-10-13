import React from 'react';
import Image from 'next/image'

async function getBambooHrData(yourWorkEmail: string) {
    if (!yourWorkEmail) {
      return false;
    }
    const api_key = "14dbf861c9b59ffbc0051d2ba777c3b1e3f40436"
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
  
    let vercelian = directory.filter(((vercelian: { workEmail: string }) => vercelian.workEmail === vercelian_email));
    if (vercelian.length===0) {
      console.log("NO PROFILE");
      return "not-found";
    }
    console.log(vercelian);
    return vercelian[0];
    
  }

const AutomaticIntro: React.FC = ({ yourWorkEmail }) => {
    const profileData = await getBambooHrData(yourWorkEmail);

    return (
        <div>
        {!profileData ? (
          <div>
            <h1>Welcome!  This is a starting point for your personal Vercelian info page.</h1>
            <div>Start by <a href="" class="underline text-blue-800">Copying This Template</a>.  Then, for a quick and easy starting point, you can edit <code className="font-mono font-bold">yourName</code> and <code className="font-mono font-bold">yourWorkEmail</code> in the <code className="font-mono font-bold">page.tsx</code> file on your Git repo.</div>
          </div>
        ) : profileData === 'not-found' ? (
          <h1>Profile not found! Are you sure {yourWorkEmail} is your correct work email?</h1>
        ) : (
          <div class="flex-wrap text-center">
            <h1 class="text-2xl">
              Welcome to <span class="font-semibold text-emerald-600">{profileData.preferredName}'s</span> Vercelian profile page, powered by
              <Image
                className="inline dark:drop-shadow-[0_0_0.3rem_#ffffff70] mx-2 my-2 align-middle dark:invert"
                src="/next.svg"
                alt="Next.js Logo"
                width={70}
                height={8}
                priority
              />
            </h1>

            <div class="py-3">
              {profileData.preferredName} is a <span class="font-bold">{profileData.jobTitle}</span> in {profileData.division}, working in {profileData.location.replace(" - Work From Home","")}.
            </div>
            <div class="text-xs">
              {JSON.stringify(Object.keys(profileData))}
            </div>
          </div>
        )}
      </div>
    )
}




export default AutomaticIntro
// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { headers } from "next/headers";

import countries from './lib/countries.json'
import cityNicknames from './lib/citynicknames.json'

export const config = {
  matcher: '/',
}

function getNickname(city: string) {
  if(cityNicknames.hasOwnProperty(city)) {
      let nicknames = cityNicknames[city];
      return nicknames[Math.floor(Math.random() * nicknames.length)];
  } else {
      return '';
  }
}


export async function middleware(req: NextRequest) {
    
    const headersList = headers();
    const ip = "68.173.59.125" //debug
    // const ip = "66.222.94.249" //debug
    // const ip = headersList.get("x-forwarded-for");
    const ipCheckUrl = "http://ip-api.com/json/"+ip
    const response = await fetch(ipCheckUrl);
    const geoIp = await response.json();
    const cityNickname = getNickname(geoIp.city);

    const urlWithGeo = req.nextUrl.clone();
    urlWithGeo.searchParams.set('country',geoIp.country);
    urlWithGeo.searchParams.set('countryCode',geoIp.countryCode);
    urlWithGeo.searchParams.set('region',geoIp.region);
    urlWithGeo.searchParams.set('regionName',geoIp.regionName);
    urlWithGeo.searchParams.set('city',geoIp.city);
    urlWithGeo.searchParams.set('cityNickname', cityNickname);
    
    return NextResponse.rewrite(urlWithGeo)
    console.log(headers)

    const { nextUrl: url, geo } = req
//   const res = NextResponse.next();

//   let geoIp = await fetch("https://geolocation-db.com/json/fd18cb60-5f5a-11ee-87d3-bd3f0d7c4f89", {
//     method: 'GET', // or 'POST'
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch((error) => {
//     console.error('Error:', error);
//     });

//   console.log(geoIp);

  return new NextResponse();
  
  console.log( geo );

//   const { nextUrl: url, geo } = req
  
  //this is an Early Return; it's ending the Middleware
  //function before it has the chance to complete its work. 
  //To turn on our middleware function, comment-out
  //the next line by adding // in front of it. Then, Commit!
//   return NextResponse.rewrite(url);


  const country = geo.country || ''
  const city = geo.city || ''
  const region = geo.region || ''

  const countryInfo = countries.find((x) => x.cca2 === country)
  // const cityNickname = getNickname(city);

  url.searchParams.set('country', country)
  url.searchParams.set('city', city)
  url.searchParams.set('region', region)
  url.searchParams.set('cityNickname', cityNickname)

  return NextResponse.rewrite(url)
}

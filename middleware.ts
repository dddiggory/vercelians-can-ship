// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
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
  
  const { nextUrl: url, geo } = req
  
  //this is an Early Return; it's ending the Middleware
  //function before it has the chance to complete its work. 
  //To turn on our middleware function, comment-out
  //the next line by adding // in front of it. Then, Commit!
//   return NextResponse.rewrite(url);

  const country = geo.country || ''
  const city = geo.city || ''
  const region = geo.region || ''

  const countryInfo = countries.find((x) => x.cca2 === country)
  const cityNickname = getNickname(city);

  url.searchParams.set('country', country)
  url.searchParams.set('city', city)
  url.searchParams.set('region', region)
  url.searchParams.set('cityNickname', cityNickname)

  return NextResponse.rewrite(url)
}

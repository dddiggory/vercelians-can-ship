import { NextRequest, NextResponse } from "next/server";
import { ipAddress, geolocation } from "@vercel/functions";
import { headers } from "next/headers";

import countries from "./lib/countries.json";
import cityNicknames from "./lib/citynicknames.json";

export const config = {
  matcher: "/",
};

function getNickname(city: string) {
  if (cityNicknames.hasOwnProperty(city)) {
    let nicknames = cityNicknames[city];
    return nicknames[Math.floor(Math.random() * nicknames.length)];
  } else {
    return "";
  }
}

export async function middleware(req: NextRequest) {
  const headersList = await headers();

  const ip = headersList.get("x-forwarded-for") || ipAddress(req);

  if (!ip) {
    return NextResponse.rewrite(req.nextUrl);
  }

  const ipCheckUrl = `http://ip-api.com/json/${ip}`;
  const response = await fetch(ipCheckUrl);
  const geoIp = await response.json();
  const cityNickname = getNickname(geoIp.city);

  const urlWithGeo = req.nextUrl.clone();

  urlWithGeo.searchParams.set("country", geoIp.country);
  urlWithGeo.searchParams.set("countryCode", geoIp.countryCode);
  urlWithGeo.searchParams.set("region", geoIp.region);
  urlWithGeo.searchParams.set("regionName", geoIp.regionName);
  urlWithGeo.searchParams.set("city", geoIp.city);
  urlWithGeo.searchParams.set("cityNickname", cityNickname);

  return NextResponse.rewrite(urlWithGeo);
}

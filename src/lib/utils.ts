import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomString() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const minLength = 10;
  const maxLength = 20;

  const randomLength =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  let randomString = "";

  for (let i = 0; i < randomLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

type QueryParams = Record<string, string | number | boolean | undefined>;

export function buildUrlWithParams(baseUrl: string, queryParams: QueryParams): string {
  const queryString = Object.entries(queryParams)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}


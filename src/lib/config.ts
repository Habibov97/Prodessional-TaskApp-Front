// All backend calls happen on the server, so prefer the server-only variable
// and fall back to the public one that older deployments define.
export const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

import { Http } from "./http";

export const baseApi = new Http(process.env.NEXT_PUBLIC_BASE_URL ?? "");


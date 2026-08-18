import { client } from '$lib/sanity/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const devlogs = await client.fetch(`*[_type == "devlog"] | order(date desc) {
    "id": _id,
    title,
    date,
    content,
    category,
    tags
  }`);

  return {
    devlogs
  };
};

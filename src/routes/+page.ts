import { client } from '$lib/sanity/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const [showcases, milestones] = await Promise.all([
    client.fetch(`*[_type == "showcase"] | order(order asc) {
      "id": _id,
      title,
      image,
      category,
      url,
      order
    }`),
    client.fetch(`*[_type == "milestone"] | order(date desc) {
      "id": _id,
      title,
      date,
      description,
      status
    }`)
  ]);

  return {
    showcases,
    milestones
  };
};

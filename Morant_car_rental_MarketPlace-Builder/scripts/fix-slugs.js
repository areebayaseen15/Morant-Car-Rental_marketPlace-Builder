import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'your-project-id',
  dataset: 'your-dataset',
  apiVersion: '2023-01-01', // Use your Sanity API version
  useCdn: false,
  token: 'your-sanity-token', // Optional: only required for updates
});

async function fixSlugs() {
  const cars = await client.fetch(`*[_type == "car" && !defined(slug.current)]`);

  const updates = cars.map((car) => ({
    patch: {
      id: car._id,
      set: {
        slug: {
          current: car.name.toLowerCase().replace(/\s+/g, '-'),
        },
      },
    },
  }));

  if (updates.length > 0) {
    await client.transaction().patch(updates).commit();
    console.log(`Updated slugs for ${updates.length} cars.`);
  } else {
    console.log('No cars with missing slugs found.');
  }
}

fixSlugs();

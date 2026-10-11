import { type CollectionEntry, getCollection } from 'astro:content';

export function sortItemsByDateDesc(itemA: CollectionEntry<'blog' | 'projects'>, itemB: CollectionEntry<'blog' | 'projects'>) {
    return new Date(itemB.data.publishDate).getTime() - new Date(itemA.data.publishDate).getTime();
}

/** Projects marked `draft: true` show up in `astro dev` only, never in a build. */
export async function getProjects() {
    const projects = await getCollection('projects', ({ data }) => import.meta.env.DEV || !data.draft);
    return projects.sort(sortItemsByDateDesc);
}

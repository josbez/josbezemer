import avatar from '../assets/images/avatar.jpg';
import hero from '../assets/images/hero.jpg';
import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
    website: 'https://josbezemer.nl',
    avatar: {
        src: avatar,
        alt: 'Jos Bezemer'
    },
    title: 'Jos Bezemer',
    subtitle: 'Blog & Portfolio',
    description: 'Persoonlijke blog en portfolio van Jos Bezemer',
    image: {
        src: '/dante-preview.jpg',
        alt: 'Jos Bezemer - Blog & Portfolio'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Blog',
            href: '/blog'
        },
        {
            text: 'Tags',
            href: '/tags'
        }
    ],
    footerNavLinks: [
        {
            text: 'Over mij',
            href: '/about'
        },
        {
            text: 'Contact',
            href: '/contact'
        }
    ],
    socialLinks: [
        {
            text: 'GitHub',
            href: 'https://github.com/josbez'
        }
    ],
    hero: {
        title: "Hi, I'm Jos – Lead UX Designer.",
        text: "I design digital solutions with a strong focus on information architecture and accessibility. Currently I am the Lead UX Designer at [Norday](https://norday.nl/), I specialise in turning complex challenges into simple, user-friendly experiences. My passion lies in working on projects within the cultural sector, where storytelling enhances the user's journey. I believe that thoughtful design can connect users to richer experiences.",
        image: {
            src: hero,
            alt: 'Jos Bezemer'
        },
        actions: [
            {
                text: 'Get in Touch',
                href: '/contact'
            }
        ]
    },
    subscribe: {
        enabled: false,
        title: 'Abonneer op de nieuwsbrief',
        text: 'Eén update per week. De nieuwste berichten direct in je inbox.',
        form: {
            action: '#'
        }
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;

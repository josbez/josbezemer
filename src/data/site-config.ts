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
            text: 'Projecten',
            href: '/projects'
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
        title: 'Hallo, welkom op mijn website!',
        text: "Ik ben **Jos Bezemer**. Dit is mijn persoonlijke blog en portfolio.\n\nBekijk mijn werk op [GitHub](https://github.com/josbez) of neem [contact](/contact) op.",
        image: {
            src: hero,
            alt: 'Jos Bezemer'
        },
        actions: [
            {
                text: 'Neem contact op',
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

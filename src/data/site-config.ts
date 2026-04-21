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
        title: "Good UX starts before the interface.",
        text: "Hi, I'm Jos, as UX designer I work on the architecture underneath the interface. The objects, models, flows and decisions that shape every screen.",
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

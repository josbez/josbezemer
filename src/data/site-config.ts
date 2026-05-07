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
    subtitle: 'UX Designer',
    description: 'Jos Bezemer is a Lead UX Designer working on information architecture, object models, and the structural foundations of digital products.',
    image: {
        src: '/og-image.jpg',
        alt: 'Jos Bezemer - UX Designer'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Notes',
            href: '/notes'
        },
        {
            text: 'About',
            href: '/about'
        },
        {
            text: 'Contact',
            href: '/contact'
        }
    ],
    footerNavLinks: [],
    socialLinks: [
        {
            text: 'GitHub',
            href: 'https://github.com/josbez'
        },
        {
            text: 'LinkedIn',
            href: 'https://www.linkedin.com/in/josbezemer/'
        }
    ],
    hero: {
        title: "Good UX starts before the interface.",
        text: "Hi, I'm Jos, as UX designer I work on the architecture underneath the interface. The objects, models, flows and decisions that shape every screen.",
        image: {
            src: hero,
            alt: 'Jos Bezemer'
        },
        actions: []
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

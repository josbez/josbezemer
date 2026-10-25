import { marked, type Token, type Tokens } from 'marked';

/**
 * The copy of a product page lives in src/content/products/<name>.md, so it can
 * be written in Obsidian. Each `## Heading {#id}` is one section of the page;
 * the id says where it goes, the heading text is what visitors see.
 *
 * Inside a section:
 * - paragraphs become `paragraphs`
 * - `### Title` plus text becomes an item (a card, or a question with its answer)
 * - a list becomes `list` (buttons, chips, steps; the page decides)
 */
export type ProductItem = { title: string; paragraphs: string[] };
export type ProductSection = {
    id: string;
    title: string;
    paragraphs: string[];
    items: ProductItem[];
    list: { html: string; raw: string }[];
};

const inline = (markdown: string) => marked.parseInline(markdown, { async: false }) as string;

export function parseProductCopy(body: string): Record<string, ProductSection> {
    const sections: Record<string, ProductSection> = {};
    let section: ProductSection | undefined;
    let item: ProductItem | undefined;

    for (const token of marked.lexer(body) as Token[]) {
        if (token.type === 'heading' && token.depth === 2) {
            const match = token.text.match(/^(.*?)\s*\{#([\w-]+)\}\s*$/);
            if (!match) continue; // a heading without {#id} has no place on the page
            section = { id: match[2], title: inline(match[1]), paragraphs: [], items: [], list: [] };
            sections[section.id] = section;
            item = undefined;
        } else if (!section) {
            continue;
        } else if (token.type === 'heading' && token.depth === 3) {
            item = { title: inline(token.text), paragraphs: [] };
            section.items.push(item);
        } else if (token.type === 'paragraph') {
            (item ?? section).paragraphs.push(inline(token.text));
        } else if (token.type === 'list') {
            for (const li of (token as Tokens.List).items) {
                const raw = li.text.trim();
                section.list.push({ raw, html: inline(raw) });
            }
        }
    }
    return sections;
}

/** A list item written as a markdown link: `[Download for macOS](https://…)`. */
export function asLink(raw: string): { label: string; href: string } | undefined {
    const match = raw.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    return match ? { label: match[1], href: match[2] } : undefined;
}

/** A step that ends in a command: "Open Terminal and run: `bash …`". */
export function asStep(raw: string): { html: string; command?: string } {
    const match = raw.match(/^(.*?)\s*`([^`]+)`\s*$/);
    return match ? { html: inline(match[1]), command: match[2] } : { html: inline(raw) };
}

import { existsSync } from "node:fs";
import path from "node:path";

const IMAGE_EXTS = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".avif", ".gif"];

export interface Party {
    id: string;
    banner?: string | string[];
    [key: string]: unknown;
}

interface Input {
    code: string;
    U?: Party[];
    L?: Party[];
    nameU?: string;
    nameL?: string;
    imageDirs: string[]; // folders inside /public, tried in order
}

const esc = (s: unknown) =>
    String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

/** Tries every dir × extension inside /public and returns the first URL that exists. */
function findImage(dirs: string[], name: string): string | undefined {
    for (const dir of dirs) {
        for (const ext of IMAGE_EXTS) {
            const file = path.join(process.cwd(), "public", dir, name + ext);
            if (existsSync(file)) return encodeURI(`/${dir}/${name}${ext}`);
        }
    }
    return undefined;
}



const chamber = (id: string, label: string) =>
    `<figure id="${esc(id)}">
    <span class="marginnote"> <strong style="font-family: 'Wahroonga'; font-size: 1.8rem;">${esc(label)}</strong><hr></span>
</figure>`;

export function buildCountrySections(input: Input): string {
    const { code, U = [], L = [], nameU, nameL, imageDirs } = input;
    const sections: string[] = [];

    // Section 1: parliament figures (only the chambers that exist)
    const chambers: string[] = [];
    if (U.length) chambers.push(chamber(`${code}-U`, nameU ?? "Chambre haute"));
    if (L.length) chambers.push(chamber(`${code}-L`, nameL ?? "Chambre basse"));
    if (chambers.length) {
        sections.push(`<section>\n${chambers.join("\n<hr>\n")}\n</section>`);
    }

    // Section 2: banners, grouped by image name (order of first appearance)
    const groups = new Map<string, string[]>();
    for (const p of [...U, ...L]) {
        const names = [p.banner ?? []]
            .flat()
            .map((n) => n.trim())
            .filter(Boolean);
        for (const name of names) {
            if (!groups.has(name)) groups.set(name, [name]);
            const sample = groups.get(name)!;
            if (!sample.includes(p.id)) sample.push(p.id);
        }
    }
    const banners: string[] = [];
    for (const [name, sample] of groups) {
        const src = findImage(imageDirs, name);
        if (!src) {
            console.warn(
                `[countrySections] ${code}: no image "${name}" in public/{${imageDirs.join(",")}}`,
            );
            continue;
        }
        banners.push(
            `<div class="bandeauPol" data-sample="${esc(JSON.stringify(sample))}">\n<img src="${esc(src)}">\n</div>`,
        );
    }
    if (banners.length) {
        sections.push(`<section>\n${banners.join("\n\n")}\n</section>`);
    }

    return sections.join("\n");
}
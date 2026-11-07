import { visit } from "unist-util-visit";

const esc = (s = "") =>
    String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const DIRECTIVES = ["textDirective", "leafDirective", "containerDirective"];
const html = (value) => ({ type: "html", value });

export default function remarkShortcuts() {
    return (tree) => {
        let n = 0; // sidenote counter, resets for each page

        // Images alone on a line: ![alt](url "caption") + #full | #margin | nothing
        visit(tree, "paragraph", (node, index, parent) => {
            if (!parent || index == null) return;
            if (node.children.length !== 1 || node.children[0].type !== "image") return;
            const { url, alt, title } = node.children[0];
            const m = url.match(/#(full|margin)$/);
            const mode = m ? m[1] : "normal";
            const src = m ? url.slice(0, m.index) : url;
            const img = `<img src="${esc(src)}" alt="${esc(alt)}">`;
            const cap = title ? `<figcaption>${esc(title)}</figcaption>` : "";
            parent.children[index] = html(
                mode === "full"
                    ? `<figure class="fullwidth">${img}${cap}</figure>`
                    : mode === "margin"
                      ? `<figure><span class="marginnote">${img}${cap}</span></figure>`
                      : `<figure>${img}${cap}</figure>`,
            );
        });

        // Shortcuts
        visit(tree, (node, index, parent) => {
            if (!DIRECTIVES.includes(node.type) || !parent || index == null) return;
            const data = (node.data ||= {});

            if (node.name === "margin") {
                data.hName = "span";
                data.hProperties = { className: ["marginnote"] };
            } else if (node.name === "side") {
                data.hName = "span";
                data.hProperties = { className: ["sidenote"] };
                parent.children.splice(
                    index,
                    0,
                    html(`<label  class="margin-toggle sidenote-number"></label>`),
                    html(`<input type="checkbox"  class="margin-toggle">`),
                );
                return index + 3; // continue after the sidenote
            } else if (node.name === "epigraph") {
                const { by, source } = node.attributes ?? {};
                const footer = [];
                if (by) footer.push({ type: "text", value: by });
                if (by && source) footer.push({ type: "text", value: ", " });
                if (source)
                    footer.push({
                        type: "emphasis",
                        data: { hName: "cite" },
                        children: [{ type: "text", value: source }],
                    });
                const inner = [...node.children];
                if (footer.length)
                    inner.push({
                        type: "paragraph",
                        data: { hName: "footer" },
                        children: footer,
                    });
                data.hName = "div";
                data.hProperties = { className: ["epigraph"] };
                node.children = [{ type: "blockquote", children: inner }];
            }
        });
    };
}
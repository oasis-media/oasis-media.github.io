
var colors = [
    ["#BC1919", "#FFF5F4"],
    ["#FFF5F4", "#BC1919"],
    ["black", "#FFF5F4"],
    ["#FFF5F4", "black"],
    ["black", "#BC1919"],
];

export function stretchText() {
    const rawValue = getComputedStyle(
        document.documentElement,
    ).getPropertyValue("--title-font");
    const value = rawValue.replace(/^['"]|['"]$/g, "");
    const svgs = [
        ...document.querySelectorAll(".titleInfo .line0"),
    ];
    document.fonts.ready.then(() => {
        var tot = colors.length - 1;
        var tic = 0;
        svgs.forEach((svg) => {
            while (tic > tot) {
                tic = tic - tot - 1;
            }
            if (!svg) return;
            const text = svg.querySelector("text");
            if (!text) return;
            text.style.fontFamily = value;
            if (
                svg.parentElement &&
                svg.parentElement.parentElement &&
                svg.parentElement.parentElement.parentElement
            ) {
                const par =
                    svg.parentElement.parentElement.parentElement;
                par.style.backgroundColor = colors[tic][1];
                const parPs = [...par.querySelectorAll("p")];
                parPs.forEach((parP) => {
                    parP.style.color = colors[tic][0];
                });
                const pct = Math.floor(Math.random() * 16) + 70;
                svg.parentElement.style.width = pct + "%";

                svg.style.fill = colors[tic][0];
                const bbox = text.getBBox();
                if (value == "Druk") {
                    svg.setAttribute(
                        "viewBox",
                        `0 0 ${bbox.width} ${bbox.height}`,
                    );
                    text.setAttribute("y", String(bbox.height - 35));
                } else {
                    svg.setAttribute(
                        "viewBox",
                        `0 0 ${bbox.width} ${bbox.height - 100}`,
                    );
                    text.setAttribute("y", String(bbox.height - 145));
                }

                text.setAttribute("x", "0");
                tic = tic + 1;
            }
        });
    });
}

export function endnote() {
    const sew = document.querySelector(".endnoteWrap");
    const labels = [...document.querySelectorAll('label')]
    labels.forEach((label, index) => {
        label.setAttribute('for', `sn-${index + 1}`)
        if (!label.nextElementSibling) return
        label.nextElementSibling.id = "sn-" + (index + 1)
        if (!label.nextElementSibling.nextElementSibling) return
        const content = label.nextElementSibling.nextElementSibling.innerHTML
        if (!sew) return;
        const sp = document.createElement('span')
        sp.classList.add('endnote')
        sp.innerHTML = content
        sew.appendChild(sp)
        sp.addEventListener('click', () => {
            label.scrollIntoView()
        })

    })
}


const Scrollxy = (function () {
    const defaultOptions = {
        table: {
            selector: "table",
            bgColor: "#e3e3e3",
            scrollColor: "#888", // Default scrollbar color
            leftIcon: "\u21E0", // Mac-style arrow
            rightIcon: "\u21E2", // Mac-style arrow
            scrollAmount: 300,
            hideOffset: 20, // Hide navRight a few pixels before the end
            scrollSize: "8px", // Default scrollbar size
            navButtonSize: "75px" // Default nav button size
        },
        backToTop: {
            bgColor: "#888",
            color: "white",
            icon: "\u21E1", // Mac-style up arrow
        }
    };

    function scroll(userConfig) {
        const config = mergeOptions(defaultOptions, userConfig);

        document.addEventListener("DOMContentLoaded", function () {
            if (config.table) {
                document.querySelectorAll(config.table.selector).forEach(table => {
                    makeTableScrollable(table, config.table);
                });
            }

            if (config.backToTop && userConfig.backToTop) {
                addBackToTopButton(config.backToTop);
            }
        });
    }

    function mergeOptions(defaultOptions, userConfig) {
        return {
            table: { ...defaultOptions.table, ...userConfig.table },
            backToTop: { ...defaultOptions.backToTop, ...userConfig.backToTop }
        };
    }

    function makeTableScrollable(table, options) {
        let wrapper = document.createElement("div");
        wrapper.style.position = "relative";
        wrapper.style.overflow = "hidden";

        let container = document.createElement("div");
        container.style.overflowX = "auto";
        container.style.scrollBehavior = "smooth";
        container.style.position = "relative";
        container.appendChild(table.cloneNode(true));

        // Custom scrollbar styling from input options
        container.style.scrollbarWidth = "thin";
        container.style.scrollbarColor = `${options.scrollColor} #f1f1f1`;

        let style = document.createElement("style");
        style.innerHTML = `
            div::-webkit-scrollbar {
                height: ${options.scrollSize};
            }
            div::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 10px;
            }
            div::-webkit-scrollbar-thumb {
                background: ${options.scrollColor};
                border-radius: 10px;
            }
            div::-webkit-scrollbar-thumb:hover {
                background: #555;
            }
        `;
        document.head.appendChild(style);

        let navLeft = createNavButton("scrollxy-left", options.leftIcon, options.bgColor, options.navButtonSize);
        let navRight = createNavButton("scrollxy-right", options.rightIcon, options.bgColor, options.navButtonSize);

        navLeft.addEventListener("click", () => scrollTable(container, -options.scrollAmount));
        navRight.addEventListener("click", () => scrollTable(container, options.scrollAmount));
        container.addEventListener("scroll", () => toggleNavVisibility(container, navLeft, navRight, options.hideOffset, options.navButtonSize));

        wrapper.appendChild(navLeft);
        wrapper.appendChild(navRight);
        wrapper.appendChild(container);
        table.parentNode.replaceChild(wrapper, table);

        toggleNavVisibility(container, navLeft, navRight, options.hideOffset, options.navButtonSize);
    }

    function createNavButton(className, icon, bgColor, buttonSize) {
        let nav = document.createElement("div");
        nav.className = className;
        nav.style.position = "absolute";
        nav.style.top = "0";
        nav.style.width = buttonSize;
        nav.style.height = "100%";
        nav.style.display = "flex";
        nav.style.alignItems = "center";
        nav.style.justifyContent = "center";
        nav.style.backgroundColor = bgColor;
        nav.style.cursor = "pointer";
        nav.style.zIndex = "10";
        nav.style.opacity = "0.8";
        nav.style.transition = "opacity 0.3s ease-in-out, transform 0.3s ease-in-out";
        nav.style.transform = "translateX(0)";
        nav.style.borderRadius = "5px";
        nav.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
        nav.innerHTML = icon;

        // Hover effects
        nav.addEventListener("mouseenter", () => {
            nav.style.opacity = "1";
            nav.style.transform = "scale(1.1)";
        });

        nav.addEventListener("mouseleave", () => {
            nav.style.opacity = "0.8";
            nav.style.transform = "scale(1)";
        });

        return nav;
    }

    function scrollTable(container, amount) {
        container.scrollBy({ left: amount, behavior: "smooth" });
    }

    function toggleNavVisibility(container, navLeft, navRight, hideOffset, buttonSize) {
        navLeft.style.left = container.scrollLeft > 0 ? "0" : `-${parseInt(buttonSize) + 3}px`;
        navRight.style.right = (container.scrollLeft + container.clientWidth < container.scrollWidth - hideOffset) ? "0" : `-${parseInt(buttonSize) + 3}px`;
    }

    function addBackToTopButton(options) {
        let btn = document.createElement("button");
        btn.id = "backToTopButton";
        btn.textContent = options.icon;
        btn.style.position = "fixed";
        btn.style.bottom = "75px";
        btn.style.right = "25px";
        btn.style.zIndex = "9999";
        btn.style.color = options.color;
        btn.style.backgroundColor = options.bgColor;
        btn.style.padding = "7px 14px";
        btn.style.border = "none";
        btn.style.borderRadius = "10px";
        btn.style.opacity = "0.8";
        btn.style.cursor = "pointer";
        btn.style.display = "none";
        document.body.appendChild(btn);

        window.addEventListener("scroll", function () {
            btn.style.display = window.scrollY > 200 ? "block" : "none";
        });
        btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    return { scroll };
})();

window.Scrollxy = Scrollxy;

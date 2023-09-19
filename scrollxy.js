/*! ScrollXY v1.0.0 http://codekernel.net | https://raw.githubusercontent.com/souravmsh/scrollxy/main/scrollxy.min.js */

// Create a self-invoking function to define the plugin module
const Scrollxy = (function () {
    // Define default options for the plugin
    const defaultOptions = {
        table: {
            selector: "table",
            bgColor: "#e3e3e3de",
            leftIcon: "⇦",
            rightIcon: "⇨",
            scrollAmount: 250,
        },
        backToTop: {
            bgColor: "#333",
            color: "white",
            icon: "↑",
        }
    };

    // Main scroll function
    function scroll(userConfig) {
        // Merge userConfig with defaultOptions
        const config = mergeOptions(defaultOptions, userConfig);

        document.addEventListener("DOMContentLoaded", function () {
            // Make tables scrollable
            if (config.table) {
                const options = config.table;
                const tables = document.querySelectorAll(options.selector);

                tables.forEach(function (table) {
                    makeTableScrollable(table, options);
                });
            }

            // Add a back-to-top button
            if (config.backToTop) {
                addBackToTopButton(config.backToTop);
            }
        });

        // Function to merge userConfig with defaultOptions
        function mergeOptions(defaultOptions, userConfig) {
            const merged = { ...defaultOptions };

            if (userConfig.table) {
                merged.table = { ...defaultOptions.table, ...userConfig.table };
            }

            if (userConfig.backToTop) {
                merged.backToTop = { ...defaultOptions.backToTop, ...userConfig.backToTop };
            }

            return merged;
        }

        // Function to make a table scrollable
        function makeTableScrollable(table, options) {
            var wrapper = document.createElement("div");
            wrapper.style.position = "relative";

            var navLeft = document.createElement("div");
            navLeft.className = "scrollxy-navigation-left";
            navLeft.style.display = "none";
            navLeft.style.position = "absolute";
            navLeft.style.width = "60px";
            navLeft.style.height = "100%";
            navLeft.style.cursor = "pointer";
            navLeft.style.backgroundColor = options.bgColor;
            var navLeftArrow = document.createElement("div");
            navLeftArrow.style.position = "absolute";
            navLeftArrow.style.top = "50%";
            navLeftArrow.style.textAlign = "center";
            navLeftArrow.style.width = "100%";
            navLeftArrow.style.height = "32px";
            navLeftArrow.innerHTML = options.leftIcon;
            navLeft.appendChild(navLeftArrow);

            var navRight = document.createElement("div");
            navRight.className = "scrollxy-navigation-right";
            navRight.style.display = "block";
            navRight.style.position = "absolute";
            navRight.style.width = "60px";
            navRight.style.height = "100%";
            navRight.style.cursor = "pointer";
            navRight.style.backgroundColor = options.bgColor;
            navRight.style.right = "0";
            var navRightArrow = document.createElement("div");
            navRightArrow.style.position = "absolute";
            navRightArrow.style.top = "50%";
            navRightArrow.style.marginTop = "-10px";
            navRightArrow.style.width = "100%";
            navRightArrow.style.height = "32px";
            navRightArrow.style.textAlign = "center";
            navRightArrow.innerHTML = options.rightIcon;
            navRight.appendChild(navRightArrow);

            var container = document.createElement("div");
            container.style.overflow = "auto";
            var clonedTable = table.cloneNode(true);
            container.appendChild(clonedTable);

            wrapper.appendChild(navLeft);
            wrapper.appendChild(navRight);
            wrapper.appendChild(container);

            table.parentNode.replaceChild(wrapper, table);

            function toggleNav() {
                var offset = container.scrollLeft;
                if (container.clientWidth < clonedTable.offsetWidth) {
                    if (offset > 0) {
                        navLeft.style.display = "block";
                    } else {
                        navLeft.style.display = "none";
                    }
                    if (clonedTable.offsetWidth - container.clientWidth > offset) {
                        navRight.style.display = "block";
                    } else {
                        navRight.style.display = "none";
                    }
                } else {
                    navLeft.style.display = "none";
                    navRight.style.display = "none";
                }
            }

            function clickToScroll(event) {
                var displacement = container.scrollLeft + (this.classList.contains("scrollxy-navigation-left") ? -options.scrollAmount : options.scrollAmount);
                container.scrollTo({
                    left: displacement,
                    behavior: "smooth"
                });
                toggleNav();
            }

            navLeft.addEventListener("click", clickToScroll);
            navRight.addEventListener("click", clickToScroll);
            container.addEventListener("scroll", toggleNav);

            toggleNav();
        }

        // Function to add a back-to-top button
        function addBackToTopButton(options) {
            var options = config.backToTop;
            // Create the back-to-top button
            var backToTopButton = document.createElement('button');
            backToTopButton.textContent = options.icon ? options.icon : '⇡';
            backToTopButton.id = 'backToTopButton';
            backToTopButton.style.position = 'fixed';
            backToTopButton.style.bottom = '75px';
            backToTopButton.style.right = '25px';
            backToTopButton.style.zIndex = '9999';
            backToTopButton.style.color = options.color;
            backToTopButton.style.padding = '7px 14px';
            backToTopButton.style.background = options.bgColor;
            backToTopButton.style.border = 'none';
            backToTopButton.style.borderRadius = '10px';
            backToTopButton.style.opacity = '0.4';
            backToTopButton.style.cursor = 'pointer';
            backToTopButton.style.display = 'none';

            // Append the button to the body
            document.body.appendChild(backToTopButton);

            // Show or hide the button based on scroll position
            window.addEventListener('scroll', function () {
                if (window.scrollY > 200) {
                    backToTopButton.style.display = 'block';
                } else {
                    backToTopButton.style.display = 'none';
                }
            });

            // Scroll to the top when the button is clicked
            backToTopButton.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // Return the scrollxy function as the public API of the plugin
    return {
        scroll
    };
})();

// // Expose the plugin to the global scope if needed
window.Scrollxy = Scrollxy;

### Scrollxy

The <b>Scrollxy</b> Plugin is a versatile and user-friendly JavaScript utility that enhances web pages with advanced scrolling features. This plugin provides two main functionalities:

#### Scrollable Tables:
 Transform ordinary HTML tables into horizontally scrollable ones with ease. You can customize the appearance and behavior of the scrollable tables to suit your design requirements, allowing users to navigate through large data sets effortlessly.

#### Back to Top Button:
Enhance user experience by adding a "Back to Top" button that appears when users scroll down the page. With customizable styling options, this button provides a quick and smooth way for users to return to the page's top, improving overall navigation.

The <b>Scrollxy</b> Plugin simplifies the process of adding these dynamic features to your website, making it an ideal solution for improving data presentation and user interaction.

## HOW TO USE

### Demo  <a href="https://souravmsh.github.io/scrollxy/">Scrollxy</a> 
    
### Sample table 
    <table class="scrollxy">
        <!-- Table content goes here -->
    </table>

### Include plugin 
    <script src="scrollxy.js"></script>

### Initialize the Scrollxy with custom options
    <script>
        Scrollxy.scroll({
            table: {
                selector: ".scrollxy",
                bgColor: "#e3e3e3",
                scrollColor: "#888", // Default scrollbar color
                leftIcon: "\u21E0", // Mac-style arrow
                rightIcon: "\u21E2", // Mac-style arrow
                scrollAmount: 300,
                scrollSize: "8px", // Default scrollbar size
                navButtonSize: "75px" // Default nav button size
            },
            backToTop: {
                bgColor: "#888",
                color: "white",
                icon: "\u21E1", // Mac-style up arrow
            }
        });
    </script>

### If don't need backToTop Button 
    <script>
        Scrollxy.scrollxy({
            table: {
                selector: ".scrollxy",
                bgColor: "#f0f0f0",
                leftIcon: "⇦",
                rightIcon: "⇨",
                scrollAmount: 250,
            }
        });
    </script>

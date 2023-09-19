### Scrollxy

The <b>Scrollxy</b> Plugin is a versatile and user-friendly JavaScript utility that enhances web pages with advanced scrolling features. This plugin provides two main functionalities:

#### Scrollable Tables:
 Transform ordinary HTML tables into horizontally scrollable ones with ease. You can customize the appearance and behavior of the scrollable tables to suit your design requirements, allowing users to navigate through large data sets effortlessly.

#### Back to Top Button:
Enhance user experience by adding a "Back to Top" button that appears when users scroll down the page. With customizable styling options, this button provides a quick and smooth way for users to return to the page's top, improving overall navigation.

The <b>Scrollxy</b> Plugin simplifies the process of adding these dynamic features to your website, making it an ideal solution for improving data presentation and user interaction.

## HOW TO USE

### Demo  <a href="https://htmlpreview.github.io/?https://raw.githubusercontent.com/souravmsh/scrollxy/main/scrollxy.html">Scrollxy</a> 
    
### Sample table 
    <table class="scrollxy">
        <!-- Table content goes here -->
    </table>

### Include plugin 
    <script src="scrollxy.min.js"></script>

### Initialize the Scrollxy with custom options
    <script>
        Scrollxy.scroll({
            table: {
                selector: ".scrollxy",
                bgColor: "#f0f0f0",
                leftIcon: "⇦",
                rightIcon: "⇨",
                scrollAmount: 250,
            },
            backToTop: {
                bgColor: "#333",
                color: "white",
                icon: "↑",
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

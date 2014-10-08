# Sudoku #

In-browser sudoku by Julius D'souza.

## Layout ##
* index.html - main html page
* logic.js - JavaScript code for game logic
* style.css - stylesheet for the application
* template.ejs - template for sudoku table

## Technologies used ##
* CSS - the styling used in the application was simple enough that I felt using LESS/SASS was unnecessary
* Embedded JS - EJS is a very simple and high-performance templating engine that makes table writing simple

## Tradeoffs ##
-- one / multiple table(s): multiple tables were used which require uniform spacing with table cel elements since percentage measurements (i.e. 33.34%) can have discernable variations in pixel count; the other option was to use one table and to use a combination of `:after` and `:before` pseudo-elements to prevent different-coloured horizontal and vertical borders from clashing on table cell diagonals. I used `monospace` text to make cell contents with uniform width.

-- `float`/`clear` vs `display`: I had each block float and had each table row clear floats. Normally, one should achieve this effect by using appropriate `display` options and inserting `divs` or other container elements as necessary, but since the table was the only thing on the page, I felt this would suffice.

-- `input` type: Asserting a type of `number` defaults to numeric input on mobile platforms, but initiates spinner UI elements next to each cell on instances of Firefox and on each active cell in Webkit browsers. I disabled spinners on desktop browsers.

-- UI and feel: I implemented a somewhat minimal UI. If I had a bit more direction (or if I felt I had the freedom to do so), I'd put in game status messages, a time counter, a point system, and perhaps hint messages. I didn't insert any clear / reset UI elements since it's simply a matter of refreshing the page.

-- board generation: The generated sudoku board is a variant of the version given in http://en.wikipedia.org/wiki/File:Sudoku-by-L2G-20050714_solution.svg with number permutation and row / column rearrangements that preserve Sudoku rules. As given in http://en.wikipedia.org/wiki/Mathematics_of_Sudoku#Enumerating_essentially_different_Sudoku_solutions, this gives a maximum of `(3!)^8 * 9!` or about `6.095e11` different possibilites for the board. (This is different from the solution on wikipedia since no reflection / transposition / rotation is done here.) This is much lower than the `6.7e21` possible solutions for Sudoku boards (http://en.wikipedia.org/wiki/Mathematics_of_Sudoku#Enumeration_results).

Given appropriate time, I would do random board generation as well, but board culling (or making the board first shown to the user) is non-trivial since sudoku boards differ in the number of minimum numbers that must be shown to make the game playable.
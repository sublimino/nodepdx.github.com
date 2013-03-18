# NodePDX Website

Source code for: http://nodepdx.org

## Blog

The blog is statically generated using grunt. 

To make this work, first `npm install` to ensure you have everything you need. 

Then run `grunt`.

Assuming all goes well, it will find all `.md` files in `~/blog/markdown` and convert them to `.html` files with the same name in `~/blog`, as well as updating `~/blog/index.html`.

To add a blog post, create a `.md` file in `~/blog/markdown` then run `grunt` to generate static html. 

Note: The filename is important! It must formatted `YYYY-MM-DD-title-words-seperated-by-dashes.md`. 

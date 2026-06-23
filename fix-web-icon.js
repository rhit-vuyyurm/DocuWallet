const fs = require("fs");

const file = "dist/index.html";
let html = fs.readFileSync(file, "utf8");

if (!html.includes('rel="apple-touch-icon"')) {
  html = html.replace(
    '<link rel="icon" href="/favicon.ico" />',
    '<link rel="icon" href="/favicon.ico" />\n  <link rel="apple-touch-icon" href="/favicon.ico" />'
  );
}

fs.writeFileSync(file, html);
console.log("Apple touch icon added.");
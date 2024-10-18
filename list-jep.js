const path = require("node:path");
const fs = require("node:fs");
const { parse } = require("node-html-parser");

(async function () {
  parseJdkPage("https://openjdk.org/projects/jdk9/");
  parseJdkPage("https://openjdk.org/projects/jdk/10");
  parseJdkPage("https://openjdk.org/projects/jdk/11");
  parseJdkPage("https://openjdk.org/projects/jdk/12");
  parseJdkPage("https://openjdk.org/projects/jdk/13");
  parseJdkPage("https://openjdk.org/projects/jdk/14");
  parseJdkPage("https://openjdk.org/projects/jdk/15");
  parseJdkPage("https://openjdk.org/projects/jdk/16");
  parseJdkPage("https://openjdk.org/projects/jdk/17");
  parseJdkPage("https://openjdk.org/projects/jdk/18");
  parseJdkPage("https://openjdk.org/projects/jdk/19");
  parseJdkPage("https://openjdk.org/projects/jdk/20");
  parseJdkPage("https://openjdk.org/projects/jdk/21");
})();

async function parseJdkPage(url) {
  const res = await fetch(url);
  if (200 !== res.status) {
    throw new Error(`Response error: ${res.status}`);
  }
  const html = await res.text();
  const root = parse(html);

  // fs.writeFileSync("output.html", html);

  const featuresSection = root.querySelector("#Features + blockquote");

  const links = featuresSection.querySelectorAll("a");
  for (const link of links) {
    let jepUrl = link.attributes["href"];

    // たまに相対URLになっているものがある
    if (jepUrl.startsWith("/")) {
      jepUrl = `https://openjdk.org${jepUrl}`;
    }

    console.log(jepUrl);
  }
  return;
}

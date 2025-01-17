const path = require("node:path");
const fs = require("node:fs");
const { parse } = require("node-html-parser");

const JEP_URLS = [
  "https://openjdk.org/jeps/102",
  "https://openjdk.org/jeps/110",
  "https://openjdk.org/jeps/143",
  "https://openjdk.org/jeps/158",
  "https://openjdk.org/jeps/165",
  "https://openjdk.org/jeps/193",
  "https://openjdk.org/jeps/197",
  "https://openjdk.org/jeps/199",
  "https://openjdk.org/jeps/200",
  "https://openjdk.org/jeps/201",
  "https://openjdk.org/jeps/211",
  "https://openjdk.org/jeps/212",
  "https://openjdk.org/jeps/213",
  "https://openjdk.org/jeps/214",
  "https://openjdk.org/jeps/215",
  "https://openjdk.org/jeps/216",
  "https://openjdk.org/jeps/217",
  "https://openjdk.org/jeps/219",
  "https://openjdk.org/jeps/220",
  "https://openjdk.org/jeps/221",
  "https://openjdk.org/jeps/222",
  "https://openjdk.org/jeps/223",
  "https://openjdk.org/jeps/224",
  "https://openjdk.org/jeps/225",
  "https://openjdk.org/jeps/226",
  "https://openjdk.org/jeps/227",
  "https://openjdk.org/jeps/228",
  "https://openjdk.org/jeps/229",
  "https://openjdk.org/jeps/231",
  "https://openjdk.org/jeps/232",
  "https://openjdk.org/jeps/233",
  "https://openjdk.org/jeps/235",
  "https://openjdk.org/jeps/236",
  "https://openjdk.org/jeps/237",
  "https://openjdk.org/jeps/238",
  "https://openjdk.org/jeps/240",
  "https://openjdk.org/jeps/241",
  "https://openjdk.org/jeps/243",
  "https://openjdk.org/jeps/244",
  "https://openjdk.org/jeps/245",
  "https://openjdk.org/jeps/246",
  "https://openjdk.org/jeps/247",
  "https://openjdk.org/jeps/248",
  "https://openjdk.org/jeps/249",
  "https://openjdk.org/jeps/250",
  "https://openjdk.org/jeps/251",
  "https://openjdk.org/jeps/252",
  "https://openjdk.org/jeps/253",
  "https://openjdk.org/jeps/254",
  "https://openjdk.org/jeps/255",
  "https://openjdk.org/jeps/256",
  "https://openjdk.org/jeps/257",
  "https://openjdk.org/jeps/258",
  "https://openjdk.org/jeps/259",
  "https://openjdk.org/jeps/260",
  "https://openjdk.org/jeps/261",
  "https://openjdk.org/jeps/262",
  "https://openjdk.org/jeps/263",
  "https://openjdk.org/jeps/264",
  "https://openjdk.org/jeps/265",
  "https://openjdk.org/jeps/266",
  "https://openjdk.org/jeps/267",
  "https://openjdk.org/jeps/268",
  "https://openjdk.org/jeps/269",
  "https://openjdk.org/jeps/270",
  "https://openjdk.org/jeps/271",
  "https://openjdk.org/jeps/272",
  "https://openjdk.org/jeps/273",
  "https://openjdk.org/jeps/274",
  "https://openjdk.org/jeps/275",
  "https://openjdk.org/jeps/276",
  "https://openjdk.org/jeps/277",
  "https://openjdk.org/jeps/278",
  "https://openjdk.org/jeps/279",
  "https://openjdk.org/jeps/280",
  "https://openjdk.org/jeps/281",
  "https://openjdk.org/jeps/282",
  "https://openjdk.org/jeps/283",
  "https://openjdk.org/jeps/284",
  "https://openjdk.org/jeps/285",
  "https://openjdk.org/jeps/287",
  "https://openjdk.org/jeps/288",
  "https://openjdk.org/jeps/289",
  "https://openjdk.org/jeps/290",
  "https://openjdk.org/jeps/291",
  "https://openjdk.org/jeps/292",
  "https://openjdk.org/jeps/294",
  "https://openjdk.org/jeps/295",
  "https://openjdk.org/jeps/297",
  "https://openjdk.org/jeps/298",
  "https://openjdk.org/jeps/299",
  "https://openjdk.org/jeps/400",
  "https://openjdk.org/jeps/408",
  "https://openjdk.org/jeps/413",
  "https://openjdk.org/jeps/416",
  "https://openjdk.org/jeps/417",
  "https://openjdk.org/jeps/418",
  "https://openjdk.org/jeps/419",
  "https://openjdk.org/jeps/420",
  "https://openjdk.org/jeps/421",
  "https://openjdk.org/jeps/339",
  "https://openjdk.org/jeps/360",
  "https://openjdk.org/jeps/371",
  "https://openjdk.org/jeps/372",
  "https://openjdk.org/jeps/373",
  "https://openjdk.org/jeps/374",
  "https://openjdk.org/jeps/375",
  "https://openjdk.org/jeps/377",
  "https://openjdk.org/jeps/378",
  "https://openjdk.org/jeps/379",
  "https://openjdk.org/jeps/381",
  "https://openjdk.org/jeps/383",
  "https://openjdk.org/jeps/384",
  "https://openjdk.org/jeps/385",
  "https://openjdk.org/jeps/405",
  "https://openjdk.org/jeps/422",
  "https://openjdk.org/jeps/424",
  "https://openjdk.org/jeps/425",
  "https://openjdk.org/jeps/426",
  "https://openjdk.org/jeps/427",
  "https://openjdk.org/jeps/428",
  "https://openjdk.org/jeps/189",
  "https://openjdk.org/jeps/230",
  "https://openjdk.org/jeps/325",
  "https://openjdk.org/jeps/334",
  "https://openjdk.org/jeps/340",
  "https://openjdk.org/jeps/341",
  "https://openjdk.org/jeps/344",
  "https://openjdk.org/jeps/346",
  "https://openjdk.org/jeps/430",
  "https://openjdk.org/jeps/431",
  "https://openjdk.org/jeps/439",
  "https://openjdk.org/jeps/440",
  "https://openjdk.org/jeps/441",
  "https://openjdk.org/jeps/442",
  "https://openjdk.org/jeps/443",
  "https://openjdk.org/jeps/444",
  "https://openjdk.org/jeps/445",
  "https://openjdk.org/jeps/446",
  "https://openjdk.org/jeps/448",
  "https://openjdk.org/jeps/449",
  "https://openjdk.org/jeps/451",
  "https://openjdk.org/jeps/452",
  "https://openjdk.org/jeps/453",
  "https://openjdk.org/jeps/306",
  "https://openjdk.org/jeps/356",
  "https://openjdk.org/jeps/382",
  "https://openjdk.org/jeps/391",
  "https://openjdk.org/jeps/398",
  "https://openjdk.org/jeps/403",
  "https://openjdk.org/jeps/406",
  "https://openjdk.org/jeps/407",
  "https://openjdk.org/jeps/409",
  "https://openjdk.org/jeps/410",
  "https://openjdk.org/jeps/411",
  "https://openjdk.org/jeps/412",
  "https://openjdk.org/jeps/414",
  "https://openjdk.org/jeps/415",
  "https://openjdk.org/jeps/286",
  "https://openjdk.org/jeps/296",
  "https://openjdk.org/jeps/304",
  "https://openjdk.org/jeps/307",
  "https://openjdk.org/jeps/310",
  "https://openjdk.org/jeps/312",
  "https://openjdk.org/jeps/313",
  "https://openjdk.org/jeps/314",
  "https://openjdk.org/jeps/316",
  "https://openjdk.org/jeps/317",
  "https://openjdk.org/jeps/319",
  "https://openjdk.org/jeps/322",
  "https://openjdk.org/jeps/181",
  "https://openjdk.org/jeps/309",
  "https://openjdk.org/jeps/315",
  "https://openjdk.org/jeps/318",
  "https://openjdk.org/jeps/320",
  "https://openjdk.org/jeps/321",
  "https://openjdk.org/jeps/323",
  "https://openjdk.org/jeps/324",
  "https://openjdk.org/jeps/327",
  "https://openjdk.org/jeps/328",
  "https://openjdk.org/jeps/329",
  "https://openjdk.org/jeps/330",
  "https://openjdk.org/jeps/331",
  "https://openjdk.org/jeps/332",
  "https://openjdk.org/jeps/333",
  "https://openjdk.org/jeps/335",
  "https://openjdk.org/jeps/336",
  "https://openjdk.org/jeps/305",
  "https://openjdk.org/jeps/343",
  "https://openjdk.org/jeps/345",
  "https://openjdk.org/jeps/349",
  "https://openjdk.org/jeps/352",
  "https://openjdk.org/jeps/358",
  "https://openjdk.org/jeps/359",
  "https://openjdk.org/jeps/361",
  "https://openjdk.org/jeps/362",
  "https://openjdk.org/jeps/363",
  "https://openjdk.org/jeps/364",
  "https://openjdk.org/jeps/365",
  "https://openjdk.org/jeps/366",
  "https://openjdk.org/jeps/367",
  "https://openjdk.org/jeps/368",
  "https://openjdk.org/jeps/370",
  "https://openjdk.org/jeps/338",
  "https://openjdk.org/jeps/347",
  "https://openjdk.org/jeps/357",
  "https://openjdk.org/jeps/369",
  "https://openjdk.org/jeps/376",
  "https://openjdk.org/jeps/380",
  "https://openjdk.org/jeps/386",
  "https://openjdk.org/jeps/387",
  "https://openjdk.org/jeps/388",
  "https://openjdk.org/jeps/389",
  "https://openjdk.org/jeps/390",
  "https://openjdk.org/jeps/392",
  "https://openjdk.org/jeps/393",
  "https://openjdk.org/jeps/394",
  "https://openjdk.org/jeps/395",
  "https://openjdk.org/jeps/396",
  "https://openjdk.org/jeps/397",
  "https://openjdk.org/jeps/429",
  "https://openjdk.org/jeps/432",
  "https://openjdk.org/jeps/433",
  "https://openjdk.org/jeps/434",
  "https://openjdk.org/jeps/436",
  "https://openjdk.org/jeps/437",
  "https://openjdk.org/jeps/438",
  "https://openjdk.org/jeps/350",
  "https://openjdk.org/jeps/351",
  "https://openjdk.org/jeps/353",
  "https://openjdk.org/jeps/354",
  "https://openjdk.org/jeps/355",
];

(async function () {
  console.log(
    ["Javaバージョン", "JEP URL", "Title", "Type", "Component"].join("\t")
  );
  for (const url of JEP_URLS) {
    parseJep(url);

    await sleep(1000);
  }
})();

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function parseJep(url) {
  const res = await fetch(url);
  if (200 !== res.status) {
    throw new Error(`Response error: ${res.status}`);
  }
  const html = await res.text();
  const root = parse(html);

  // fs.writeFileSync("output.html", html);

  const title = root.querySelector("#main h1")?.text?.trim();

  const headRows = root.querySelectorAll(".head tr");
  let type = "-";
  let component = "-";
  let release = "-";
  for (const row of headRows) {
    const td = row.querySelectorAll("td");
    if (td.length !== 2) continue;
    const name = td[0]?.text?.trim();
    const val = td[1]?.text?.trim();

    if (name === "Type") type = val;
    if (name === "Release") release = val; // Javaバージョン
    if (name === "Component") component = val;
  }

  console.log([release, url, title, type, component].join("\t"));
  return;
}

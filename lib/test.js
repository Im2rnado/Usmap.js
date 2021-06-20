const Usmap = require("../index.js");
const fs = require("fs");

const reader = new Usmap({ debug: true });

const start = Date.now();

const buf = fs.readFileSync("path.usmap");
const mappings = reader.parse(buf);

console.log(`Successfully parsed file in ${(Date.now() - start) / 1000}s (${mappings.count.enums} enums, ${mappings.count.schemas} schemas)`);
/* eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */

const licenseHeader = 
  "\n" +
  "Copyright (c) 2016 - 2020, Matteo Gaggiano and the angular-mimetype contributors\n" +
  "SPDX-License-Identifier: MIT\n" +
  "\n";

const searchFor = " * SPDX-License-Identifier: MIT";

const { resolve, join, basename } = require("path");
const { statSync, readdirSync, readFileSync, writeFileSync } = require("fs");

const directoriesPath = [
  join(__dirname, "src"),
  join(__dirname, "spec")
];

const licenseContent = readFileSync(join(__dirname, "LICENSE.txt"), {encoding: "utf8"});

const fileTypes = ["js"];

const isValidFileType = (fileTypes) => {
  return (file) => fileTypes.length === 0 || fileTypes.filter(ft => {
        return file.lastIndexOf("." + ft) === file.length - (ft.length + 1);
      }).length > 0;
};

const getFiles = (path, fileTypes = []) => {
  const subdirs = readdirSync(path);
  const files = subdirs.map((subdir) => {
    const res = resolve(path, subdir);
    return (statSync(res)).isDirectory() ? getFiles(res, fileTypes) : res;
  });
  return files
    .reduce((a, f) => a.concat(f), [])
    .filter(isValidFileType(fileTypes));
};

let files = [];
for (const directory of directoriesPath) {
  files = [...files, ...getFiles(directory, fileTypes)];
}

const edited = [];
for (const file of files) {
  let content = readFileSync(file, {encoding: "utf8"});
  let lines = content.split("\n");
  let found = false;
  for (const line of lines) {
    found = found || line.indexOf(searchFor) === 0;
  }
  if (!found) {
    const header = [
      ",",
      "/**",
      " *",
      ` * ${basename(file)}`,
      ...licenseHeader.split("\n").map((l) => ` * ${l}`),
      ...licenseContent.split("\n").map((l) => ` * ${l}`),
      " *",
      " */",
      ",",
      ""
    ];
    lines.unshift.apply(lines, header);
    content = lines.join("\n");
    writeFileSync(file, content, {flag: "w"});
    edited.push({path: file, name: basename(file)});
  }
}

if (edited.length > 0) {
  console.info(`License: Edited ${edited.length} files:`, edited);  
} else {
  console.info("License: No file updated");
}

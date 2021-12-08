#!/usr/bin/env node

const { existsSync } = require("fs");
const { readFile, writeFile, mkdir } = require("fs/promises");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Component or typescript library (co/ts)? ", (libType) => {
  if (libType !== "co" && libType !== "ts") {
    throw new Error("Have to be co/ts. got " + libType);
  }
  rl.question("Library name? ", async (libName) => {
    if (libType === "co") {
      await createComponentLibrary(libName);
    } else {
      await createLibrary(libName);
    }
    process.exit();
  });
});

async function createComponentLibrary(libName) {
  if (!libName) {
    throw new Error("Please supply a valid library name");
  }
  if (existsSync("libs/" + libName)) {
    throw new Error("Library already exists");
  }

  const libPath = "libs/" + libName;

  const tsConfig = JSON.parse((await readFile("tsconfig.json")).toString());
  tsConfig.compilerOptions.paths["@careos/" + libName] = [libPath];
  tsConfig.compilerOptions.paths["@careos/" + libName + "/*"] = [
    libPath + "/*",
  ];
  await writeFile("tsconfig.json", JSON.stringify(tsConfig, null, 2));
  await mkdir(libPath);
  await writeFile(libPath + "/README.md", "# " + libName);
  await writeFile(
    libPath + "/LibraryComponent.vue",
    `<template>
  <div></div>
</template>
<script lang="ts" setup>
</script>
<style scoped>
</style>
`
  );
}

async function createLibrary(libName) {
  if (!libName) {
    throw new Error("Please supply a valid library name");
  }
  if (existsSync("libs/" + libName)) {
    throw new Error("Library already exists");
  }

  const libPath = "libs/" + libName;

  const tsConfig = JSON.parse((await readFile("tsconfig.json")).toString());
  tsConfig.compilerOptions.paths["@careos/" + libName] = [libPath];
  tsConfig.compilerOptions.paths["@careos/" + libName + "/*"] = [
    libPath + "/*",
  ];
  await writeFile("tsconfig.json", JSON.stringify(tsConfig, null, 2));
  await mkdir(libPath);
  await mkdir(libPath + "/src");
  await writeFile(
    libPath + "/src/index.ts",
    "export const helloWorld = 'Hello World!'"
  );
  await writeFile(libPath + "/index.ts", "export * from './src'");
  await writeFile(libPath + "/README.md", "# " + libName);
}

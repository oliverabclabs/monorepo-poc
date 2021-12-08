#!/bin/bash
if [ ! $1 ]; then
 printf "Please supply a name for your app\n"
 exit 0
fi
VITECONFIG=$(< tools/generation/.viteconfig)
cd apps
if [ -d ./$1 ]; then
 printf "App $1 already exists\n"
 exit 0
fi


npm init vite@latest $1 -- --template vue-ts > /dev/null
rm ./$1/README.md
rm ./$1/tsconfig.json
rm ./$1/package.json
rm ./$1/.gitignore
rm -rf ./$1/.vscode
echo $VITECONFIG > ./$1/vite.config.ts

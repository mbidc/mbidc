#!/bin/sh
set -x
rm  -rf dist
mkdir -p dist
cp -r packages/backend/dist dist/dist
cp -r packages/frontend/build dist/static
cp -r packages/backend/package.json dist
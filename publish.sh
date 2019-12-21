#!/bin/bash

if [ "$(git rev-parse --abbrev-ref HEAD)" != "master" ]; then
  echo -e "You can only publish master branch\n" >&2
  exit 1
fi

version=$1
if [ -z "$version" ]; then
  read -p "Version : " version
fi
if [ -z "$version" ]; then
  echo -e "You must specify a version.\n" >&2
  exit 1
fi

echo -e "Run tests...\n"
yarn test
if [ $? -ne 0 ]; then
  echo -e "Tests failed !\n" >&2
  exit 1
fi
echo -e "Build...\n"
yarn build
if [ $! -ne 0 ]; then
  echo -e "Build failed !\n" >&2
  exit 1
fi

git tag -a v$version -m "Version $version [$(date +"%Y-%m-%dT%H:%M:%S")]"
git push --tags

yarn publish --access public --new-version $version

exit 0

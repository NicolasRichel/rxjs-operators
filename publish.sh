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
  echo -e "Some tests failed !\nCancel publishing.\n" >&2
  exit 1
fi
echo -e "Build...\n"
yarn build
if [ $? -ne 0 ]; then
  echo -e "Build failed !\nCancel publishing.\n" >&2
  exit 1
fi

yarn publish --access public --new-version $version
git push
git push --tags

exit 0

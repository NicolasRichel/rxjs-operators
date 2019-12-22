#!/bin/bash

# List of operator groups
groups=(\
  "tree-handling"\
)


function dashToCamel {
  echo "$1" | awk -F"-" '{for(i=2;i<=NF;i++){$i=toupper(substr($i,1,1)) substr($i,2)}} 1' OFS=""
}

function createSrcFileTemplate {
  local srcFile=src/$1/$2.ts
  local opFnName=`dashToCamel $2`
  touch $srcFile
  echo -e "\
import { Observable } from 'rxjs';\n\
\n\n\
export function $opFnName(): (source: Observable<any>) => Observable<any> {\n\
  return null;\n\
}" > $srcFile
}

function createSpecFileTemplate {
  local specFile=spec/$1/$2.spec.ts
  local opFnName=`dashToCamel $2`
  touch $specFile
  echo -e "\
describe('[ $opFnName ]', () => {\n\
\n\
  test('test', done => done());\n\
\n\
});" > $specFile
}


echo "Select a group : "
select group in "${groups[@]}"
do
  if [ ! -z "$group" ]; then

    read -p "Enter operator name (in dash case) : " name
    if [ -z "$name" ]; then
      echo -e "You must specify a name.\n" >&2
      exit 1
    fi

    file=src/$group/$name.ts
    if [ -f $file ]; then
      echo -e "This operator already exist.\n" >&2
      exit 1
    fi

    createSrcFileTemplate $group $name
    createSpecFileTemplate $group $name
    break

  fi
done

exit 0

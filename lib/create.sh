#!/bin/zsh

COMP_NAME=$1

echo "$COMP_NAME"

mkdir "$COMP_NAME"

cd "./$COMP_NAME" || exit

touch "$COMP_NAME.stories.ts" \
  "$COMP_NAME.story.tsx" \
  "$COMP_NAME.test.ts" \
  "$COMP_NAME.mock.tsx" \
  "$COMP_NAME.tsx" \
  "index.tsx" \

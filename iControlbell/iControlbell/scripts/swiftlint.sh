#!/bin/sh
# SwiftLint script for iControlbell project
if which swiftlint >/dev/null; then
  swiftlint
else
  echo "warning: SwiftLint not installed, download from https://github.com/realm/SwiftLint"
fi
exit 0

#!/bin/bash
set -e

cd "$(dirname "$0")/.."

echo "==> Building shared package..."
npm run build:shared

echo "==> Bundling REST Lambda..."
npm run --workspace=server build:lambda-rest

echo "==> Copying bcrypt native module for REST Lambda..."
# bcrypt is externalized from the bundle because it uses native bindings
# Copy the pre-built node_modules into the Lambda package
mkdir -p server/dist-lambda/rest/node_modules
cp -r node_modules/bcrypt server/dist-lambda/rest/node_modules/
cp -r node_modules/@mapbox server/dist-lambda/rest/node_modules/
# Also copy bcrypt's transitive deps that use require()
for dep in node-addon-api detect-libc napi-build-utils semver abbrev make-dir minipass fs-minipass tar; do
  if [ -d "node_modules/$dep" ]; then
    cp -r "node_modules/$dep" server/dist-lambda/rest/node_modules/
  fi
done

echo "==> Packaging REST Lambda zip..."
(cd server/dist-lambda/rest && zip -r ../../../infra/lambda-rest.zip .)

echo "==> Bundling WS Lambda..."
npm run --workspace=server build:lambda-ws

echo "==> Packaging WS Lambda zip..."
(cd server/dist-lambda/ws && zip -r ../../../infra/lambda-ws.zip .)

echo "==> Lambda packages ready in infra/"
ls -lh infra/lambda-*.zip

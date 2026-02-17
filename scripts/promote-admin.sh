#!/usr/bin/env bash
set -euo pipefail

USERNAME="${1:?Usage: npm run admin:promote -- <username>}"
TABLE="FoundationGame"

USER_PK=$(aws dynamodb query --table-name "$TABLE" \
  --index-name GSI1 \
  --key-condition-expression "GSI1PK = :pk" \
  --expression-attribute-values "{\":pk\": {\"S\": \"USERNAME#${USERNAME}\"}}" \
  --query "Items[0].PK.S" --output text)

if [ "$USER_PK" = "None" ] || [ -z "$USER_PK" ]; then
  echo "Error: user '${USERNAME}' not found"
  exit 1
fi

aws dynamodb update-item --table-name "$TABLE" \
  --key "{\"PK\": {\"S\": \"${USER_PK}\"}, \"SK\": {\"S\": \"PROFILE\"}}" \
  --update-expression "SET is_admin = :t" \
  --expression-attribute-values '{":t": {"BOOL": true}}'

echo "Promoted ${USERNAME} (${USER_PK}) to admin"

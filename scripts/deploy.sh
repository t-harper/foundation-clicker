#!/bin/bash
set -e

cd "$(dirname "$0")/.."

# Load AWS credentials from shell profile
source ~/.zshrc 2>/dev/null || true

# Load .env if present
if [ -f .env ]; then
  set -a
  source .env
  set +a
fi

# Required environment variables
: "${TF_VAR_jwt_secret:?Set TF_VAR_jwt_secret before deploying}"
: "${AWS_ACCESS_KEY_ID:?Set AWS_ACCESS_KEY_ID before deploying}"
: "${AWS_SECRET_ACCESS_KEY:?Set AWS_SECRET_ACCESS_KEY before deploying}"
: "${AWS_REGION:=us-east-1}"
export AWS_REGION

echo "=== Foundation Game - Full Deployment ==="

# 1. Build shared package
echo ""
echo "==> Step 1: Building shared package..."
npm run build:shared

# 2. Build and package Lambda functions
echo ""
echo "==> Step 2: Building and packaging Lambda functions..."
rm -rf server/dist-lambda
npm run --workspace=server build:lambda-rest
npm run --workspace=server build:lambda-ws
(cd server/dist-lambda/rest && zip -r ../../../infra/lambda-rest.zip .)
(cd server/dist-lambda/ws && zip -r ../../../infra/lambda-ws.zip .)

# 3. Terraform apply
echo ""
echo "==> Step 3: Applying Terraform..."
cd infra
terraform init -input=false
terraform apply -auto-approve

# 4. Get outputs
HTTP_API_URL=$(terraform output -raw http_api_url)
WS_API_URL=$(terraform output -raw ws_api_url)
CF_DOMAIN=$(terraform output -raw cloudfront_domain)
S3_BUCKET=$(terraform output -raw s3_bucket_name)
CF_DIST_ID=$(terraform output -raw cloudfront_distribution_id)
APP_URL=$(terraform output -raw app_url)
API_CUSTOM_URL=$(terraform output -raw api_custom_url)
WS_CUSTOM_URL=$(terraform output -raw ws_custom_url)
cd ..

echo ""
echo "==> Terraform outputs:"
echo "    App URL:    $APP_URL"
echo "    API URL:    $API_CUSTOM_URL"
echo "    WS URL:     $WS_CUSTOM_URL"
echo "    CloudFront: $CF_DOMAIN"
echo "    S3 Bucket:  $S3_BUCKET"

# 5. Build client with production env vars (using custom domain URLs)
echo ""
echo "==> Step 5: Building client..."
VITE_API_URL="${API_CUSTOM_URL}/api" VITE_WS_URL="$WS_CUSTOM_URL" npm run build:client

# 6. Deploy client to S3
echo ""
echo "==> Step 6: Deploying client to S3..."
aws s3 sync client/dist/ "s3://$S3_BUCKET" --delete

# 7. Invalidate CloudFront cache
echo ""
echo "==> Step 7: Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id "$CF_DIST_ID" --paths "/*" > /dev/null

echo ""
echo "=== Deployment complete ==="
echo "    App URL: $APP_URL"
echo "    API URL: $API_CUSTOM_URL"
echo "    WS URL:  $WS_CUSTOM_URL"

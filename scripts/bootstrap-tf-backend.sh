#!/bin/bash
set -euo pipefail

# Bootstrap Terraform S3 backend - run once before migrating state.
# Creates:
#   - S3 bucket for state (versioned, encrypted, public access blocked)
#   - DynamoDB table for state locking

AWS_REGION="${AWS_REGION:-us-east-1}"
BUCKET_NAME="foundation-game-tfstate-831473839640"
LOCK_TABLE="foundation-game-tflock"

echo "=== Bootstrapping Terraform S3 Backend ==="
echo "    Region: $AWS_REGION"
echo "    Bucket: $BUCKET_NAME"
echo "    Lock table: $LOCK_TABLE"
echo ""

# --- S3 Bucket ---
if aws s3api head-bucket --bucket "$BUCKET_NAME" 2>/dev/null; then
  echo "S3 bucket already exists, skipping creation."
else
  echo "Creating S3 bucket..."
  aws s3api create-bucket \
    --bucket "$BUCKET_NAME" \
    --region "$AWS_REGION"
fi

echo "Enabling versioning..."
aws s3api put-bucket-versioning \
  --bucket "$BUCKET_NAME" \
  --versioning-configuration Status=Enabled

echo "Enabling default encryption..."
aws s3api put-bucket-encryption \
  --bucket "$BUCKET_NAME" \
  --server-side-encryption-configuration '{
    "Rules": [{"ApplyServerSideEncryptionByDefault": {"SSEAlgorithm": "AES256"}}]
  }'

echo "Blocking public access..."
aws s3api put-public-access-block \
  --bucket "$BUCKET_NAME" \
  --public-access-block-configuration \
    BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true

# --- DynamoDB Lock Table ---
if aws dynamodb describe-table --table-name "$LOCK_TABLE" --region "$AWS_REGION" >/dev/null 2>&1; then
  echo "DynamoDB lock table already exists, skipping creation."
else
  echo "Creating DynamoDB lock table..."
  aws dynamodb create-table \
    --table-name "$LOCK_TABLE" \
    --attribute-definitions AttributeName=LockID,AttributeType=S \
    --key-schema AttributeName=LockID,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region "$AWS_REGION"

  echo "Waiting for table to become active..."
  aws dynamodb wait table-exists --table-name "$LOCK_TABLE" --region "$AWS_REGION"
fi

echo ""
echo "=== Bootstrap complete ==="
echo "Next: add backend \"s3\" block to infra/main.tf, then run:"
echo "  cd infra && terraform init -migrate-state"

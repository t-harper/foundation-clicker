resource "aws_lambda_function" "rest_api" {
  function_name = "${local.prefix}-rest-api"
  role          = aws_iam_role.lambda_rest.arn
  handler       = "lambda-rest.handler"
  runtime       = "nodejs20.x"
  memory_size   = 256
  timeout       = 30

  filename         = "${path.module}/lambda-rest.zip"
  source_code_hash = filebase64sha256("${path.module}/lambda-rest.zip")

  environment {
    variables = {
      JWT_SECRET     = var.jwt_secret
      DYNAMODB_TABLE = var.dynamodb_table_name
      AWS_REGION_APP = var.aws_region
      ALLOWED_ORIGIN  = "https://app.${var.domain_name}"
      WS_API_ENDPOINT = "https://ws.${var.domain_name}"
    }
  }

  tags = {
    Project = var.project_name
  }
}

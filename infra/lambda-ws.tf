resource "aws_lambda_function" "ws_connect" {
  function_name = "${local.prefix}-ws-connect"
  role          = aws_iam_role.lambda_ws.arn
  handler       = "lambda-ws-connect.handler"
  runtime       = "nodejs20.x"
  memory_size   = 256
  timeout       = 30

  filename         = "${path.module}/lambda-ws.zip"
  source_code_hash = filebase64sha256("${path.module}/lambda-ws.zip")

  environment {
    variables = {
      JWT_SECRET     = var.jwt_secret
      DYNAMODB_TABLE = var.dynamodb_table_name
      AWS_REGION_APP = var.aws_region
    }
  }

  tags = {
    Project = var.project_name
  }
}

resource "aws_lambda_function" "ws_disconnect" {
  function_name = "${local.prefix}-ws-disconnect"
  role          = aws_iam_role.lambda_ws.arn
  handler       = "lambda-ws-disconnect.handler"
  runtime       = "nodejs20.x"
  memory_size   = 256
  timeout       = 30

  filename         = "${path.module}/lambda-ws.zip"
  source_code_hash = filebase64sha256("${path.module}/lambda-ws.zip")

  environment {
    variables = {
      JWT_SECRET     = var.jwt_secret
      DYNAMODB_TABLE = var.dynamodb_table_name
      AWS_REGION_APP = var.aws_region
    }
  }

  tags = {
    Project = var.project_name
  }
}

resource "aws_lambda_function" "ws_default" {
  function_name = "${local.prefix}-ws-default"
  role          = aws_iam_role.lambda_ws.arn
  handler       = "lambda-ws-default.handler"
  runtime       = "nodejs20.x"
  memory_size   = 256
  timeout       = 30

  filename         = "${path.module}/lambda-ws.zip"
  source_code_hash = filebase64sha256("${path.module}/lambda-ws.zip")

  environment {
    variables = {
      JWT_SECRET     = var.jwt_secret
      DYNAMODB_TABLE = var.dynamodb_table_name
      AWS_REGION_APP = var.aws_region
      WS_API_ENDPOINT = "https://ws.${var.domain_name}"
    }
  }

  tags = {
    Project = var.project_name
  }
}

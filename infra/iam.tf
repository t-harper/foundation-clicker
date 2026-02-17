# --- REST Lambda IAM ---

data "aws_iam_policy_document" "lambda_assume" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda_rest" {
  name               = "${local.prefix}-lambda-rest"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume.json
}

resource "aws_iam_role_policy_attachment" "lambda_rest_basic" {
  role       = aws_iam_role.lambda_rest.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

data "aws_iam_policy_document" "dynamodb_access" {
  statement {
    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:BatchWriteItem",
      "dynamodb:BatchGetItem",
    ]
    resources = [
      aws_dynamodb_table.game.arn,
      "${aws_dynamodb_table.game.arn}/index/*",
    ]
  }
}

resource "aws_iam_role_policy" "lambda_rest_dynamodb" {
  name   = "dynamodb-access"
  role   = aws_iam_role.lambda_rest.id
  policy = data.aws_iam_policy_document.dynamodb_access.json
}

# --- WebSocket Lambda IAM ---

resource "aws_iam_role" "lambda_ws" {
  name               = "${local.prefix}-lambda-ws"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume.json
}

resource "aws_iam_role_policy_attachment" "lambda_ws_basic" {
  role       = aws_iam_role.lambda_ws.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "lambda_ws_dynamodb" {
  name   = "dynamodb-access"
  role   = aws_iam_role.lambda_ws.id
  policy = data.aws_iam_policy_document.dynamodb_access.json
}

data "aws_iam_policy_document" "apigw_manage_connections" {
  statement {
    actions   = ["execute-api:ManageConnections"]
    resources = ["${aws_apigatewayv2_api.ws.execution_arn}/*"]
  }
}

resource "aws_iam_role_policy" "lambda_ws_apigw" {
  name   = "apigw-manage-connections"
  role   = aws_iam_role.lambda_ws.id
  policy = data.aws_iam_policy_document.apigw_manage_connections.json
}

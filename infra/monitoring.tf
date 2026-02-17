# CloudWatch Dashboard for Foundation Game
# Covers Lambda, API Gateway (HTTP + WS), DynamoDB, CloudFront, and Billing

resource "aws_cloudwatch_dashboard" "main" {
  dashboard_name = "${local.prefix}-dashboard"

  dashboard_body = jsonencode({
    widgets = flatten([
      # =========================================================================
      # Section 1: Lambda Functions (y=0)
      # =========================================================================
      [
        {
          type   = "text"
          x      = 0
          y      = 0
          width  = 24
          height = 1
          properties = {
            markdown = "# Lambda Functions"
          }
        },
        {
          type   = "metric"
          x      = 0
          y      = 1
          width  = 12
          height = 6
          properties = {
            title   = "Invocations"
            view    = "timeSeries"
            stacked = true
            region  = var.aws_region
            period  = 300
            stat    = "Sum"
            metrics = [
              ["AWS/Lambda", "Invocations", "FunctionName", aws_lambda_function.rest_api.function_name, { label = "REST API" }],
              ["AWS/Lambda", "Invocations", "FunctionName", aws_lambda_function.ws_connect.function_name, { label = "WS Connect" }],
              ["AWS/Lambda", "Invocations", "FunctionName", aws_lambda_function.ws_disconnect.function_name, { label = "WS Disconnect" }],
              ["AWS/Lambda", "Invocations", "FunctionName", aws_lambda_function.ws_default.function_name, { label = "WS Default" }],
            ]
          }
        },
        {
          type   = "metric"
          x      = 12
          y      = 1
          width  = 12
          height = 6
          properties = {
            title   = "Errors"
            view    = "timeSeries"
            stacked = true
            region  = var.aws_region
            period  = 300
            stat    = "Sum"
            metrics = [
              ["AWS/Lambda", "Errors", "FunctionName", aws_lambda_function.rest_api.function_name, { label = "REST API" }],
              ["AWS/Lambda", "Errors", "FunctionName", aws_lambda_function.ws_connect.function_name, { label = "WS Connect" }],
              ["AWS/Lambda", "Errors", "FunctionName", aws_lambda_function.ws_disconnect.function_name, { label = "WS Disconnect" }],
              ["AWS/Lambda", "Errors", "FunctionName", aws_lambda_function.ws_default.function_name, { label = "WS Default" }],
            ]
          }
        },
        {
          type   = "metric"
          x      = 0
          y      = 7
          width  = 12
          height = 6
          properties = {
            title  = "Duration"
            view   = "timeSeries"
            region = var.aws_region
            period = 300
            metrics = [
              ["AWS/Lambda", "Duration", "FunctionName", aws_lambda_function.rest_api.function_name, { stat = "Average", label = "REST API avg" }],
              ["AWS/Lambda", "Duration", "FunctionName", aws_lambda_function.rest_api.function_name, { stat = "p99", label = "REST API p99" }],
              ["AWS/Lambda", "Duration", "FunctionName", aws_lambda_function.ws_connect.function_name, { stat = "Average", label = "WS Connect avg" }],
              ["AWS/Lambda", "Duration", "FunctionName", aws_lambda_function.ws_disconnect.function_name, { stat = "Average", label = "WS Disconnect avg" }],
              ["AWS/Lambda", "Duration", "FunctionName", aws_lambda_function.ws_default.function_name, { stat = "Average", label = "WS Default avg" }],
              ["AWS/Lambda", "Duration", "FunctionName", aws_lambda_function.ws_default.function_name, { stat = "p99", label = "WS Default p99" }],
            ]
          }
        },
        {
          type   = "metric"
          x      = 12
          y      = 7
          width  = 12
          height = 6
          properties = {
            title  = "Throttles & Concurrency"
            view   = "timeSeries"
            region = var.aws_region
            period = 300
            yAxis = {
              left  = { label = "Throttles" }
              right = { label = "Concurrent Executions" }
            }
            metrics = [
              ["AWS/Lambda", "Throttles", "FunctionName", aws_lambda_function.rest_api.function_name, { stat = "Sum", label = "REST API Throttles" }],
              ["AWS/Lambda", "Throttles", "FunctionName", aws_lambda_function.ws_default.function_name, { stat = "Sum", label = "WS Default Throttles" }],
              ["AWS/Lambda", "ConcurrentExecutions", "FunctionName", aws_lambda_function.rest_api.function_name, { stat = "Maximum", label = "REST API Concurrency", yAxis = "right" }],
              ["AWS/Lambda", "ConcurrentExecutions", "FunctionName", aws_lambda_function.ws_default.function_name, { stat = "Maximum", label = "WS Default Concurrency", yAxis = "right" }],
            ]
          }
        },
      ],

      # =========================================================================
      # Section 2: REST API Gateway (y=13)
      # =========================================================================
      [
        {
          type   = "text"
          x      = 0
          y      = 13
          width  = 24
          height = 1
          properties = {
            markdown = "# REST API (HTTP)"
          }
        },
        {
          type   = "metric"
          x      = 0
          y      = 14
          width  = 12
          height = 6
          properties = {
            title  = "Request Count"
            view   = "timeSeries"
            region = var.aws_region
            period = 300
            stat   = "Sum"
            metrics = [
              ["AWS/ApiGateway", "Count", "ApiId", aws_apigatewayv2_api.http.id],
            ]
          }
        },
        {
          type   = "metric"
          x      = 12
          y      = 14
          width  = 12
          height = 6
          properties = {
            title  = "Latency"
            view   = "timeSeries"
            region = var.aws_region
            period = 300
            metrics = [
              ["AWS/ApiGateway", "Latency", "ApiId", aws_apigatewayv2_api.http.id, { stat = "Average", label = "Latency avg" }],
              ["AWS/ApiGateway", "Latency", "ApiId", aws_apigatewayv2_api.http.id, { stat = "p99", label = "Latency p99" }],
              ["AWS/ApiGateway", "IntegrationLatency", "ApiId", aws_apigatewayv2_api.http.id, { stat = "Average", label = "Integration avg" }],
            ]
          }
        },
        {
          type   = "metric"
          x      = 0
          y      = 20
          width  = 12
          height = 6
          properties = {
            title  = "4xx Errors"
            view   = "timeSeries"
            region = var.aws_region
            period = 300
            stat   = "Sum"
            metrics = [
              ["AWS/ApiGateway", "4xx", "ApiId", aws_apigatewayv2_api.http.id],
            ]
          }
        },
        {
          type   = "metric"
          x      = 12
          y      = 20
          width  = 12
          height = 6
          properties = {
            title  = "5xx Errors"
            view   = "timeSeries"
            region = var.aws_region
            period = 300
            stat   = "Sum"
            metrics = [
              ["AWS/ApiGateway", "5xx", "ApiId", aws_apigatewayv2_api.http.id],
            ]
          }
        },
      ],

      # =========================================================================
      # Section 3: WebSocket API Gateway (y=26)
      # =========================================================================
      [
        {
          type   = "text"
          x      = 0
          y      = 26
          width  = 24
          height = 1
          properties = {
            markdown = "# WebSocket API"
          }
        },
        {
          type   = "metric"
          x      = 0
          y      = 27
          width  = 12
          height = 6
          properties = {
            title  = "Connections"
            view   = "timeSeries"
            region = var.aws_region
            period = 300
            stat   = "Sum"
            metrics = [
              ["AWS/ApiGateway", "ConnectCount", "ApiId", aws_apigatewayv2_api.ws.id],
              ["AWS/ApiGateway", "DisconnectCount", "ApiId", aws_apigatewayv2_api.ws.id],
            ]
          }
        },
        {
          type   = "metric"
          x      = 12
          y      = 27
          width  = 12
          height = 6
          properties = {
            title  = "Messages"
            view   = "timeSeries"
            region = var.aws_region
            period = 300
            stat   = "Sum"
            metrics = [
              ["AWS/ApiGateway", "MessageCount", "ApiId", aws_apigatewayv2_api.ws.id],
            ]
          }
        },
        {
          type   = "metric"
          x      = 0
          y      = 33
          width  = 12
          height = 6
          properties = {
            title  = "Errors"
            view   = "timeSeries"
            region = var.aws_region
            period = 300
            stat   = "Sum"
            metrics = [
              ["AWS/ApiGateway", "IntegrationError", "ApiId", aws_apigatewayv2_api.ws.id],
              ["AWS/ApiGateway", "ExecutionError", "ApiId", aws_apigatewayv2_api.ws.id],
            ]
          }
        },
        {
          type   = "metric"
          x      = 12
          y      = 33
          width  = 12
          height = 6
          properties = {
            title  = "Latency"
            view   = "timeSeries"
            region = var.aws_region
            period = 300
            metrics = [
              ["AWS/ApiGateway", "IntegrationLatency", "ApiId", aws_apigatewayv2_api.ws.id, { stat = "Average", label = "Integration avg" }],
              ["AWS/ApiGateway", "IntegrationLatency", "ApiId", aws_apigatewayv2_api.ws.id, { stat = "p99", label = "Integration p99" }],
            ]
          }
        },
      ],

      # =========================================================================
      # Section 4: DynamoDB (y=39)
      # =========================================================================
      [
        {
          type   = "text"
          x      = 0
          y      = 39
          width  = 24
          height = 1
          properties = {
            markdown = "# DynamoDB"
          }
        },
        {
          type   = "metric"
          x      = 0
          y      = 40
          width  = 12
          height = 6
          properties = {
            title  = "Read Capacity"
            view   = "timeSeries"
            region = var.aws_region
            period = 300
            stat   = "Sum"
            metrics = [
              ["AWS/DynamoDB", "ConsumedReadCapacityUnits", "TableName", aws_dynamodb_table.game.name, { label = "Table" }],
              ["AWS/DynamoDB", "ConsumedReadCapacityUnits", "TableName", aws_dynamodb_table.game.name, "GlobalSecondaryIndexName", "GSI1", { label = "GSI1" }],
            ]
          }
        },
        {
          type   = "metric"
          x      = 12
          y      = 40
          width  = 12
          height = 6
          properties = {
            title  = "Write Capacity"
            view   = "timeSeries"
            region = var.aws_region
            period = 300
            stat   = "Sum"
            metrics = [
              ["AWS/DynamoDB", "ConsumedWriteCapacityUnits", "TableName", aws_dynamodb_table.game.name, { label = "Table" }],
              ["AWS/DynamoDB", "ConsumedWriteCapacityUnits", "TableName", aws_dynamodb_table.game.name, "GlobalSecondaryIndexName", "GSI1", { label = "GSI1" }],
            ]
          }
        },
        {
          type   = "metric"
          x      = 0
          y      = 46
          width  = 12
          height = 6
          properties = {
            title  = "Latency by Operation"
            view   = "timeSeries"
            region = var.aws_region
            period = 300
            stat   = "Average"
            metrics = [
              ["AWS/DynamoDB", "SuccessfulRequestLatency", "TableName", aws_dynamodb_table.game.name, "Operation", "GetItem"],
              ["AWS/DynamoDB", "SuccessfulRequestLatency", "TableName", aws_dynamodb_table.game.name, "Operation", "PutItem"],
              ["AWS/DynamoDB", "SuccessfulRequestLatency", "TableName", aws_dynamodb_table.game.name, "Operation", "UpdateItem"],
              ["AWS/DynamoDB", "SuccessfulRequestLatency", "TableName", aws_dynamodb_table.game.name, "Operation", "Query"],
            ]
          }
        },
        {
          type   = "metric"
          x      = 12
          y      = 46
          width  = 12
          height = 6
          properties = {
            title  = "Errors"
            view   = "timeSeries"
            region = var.aws_region
            period = 300
            stat   = "Sum"
            metrics = [
              ["AWS/DynamoDB", "ThrottledRequests", "TableName", aws_dynamodb_table.game.name, { label = "Throttled" }],
              ["AWS/DynamoDB", "SystemErrors", "TableName", aws_dynamodb_table.game.name, { label = "System Errors" }],
              ["AWS/DynamoDB", "UserErrors", "TableName", aws_dynamodb_table.game.name, { label = "User Errors" }],
            ]
          }
        },
      ],

      # =========================================================================
      # Section 5: CloudFront & S3 (y=52)
      # =========================================================================
      [
        {
          type   = "text"
          x      = 0
          y      = 52
          width  = 24
          height = 1
          properties = {
            markdown = "# CloudFront & S3"
          }
        },
        {
          type   = "metric"
          x      = 0
          y      = 53
          width  = 12
          height = 6
          properties = {
            title  = "Requests"
            view   = "timeSeries"
            region = "us-east-1"
            period = 300
            stat   = "Sum"
            metrics = [
              ["AWS/CloudFront", "Requests", "DistributionId", aws_cloudfront_distribution.client.id, "Region", "Global"],
            ]
          }
        },
        {
          type   = "metric"
          x      = 12
          y      = 53
          width  = 12
          height = 6
          properties = {
            title  = "Cache Hit Rate"
            view   = "timeSeries"
            region = "us-east-1"
            period = 300
            stat   = "Average"
            yAxis = {
              left = { min = 0, max = 100 }
            }
            metrics = [
              ["AWS/CloudFront", "CacheHitRate", "DistributionId", aws_cloudfront_distribution.client.id, "Region", "Global"],
            ]
          }
        },
        {
          type   = "metric"
          x      = 0
          y      = 59
          width  = 12
          height = 6
          properties = {
            title  = "Error Rate"
            view   = "timeSeries"
            region = "us-east-1"
            period = 300
            stat   = "Average"
            metrics = [
              ["AWS/CloudFront", "4xxErrorRate", "DistributionId", aws_cloudfront_distribution.client.id, "Region", "Global"],
              ["AWS/CloudFront", "5xxErrorRate", "DistributionId", aws_cloudfront_distribution.client.id, "Region", "Global"],
            ]
          }
        },
        {
          type   = "metric"
          x      = 12
          y      = 59
          width  = 12
          height = 6
          properties = {
            title  = "Data Transfer"
            view   = "timeSeries"
            region = "us-east-1"
            period = 300
            stat   = "Sum"
            metrics = [
              ["AWS/CloudFront", "BytesDownloaded", "DistributionId", aws_cloudfront_distribution.client.id, "Region", "Global"],
              ["AWS/CloudFront", "BytesUploaded", "DistributionId", aws_cloudfront_distribution.client.id, "Region", "Global"],
            ]
          }
        },
      ],

      # =========================================================================
      # Section 6: Billing (y=65)
      # =========================================================================
      [
        {
          type   = "text"
          x      = 0
          y      = 65
          width  = 24
          height = 1
          properties = {
            markdown = "# Estimated Charges"
          }
        },
        {
          type   = "metric"
          x      = 0
          y      = 66
          width  = 12
          height = 6
          properties = {
            title  = "Total MTD"
            view   = "singleValue"
            region = "us-east-1"
            period = 21600
            stat   = "Maximum"
            metrics = [
              ["AWS/Billing", "EstimatedCharges", "Currency", "USD"],
            ]
          }
        },
        {
          type   = "metric"
          x      = 12
          y      = 66
          width  = 12
          height = 6
          properties = {
            title   = "By Service"
            view    = "timeSeries"
            stacked = true
            region  = "us-east-1"
            period  = 21600
            stat    = "Maximum"
            metrics = [
              ["AWS/Billing", "EstimatedCharges", "ServiceName", "Amazon DynamoDB", "Currency", "USD"],
              ["AWS/Billing", "EstimatedCharges", "ServiceName", "Amazon CloudFront", "Currency", "USD"],
              ["AWS/Billing", "EstimatedCharges", "ServiceName", "AWS Lambda", "Currency", "USD"],
              ["AWS/Billing", "EstimatedCharges", "ServiceName", "Amazon API Gateway", "Currency", "USD"],
              ["AWS/Billing", "EstimatedCharges", "ServiceName", "Amazon Simple Storage Service", "Currency", "USD"],
              ["AWS/Billing", "EstimatedCharges", "ServiceName", "Amazon Route 53", "Currency", "USD"],
            ]
          }
        },
      ],
    ])
  })
}

output "http_api_url" {
  description = "HTTP API Gateway URL"
  value       = aws_apigatewayv2_stage.http_default.invoke_url
}

output "ws_api_url" {
  description = "WebSocket API Gateway URL"
  value       = "${aws_apigatewayv2_stage.ws_production.invoke_url}"
}

output "cloudfront_domain" {
  description = "CloudFront distribution domain"
  value       = aws_cloudfront_distribution.client.domain_name
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (for cache invalidation)"
  value       = aws_cloudfront_distribution.client.id
}

output "s3_bucket_name" {
  description = "S3 bucket name for client deployment"
  value       = aws_s3_bucket.client.id
}

output "app_url" {
  description = "Custom domain URL for the client app"
  value       = "https://app.${var.domain_name}"
}

output "api_custom_url" {
  description = "Custom domain URL for the HTTP API"
  value       = "https://api.${var.domain_name}"
}

output "ws_custom_url" {
  description = "Custom domain URL for the WebSocket API"
  value       = "wss://ws.${var.domain_name}"
}

output "github_actions_role_arn" {
  description = "IAM role ARN for GitHub Actions OIDC"
  value       = aws_iam_role.github_actions.arn
}

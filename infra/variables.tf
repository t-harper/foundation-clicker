variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "dynamodb_table_name" {
  description = "DynamoDB table name"
  type        = string
  default     = "FoundationGame"
}

variable "jwt_secret" {
  description = "JWT signing secret"
  type        = string
  sensitive   = true
}

variable "project_name" {
  description = "Project name prefix for resource naming"
  type        = string
  default     = "foundation-game"
}

variable "domain_name" {
  description = "Root domain name (must have existing Route53 hosted zone)"
  type        = string
  default     = "foundation-clicker.com"
}

terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket         = "foundation-game-tfstate-831473839640"
    key            = "foundation-game/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "foundation-game-tflock"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region
}

locals {
  prefix = var.project_name
}

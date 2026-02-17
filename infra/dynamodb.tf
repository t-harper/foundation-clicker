resource "aws_dynamodb_table" "game" {
  name         = var.dynamodb_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "PK"
  range_key    = "SK"

  attribute {
    name = "PK"
    type = "S"
  }

  attribute {
    name = "SK"
    type = "S"
  }

  attribute {
    name = "GSI1PK"
    type = "S"
  }

  attribute {
    name = "GSI1SK"
    type = "S"
  }

  global_secondary_index {
    name            = "GSI1"
    hash_key        = "GSI1PK"
    range_key       = "GSI1SK"
    projection_type = "ALL"
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }

  tags = {
    Project = var.project_name
  }
}

# Seed the atomic counter for user ID generation
resource "aws_dynamodb_table_item" "counter_seed" {
  table_name = aws_dynamodb_table.game.name
  hash_key   = aws_dynamodb_table.game.hash_key
  range_key  = aws_dynamodb_table.game.range_key

  item = jsonencode({
    PK        = { S = "COUNTER" }
    SK        = { S = "USER_ID" }
    currentId = { N = "0" }
  })

  lifecycle {
    ignore_changes = [item]
  }
}

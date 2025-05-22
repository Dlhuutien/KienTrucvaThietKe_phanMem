provider "aws" {
region = "ap-southeast-1"
}

resource "aws_instance" "demo_server" {
ami = "ami-0df7a207adb9748c7" # Ubuntu tại Singapore
instance_type = "t2.micro"
tags = {
Name = "TerraformDemo"
}
}
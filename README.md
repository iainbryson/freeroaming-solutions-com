AWS_PROFILE=castawayman aws s3api list-buckets --query "Buckets[].Name"

# (Create bucket)[https://blog.eq8.eu/til/create-aws-s3-bucket-as-static-website-with-cli.html]

AWS_PROFILE=castawayman aws s3api create-bucket --bucket frs2 --region us-west-2 --create-bucket-configuration LocationConstraint=us-west-2

cat << EOF > /tmp/s3profile.json
{
"Version": "2012-10-17",
"Statement": [
{
"Sid": "PublicReadGetObject",
"Effect": "Allow",
"Principal": "*",
"Action": "s3:GetObject",
"Resource": "arn:aws:s3:::frs2/*"
}
]
}
EOF

AWS_PROFILE=castawayman aws s3api put-bucket-policy --bucket frs2 --policy file:///tmp/s3profile.json

AWS_PROFILE=castawayman aws s3 website s3://frs2/ --index-document index.html --error-document error.html

AWS_PROFILE=castawayman gatsby deploy

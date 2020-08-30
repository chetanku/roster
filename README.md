Setting up roster:

### `1. Granting Permissions to access AWS using IAM Roles`

Create an IAM role and attach the below policies to the IAM Role.
Attach this IAM role to the EC2 instances that is running roster-api

### `AWS IAM Role and Policy`
JSON
----
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "cloudwatch:DescribeAlarms",
                "cloudwatch:GetMetricWidgetImage",
                "elasticloadbalancing:DescribeLoadBalancers",
                "ce:GetCostAndUsage",
                "ce:GetCostForecast",
                "ec2:DescribeInstances",
                "ec2:DescribeVpcs",
                "ec2:DescribeRegions",
                "ec2:DescribeSubnets",
                "ec2:DescribeInstanceStatus",
                "elasticmapreduce:ListClusters",
                "elasticmapreduce:DescribeCluster",
                "kafka:ListClusters",
                "rds:DescribeDBInstances",
                "sts:GetCallerIdentity"
            ],
           
            "Resource": "*"
        }
    ]
}
```

Alternatively, you can use AWS Secret Key and ID as well and declare them when running roster-api docker container

### `2. Running roster-api Docker Container `

```
cd roster-api && docker build -t roster-api:latest .
```
If you are using IAM role
```
docker run --name roster-api -p 8082:5000 --env CREDS="password" --env AWS_DEFAULT_REGION="default region name" -d roster-api:latest
```

If you are using AWS aws_access_key_id and aws_secret_access_keys

```
docker run --name roster-api -p 8082:5000 --env CREDS="password" --env AWS_DEFAULT_REGION="default region name" --env AWS_ACCESS_KEY_ID="Enter your KEY_ID" --env AWS_SECRET_ACCESS_KEY="Enter your ACCESS_KEY" -d roster-api:latest
```

PS: Env variable CREDS  will required to access COST SUMMARY page, If you enter wrong credentials while accessing the COST SUMMARY page, try opening it in a new tab

### `3. Running roster-ui Docker Container `

Before building roster-ui, edit a variable "awsbaseURL" in config.js. Enter your hostname or server-ip where roster-api is running.

```
cd roster/roster-ui/src 
```
config.js:
```
export const appConfig = {
    awsbaseURL: "http://enter-your-ip-or-hostname-here/api/aws/",
};
```

```
cd roster-ui && docker build -t roster-ui:latest .
```

```
docker run --name roster -p 80:80 -d roster-ui:latest
```

`To setup without using docker container`

```
cd roster/roster-ui
npm start
```
```
cd roster/roster-api
python3 app.py
```

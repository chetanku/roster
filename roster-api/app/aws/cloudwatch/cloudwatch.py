from flask import Flask, jsonify, Blueprint
import boto3
import base64
import json
from flask import request
import os
from flask_cors import CORS
from app.aws.ec2.ec2 import get_ec2_instanceid
from app.aws.rds.rds import get_rds_id

cloudwatch_bp = Blueprint('/cloudwatch', __name__, url_prefix="/api/aws")

# file = os.path.abspath("./output_alarm.json")
# with open(file) as l:
#     response = json.load(l)
# with open('/Users/chetan/code/roster-api/describe_emr.json') as d:
#     describecluster = json.load(d)
# describecluster = json.loads('../../describe_emr.json')


@cloudwatch_bp.route('/cloudwatch/alarms')
def get_alarms():
    alarms = []
    region = request.args.get('region')
    client = boto3.client('cloudwatch', region_name=region)
    response = client.describe_alarms(
        StateValue='ALARM',
    )

    for i in response["MetricAlarms"]:
        alarms.append(
            {"AlarmName": i["AlarmName"], "StateReason": i["StateReason"], "StateValue": i["StateValue"], "MetricName": i["MetricName"]})

    return jsonify(alarms)


@cloudwatch_bp.route('/cloudwatch/metrics/ec2')
def get_metric_widget_image_ec2():
    region = request.args.get('region')
    cloudwatch = boto3.client('cloudwatch', region_name=region)
    metrics = []
    ec2_image = {
        "view": "timeSeries",
        "stacked": False,
        "metrics": [],
        "width": 600,
        "height": 300,
        "start": "-PT3H",
        "end": "P0D",
        "title": "EC2 CPU Utilization"
    }

    ec2_status_instance = {
        "region": region,
        "width": 600,
        "height": 300,
        "metrics": [],
        "title": "EC2 Status Check Failed Instance Sum",
        "legend": {
            "position": "right"
        },
        "copilot": True,
        "view": "timeSeries",
        "stacked": False
    }

    for instanceid in get_ec2_instanceid(region):
        ec2_image["metrics"].append(
            ["AWS/EC2", "CPUUtilization", "InstanceId", instanceid])
        ec2_status_instance["metrics"].append(
            ["AWS/EC2", "StatusCheckFailed_Instance", "InstanceId", instanceid, {"stat": "Sum"}])

    response = cloudwatch.get_metric_widget_image(
        MetricWidget=json.dumps(ec2_image))
    response_status = cloudwatch.get_metric_widget_image(
        MetricWidget=json.dumps(ec2_status_instance))

    ec2_image_encode = (base64.b64encode(bytes(response["MetricWidgetImage"])))
    ec2_image_final = ec2_image_encode.decode()

    ec2_instance_image_encode = (base64.b64encode(
        bytes(response_status["MetricWidgetImage"])))
    ec2_instance_image_final = ec2_instance_image_encode.decode()

    metrics.append({"cpuutilization": ec2_image_final,
                    "instance_status": ec2_instance_image_final})
    return jsonify(metrics)


@cloudwatch_bp.route('/cloudwatch/metrics/rds')
def get_metric_widget_image_rds():
    region = request.args.get('region')
    cloudwatch = boto3.client('cloudwatch', region_name=region)
    metrics = []
    # rds_connections_image = """{{

    #     "metrics": [["AWS/RDS", "DatabaseConnections"]],
    #     "view": "singleValue",
    #     "stacked": false,
    #     "region": "{region}",
    #     "stat": "Average",
    #     "period": 300,
    #     "start": "-PT3H",
    #      "end": "P0D",
    #     "title": "RDS DB Connections"

    # }}""".format(region=region)

    rds_connections_image = {
        "view": "timeSeries",
        "stacked": False,
        "metrics": [],
        "width": 600,
        "height": 300,
        "start": "-PT3H",
        "end": "P0D",
        "title": "RDS DB Connections",
    }
    rds_cpu_image = {
        "view": "timeSeries",
        "stacked": False,
        "metrics": [],
        "width": 600,
        "height": 300,
        "start": "-PT3H",
        "end": "P0D",
        "title": "RDS CPU Utilization",
    }

    for rds_identifier in get_rds_id(region):
        rds_connections_image["metrics"].append(
            ["AWS/RDS", "DatabaseConnections", "DBInstanceIdentifier", rds_identifier])
        rds_cpu_image["metrics"].append(
            ["AWS/RDS", "CPUUtilization", "DBInstanceIdentifier", rds_identifier])

    response_conn = cloudwatch.get_metric_widget_image(
        MetricWidget=json.dumps(rds_connections_image))
    response_cpu = cloudwatch.get_metric_widget_image(
        MetricWidget=json.dumps(rds_cpu_image))

    rds_cpu_image_encode = (
        base64.b64encode(bytes(response_cpu["MetricWidgetImage"])))
    rds_cpu_image_final = rds_cpu_image_encode.decode()

    rds_connections_image_encode = (
        base64.b64encode(bytes(response_conn["MetricWidgetImage"])))
    rds_connections_image_final = rds_connections_image_encode.decode()
    metrics.append({"DbConnections": rds_connections_image_final,
                    "CPUUtilization": rds_cpu_image_final})
    return jsonify(metrics)

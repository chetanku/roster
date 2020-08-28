from flask import Flask, jsonify, Blueprint
import boto3
import json
from flask import request
from flask_cors import CORS

ec2_bp = Blueprint('/ec2', __name__, url_prefix="/api/aws")


@ec2_bp.route('/ec2')
def get_ec2():
    ec2 = []
    region = request.args.get('region')
    client = boto3.client('ec2', region_name=region)
    response = client.describe_instances(
        Filters=[
            {
                'Name': 'instance-state-name',
                'Values': [
                    'pending',
                    'running',
                    'shutting-down',
                    'stopping',
                    'stopped'
                ],

            },
        ],)
    for r in response['Reservations']:
        for i in r['Instances']:
            if "Tags" in i.keys():
                tags = aws_tags(i["Tags"])
            else:
                tags = aws_tags('')
            if "PublicIpAddress" in i.keys():
                ec2.append({"InstanceId": i['InstanceId'], "InstanceType": i['InstanceType'],
                            "Env": tags['Env'], "Name": tags['Name'],
                            "KeyName": i['KeyName'], "State": i['State']['Name'],
                            "PrivateIpAddress": i["PrivateIpAddress"], "PublicIpAddress": i["PublicIpAddress"],
                            "PublicDnsName": i["PublicDnsName"], "SubnetId": i["SubnetId"], "VpcId": i["VpcId"]})
            else:
                ec2.append({"InstanceId": i['InstanceId'], "InstanceType": i['InstanceType'],
                            "Env": tags['Env'], "Name": tags['Name'],
                            "KeyName": i['KeyName'], "State": i['State']['Name'],
                            "PrivateIpAddress": i["PrivateIpAddress"], "SubnetId": i["SubnetId"], "VpcId": i["VpcId"]})
    return jsonify(ec2)


@ec2_bp.route('/ec2/all')
def get_ec2_all():
    region = request.args.get('region')
    ec2_all = []
    client = boto3.client('ec2', region_name=region)

    response = client.describe_instances()
    for r in response['Reservations']:
        for i in r['Instances']:
            print(i, i['Tags'])
    return jsonify(response)


@ec2_bp.route('/ec2/elb')
def get_ec2_lb():
    elb = []
    region = request.args.get('region')
    client = boto3.client('elbv2', region_name=region)
    response = client.describe_load_balancers()
    for i in response['LoadBalancers']:
        elb.append({"AvailabilityZones": i['AvailabilityZones'], "LoadBalancerName": i["LoadBalancerName"],
                    "Scheme": i["Scheme"], "DNSName": i["DNSName"], "State": i["State"]["Code"], "Type": i["Type"]})
    return jsonify(elb)


@ec2_bp.route('/ec2/vpc')
def get_vpcs():
    region = request.args.get('region')
    client = boto3.client('ec2', region_name=region)
    response = client.describe_vpcs()
    return(response)


@ec2_bp.route('/ec2/subnets')
def get_subnets():
    subnets = []
    region = request.args.get('region')
    client = boto3.client('ec2', region_name=region)
    response = client.describe_subnets()
    for i in response['Subnets']:
        if "Tags" in i.keys():
            tags = aws_tags(i["Tags"])
        else:
            tags = aws_tags('')
        subnets.append({"SubnetId": i['SubnetId'], "AvailabilityZone": i["AvailabilityZone"], "Env": tags['Env'], "Name": tags['Name'],
                        "AvailableIpAddressCount": i["AvailableIpAddressCount"], "CidrBlock": i["CidrBlock"], "State": i["State"], "VpcId": i["VpcId"], "SubnetArn": i["SubnetArn"]})
    return jsonify(subnets)


@ec2_bp.route('/ec2/regions')
def get_regions():
    region = request.args.get('region')
    client = boto3.client('ec2', region_name=region)
    response = client.describe_regions()
    return(response)


@ec2_bp.route('/ec2/status')
def get_ec2_status():
    region = request.args.get('region')
    ec2_status = []
    client = boto3.client('ec2', region_name=region)
    response = client.describe_instance_status(
        Filters=[
            {
                'Name': 'instance-state-name',
                'Values': [
                    'running',
                    'stopped'
                ],

            },
        ],
        IncludeAllInstances=True
    )
    for i in response["InstanceStatuses"]:
        ec2_status.append(i)
    return jsonify(ec2_status)


# Helper Function
def aws_tags(ec2_tags):
    tag = {'Env': " ", 'Name': " "}
   # print(values)
    if ec2_tags:
        for x in ec2_tags:
            if x["Key"] == "env":

                tag['Env'] = x["Value"]
            if x["Key"] == "Name":

                tag['Name'] = x["Value"]
        return tag
    else:
        return tag


def get_ec2_instanceid(region):
    instanceids = []
    #region = request.args.get('region')
    client = boto3.client('ec2', region_name=region)
    response = client.describe_instances(
        Filters=[
            {
                'Name': 'instance-state-name',
                'Values': [
                    'running'
                ],

            },
        ],)
    for r in response['Reservations']:
        for i in r['Instances']:
            instanceids.append(i['InstanceId'])
    return instanceids

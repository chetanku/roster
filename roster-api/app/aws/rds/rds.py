from flask import Flask, jsonify, Blueprint
import boto3
import json
from flask_cors import CORS
from flask import request

rds_bp = Blueprint('/rds', __name__, url_prefix="/api/aws")


@rds_bp.route('/rds')
def get_rds():
    rds = []
    region = request.args.get('region')
    client = boto3.client('rds', region_name=region)
    response = client.describe_db_instances()
    # print(response)
    for i in response['DBInstances']:
        if i["DBInstanceStatus"] != "creating":
            print("true")
            rds.append({"AllocatedStorage": i['AllocatedStorage'], "AvailabilityZone": i["AvailabilityZone"],
                        "DBInstanceClass": i["DBInstanceClass"], "DBInstanceIdentifier": i["DBInstanceIdentifier"], "DBInstanceStatus": i["DBInstanceStatus"], "Engine": i["Engine"], "Endpoint": i["Endpoint"]["Address"]})

    return jsonify(rds)


def get_rds_id(region):
    rds_id = []
    region = request.args.get('region')
    client = boto3.client('rds', region_name=region)
    response = client.describe_db_instances()
    for i in response['DBInstances']:
        rds_id.append(i["DBInstanceIdentifier"])
    return rds_id

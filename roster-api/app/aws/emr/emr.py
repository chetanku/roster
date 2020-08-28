from flask import Flask, jsonify, Blueprint
import boto3
import json
from flask_cors import CORS
from flask import request
from datetime import datetime, timedelta

emr_bp = Blueprint('/emr', __name__, url_prefix="/api/aws")

# with open('/Users/chetan/code/roster-api/sample.json') as l:
#     listcluster = json.load(l)
# with open('/Users/chetan/code/roster-api/describe_emr.json') as d:
#     describecluster = json.load(d)
# describecluster = json.loads('../../describe_emr.json')


@emr_bp.route('/emr')
def get_emr():
    emr = []
    region = request.args.get('region')
    client = boto3.client('emr', region_name=region)
    #previous_day = datetime.today().utcnow() - timedelta(days=1)
    response = client.list_clusters()
    #     ClusterStates=[
    #     'STARTING'|'BOOTSTRAPPING'|'RUNNING'|'WAITING'|'TERMINATING'|'TERMINATED'|'TERMINATED_WITH_ERRORS',
    # ],
    #     CreatedAfter=datetime(
    #         previous_day.year, previous_day.month, previous_day.day)

    for clusters in response['Clusters']:
        # print(clusters["Id"])
        cluster = describe_emr(clusters["Id"], region)
        # print(cluster)
        emr.append(
            {"Applications": cluster['Cluster']['Applications'], "ClusterArn": cluster['Cluster']['ClusterArn'],
             "ClusterId": cluster['Cluster']['Id'], "Name": cluster['Cluster']['Name'], "State": cluster['Cluster']['Status']['State'], "StatusMessage": cluster['Cluster']['Status']['StateChangeReason']['Message'], "AutoTerminate": cluster['Cluster']['AutoTerminate']})
    return jsonify(emr)

# @emr_bp.route('/emr/describecluster')


def describe_emr(clusterid, region):
    applications = []
    client = boto3.client('emr', region_name=region)
    response = client.describe_cluster(
        ClusterId=clusterid
    )
    return (response)

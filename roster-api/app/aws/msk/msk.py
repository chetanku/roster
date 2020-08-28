from flask import Flask, jsonify, Blueprint
import boto3
import json
from flask_cors import CORS
from flask import request

msk_bp = Blueprint('/msk', __name__, url_prefix="/api/aws")


@msk_bp.route('/msk')
def get_msk():
    msk = []
    region = request.args.get('region')
    client = boto3.client('kafka', region_name=region)
    list_cluster = client.list_clusters()
    for i in list_cluster['ClusterInfoList']:
        msk.append(
            {"ClientSubnets": i['BrokerNodeGroupInfo']['ClientSubnets'], "InstanceType": i['BrokerNodeGroupInfo']['InstanceType'], "StorageInfo": i['BrokerNodeGroupInfo']['StorageInfo'],
             "ClusterArn": i['ClusterArn'], "ClusterName": i['ClusterName'], "KafkaVersion": i['CurrentBrokerSoftwareInfo']['KafkaVersion'], "CurrentVersion":
             i['CurrentVersion'], "NumberOfBrokerNodes": i['NumberOfBrokerNodes'], "State": i['State'], "Tags": i['Tags']})
    return jsonify(msk)

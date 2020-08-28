from flask import Flask, jsonify, Blueprint
import boto3
import json
from flask import request
from flask_cors import CORS


account_bp = Blueprint('/account', __name__, url_prefix="/api/aws")


@account_bp.route('/account')
def get_account():
    account = []
    #region = request.args.get('region')
    client = boto3.client('sts')
    response = client.get_caller_identity()
    account.append({"account": response["Account"]})
    return jsonify(account)

from flask import Flask, jsonify
import json
import boto3
from flask_cors import CORS
from app.aws.ec2.ec2 import ec2_bp
from app.aws.rds.rds import rds_bp
from app.aws.emr.emr import emr_bp
from app.aws.msk.msk import msk_bp
from app.aws.costexplorer.ce import ce_bp
from app.aws.cloudwatch.cloudwatch import cloudwatch_bp
from app.aws.account.account import account_bp
from app.error.handler import errors_bp
#from flatten_json import flatten
# from .services.get_ec2 import ec2


app = Flask(__name__)
CORS(app)
# print(response)

app.register_blueprint(ec2_bp)
app.register_blueprint(rds_bp)
app.register_blueprint(emr_bp)
app.register_blueprint(msk_bp)
app.register_blueprint(ce_bp)
app.register_blueprint(cloudwatch_bp)
app.register_blueprint(account_bp)
app.register_blueprint(errors_bp)

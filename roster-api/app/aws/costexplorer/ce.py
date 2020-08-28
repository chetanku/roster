from flask import Flask, jsonify, Blueprint
import boto3
import json
from flask import request
from datetime import datetime
import calendar
import os
import base64
from flask_cors import CORS

ce_bp = Blueprint('/ce', __name__, url_prefix="/api/aws")


@ce_bp.route('/ce')
def get_ce():
    region = request.args.get('region')
    firstDay = request.args.get('firstDay')
    lastDay = request.args.get('lastDay')
    #creds = (base64.b64decode(request.args.get('creds'))).decode("ascii")
    creds = decode_creds(request.args.get('creds'))
    totalcost = 0
    date = datetime.now().date()
    ce = []
    if creds == os.environ['CREDS']:
        client = boto3.client('ce', region_name=region)
        response = client.get_cost_and_usage(
            TimePeriod={
                'Start': str(firstDay),  # str(date.replace(day=1)),
                # str(date.replace(day=calendar.monthrange(date.year, date.month)[1]))
                'End': str(lastDay)
            },
            Granularity='MONTHLY',
            Metrics=['UnblendedCost'],
            GroupBy=[

                {'Type': 'DIMENSION', 'Key': 'SERVICE'}]
        )
        for service in response["ResultsByTime"][0]["Groups"]:
            # ce.append(service)
            totalcost += float(service["Metrics"]["UnblendedCost"]["Amount"])
            unit = service["Metrics"]["UnblendedCost"]["Unit"]
            ce.append({"Service": service["Keys"][0],
                       "Cost": round(float(service["Metrics"]["UnblendedCost"]["Amount"]), 2),
                       })
        ce.append({"Service": "Total Cost",
                   "Cost": round(totalcost, 2), "Unit": unit})
        return jsonify(ce)
    else:
        return jsonify({"Error": "Unauthorized"})


@ce_bp.route('/ce/forecast')
def get_ce_forecast():
    region = request.args.get('region')
    firstDay = request.args.get('firstDay')
    lastDay = request.args.get('lastDay')
    totalcost = 0
    creds = decode_creds(request.args.get('creds'))
    date = datetime.now().date()
    ce_forecast = []
    if creds == os.environ['CREDS']:
        client = boto3.client('ce', region_name=region)
        response = client.get_cost_forecast(
            TimePeriod={
                'Start': firstDay,
                'End': lastDay
            },
            Granularity='MONTHLY',
            Metric='UNBLENDED_COST'
        )
        unit = response["Total"]["Unit"]
        for i in response["ForecastResultsByTime"]:
            ce_forecast.append(
                {"Cost": round(float(i["MeanValue"]), 2), "Start": i["TimePeriod"]["Start"], "Unit": unit})
        return jsonify(ce_forecast)
    else:
        return jsonify({"Error": "Unauthorized"})


def decode_creds(creds):
    if creds:
        base64_bytes = creds.encode("ascii")
        sample_string_bytes = base64.b64decode(base64_bytes)
        creds = sample_string_bytes.decode("ascii")
        return creds

# @ce_bp.route('/ce')
# def get_ce():
#     region = request.args.get('region')
#     totalcost = 0
#     date = datetime.now().date()
#     ce = []
#     client = boto3.client('ce', region_name=region)
#     response = client.get_cost_and_usage(
#         TimePeriod={
#             'Start': '2020-03-01',  # str(date.replace(day=1)),
#             # str(date.replace(day=calendar.monthrange(date.year, date.month)[1]))
#             'End': '2020-06-30'
#         },
#         Granularity='MONTHLY',
#         Metrics=['UnblendedCost'],
#         GroupBy=[
#             {'Type': 'DIMENSION', 'Key': 'SERVICE'}]
#     )
#     for service in response["ResultsByTime"]:
#         ce.append(service)
#         # ce.append(
#         #     {"TimePeriod": service["TimePeriod"], "Service": service["Groups"]})
#     return jsonify(ce)

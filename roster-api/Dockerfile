FROM python:3.7.5
RUN mkdir roster-api


COPY ./requirements.txt /roster-api/requirements.txt
WORKDIR /roster-api

RUN pip3 install -r requirements.txt

COPY . /roster-api

CMD [ "python3", "app.py" ]
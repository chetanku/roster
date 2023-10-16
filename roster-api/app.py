from flask import render_template
from app import app


@app.route('/api/', methods=['GET'])
@app.route('/api/ping')
def welcome():
    return render_template('welcome/welcome.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)

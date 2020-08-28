from flask import Blueprint, render_template

errors_bp = Blueprint('error', __name__)

@errors_bp.app_errorhandler(404)
def error_404(error):
    return render_template('errors/404.html'), 404
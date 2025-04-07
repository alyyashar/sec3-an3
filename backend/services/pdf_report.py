from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
import os
import tempfile

template_dir = os.path.join(os.path.dirname(__file__), "templates")
env = Environment(loader=FileSystemLoader(template_dir))

def generate_pdf_report(scan_data: dict) -> str:
    template = env.get_template("report.html.jinja2")

    html_out = template.render(scan=scan_data)
    tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
    HTML(string=html_out).write_pdf(tmp_file.name)

    return tmp_file.name  # path to the temp PDF

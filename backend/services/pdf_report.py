from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
import os
import tempfile

template_dir = os.path.join(os.path.dirname(__file__), "templates")
env = Environment(loader=FileSystemLoader(template_dir))

def generate_pdf_report(scan_data: dict) -> str:
    # Flatten out the nested structure to make it easier for the template
    vulnerabilities = scan_data["scan_results"]["scanner_results"].get("vulnerabilities", [])
    missed = scan_data["scan_results"]["ai_verification"].get("missed_vulnerabilities", [])

    template = env.get_template("report.html.jinja2")

    html_out = template.render(
        scan=scan_data,
        vulnerabilities=vulnerabilities,
        missed_vulnerabilities=missed
    )

    tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
    HTML(string=html_out).write_pdf(tmp_file.name)

    return tmp_file.name
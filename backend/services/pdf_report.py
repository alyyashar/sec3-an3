from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import os
import tempfile

template_dir = os.path.join(os.path.dirname(__file__), "templates")
env = Environment(loader=FileSystemLoader(template_dir))

def generate_pdf_report(scan_data: dict) -> str:
    # Extract data
    scanner_results = scan_data["scan_results"]["scanner_results"]
    ai_results = scan_data["scan_results"]["ai_verification"]

    vulnerabilities = scanner_results.get("vulnerabilities", [])
    missed = ai_results.get("missed_vulnerabilities", [])

    # Combine all for severity chart
    all_findings = vulnerabilities + missed
    severity_counts = {}
    for finding in all_findings:
        severity = finding.get("severity", "Unknown")
        severity_counts[severity] = severity_counts.get(severity, 0) + 1

    # Generate pie chart
    labels = [k for k, v in severity_counts.items() if v > 0]
    sizes = [v for v in severity_counts.values() if v > 0]

    fig, ax = plt.subplots()
    ax.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=140)
    ax.axis("equal")
    chart_buffer = BytesIO()
    plt.savefig(chart_buffer, format="png")
    chart_buffer.seek(0)
    pie_chart_base64 = base64.b64encode(chart_buffer.read()).decode("utf-8")
    pie_chart_data_url = f"data:image/png;base64,{pie_chart_base64}"

    # Simulated logic summary (placeholder until real Slither parsing is added)
    contract_logic_summary = {
        "contract_name": scan_data["contract_name"],
        "functions": [
            {"name": "add(uint256)", "visibility": "public", "payable": False},
            {"name": "safe_add(uint256)", "visibility": "internal", "payable": False}
        ]
    }

    # Render the report
    template = env.get_template("report.html.jinja2")
    html_content = template.render(
        scan=scan_data,
        vulnerabilities=vulnerabilities,
        missed_vulnerabilities=missed,
        pie_chart=pie_chart_data_url,
        contract_logic=contract_logic_summary
    )

    tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
    HTML(string=html_content).write_pdf(tmp_file.name)
    return tmp_file.name
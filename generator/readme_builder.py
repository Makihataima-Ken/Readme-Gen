from .model_client import query_model

README_PROMPT_TEMPLATE = """
Generate a professional README.md for the following Python project:

Project Title: {title}
Description: {description}
Features: {features}
Installation Instructions: {installation}
Usage Example: {usage}
"""

def build_readme(project_details: dict) -> str:
    prompt = README_PROMPT_TEMPLATE.format(**project_details)
    return query_model(prompt)

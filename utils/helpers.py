def collect_project_info():
    print("Let's collect project details to generate a README.")
    return {
        "title": input("Project Title: "),
        "description": input("Description: "),
        "features": input("Key Features (comma-separated): "),
        "installation": input("Installation Instructions: "),
        "usage": input("Usage Example: ")
    }

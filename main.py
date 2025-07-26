from generator.readme_builder import build_readme
from utils.helpers import collect_project_info

def main():
    try:
        details = collect_project_info()
        readme_content = build_readme(details)

        with open("README.md", "w", encoding="utf-8") as f:
            f.write(readme_content)

        print("\n✅ README.md generated successfully!")

    except Exception as e:
        print(f"\n❌ Error: {e}")

if __name__ == "__main__":
    main()

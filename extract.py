import re
from bs4 import BeautifulSoup
import sys

def main():
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            html = f.read()
            
        soup = BeautifulSoup(html, 'html.parser')
        
        # 1. Extract CSS
        styles = soup.find_all('style')
        css_content = "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n"
        for style in styles:
            css_content += style.string + "\n"
            style.decompose()
            
        with open('style.css', 'w', encoding='utf-8') as f:
            f.write(css_content)
            
        # 2. Add style.css link to head
        head = soup.head
        link_tag = soup.new_tag('link', href='./style.css', rel='stylesheet')
        head.append(link_tag)
        
        # 3. Extract the last script tag which contains all the logic
        scripts = soup.find_all('script')
        # Find the script that has no src and no id='tailwind-config'
        js_content = ""
        for script in scripts:
            if not script.has_attr('src') and script.get('id') != 'tailwind-config':
                if script.string and "const sections = ['hero', 'projects', 'about', 'skills', 'contact'];" in script.string:
                    js_content = script.string
                    script.decompose()
                    break
                    
        with open('main.js', 'w', encoding='utf-8') as f:
            f.write(js_content)
            
        # 4. Remove tailwind config script and CDN
        for script in scripts:
            if script.get('id') == 'tailwind-config':
                script.decompose()
            elif script.has_attr('src') and 'tailwindcss.com' in script['src']:
                script.decompose()
                
        # 5. Add defer to remaining scripts
        for script in soup.find_all('script'):
            if script.has_attr('src'):
                # Add type="module" to all external scripts? No, just the ones that need it.
                # Actually, ThreeJS, GSAP, etc., can just have `defer`.
                script['defer'] = None
                
        # 6. Add main.js script tag
        body = soup.body
        main_script = soup.new_tag('script', src='./main.js', type='module')
        body.append(main_script)
        
        # Write back to index.html
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(str(soup))
            
        print("Extraction complete!")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()

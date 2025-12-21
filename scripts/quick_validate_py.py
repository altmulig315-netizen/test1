import re, sys, json, os

def check_css(file):
    s = open(file, 'r', encoding='utf-8').read()
    return {
        'file': file,
        'open_braces': s.count('{'),
        'close_braces': s.count('}'),
        'comment_starts': s.count('/*'),
        'comment_ends': s.count('*/')
    }


def check_js(file):
    s = open(file, 'r', encoding='utf-8').read()
    return {
        'file': file,
        'open_paren': s.count('('),
        'close_paren': s.count(')'),
        'open_brace': s.count('{'),
        'close_brace': s.count('}'),
        'open_bracket': s.count('['),
        'close_bracket': s.count(']'),
        'single_quotes': s.count("'"),
        'double_quotes': s.count('"')
    }

if __name__ == '__main__':
    root = os.path.dirname(os.path.dirname(__file__))
    css = os.path.join(root, 'Test.css')
    js = os.path.join(root, 'js', 'Test.js')
    out = {'css': check_css(css), 'js': check_js(js)}
    print(json.dumps(out, indent=2))

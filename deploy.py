from flask import Flask, render_template, request, jsonify, send_from_directory
from scraper import scrape_news
import pymongo, csv, json, random, os
from whitenoise import WhiteNoise

app = Flask(__name__)

PROJECT_FILE=os.path.dirname(__file__)
print(PROJECT_FILE)

app.wsgi_app = WhiteNoise(app.wsgi_app)
my_static_folders = (
    PROJECT_FILE+"/static",
    PROJECT_FILE+"/templates",
    PROJECT_FILE+"/resources"
)

for static in my_static_folders:
    app.wsgi_app.add_files(static)

    
app._static_folder = 'static'


'''
Code to show navigation.
cwd = os.getcwd()  # Get the current working directory (cwd)
files = os.listdir(cwd+"/Desktop/Site/resources")  # Get all the files in that directory
print("Files in '%s': %s" % (cwd+"/Desktop/Site/templates/static/resources/", files))
'''


@app.route('/',methods=["GET", "POST"])
def process():
    if request.method == 'POST':
        data = request.json
        print(data)
        articles = scrape_news(data['name'])
        data['name'] = articles
        return jsonify(data)
    return render_template("index.html")


if __name__ == "__main__":
	app.run()
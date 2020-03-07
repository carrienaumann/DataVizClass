from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import scrape_mars

# Use flask_pymongo to set up mongo connection
app = Flask(__name__)
mongo = PyMongo(app, uri="mongodb://localhost:27017/mars_db")

app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_app"
mongo = PyMongo(app)

# route
@app.route('/')
def index():
    mars = mongo.db.mars.find_one()
    # print(mars)
    return render_template("index.html", mars = mars)

@app.route('/scrape')
def scrape():
    mars = mongo.db.mars
    mars_data = scrape_mars.scrape()
    mars.update(
        {}, 
        mars_data, 
        upsert=True)
    
    return "Scraping worked"

if __name__ == "__main__":
    app.run(debug=True)
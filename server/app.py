from config import DevelopmentConfig
from flask import Flask, jsonify, request
import requests
from flask_cors import CORS
import traceback
from models.item import Item
import json


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config.from_object(DevelopmentConfig)


@app.route('/')
def index():
    return jsonify(
        status=True,
        message='Hello world!'
    )


@app.route('/search/<string:search_param>', methods=['GET'])
def search_locations(search_param):
    try:
        response = requests.get(
            "https://nominatim.openstreetmap.org/search/" + search_param + "?format=json")
        return jsonify(
            isError=False,
            statusCode=200,
            data=response.json()
        ), 200
    except Exception:
        err = traceback.format_exc()
        return jsonify(
            isError=True,
            data=err
        ), 500


@app.route('/favorite/<string:id>', methods=['POST'])
def update_favorites(id):
    try:
        items = Item.objects(flickr_id=id)
        request_data = request.get_json()
        if len(items) > 0:
            items[0].delete()
        else:
            item = Item(
                flickr_id=request_data['id'],
                secret=request_data['secret'],
                server=request_data['server'],
                title=request_data['title']
            )
            item.save()
        all_items = list(map(lambda x: x.deserialize(), Item.objects.all()))
        return jsonify(
            isError=False,
            statusCode=200,
            data=all_items
        ), 200
    except Exception:
        err = traceback.format_exc()
        print(err)
        return jsonify(
            isError=True,
            data=err
        ), 500


@app.route('/favorite', methods=['GET'])
def fetch_favorites():
    try:
        all_items = list(map(lambda x: x.deserialize(), Item.objects.all()))
        return jsonify(
            isError=False,
            statusCode=200,
            data=all_items
        ), 200
    except Exception:
        err = traceback.format_exc()
        print(err)
        return jsonify(
            isError=True,
            data=err
        ), 500


@app.route('/search/<string:lat>/<string:lon>/<int:page>', methods=['GET'])
def search_images_by_locations(lat, lon, page=1):
    try:
        response = requests.get("https://www.flickr.com/services/rest", params={
            "api_key": app.config['FLICKR_API_KEY'],
            "method": "flickr.photos.search",
            "format": "json",
            "lat": lat,
            "lon": lon,
            "nojsoncallback": 1,
            "per_page": app.config['PER_PAGE'],
            "page": page
        })
        return jsonify(
            isError=False,
            statusCode=200,
            data=response.json()
        ), 200
    except Exception:
        err = traceback.format_exc()
        return jsonify(
            isError=True,
            data=err
        ), 500


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=app.config['ENVIRONMENT_PORT'],
            debug=app.config['ENVIRONMENT_DEBUG'])

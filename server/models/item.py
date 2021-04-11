import datetime
from mongoengine import connect, Document, StringField, ReferenceField, DateTimeField
from requests.api import request
from config import DevelopmentConfig

config = DevelopmentConfig()

host = "mongodb+srv://" + config.MONGO_USER + \
    ":" + config.MONGO_PASSWORD + \
    "@" + config.MONGO_HOST + "/" + config.MONGO_DB + "?retryWrites=true&w=majority"

connect(host=host)


class Item(Document):
    flickr_id = StringField(required=True)
    secret = StringField(required=True)
    server = StringField(required=True)
    title = StringField(required=True)
    created_at = DateTimeField(default=datetime.datetime.now)

    def deserialize(self):
        return {
            "id": self.flickr_id,
            "secret": self.secret,
            "server": self.server,
            "title": self.title,
        }

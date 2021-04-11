import os
from dotenv import load_dotenv

load_dotenv()


class Config(object):
    ENVIRONMENT_DEBUG = os.environ.get("APP_DEBUG", True)
    ENVIRONMENT_PORT = os.environ.get("APP_PORT", 5000)
    FLICKR_API_KEY = os.environ.get("FLICKR_API_KEY", "No key found")
    PER_PAGE = os.environ.get("PER_PAGE", 18)
    MONGO_DB = os.environ.get("MONGO_DB")
    MONGO_HOST = os.environ.get("MONGO_HOST")
    MONGO_USER = os.environ.get("MONGO_USER")
    MONGO_PASSWORD = os.environ.get("MONGO_PASSWORD")


class ProductionConfig(Config):
    ENVIRONMENT_DEBUG = os.environ.get("APP_DEBUG", False)


class DevelopmentConfig(Config):
    ENVIRONMENT_DEBUG = os.environ.get("APP_DEBUG", True)


config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig
}

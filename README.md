# 📍 Photo Globe

Search photos based on location.

## Demo 🖥️

You can view the live app [here](https://mfs-assignment-fe.vercel.app/).

![Demo of the application](https://i.imgur.com/cvBDloR.gif)

## Features ⭐

⚡️ Search any location on the map and see the photos of that location\
⚡️ Drag and click on any location to see the photos of that location\
⚡️ Favorite the photos you like and curate them in the **⭐ Favorites** Tab

## Folder Structure :file_folder:

```
App
├── client
├── server

```

```
client
├── README.md
├── package.json
├── src
│   ├── App.js
│   ├── components
│   │   ├── Favorite.jsx
│   │   ├── Gallery.jsx
│   │   ├── Image.jsx
│   │   └── Search.jsx
│   ├── config
│   │   └── constants.js
│   ├── context
│   │   ├── actions.js
│   │   ├── index.js
│   │   ├── reducer.js
│   │   └── state.js
│   ├── helpers
│   │   ├── api.js
│   │   └── index.js
│   ├── index.css
│   └── index.js
├── tailwind.config.js
└── yarn.lock
```

Entry point for `client` is `index.js`. All the JSX components are structured in `components`

```
server
├── Procfile
├── app.py
├── config.py
├── models
│   └── item.py
├── requirements.txt
├── runtime.txt
└── wsgi.py
```

Entry point for `server` is `app.py`. Models are being stored in `models`.

## Install & Build 🛠️

### Client

**Step 1:** Go the `client` directory.

```
cd ./client
```

**Step 2:** Install all the dependencies and run the application. (Make sure `.env` is already has all the required environment variables)

```
yarn install && yarn start
```

### Server

**Step 1:** Go the `server` directory.

```
cd ./server
```

**Step 2:** Install all the dependencies.

```
pip install -r requirements.txt
```

**Step 3:** Run the server. (Make sure `.env` is already has all the required environment variables)

```
python app.py
```

## Deployment 📦

### Client

Client is a simple [React](https://reactjs.org/) application hosted on [Vercel](https://vercel.com/). You can view the client [here](https://mfs-assignment-fe.vercel.app/).

When you run `yarn build` on the client root folder it gives you production files in `dist` directory. It contains `index.html` which can be directly served on any server along with all the files in `dist` directory.

### Server

Server is [Flask](https://flask.palletsprojects.com/en/1.1.x/) backend application hosted on [Heroku](https://heroku.com/). You can directly access the APIs [here](https://mfs-flask-app.herokuapp.com/).

The `wsgi.py` contains the direct run code for the application. It is being executed by `gunicorn` in `Procfile`. Heroku directly executes `Procfile` and starts the server.

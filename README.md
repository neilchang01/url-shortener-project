# URL Shortener

This is a URL shortener app built with:

- Frontend: ReactJs
- Backend: NestJs
- Database: Redis

Please use **Chrome** for the best experience.

- Web: https://url-shortener-nc.netlify.app/

- Server: Run the docker container locally.

_\*Make sure your have <a href="https://docs.docker.com/engine/install/" target="_blank">Docker</a> installed_

## Installation

### To run this app on your machine, follow these steps:

Clone the repository.

_Please note that you should replace `<url>` with the actual URL of the Git repository._

```bash
git clone <url>
```

Go into project directory

```bash
cd url-shortener-project/
```

Start the app using docker-compose

```bash
docker-compose up -d
```

Wait for the server to install dependencies and start up. This may take a while. Verify that the server has started successfully by checking for the following messages in the server logs:

`Nest application successfully started`

`Redis connected`

Note that Redis instance should load AOF file on server start.

Once the server and Redis are up and running, open your browser and go to http://localhost:3000. You should see "Hello world!".

## Usage

To create a shortened URL, head to https://url-shortener-nc.netlify.app/ to test it out!

### Alternative

To create a shortened URL, run the following command in the terminal:

```bash
curl -XPOST -d "url=https://github.com" localhost:3000/shorten
```

You should get a response like this:

```bash
{"hash": "06scro"}
```

Alternatively, you can use api platforms like **Postman** to consume the api, and you should receive a similar response format:

```json
{ "hash": "06scro" }
```

Now you can visit http://localhost:3000/06scro in your browser, and you will be redirected to https://github.com.

### Acknowledgements

<sub><sup><a href="https://www.freepik.com/free-vector/abstract-colorful-background-with-different-shapes_16099159.htm#query=art%20abstract&position=43&from_view=search&track=ais">Image by pikisuperstar</a> on Freepik | SVG from <a href="https://undraw.co">undraw</a></sup></sub>

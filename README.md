# The Awesome 🌟 Phone Book API

This API is here to help you manage all your contacts in a breeze.

## Note:
This API documentation is meant for educational purposes to demonstrate
friendly and approachable technical writing.

## Install the Needed Goodies 🔥

Just run `npm install` and all the dependencies will be ready to roll! 🚀

## Set Up That Env File 📝

Copy `.env.example` to `.env` and personalize it with your DB info.

```console
cp .env.example .env
```

Come on, I know you'll get it right!

```env
APP_NAME=PhoneBook API
APP_SCHEMA=http
APP_HOST=localhost
APP_PORT=8000
APP_ROUTE_PREFIX=/api

DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=phonebook
DB_SYNCHRONIZE=
DB_LOGGING=true

LOGGING_OUTPUT=dev
```

## Prepare the Database 💾

Just run `npm run db:migrate` and voila, your tables will be ready for some contact action! 📦

## Build and Roll! 🚚

Run `npm run build` to prep the backend 💪
Then `node dist/src/index.js` to start the party! 🎉

## Test Drive This Baby 🏎️

Check out your contacts at `http://localhost/api/contacts` 👀
Or try out the routes below with Insomnia, Postman or curl. 🤓
`A Postman collection with requests is included in the source code for testing the API.`

## Available Endpoints 🚀
### /contacts
- GET - Get all contacts 📝
- POST - Add a new contact ➕
- GET /:id - Get contact by ID 📖
- PUT /:id - Update my contact ✏️
- DELETE /:id - Remove contact ❌


## Docker deployment
You can build a Docker image and run a container as follows:

```console
docker build -t phonebookapi-image .
docker run -p 8000:8000 --name phonebook-api --env-file .env phonebookapi-image
```

## Built With ⚒️

- Express (for some fast backends) 🚚
- TypeORM (ORM) 🤖
- MySQL (for storage) 💾
- Node.js ( obviously!) 👀
- TypeScript (for type safety) 📦

This API is ready to handle all your contact 🌟 needs! Let me know if you have any other questions. 🤔
Happy dialing! 📞

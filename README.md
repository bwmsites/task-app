## Description

**Taskger** is a simple GraphQL Apollo server which aims to manage day-by-day tasks.
It has a PostgreSQL database as its data storage and uses [Prisma](https://www.prisma.io/) as its ORM and data layer handler.

## First Steps
- Either create a new Postgres database on your server/local or use the dockerized one provided by this project by running

```
$ docker-compose up postgres
```
- Rename the ```example.env``` file to ```.env```. The core of the application is located on the taskger folder so we need to change to the directory mentioned first.

```
$ cd taskger && mv example.env .env
```
- Update the **.env** file entries if needed to match your own database and app settings

##
**Note**: From now on consider all operations being performed inside the taskger directory.


## Installation
**IMPORTANT:** The project was created having NodeJs v.18 in mind so we strongly recommend installing a NodeJs v.18.XX or above. If you have [nvm](https://github.com/nvm-sh/nvm) as your management tool then run

```
$ nvm use
```
and it will change to the appropriate version once you have it installed.

```bash
$ npm install
```

## Running the app
First we need to populate our database with the required schema for the application to work properly.

```
$ npm run db:migrate
```
Once migration process has finished proceed with initializing the application

```bash
# development
$ npm start

# watch mode
$ npm run start:dev

```

**NOTE:** You can eventually run the application with Docker. For that use
```
$ cd .. && docker-compose up taskger
```

## Playing Around
Open your browser and navigate to

```
http://localhost:[port_from_env]/graphql
```

## Test

```bash
$ npm run test

```

## Stay in touch

- Author - [Bruno Silva](https://github.com/bwmsites)

## License

Nest is [MIT licensed](LICENSE).

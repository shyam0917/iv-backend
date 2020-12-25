# backend

Node version(v12.16.1)

`node -v`

mysql version(5.6.21)

`mysql --version`

Install dependencies

`npm i`
`npm i -g sequelize-cli`
Update Configuration  in .env

Run program

`node app.js` or `npm start`

Initialize sequelize
`sequelize init`

Create Db migrations
`sequelize migration:create --name {name of migration}`

Run Db migrations
`sequelize db:migrate`

Run Db migration for specific environment
`

Create Db seeds
`npx sequelize-cli seed:generate --name {name of seed}`

Run Db Seed
  `npx sequelize-cli db:seed:all  --env local`
  `npx sequelize-cli db:seed --env local --seed {name of seed}`

Run Command (Only Ubuntu System)

  `sudo apt-get install libfontconfig`

Undo particular migration
`sequelize db:migrate:undo --name {name of migration}`

Undo particular seed
`sequelize db:seed:undo --seed {name of seed}`

HTTP status codes

  1) 200: OK
  2) 201: Created
  3) 400: Bad Request
  4) 401: Unauthorized
  5) 404: Not Found
  6) 409: Conflict
  7) 500: Internal Server Error
  
  git rm --cached package-lock.json
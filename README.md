# Node js mentoring

## How to install

```
npm i
```

## How to use

### To start the server:

```
npm run build
npm run server
```

#### You can use your own port:

`PORT=9999 npm run server`

#### You can provide your own database config:

`DB_USERNAME=admin`

`DB_PASSWORD=qwerty`

`DB_HOST=example.com`

`DB_PORT=4444`

`DB_DATABASE=mydatabase`

### For development:

```
cmd1: npm run build:watch
cmd2: npm start
```

### For 1 and 2 subtasks:

```
npm run build
npm run task1
npm run task2
```

### Linting:

```
npm run lint
npm run lint:fix
```

### Check types:

```
npm run check-types
```

### Testing

```
npm run test
```

## Api

### Authorization

```
POST /login - Returns JWT tokens by username and password
```

```
POST /refresh-token - Returns JWT tokens by refresh token
```

### Default user

login: `admin`
password: `qwerty2`

### Users

```
GET /users - Returns all users
```

```
GET /users?loginSubstring&limit - Returns user by substring and limited by limit
```

```
GET /users/:id - Returns user by id
```

```
POST /users - Creates and returns user
```

```
POST /users:id?groupName - Adds group to user and returns user
```

```
PUT /users/:id - Updates all users by id
```

```
DELETE /users/:id - Mark all users as deleted by id
```

```
DELETE /users/:id?force=true - Delete all users by id
```

```
DELETE /users/:id?groupName - Remove a group from user
```

### Groups

```
GET /groups - Returns all groups
```

```
GET /groups/:id - Returns group by id
```

```
POST /groups - Creates and returns group
```

```
PUT /groups/:id - Updates all groups by id
```

```
DELETE /groups/:id - Delete all groups by id
```

## Docker

### Create image

```
docker build -t node-app:14 .
```

### Run with local postgres

```
docker-compose up
```

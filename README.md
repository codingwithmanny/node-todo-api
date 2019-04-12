# NODE TODO API

## Requirements

- Node - `10.15.0`

## Local Setup

In order to get this running, run the following:

### Install Dependencies

```bash
yarn install;
```

### Start

```bash
yarn start;
```

If it's running successfully, you will see:

```bash
API is running at 0.0.0.0:5000 in development mode.
```

## API Endpoints

**API_URL:** `http://localhost:5000`

### /

- `GET` /

This is to see the current version of the API.

**Response:**

`200`
```json
{
    "version": "1.0.1"
}
```

### /auth

- `POST` /api/auth/register

Register as a new user.

**Payload:**

```json
{
    "email": "test@test.com",
    "password": "asdf1234"
}
```

**Response:**

`200`
```json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJJU1NVRVIiLCJzdWIiOiJTVUIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJpZCI6ImVkMzE0ODYwLTVjYTUtMTFlOS05YmI2LWU1MGI0YjQ5ZTM5ZiIsInVpZCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE1NTUwMjAzMzMwMzMsImV4cCI6MTU1NTAyMDMzNjYzMywiY2xhaW1zIjp7fX0.bUuA2qjMaIozJgbCb-BzvdywUJny2oT2ZVuU9bzDMzg"
}
```

- `POST` /api/auth/login

Login with existing user email and password.

**Payload:**

```json
{
    "email": "test@test.com",
    "password": "asdf1234"
}
```

**Response:**

`200`
```json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJJU1NVRVIiLCJzdWIiOiJTVUIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJpZCI6ImVkMzE0ODYwLTVjYTUtMTFlOS05YmI2LWU1MGI0YjQ5ZTM5ZiIsInVpZCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE1NTUwMjAzMzMwMzMsImV4cCI6MTU1NTAyMDMzNjYzMywiY2xhaW1zIjp7fX0.bUuA2qjMaIozJgbCb-BzvdywUJny2oT2ZVuU9bzDMzg"
}
```

### /todos

- `GET` /api/todos

Get list of todos associated with user logged in.

**Headers:**

```json
{
    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJJU1NVRVIiLCJzdWIiOiJTVUIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJpZCI6ImVkMzE0ODYwLTVjYTUtMTFlOS05YmI2LWU1MGI0YjQ5ZTM5ZiIsInVpZCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE1NTUwMjAzMzMwMzMsImV4cCI6MTU1NTAyMDMzNjYzMywiY2xhaW1zIjp7fX0.bUuA2qjMaIozJgbCb-BzvdywUJny2oT2ZVuU9bzDMzg"
}
```

**Response:**

`200`
```json
{
    "todos": [
        {
            "id": "3a1bae90-5ca6-11e9-968d-0946b4dab839",
            "userId": "ed314860-5ca5-11e9-9bb6-e50b4b49e39f",
            "text": "testasd112asd",
            "done": false
        },
        {
            "id": "5c021e40-5ca6-11e9-968d-0946b4dab839",
            "userId": "ed314860-5ca5-11e9-9bb6-e50b4b49e39f",
            "text": "testasd112asd",
            "done": false
        },
        {
            "id": "635cbf60-5ca6-11e9-968d-0946b4dab839",
            "userId": "ed314860-5ca5-11e9-9bb6-e50b4b49e39f",
            "text": "testasd112asd",
            "done": false
        }
    ]
}
```

- `GET` /api/todos/3a1bae90-5ca6-11e9-968d-0946b4dab839

Get specific todo based on id.

**Headers:**

```json
{
    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJJU1NVRVIiLCJzdWIiOiJTVUIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJpZCI6ImVkMzE0ODYwLTVjYTUtMTFlOS05YmI2LWU1MGI0YjQ5ZTM5ZiIsInVpZCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE1NTUwMjAzMzMwMzMsImV4cCI6MTU1NTAyMDMzNjYzMywiY2xhaW1zIjp7fX0.bUuA2qjMaIozJgbCb-BzvdywUJny2oT2ZVuU9bzDMzg"
}
```

**Response:**

`200`
```json
{
    "todo": {
        "id": "3a1bae90-5ca6-11e9-968d-0946b4dab839",
        "userId": "ed314860-5ca5-11e9-9bb6-e50b4b49e39f",
        "text": "sdasdsasdasdasdasdasd",
        "done": true
    }
}
```

- `POST` /api/todos

Create a todo.

**Headers:**

```json
{
    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJJU1NVRVIiLCJzdWIiOiJTVUIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJpZCI6ImVkMzE0ODYwLTVjYTUtMTFlOS05YmI2LWU1MGI0YjQ5ZTM5ZiIsInVpZCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE1NTUwMjAzMzMwMzMsImV4cCI6MTU1NTAyMDMzNjYzMywiY2xhaW1zIjp7fX0.bUuA2qjMaIozJgbCb-BzvdywUJny2oT2ZVuU9bzDMzg"
}
```

**Payload:**

```json
{
    "text": "My Todo",
    "done": false
}
```

**Response:**

`200`
```json
{
    "success": true,
    "todo": {
        "id": "422ea660-5caa-11e9-99d7-eb86dbd5bfbb",
        "text": "My Todo",
        "done": false
    }
}
```

- `PUT` /api/todos/422ea660-5caa-11e9-99d7-eb86dbd5bfbb

Update a todo.

**Headers:**

```json
{
    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJJU1NVRVIiLCJzdWIiOiJTVUIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJpZCI6ImVkMzE0ODYwLTVjYTUtMTFlOS05YmI2LWU1MGI0YjQ5ZTM5ZiIsInVpZCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE1NTUwMjAzMzMwMzMsImV4cCI6MTU1NTAyMDMzNjYzMywiY2xhaW1zIjp7fX0.bUuA2qjMaIozJgbCb-BzvdywUJny2oT2ZVuU9bzDMzg"
}
```

**Payload:**

```json
{
    "text": "My New Todo Name",
    "done": true
}
```

**Response:**

`200`
```json
{
    "success": true,
    "todo": {
        "id": "422ea660-5caa-11e9-99d7-eb86dbd5bfbb",
        "userId": "ed314860-5ca5-11e9-9bb6-e50b4b49e39f",
        "text": "My New Todo Name",
        "done": true
    }
}
```

- `DELETE` /api/todos/422ea660-5caa-11e9-99d7-eb86dbd5bfbb

Delete a todo.

**Headers:**

```json
{
    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJJU1NVRVIiLCJzdWIiOiJTVUIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJpZCI6ImVkMzE0ODYwLTVjYTUtMTFlOS05YmI2LWU1MGI0YjQ5ZTM5ZiIsInVpZCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE1NTUwMjAzMzMwMzMsImV4cCI6MTU1NTAyMDMzNjYzMywiY2xhaW1zIjp7fX0.bUuA2qjMaIozJgbCb-BzvdywUJny2oT2ZVuU9bzDMzg"
}
```

**Response:**

`200`
```json
{
    "success": true
}
```



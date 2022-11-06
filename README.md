# Blogging-API
This is an api for a blogging app

---

## Requirements
1. User should be able to signup
2. User should be able to login with Passport using JWT
3. Implement basic auth
4. All users should be able to get blogs that have been published
5. Logged users should be able to create blogs
6. Owners should be able to update and delete blogs both published and drafts
7. Test application
---
## Setup
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm start`

---
## Base URL
-https://github.com/olanrewaju443/my-blogger


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  email |  string |  required |
|  firstname | string  |  required|
|  lastname  |  string |  required  |
|  email     | string  |  required |
|  password |   string |  required  |



### blog
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  created_at |  date | default: date.now|
|  state | string  | required, { published or draft }, default:draft|
|  title  |  string |  required, unique  |
|  description     | string  |  required |
|  read_count |   number |  default: 0  |
|  reading_time |  string |   |
|  tags |  array |  []
|  body |  string |  required |
|  timestamp |  date |  default: date.now |
|  author |  object |  required |



## APIs
---

### Signup User

- Route: /signup
- Method: POST
- Body: 
```
{
  "email": "doe@example.com",
  "password": "Password1",
  "firstname": "jon",
  "lastname": "doe",
}
```

- Responses

Success
```
{
    status: 'true',
    user: {
        "email": "doe@example.com",
        "password": "Password1",
        "firstname": "jon",
        "lastname": "doe",
    }
}
```
---
### Login User

- Route: /login
- Method: POST
- Body: 
```
{
    "email": "doe@example.com",
    "password": "Password1",
}
```

- Responses

Success
```
{
    token: 'sjlkafjkldsfjsd'
}
```

---
### Create Blog 

- Route: /posts
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
  "title": "dan d humorous",
  "description": "Daniel is here",
  "state": "published",
  "tags": "hassle",
  "body": "leave this empty"
}
```

- Responses

Success
```
{
     "status": true,
    "blog": {
        "title": "dan d humorous",
        "description": "Daniel is here",
        "state": "draft",
        "read_count": 0,
        "reading_time": "0 minute(s)",
        "tags": [
            "hassle"
        ],
        "body": "leave this empty",
        "timestamp": {
            "created_at": "2022-11-05T19:34:52.413Z",
            "updated_at": "2022-11-05T19:34:52.414Z"
        },
        "author": "6364bf34646ec543a1c387e7",
        "_id": "6366badcb445977a3226aa3a",
        "__v": 0
    }
}
```
---
### Get A Blog 

- Route: /posts/:id
- Method: GET
- Header
- Responses

Success
```
{
      "status": true,
    "blog": {
        "timestamp": {
            "created_at": "2022-11-04T07:31:48.673Z",
            "updated_at": "2022-11-05T04:13:10.360Z"
        },
        "_id": "6364bfe4772f08c9c4c07451",
        "title": "danny",
        "description": "Daniel is here",
        "read_count": 3,
        "reading_time": "0 minute(s)",
        "tags": [
            "hassle"
        ],
        "body": "leave this empty",
        "author": {
            "_id": "6364bf34646ec543a1c387e7",
            "firstname": "Daniel",
            "lastname": "King",
            "email": "moxie@gmail.com"
        },
        "__v": 0,
        "state": "published"
    }
}
```
---

### Get blogs

- Route: /blogs
- Method: GET
- Header:
- Query params: 
    - page (default: 1)
    - per_page (default: 20)
    - blog_by (default: created_at)
    - blog (options: asc | desc, default: desc)
    - state
    - timestamp
- Responses

Success
```
{
    "status": true,
    "blog": {
        "timestamp": {
            "created_at": "2022-11-04T07:31:48.673Z",
            "updated_at": "2022-11-05T04:13:10.360Z"
        },
        "_id": "6364bfe4772f08c9c4c07451",
        "title": "danny",
        "description": "Daniel is here",
        "read_count": 3,
        "reading_time": "0 minute(s)",
        "tags": [
            "hassle"
        ],
        "body": "leave this empty",
        "author": {
            "_id": "6364bf34646ec543a1c387e7",
            "firstname": "Daniel",
            "lastname": "King",
            "email": "moxie@gmail.com"
        },
        "__v": 0,
        "state": "published"
    }
}
```
---

...

## Contributor
- Adegboye Michael

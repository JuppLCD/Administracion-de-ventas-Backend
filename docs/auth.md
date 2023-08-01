### Route Auth

##### Generate code

```
POST /api/auth/code
Content-Type: application/json

{
    "email": string,
}
```

RES => { "message" : string }

##### Login

```
POST /api/auth/login
Content-Type: application/json

{
    "email": string,
    "code": string,
}
```

RES => { "token" : string }

##### Validate token

```
POST /api/auth/validate_token
Authorization: token
```

RES => { "token" : string }

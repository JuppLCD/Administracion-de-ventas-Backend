### Route Auth

##### Generate code

```
REQUEST

POST /api/auth/code

{
    "email": string,
}
```

```
RESPONSE

{
    "message" : string
}
```

##### Login

```
REQUEST

POST /api/auth/login

{
    "email": string,
    "code": string,
}
```

```
RESPONSE

{
    "token" : string
}
```

##### Validate token

```
REQUEST

POST /api/auth/validate_token
Authorization: token
```

```
RESPONSE

{
    "token" : string
}
```

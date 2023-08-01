### Route Person

> **Note:** All queries on this route use the "Authorization" header with the plain token.

##### Get All

```
GET /api/person/
```

##### Get by Id

```
GET /api/person/:personId
```

##### Store

```
POST /api/person/store

{
    "type_person": string,
    "document_type": string,
    "document_number": string,

    "name": string,
    "address": string,
    "phone": string

}
```

##### Update

```
PUT /api/person/:personId

{
    "[fied]" : string
}
```

##### Delete

```
DELETE /api/person/:personId
```

### Route Category

> **Note:** All queries on this route use the "Authorization" header with the plain token.

##### Get All

```
GET /api/category/
```

##### Get by Id

```
GET /api/category/:categoryId
```

##### Store

```
POST /api/category/store

{
    "name": string,
	"description": string
}
```

##### Update

```
PUT /api/category/:categoryId

{
    "[fied]" : string
}
```

##### Delete

```
DELETE /api/category/:categoryId
```

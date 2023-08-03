### Route Category

> **Note:** All queries on this route use the "Authorization" header with the plain token.

```
ICategory = {
    id: number,
    name: string,
    description: string
}
```

##### Get All

```
REQUEST

GET /api/category/
```

```
RESPONSE

{
    "categories" : ICategory[]
}
```

##### Get by Id

```
REQUEST

GET /api/category/:categoryId
```

```
RESPONSE

{
    "category" : ICategory
}
```

##### Store

```
REQUEST

POST /api/category/store

{
    "name": string,
	"description": string
}
```

```
RESPONSE

{
    "category" : ICategory
}
```

##### Update

```
REQUEST

PUT /api/category/:categoryId

{
    "[fied]" : string
}
```

```
RESPONSE

{
    "category" : ICategory
}
```

##### Delete

```
REQUEST

DELETE /api/category/:categoryId
```

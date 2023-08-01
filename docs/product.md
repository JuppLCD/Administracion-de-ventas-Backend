### Route Product

> **Note:** All queries on this route use the "Authorization" header with the plain token.

##### Get All

```
GET /api/product/
```

##### Get product by id

```
GET /api/product/:productId
```

##### Get product by category id

```
GET /api/product/category/:categoryId
```

##### Search product by field

```
POSt /api/product/search


{
"[field]" : string/number
}
```

##### Create product

```
POST /api/product/store


{
    "category_id": number,

    "name": string,
    "type": string,
    "description": string,
    "code": string,
    "img": string (url),

    "price": number,
    "stock": number
}
```

##### Update product

```
PUT /api/product/:productId


{
    "[field]": string/number
}
```

##### Delete product

```
DELETE /api/product/:productId
```

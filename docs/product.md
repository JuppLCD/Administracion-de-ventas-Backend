### Route Product

> **Note:** All queries on this route use the "Authorization" header with the plain token.

```
IProduct = {
	"id": number,
	"category_id": number,
	"name": string,
	"type": string,
	"description": string,
	"code": string,
	"img": string,
	"price": number,
	"stock": number
}
```

##### Get All

```
REQUEST

GET /api/product/
```

```
RESPONSE

{
    "products" : IProduct[]
}
```

##### Get product by id

```
REQUEST

GET /api/product/:productId
```

```
RESPONSE

{
    "product" : IProduct
}
```

##### Get product by category id

```
REQUEST

GET /api/product/category/:categoryId
```

```
RESPONSE

{
    "products" : IProduct[]
}
```

##### Search product by field

```
REQUEST

POST /api/product/search


{
"[field]" : string/number
}
```

```
RESPONSE

{
    "products" : IProduct[]
}
```

##### Create product

```
REQUEST

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

```
RESPONSE

{
    "product" : IProduct
}
```

##### Update product

```
REQUEST

PUT /api/product/:productId


{
    "[field]": string/number
}
```

```
RESPONSE

{
    "product" : IProduct
}
```

##### Delete product

```
REQUEST

DELETE /api/product/:productId
```

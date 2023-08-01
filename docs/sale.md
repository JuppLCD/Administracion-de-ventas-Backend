### Route Sale

> **Note:** All queries on this route use the "Authorization" header with the plain token.

##### Get All

```
GET /api/sale/
```

##### Get by Id

```
GET /api/sale/:saleId
```

##### Store

```
POST /api/sale/store

{
    "user_id": number,
	"client_id": number,

	"voucher_series": string,
	"voucher_type": string,

	"products":[
		{
			"id": number,
			"price":number,
			"stock": number
		}
	]
}
```

##### Update

```
PUT /api/sale/:saleId

{
    "[fied]" : string
}
```

##### Delete

```
DELETE /api/sale/:saleId
```

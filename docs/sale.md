### Route Sale

> **Note:** All queries on this route use the "Authorization" header with the plain token.

```
ISale = {
	"id": number,
	"user_id": number,
	"client_id": number,
	"voucher_type": 'FACTURA A' | 'FACTURA B' | 'FACTURA C',
	"voucher_series": 'Serie VD-01' | 'Serie VD-02' | 'Serie C-01' | 'Serie C-02' | 'Serie C-03',
	"voucher_number": string,
	"date": 'YYYY-MM-DD hh:mm:ss',
	"tax": number,
	"total": number
}

ISaleDetailed = ISale & {
	"datails": [
		{
			"id": number,
			"product_id": number,
			"stock": number,
			"price": number
		}
	]
}
```

##### Get All

```
REQUEST

GET /api/sale/
```

```
RESPONSE

{
    "sales" : ISale[]
}
```

##### Get by Id

```
REQUEST

GET /api/sale/:saleId
```

```
RESPONSE

{
    "sale" : ISaleDetailed
}
```

##### Store

```
REQUEST

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

```
RESPONSE

{
    "sale" : ISale
}
```

##### Update

```
REQUEST

PUT /api/sale/:saleId

{
    "[fied]" : string
}
```

```
RESPONSE

{
    "sale" : ISale
}
```

##### Delete

```
REQUEST

DELETE /api/sale/:saleId
```

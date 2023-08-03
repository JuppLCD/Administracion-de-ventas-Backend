### Route ProductEntry

> **Note:** All queries on this route use the "Authorization" header with the plain token.

```
IProductEntry = {
	"id": number,
	"user_id": number,
	"provider_id": number,
	"voucher_type": 'FACTURA A' | 'FACTURA B' | 'FACTURA C',
	"voucher_series": 'Serie VD-01' | 'Serie VD-02' | 'Serie C-01' | 'Serie C-02' | 'Serie C-03',
	"voucher_number": string,
	"date": 'YYYY-MM-DD hh:mm:ss',
	"tax": number,
	"total": number
}

IProductEntryDetailed = IProductEntry & {
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

GET /api/product_entry/
```

```
RESPONSE

{
    "productEntries" : IProductEntry[]
}
```

##### Get by Id

```
REQUEST

GET /api/product_entry/:productEntryId
```

```
RESPONSE

{
    "productEntry" : IProductEntryDetailed
}
```

##### Store

```
REQUEST

POST /api/product_entry/store

{
    "user_id": number,
	"provider_id": number,

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
    "productEntry" : IProductEntry
}
```

##### Update

```
REQUEST

PUT /api/product_entry/:productEntryId

{
    "[fied]" : string
}
```

```
RESPONSE

{
    "productEntry" : IProductEntry
}
```

##### Delete

```
REQUEST

DELETE /api/product_entry/:productEntryId
```

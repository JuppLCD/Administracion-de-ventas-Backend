### Route ProductEntry

> **Note:** All queries on this route use the "Authorization" header with the plain token.

##### Get All

```
GET /api/product_entry/
```

##### Get by Id

```
GET /api/product_entry/:productEntryId
```

##### Store

```
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

##### Update

```
PUT /api/product_entry/:productEntryId

{
    "[fied]" : string
}
```

##### Delete

```
DELETE /api/product_entry/:productEntryId
```

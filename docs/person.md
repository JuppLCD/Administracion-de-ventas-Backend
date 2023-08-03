### Route Person

> **Note:** All queries on this route use the "Authorization" header with the plain token.

```
IPerson = {
	"id": number,
	"type_person": 'Natural' | 'Legal',
	"document_type": 'CUIT' | 'DNI' | 'Pasaporte' | 'Cédula de Identidad',
	"document_number": string,
	"phone": string,
	"address": string,
	"name": string
}
```

##### Get All

```
REQUEST

GET /api/person/
```

```
RESPONSE

{
    "people" : IPerson[]
}
```

##### Get by Id

```
REQUEST

GET /api/person/:personId
```

```
RESPONSE

{
    "person" : IPerson
}
```

##### Store

```
REQUEST

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

```
RESPONSE

{
    "person" : IPerson
}
```

##### Update

```
REQUEST

PUT /api/person/:personId

{
    "[fied]" : string
}
```

```
RESPONSE

{
    "person" : IPerson
}
```

##### Delete

```
REQUEST

DELETE /api/person/:personId
```

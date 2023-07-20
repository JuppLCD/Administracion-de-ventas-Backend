import { ITypeDocument, ITypePerson } from '../types/models/person.interface';
import { IVoucherSeries, IVoucherType } from '../types/voucher.interface';

export const VOUCHER_TYPE: IVoucherType[] = ['FACTURA A', 'FACTURA B', 'FACTURA C'];
export const VOUCHER_SERIES: IVoucherSeries[] = [
	'Serie VD-01',
	'Serie VD-02',
	'Serie C-01',
	'Serie C-02',
	'Serie C-03',
];

export const DOCUMENT_TYPE: ITypeDocument[] = ['CUIT', 'DNI', 'Pasaporte', 'Cédula de Identidad'];
export const TYPE_PERSON: ITypePerson[] = ['Natural', 'Legal'];

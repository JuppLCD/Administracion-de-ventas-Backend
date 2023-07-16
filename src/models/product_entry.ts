import { DataTypes } from 'sequelize';

import type { Sequelize } from 'sequelize';
import type { IProductEntryModel } from '../types/models/product_entry.interface';

export default function productEntreySchema(sequelize: Sequelize) {
	return sequelize.define<IProductEntryModel>(
		'Product_Entry',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			provider_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},

			voucher_type: {
				type: DataTypes.ENUM('FACTURA A', 'FACTURA B', 'FACTURA C'),
			},
			voucher_series: {
				type: DataTypes.ENUM('Serie VD-01', 'Serie VD-02', 'Serie C-01', 'Serie C-02', 'Serie C-03'),
			},
			voucher_number: {
				type: DataTypes.STRING(10),
			},

			date: {
				type: DataTypes.DATE,
			},

			tax: {
				type: DataTypes.DECIMAL(12, 4),
			},
			total: {
				type: DataTypes.DECIMAL(12, 4),
			},
		},
		{
			// Other model options go here
			timestamps: false,
		}
	);
}

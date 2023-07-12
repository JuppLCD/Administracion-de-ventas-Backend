import { DataTypes } from 'sequelize';

import type { Sequelize } from 'sequelize';
import type { IProductEntryModel } from '../types/product_entry.interface';

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
				type: DataTypes.STRING,
			},
			voucher_series: {
				type: DataTypes.STRING,
			},
			voucher_number: {
				type: DataTypes.STRING,
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

import { DataTypes } from 'sequelize';

import type { Sequelize } from 'sequelize';
import type { IProductEntryDetailModel } from '../types/product_entry_detail.interface';

export default function productEntreyDetailSchema(sequelize: Sequelize) {
	return sequelize.define<IProductEntryDetailModel>(
		'Product_Entry_Detail',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			product_entry_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			product_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},

			stock: {
				type: DataTypes.INTEGER,
			},
			price: {
				type: DataTypes.DECIMAL(12, 4),
			},
		},
		{
			// Other model options go here
			timestamps: false,
		}
	);
}

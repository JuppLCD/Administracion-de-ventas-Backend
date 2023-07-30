import { DataTypes } from 'sequelize';

import { VOUCHER_SERIES, VOUCHER_TYPE } from '../config';

import { getDateInOurTimezone } from '../utils/dateFormat';

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
				type: DataTypes.ENUM(...VOUCHER_TYPE),
			},
			voucher_series: {
				type: DataTypes.ENUM(...VOUCHER_SERIES),
			},
			voucher_number: {
				type: DataTypes.STRING(10),
			},

			date: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				allowNull: false,
				get() {
					return getDateInOurTimezone(this.getDataValue('date'));
				},
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

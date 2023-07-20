import { DataTypes } from 'sequelize';

import { VOUCHER_SERIES, VOUCHER_TYPE } from '../config';

import type { Sequelize } from 'sequelize';
import type { ISaleModel } from '../types/models/sale.interface';

export default function saleSchema(sequelize: Sequelize) {
	return sequelize.define<ISaleModel>(
		'Sale',
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
			client_id: {
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

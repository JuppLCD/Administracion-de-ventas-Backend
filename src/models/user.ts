import { DataTypes } from 'sequelize';

import type { Sequelize } from 'sequelize';
import type { IUserModel } from '../types/user.interface';

export default function userSchema(sequelize: Sequelize) {
	return sequelize.define<IUserModel>(
		'User',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			code: {
				type: DataTypes.STRING,
			},
			expire_code: {
				type: DataTypes.STRING(15),
			},
		},
		{
			// Other model options go here
			timestamps: false,
		}
	);
}

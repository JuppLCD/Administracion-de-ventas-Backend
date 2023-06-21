import { DataTypes, Optional } from 'sequelize';

import type { Sequelize, Model } from 'sequelize';
import type { IUser } from '../types/user.interface';

type UserCreationAttributes = Optional<IUser, 'id'>;

export default function userSchema(sequelize: Sequelize) {
	return sequelize.define<Model<IUser, UserCreationAttributes>>(
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
		},
		{
			// Other model options go here
			timestamps: false,
		}
	);
}

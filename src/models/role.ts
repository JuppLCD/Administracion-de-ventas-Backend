import { DataTypes } from 'sequelize';

import type { Sequelize } from 'sequelize';
import type { IRoleModel } from '../types/role.interface';

export default function roleSchema(sequelize: Sequelize) {
	return sequelize.define<IRoleModel>(
		'Role',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},

			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			description: {
				type: DataTypes.STRING,
			},
		},
		{
			// Other model options go here
			timestamps: false,
		}
	);
}

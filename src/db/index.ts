import { sequelize } from './connection';

// Models
import roleSchema from '../models/role';
import userSchema from './../models/user';
import categorySchema from '../models/category';
import productSchema from '../models/product';
import personSchema from '../models/person';
import productEntreySchema from '../models/product_entry';
import productEntreyDetailSchema from '../models/product_entry_detail';
import saleSchema from '../models/sale';
import saleDetailSchema from '../models/sale_detail';

const RoleModel = roleSchema(sequelize);
const UserModel = userSchema(sequelize);
const CategoryModel = categorySchema(sequelize);
const ProductModel = productSchema(sequelize);
const PersonModel = personSchema(sequelize);
const ProductEntryModel = productEntreySchema(sequelize);
const ProductEntryDetailModel = productEntreyDetailSchema(sequelize);
const SaleModel = saleSchema(sequelize);
const SaleDetailModel = saleDetailSchema(sequelize);

// Associations Model User
UserModel.belongsTo(RoleModel, { foreignKey: 'role_id', as: 'role' });
RoleModel.hasMany(UserModel, { foreignKey: 'role_id', as: 'users' });

// Associations Model Product
ProductModel.belongsTo(CategoryModel, { foreignKey: 'category_id', as: 'category' });
CategoryModel.hasMany(ProductModel, { foreignKey: 'category_id', as: 'products' });

// Associations Model Product_Entry
ProductEntryModel.belongsTo(UserModel, { foreignKey: 'user_id' });
UserModel.hasMany(ProductEntryModel, { foreignKey: 'user_id' });
ProductEntryModel.belongsTo(PersonModel, { foreignKey: 'provider_id', as: 'provider' }); // Revisar que funcione bien
PersonModel.hasMany(ProductEntryModel, { foreignKey: 'provider_id', as: 'product_entries' });

// Associations Model Product_Entry_Detail
ProductEntryDetailModel.belongsTo(ProductEntryModel, { foreignKey: 'product_entry_id' });
ProductEntryModel.hasMany(ProductEntryDetailModel, { foreignKey: 'product_entry_id', as: 'details' });
ProductEntryDetailModel.belongsTo(ProductModel, { foreignKey: 'product_id' });
ProductModel.hasMany(ProductEntryDetailModel, { foreignKey: 'product_id' });

// Associations Model Sale
SaleModel.belongsTo(UserModel, { foreignKey: 'user_id' });
UserModel.hasMany(SaleModel, { foreignKey: 'user_id' });
SaleModel.belongsTo(PersonModel, { foreignKey: 'client_id', as: 'client' });
PersonModel.hasMany(SaleModel, { foreignKey: 'client_id', as: 'sales' });

// Associations Model Sale_Detail
SaleDetailModel.belongsTo(SaleModel, { foreignKey: 'sale_id' });
SaleModel.hasMany(SaleDetailModel, { foreignKey: 'sale_id', as: 'details' });
SaleDetailModel.belongsTo(ProductModel, { foreignKey: 'product_id' });
ProductModel.hasMany(SaleDetailModel, { foreignKey: 'product_id' });

export default async function connectToDB() {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
		return sequelize;
	} catch (err) {
		console.error('Unable to connect to the database: ', err);
	}
}

export {
	RoleModel,
	UserModel,
	CategoryModel,
	ProductModel,
	PersonModel,
	ProductEntryModel,
	ProductEntryDetailModel,
	SaleModel,
	SaleDetailModel,
};

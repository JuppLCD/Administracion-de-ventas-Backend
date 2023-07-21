import { Router } from 'express';

import { SaleController } from '../controllers/sale';
import authJwt from '../middlewares/authJwt';

const router = Router();

router.use(authJwt); // ! De momento cualquier usuario puede realizar las consultas

router.get('/', SaleController.getAll);
router.get('/:saleId', SaleController.getById);
router.post('/store', SaleController.store); // ! TENGO QUE REALIZAR LAS VALIDACIONES CORRESPONDIENTES
router.put('/:saleId', SaleController.update); // ! TENGO QUE REALIZAR LAS VALIDACIONES CORRESPONDIENTES
router.delete('/:saleId', SaleController.delete);

export { router };

import { Router } from 'express';

import { ProductEntryController } from '../controllers/productEntrey';
import authJwt from '../middlewares/authJwt';

const router = Router();

router.use(authJwt); // ! De momento cualquier usuario puede realizar las consultas

router.get('/', ProductEntryController.getAll);
router.get('/:productEntryId', ProductEntryController.getById);
router.post('/store', ProductEntryController.store); // ! TENGO QUE REALIZAR LAS VALIDACIONES CORRESPONDIENTES
router.put('/:productEntryId', ProductEntryController.update); // ! TENGO QUE REALIZAR LAS VALIDACIONES CORRESPONDIENTES
router.delete('/:productEntryId', ProductEntryController.delete);

export { router };

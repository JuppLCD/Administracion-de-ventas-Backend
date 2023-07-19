import { Router } from 'express';

import { PersonController } from '../controllers/person';
import authJwt from '../middlewares/authJwt';

const router = Router();

router.use(authJwt); // ! De momento cualquier usuario puede realizar las consultas

router.get('/', PersonController.getAll);
router.get('/:personId', PersonController.getById);
router.post('/store', PersonController.store); // ! TENGO QUE REALIZAR LAS VALIDACIONES CORRESPONDIENTES
router.put('/:personId', PersonController.update); // ! TENGO QUE REALIZAR LAS VALIDACIONES CORRESPONDIENTES
router.delete('/:personId', PersonController.delete);

export { router };

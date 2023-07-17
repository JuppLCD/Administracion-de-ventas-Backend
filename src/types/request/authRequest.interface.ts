import { Request } from 'express';
import { IPayloadJWT } from '../jwt.interface';

export interface AuthRequest extends Request {
	user?: IPayloadJWT;
}

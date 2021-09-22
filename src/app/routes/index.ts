import { Router } from 'express';
import UploadController from '../controllers/upload';
import ClearCacheController from "../controllers/clear";

const Routes = Router();

Routes.post('/clearCache', ClearCacheController.clearCache);
Routes.post('/upload', UploadController.uploadOne);

export default Routes;

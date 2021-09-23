import { Router } from 'express';
import UploadController from '../controllers/upload';
import ClearCacheController from "../controllers/clear";
import ListController from "../controllers/list";
import DownloadController from "../controllers/download";
import DataController from "../controllers/data";

const Routes = Router();

Routes.post('/clearCache', ClearCacheController.clearCache);
Routes.post('/upload', UploadController.uploadOne);
Routes.post('/multiUpload', UploadController.multiUpload);
Routes.get('/download/*', DownloadController.downloadFile);
Routes.get('/categories', DataController.getAllCategories);
Routes.get('/categories/:categoryId/items', DataController.getItems);
Routes.get('/list', ListController.listAll);

export default Routes;

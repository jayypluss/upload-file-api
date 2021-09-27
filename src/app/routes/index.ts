import { Router } from 'express';
import UploadController from '../controllers/upload';
import ClearCacheController from "../controllers/clear";
import ListController from "../controllers/list";
import DownloadController from "../controllers/download";
import CategoriesController from "../controllers/categories";
import ItemsController from "../controllers/items";
// import AuthController from "../controllers/auth";

const Routes = Router();

// Routes.post('/auth', AuthController.auth);
Routes.post('/clearCache', ClearCacheController.clearCache);
Routes.post('/upload', UploadController.uploadOne);
Routes.post('/multiUpload', UploadController.multiUpload);
Routes.get('/download/*', DownloadController.downloadFile);
Routes.get('/categories', CategoriesController.getAllCategories);
Routes.post('/categories', CategoriesController.createNewCategories);
Routes.get('/categories/:categoryId/items', ItemsController.createNewItems);
Routes.get('/items', ItemsController.getAllItems);
Routes.post('/items', ItemsController.createNewItems);
Routes.get('/list', ListController.listAll);

export default Routes;

import { Router } from 'express';
import UploadController from '../controllers/upload';
import ClearCacheController from "../controllers/clear";
import ListController from "../controllers/list";
import DownloadController from "../controllers/download";
import Path from "path";

const Routes = Router();

Routes.post('/clearCache', ClearCacheController.clearCache);
Routes.post('/upload', UploadController.uploadOne);
Routes.post('/multiUpload', UploadController.multiUpload);
Routes.get('/download/*', DownloadController.downloadFile);
// Routes.get('/list', (req, res) => {
//     res.sendFile('index.html', {
//         root: Path.join(__dirname, '../../../')
//     })
// })
Routes.get('/list', ListController.listAll);

export default Routes;

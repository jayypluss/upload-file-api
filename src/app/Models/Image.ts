import {PathLike} from "fs";

export interface Image {
    id: number
    categoryId: number
    fileDir?: string
    fileName?: string
    filePath?: PathLike
}

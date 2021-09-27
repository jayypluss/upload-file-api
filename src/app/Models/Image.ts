import {PathLike} from "fs";

export interface Image {
    id: string
    fileName: string
    categoryId?: string
    itemId?: string
    description?: string
    isThumbnail?: boolean
    filePath?: PathLike
}

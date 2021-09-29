import { CategoryType } from './CategoryType';
import {Item} from "./Item";

export interface Category {
    _id: string
    name: string
    renderIndex: number
    items?: Item[]
    thumbFileName?: Item[]
    type?: CategoryType
}

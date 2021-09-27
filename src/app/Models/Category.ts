import { CategoryType } from './CategoryType';
import {Item} from "./Item";

export interface Category {
    id: string
    name: string
    renderIndex: number
    items?: Item[]
    type?: CategoryType
}

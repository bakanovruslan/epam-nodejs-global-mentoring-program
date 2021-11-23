import { Permission } from '../types/Permission';

export type Group = {
    id: string,
    name: string,
    permissions: Array<Permission>
}
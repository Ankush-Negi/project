import { IPermissions } from '../extraTs/interfaces';
const permissions: IPermissions = {
    'getUsers': {
    all: ['head-trainer'],
    read : ['trainee', 'trainer'],
    write : ['trainer'],
    delete: ['trainer'],
        }
    };
export { permissions };
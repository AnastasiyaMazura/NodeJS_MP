
import uuidv4 from 'uuid/v4';

export const predefinedUsers = [
    {
        'id': uuidv4(),
        'age': 1,
        'login': 'login1',
        'password': 'password1'
    },
    {
        'id': uuidv4(),
        'age': 1,
        'login': 'login3',
        'password': 'password2'
    },
    {
        'id': uuidv4(),
        'age': 1,
        'login': 'login4',
        'password': 'password3'
    },
    {
        'id': uuidv4(),
        'age': 1,
        'login': 'login2',
        'password': 'password4'
    }
];

export const groupsInitialList = [
    { id: uuidv4(), name: 'group1', permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'] },
    { id: uuidv4(), name: 'group2', permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'] },
    { id: uuidv4(), name: 'group3', permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'] },
    { id: uuidv4(), name: 'group4', permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'] }
];
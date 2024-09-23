export enum PERMISSION {
    // SERVICEAUTH:

    //ROLE
    READ_LIST_ROLE = 'READ_LIST_ROLE',
    READ_DETAIL_ROLE = 'READ_DETAIL_ROLE',
    CREATE_ROLE = 'CREATE_ROLE',
    UPDATE_ROLE = 'UPDATE_ROLE',
    DELETE_ROLE = 'DELETE_ROLE',

    //DES DESCRIPTIONS
    READ_LIST_ROLE_DESCRIPTION = 'Permission to view the list of roles',
    READ_DETAIL_ROLE_DESCRIPTION = 'Permission to view details of a specific role',
    CREATE_ROLE_DESCRIPTION = 'Permission to create a new role',
    UPDATE_ROLE_DESCRIPTION = 'Permission to update an existing role',
    DELETE_ROLE_DESCRIPTION = 'Permission to delete a role',

    //USER
    READ_LIST_USER = 'READ_LIST_USER',
    READ_DETAIL_USER = 'READ_DETAIL_USER',
    CREATE_USER = 'CREATE_USER',
    UPDATE_USER = 'UPDATE_USER',
    DELETE_USER = 'DELETE_USER',

    //USER DESCRIPTIONS
    READ_LIST_USER_DESCRIPTION = 'Permission to view the list of users',
    READ_DETAIL_USER_DESCRIPTION = 'Permission to view details of a specific user',
    CREATE_USER_DESCRIPTION = 'Permission to create a new user',
    UPDATE_USER_DESCRIPTION = 'Permission to update an existing user',
    DELETE_USER_DESCRIPTION = 'Permission to delete a user',

    //PERMISSION
    READ_LIST_PERMISSION = 'READ_LIST_PERMISSION',
    READ_DETAIL_PERMISSION = 'READ_DETAIL_PERMISSION',
    CREATE_PERMISSION = 'CREATE_PERMISSION',
    UPDATE_PERMISSION = 'UPDATE_PERMISSION',
    DELETE_PERMISSION = 'DELETE_PERMISSION',

    //PERMISSION DESCRIPTIONS
    READ_LIST_PERMISSION_DESCRIPTION = 'Permission to view the list of permissions',
    READ_DETAIL_PERMISSION_DESCRIPTION = 'Permission to view details of a specific permission',
    CREATE_PERMISSION_DESCRIPTION = 'Permission to create a new permission',
    UPDATE_PERMISSION_DESCRIPTION = 'Permission to update an existing permission',
    DELETE_PERMISSION_DESCRIPTION = 'Permission to delete a permission',

    // SERVICEROUTE:

    //LOCATION
    READ_LIST_LOCATION = 'READ_LIST_LOCATION',
    READ_DETAIL_LOCATION = 'READ_DETAIL_LOCATION',
    CREATE_LOCATION = 'CREATE_LOCATION',
    UPDATE_LOCATION = 'UPDATE_LOCATION',
    DELETE_LOCATION = 'DELETE_LOCATION',

    //LOCATION DESCRIPTIONS
    READ_LIST_LOCATION_DESCRIPTION = 'Permission to view the list of locations',
    READ_DETAIL_LOCATION_DESCRIPTION = 'Permission to view details of a specific location',
    CREATE_LOCATION_DESCRIPTION = 'Permission to create a new location',
    UPDATE_LOCATION_DESCRIPTION = 'Permission to update an existing location',
    DELETE_LOCATION_DESCRIPTION = 'Permission to delete a location',

    //TRANSPORT
    READ_LIST_TRANSPORT = 'READ_LIST_TRANSPORT',
    READ_DETAIL_TRANSPORT = 'READ_DETAIL_TRANSPORT',
    CREATE_TRANSPORT = 'CREATE_TRANSPORT',
    UPDATE_TRANSPORT = 'UPDATE_TRANSPORT',
    DELETE_TRANSPORT = 'DELETE_TRANSPORT',

    //TRANSPORT DESCRIPTIONS
    READ_LIST_TRANSPORT_DESCRIPTION = 'Permission to view the list of transports',
    READ_DETAIL_TRANSPORT_DESCRIPTION = 'Permission to view details of a specific transport',
    CREATE_TRANSPORT_DESCRIPTION = 'Permission to create a new transport',
    UPDATE_TRANSPORT_DESCRIPTION = 'Permission to update an existing transport',
    DELETE_TRANSPORT_DESCRIPTION = 'Permission to delete a transport',

    //ROUTE
    READ_LIST_ROUTE = 'READ_LIST_ROUTE',
    READ_DETAIL_ROUTE = 'READ_DETAIL_ROUTE',
    CREATE_ROUTE = 'CREATE_ROUTE',
    UPDATE_ROUTE = 'UPDATE_ROUTE',
    DELETE_ROUTE = 'DELETE_ROUTE',

    //ROUTE DESCRIPTIONS
    READ_LIST_ROUTE_DESCRIPTION = 'Permission to view the list of routes',
    READ_DETAIL_ROUTE_DESCRIPTION = 'Permission to view details of a specific route',
    CREATE_ROUTE_DESCRIPTION = 'Permission to create a new route',
    UPDATE_ROUTE_DESCRIPTION = 'Permission to update an existing route',
    DELETE_ROUTE_DESCRIPTION = 'Permission to delete a route',

    //OTHER
    ASSIGN_PERMISSION_TO_ROLE = 'ASSIGN_PERMISSION_TO_ROLE',
    ASSIGN_ROLE_TO_USER = 'ASSIGN_ROLE_TO_USER',

    //OTHER DESCRIPTIONS
    ASSIGN_PERMISSION_TO_ROLE_DESCRIPTION = 'Permission to assign a permission to a role',
    ASSIGN_ROLE_TO_USER_DESCRIPTION = 'Permission to assign a role to a user'
}
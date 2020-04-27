export enum Route {
    Home = 'home',
    Login = 'login',
    Unauthorized = 'unauthorized',
    CRM_CONTACT_CREATE = '/crm/contacts/create',
    CRM_CONTACT_EDIT = '/crm/contacts/:contactId',
    CRM_PERSON_CREATE = '/crm/contacts/:contactId/people/create'
}

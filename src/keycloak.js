import Keycloak from 'keycloak-js';
const keycloak = new Keycloak({
 url: 'https://192.168.1.183/auth',
 realm: 'widetech',
 clientId: 'wide',
 credentials: 'omit'
});
export default keycloak;
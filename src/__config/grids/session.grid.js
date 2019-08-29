import { composeGraphQLRequest } from '../helpers';

const onMount = composeGraphQLRequest(`
{
    sessions {
        hash
        device
        provider {
            name
        }
    }
}`,
    ({ sessions }) => sessions
);

const onLogoutOne = composeGraphQLRequest(() => `
mutation logout($hash: ID) {
    logout(hash: $hash)
}
`)
const onLogoutall = composeGraphQLRequest(`
mutation {
    logoutEverywhere
}
`)

export default {
    onMount,
}

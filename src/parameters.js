export const api = {
    protocol: process.env['REACT_APP_API_PROTOCOL'],
    host: process.env['REACT_APP_API_HOST'],
    port: parseInt(process.env['REACT_APP_API_PORT'], 10),
}
export const graphql = `${api.protocol}://${api.host}:${api.port}`;

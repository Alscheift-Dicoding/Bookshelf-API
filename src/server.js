const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const serverConfig = {
    port: 9000,
    host: 'localhost',
    routes: {
        cors: {
            origin: ['*'],
        },
    },
};

const init = async () => {
    const server = Hapi.server(serverConfig);
    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();

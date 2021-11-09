const HOST = "http://localhost:3000/api";

const configureEndpoint = (endpoint: string) => `${HOST}/${endpoint}`;

export default configureEndpoint;

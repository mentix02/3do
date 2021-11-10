const HOST = "http://localhost:8000/api";

const configureEndpoint = (endpoint: string) => `${HOST}/${endpoint}`;

export default configureEndpoint;

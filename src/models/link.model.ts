export enum http {
    GET,
    POST,
    PUT,
    PATCH,
    DELETE,
}

export class LinkModel {
    rel: string;
    href: string;
    method: http;

    constructor(data: LinkModel | {} = {}){
        Object.assign(this, data);
    }
}

import { JwtPayload } from "jsonwebtoken";

export interface HttpResponse<T> {
	statusCode: number;
	body: {
		msg: string;
		data?: T;
		status: number;
		ok: boolean;
	};
}

interface Headers {
  authorization?: string;
  [header: string]: string | undefined;
}

export interface HttpResquest<B> {
	body?: B;
	headers?: Headers;
	params?: B;
	user?: string | JwtPayload;
}

export type Body<T> = Pick<HttpResquest<T>, "body">;

export type params<T> = Pick<HttpResquest<T>, "params">;

export type requiredFieldsError = HttpResponse<string | null>;

export interface IController {
	handle(httpResquest: HttpResquest<unknown>): Promise<HttpResponse<unknown>>;
}
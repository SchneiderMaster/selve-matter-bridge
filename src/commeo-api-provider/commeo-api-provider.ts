import axios from "axios";
import * as dotenv from "dotenv";
import { URL } from "url";
import { RequestMethod } from "./RequestMethod.js";

dotenv.config();

const ip = process.env.SELVE_SERVER_IP;
const password = process.env.SELVE_SERVER_PASSWORD;

if (ip == null) {
	throw new Error("SELVE_SERVER_IP is unset");
}
if (password == null) {
	throw new Error("SELVE_SERVER_PASSOWRD is unset");
}

export const sendRequest = async (
	method: RequestMethod,
	path: string,
	body?: any
): Promise<any> => {
	const url =
		(ip?.endsWith("/") ? ip : ip + "/") +
		(path.startsWith("/") ? path.substring(1) : path) +
		(path.includes("?") ? "&" : "?") +
		"auth=" +
		encodeURI(password);

	let response;
	switch (method) {
		case RequestMethod.GET:
			response = await axios.get(url);
			if (response.status != 200) {
				throw new Error(
					"Error while sending request: " +
						response.status +
						": " +
						response.statusText
				);
			} else if (response.data.XC_ERR != null) {
				throw new Error(
					"Error while sending request: " + response.data.XC_ERR.code
				);
			}
			return response.data.XC_SUC;

		case RequestMethod.POST:
			response = await axios.post(url, body);
			if (response.status != 200) {
				throw new Error(
					"Error while sending request: " +
						response.status +
						": " +
						response.statusText
				);
			} else if (response.data.XC_ERR != null) {
				throw new Error(
					"Error while sending request: " + response.data.XC_ERR.code
				);
			}
			break;

		default:
			throw new Error("Unsupported HTTP method");
	}
};

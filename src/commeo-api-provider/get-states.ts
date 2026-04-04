import { sendRequest } from "./commeo-api-provider.js"
import { RequestMethod } from "./RequestMethod.js"

export const getStates = () => {
    return sendRequest(RequestMethod.GET, "/cmd?XC_FNC=GetStates");
}
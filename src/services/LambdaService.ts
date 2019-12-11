/* tslint:disable */
let AWS:any;
if (process.env._X_AMZN_TRACE_ID) {
    AWS = require("aws-xray-sdk").captureAWS(require("aws-sdk"));
} else {
    console.log("Serverless Offline detected; skipping AWS X-Ray setup")
    AWS = require("aws-sdk");
}
/* tslint:enable */
import {Configuration} from "../utils/Configuration";
import {validateInvocationResponse} from "../utils/validateInvocationResponse";


const lambdaInvokeEndpoints = Configuration.getInstance().getEndpoints();

export class LambdaService {
    public static invoke(lambdaName: any, lambdaEvent: any) {
        const lambda = new AWS.Lambda(lambdaInvokeEndpoints.params);
        console.log("Trying to invoke function ", lambdaName);
        console.log("With the following params ", lambdaInvokeEndpoints);

        return lambda.invoke({
            FunctionName: lambdaName,
            InvocationType: "RequestResponse",
            Payload: JSON.stringify(lambdaEvent)
        }).promise().then((data: any) => {
            console.log("received the following data ", data);
            const payload = validateInvocationResponse(data);
            return JSON.parse(payload.body);
        });
    }
}
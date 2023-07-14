import { SQSEvent, SQSRecord } from "aws-lambda";
import { multiTestUpdate } from "./multiTestUpdate";
import { processRecord } from "../utils/processRecord";

export function updateTechRecord(event: SQSEvent) {
  if (
    !event ||
    !event.Records ||
    !Array.isArray(event.Records) ||
    !event.Records.length
  ) {
    throw new Error("Event is empty");
  }

  let promisesArray: Array<Promise<any>> = [];

  event.Records.forEach((record: SQSRecord) => {
    console.log("payload recieved from queue:", record);
    const test = processRecord(record);
    console.log("processed record:", test ?? "no test");

    if (test) {
      promisesArray = promisesArray.concat(multiTestUpdate(test));
    }
  });

  return Promise.all(promisesArray)
    .then((results) => {
      console.log("resolved promises:", results);
      return results;
    })
    .catch((error: Error) => {
      console.error("an error occurred in the promises", error);
      throw error;
    });
}

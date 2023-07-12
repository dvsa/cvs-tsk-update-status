import { SQSEvent, SQSRecord } from "aws-lambda";
import { UpdateTechRecordService } from "../services/UpdateTechRecordService";
import { singleTestUpdate } from "./singleTestUpdate";
import { multiTestUpdate } from "./multiTestUpdate";

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
    const test = JSON.parse(record.body);
    console.log("payload recieved from queue:", test);

    if (test.testTypes.length > 1) {
      promisesArray = promisesArray.concat(singleTestUpdate(test));
    } else {
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

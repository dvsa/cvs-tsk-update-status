import { SQSEvent, SQSRecord } from "aws-lambda";
import { UpdateTechRecordService } from "../services/UpdateTechRecordService";

export function updateTechRecord(event: SQSEvent) {
  if (
    !event ||
    !event.Records ||
    !Array.isArray(event.Records) ||
    !event.Records.length
  ) {
    throw new Error("Event is empty");
  }

  const promisesArray: Array<Promise<any>> = [];

  event.Records.forEach((record: SQSRecord) => {
    const test = JSON.parse(record.body);
    console.log("payload received from queue:", test);
    if (test.testStatus === "submitted") {
      const promiseUpdateStatus =
        UpdateTechRecordService.updateStatusBySystemNumber(
          test.systemNumber,
          test.testStatus,
          test.testTypes.testResult,
          test.testTypes.testTypeId,
          test.newStatus,
          test.createdById,
          test.createdByName
        );
      if (test.euVehicleCategory) {
        const promiseUpdateEuCategory =
          UpdateTechRecordService.updateEuVehicleCategory(
            test.systemNumber,
            test.euVehicleCategory,
            test.createdById,
            test.createdByName
          );
        promisesArray.push(promiseUpdateEuCategory);
      }
      promisesArray.push(promiseUpdateStatus);
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

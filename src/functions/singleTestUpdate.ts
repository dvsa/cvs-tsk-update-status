import { UpdateTechRecordService } from "../services/UpdateTechRecordService";
import { validateUpdateStatus } from "../validators/validateUpdateStatus";

export const singleTestUpdate = (test: any): Array<Promise<any>> => {
  const promisesArray = [];

  const updateNeeded = validateUpdateStatus(
    test.testStatus,
    test.testTypes[0].testResult,
    test.testTypes[0].testTypeId
  );

  if (updateNeeded) {
    const promiseUpdateStatus =
      UpdateTechRecordService.updateStatusBySystemNumber(
        test.systemNumber,
        test.testStatus,
        test.testTypes[0].testResult,
        test.testTypes[0].testTypeId,
        test.newStatus,
        test.createdById,
        test.createdByName
      );
    promisesArray.push(promiseUpdateStatus);
  }
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

  return promisesArray;
};

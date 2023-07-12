import { UpdateTechRecordService } from "../services/UpdateTechRecordService";
import { validateUpdateStatus } from "../validators/validateUpdateStatus";

export const multiTestUpdate = (test: any): Array<Promise<any>> => {
  const promisesArray: Array<any> = [];
  let promiseUpdateStatus: any;
  let promiseUpdateEuCategory: any;

  test.testTypes.forEach((testType: any) => {
    const updateNeeded = validateUpdateStatus(
      test.testStatus,
      testType.testResult,
      testType.testTypeId
    );

    if (updateNeeded && promiseUpdateStatus === undefined) {
      promiseUpdateStatus = UpdateTechRecordService.updateStatusBySystemNumber(
        test.systemNumber,
        test.testStatus,
        testType.testResult,
        testType.testTypeId,
        test.newStatus,
        test.createdById,
        test.createdByName
      );
      promisesArray.push(promiseUpdateStatus);
    }
    if (test.euVehicleCategory && promiseUpdateEuCategory === undefined) {
      promiseUpdateEuCategory = UpdateTechRecordService.updateEuVehicleCategory(
        test.systemNumber,
        test.euVehicleCategory,
        test.createdById,
        test.createdByName
      );
      promisesArray.push(promiseUpdateEuCategory);
    }
  });

  return promisesArray;
};

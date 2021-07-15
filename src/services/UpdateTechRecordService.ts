import { LambdaService } from "./LambdaService";
import { Configuration } from "../utils/Configuration";
import { HTTPMethods } from "../models/enum";

export class UpdateTechRecordService {
  public static updateStatusBySystemNumber(
    systemNumber: string,
    testStatus: string,
    testResult: string,
    testTypeId: number,
    newStatus: string,
    createdById: string,
    createdByName: string
  ) {
    const event = {
      path: "/vehicles/update-status/" + systemNumber,
      pathParameters: {
        systemNumber,
      },
      queryStringParameters: {
        testStatus,
        testResult,
        testTypeId,
        newStatus,
        createdById,
        createdByName,
      },
      httpMethod: HTTPMethods.PUT,
      resource: "/vehicles/update-status/{sysNum}",
    };
    console.log("payload for update status:", event);
    return LambdaService.invoke(
      Configuration.getInstance().getEndpoints().functions
        .updateTechRecordStatus.name,
      event
    );
  }

  public static updateEuVehicleCategory(
    systemNumber: string,
    euVehicleCategory: string,
    createdById: string,
    createdByName: string
  ) {
    const event = {
      path: `/vehicles/update-eu-vehicle-category/${systemNumber}`,
      pathParameters: {
        systemNumber,
      },
      queryStringParameters: {
        euVehicleCategory,
        createdById,
        createdByName,
      },
      httpMethod: HTTPMethods.PUT,
      resource: "/vehicles/update-eu-vehicle-category/:systemNumber",
    };
    console.log("payload for update euVehicleCategory: ", event);
    return LambdaService.invoke(
      Configuration.getInstance().getEndpoints().functions
        .updateEuVehicleCategory.name,
      event
    );
  }
}

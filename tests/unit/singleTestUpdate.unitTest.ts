const mockValidateUpdateStatus = jest.fn();

import { singleTestUpdate } from "../../src/functions/singleTestUpdate";
import { UpdateTechRecordService } from "../../src/services/UpdateTechRecordService";

jest.mock("../../src/validators/validateUpdateStatus.ts", () => ({
  validateUpdateStatus: mockValidateUpdateStatus,
}));

describe("test updates with only one test on payload", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should not update if validator says no update needed", () => {
    mockValidateUpdateStatus.mockReturnValueOnce(false);
    const result = singleTestUpdate({
      testStatus: "complete",
      testTypes: [{ testResult: "pass", testTypeId: "1234" }],
    });
    expect(result).toStrictEqual([]);
  });
  it("should update just the status", () => {
    mockValidateUpdateStatus.mockReturnValueOnce(true);
    UpdateTechRecordService.updateStatusBySystemNumber = jest
      .fn()
      .mockReturnValue(Promise.resolve("status update"));
    const result = singleTestUpdate({
      testStatus: "complete",
      systemNumber: "123",
      newStatus: undefined,
      createdById: "1234",
      createdByName: "user",
      testTypes: [{ testResult: "pass", testTypeId: "1234" }],
    });
    expect(result.length).toBe(1);
  });
  it("should update just the status and EU Vehicle Cat", () => {
    mockValidateUpdateStatus.mockReturnValueOnce(true);
    UpdateTechRecordService.updateStatusBySystemNumber = jest
      .fn()
      .mockReturnValue(Promise.resolve("status update"));
    UpdateTechRecordService.updateEuVehicleCategory = jest
      .fn()
      .mockReturnValue(Promise.resolve("EU value"));
    const result = singleTestUpdate({
      testStatus: "complete",
      systemNumber: "123",
      newStatus: undefined,
      createdById: "1234",
      createdByName: "user",
      euVehicleCategory: "m1",
      testTypes: [{ testResult: "pass", testTypeId: "1234" }],
    });
    expect(result.length).toBe(2);
  });
  it("should update just EU Vehicle Cat", () => {
    mockValidateUpdateStatus.mockReturnValueOnce(false);
    UpdateTechRecordService.updateStatusBySystemNumber = jest
      .fn()
      .mockReturnValue(Promise.resolve("status update"));
    UpdateTechRecordService.updateEuVehicleCategory = jest
      .fn()
      .mockReturnValue(Promise.resolve("EU value"));
    const result = singleTestUpdate({
      testStatus: "complete",
      systemNumber: "123",
      newStatus: undefined,
      createdById: "1234",
      createdByName: "user",
      euVehicleCategory: "m1",
      testTypes: [{ testResult: "pass", testTypeId: "1234" }],
    });
    expect(result.length).toBe(1);
  });
});

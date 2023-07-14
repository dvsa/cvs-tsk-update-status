const mockProcessRecord = jest.fn();

import { handler } from "../../src/handler";
import event from "../resources/queue-event.json";
import { UpdateTechRecordService } from "../../src/services/UpdateTechRecordService";

jest.mock("../../src/utils/processRecord.ts", () => ({
  processRecord: mockProcessRecord,
}));

context("When invoking the handler", () => {
  it("it should call the service with the correct parameters", async () => {
    UpdateTechRecordService.updateStatusBySystemNumber = jest
      .fn()
      .mockReturnValue(Promise.resolve("test value"));
    UpdateTechRecordService.updateEuVehicleCategory = jest
      .fn()
      .mockReturnValue(Promise.resolve("test value"));
    mockProcessRecord.mockReturnValue(JSON.parse(event.Records[0].body));
    const resp = await handler(event as any);
    expect(
      UpdateTechRecordService.updateStatusBySystemNumber
    ).toHaveBeenCalledWith(
      "11000027",
      "submitted",
      "pass",
      "95",
      undefined,
      "1234",
      "Test User"
    );
    expect(
      UpdateTechRecordService.updateEuVehicleCategory
    ).toHaveBeenCalledWith("11000027", "m1", "1234", "Test User");
  });
});

import { handler } from "../../src/handler";
import event from "../resources/queue-event.json";
import { UpdateTechRecordService } from "../../src/services/UpdateTechRecordService";

context("When invoking the handler", () => {
  it("it should call the service with the correct parameters", async () => {
    UpdateTechRecordService.updateStatusBySystemNumber = jest
      .fn()
      .mockReturnValue(Promise.resolve("test value"));
    UpdateTechRecordService.updateEuVehicleCategory = jest
      .fn()
      .mockReturnValue(Promise.resolve("test value"));
    const resp = await handler(event as any);
    expect(
      UpdateTechRecordService.updateStatusBySystemNumber
    ).toHaveBeenCalledWith(
      "abc123",
      "submitted",
      "fail",
      "1",
      undefined,
      "1234",
      "dorel"
    );
    expect(
      UpdateTechRecordService.updateEuVehicleCategory
    ).toHaveBeenCalledWith("abc123", "m1", "1234", "dorel");
  });
});

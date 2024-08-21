const mockProcessRecord = jest.fn();

import { updateTechRecord } from "../../src/functions/updateTechRecord";
import event from "../resources/queue-event.json";
import oneTestEvent from "../resources/queue-event-one-test.json";
import { LambdaService } from "../../src/services/LambdaService";

jest.mock("../../src/utils/processRecord.ts", () => ({
  processRecord: mockProcessRecord,
}));

context("when a failing test result is read from the queue", () => {
  context("and the event is empty", () => {
    it("should throw an error", async () => {
      expect.assertions(1);
      try {
        await updateTechRecord({} as any);
      } catch (err) {
        expect(err.message).toEqual("Event is empty");
      }
    });
  });

  context("and the event has no records", () => {
    it("should throw an error", async () => {
      expect.assertions(1);
      try {
        await updateTechRecord({ otherStuff: "hi", Records: [] } as any);
      } catch (err) {
        expect(err.message).toEqual("Event is empty");
      }
    });
  });
});

context("when invoking the function with a correct event", () => {
  it("should correctly process the record with one tests", async () => {
    LambdaService.invoke = jest
      .fn()
      .mockReturnValue(Promise.resolve("test value"));
    mockProcessRecord.mockReturnValue(JSON.parse(oneTestEvent.Records[0].body));
    expect.assertions(2);
    const resp = await updateTechRecord(oneTestEvent as any);
    expect(resp).toEqual(["test value"]);
    expect(LambdaService.invoke).toHaveBeenCalledTimes(1);
  });

  it("should correctly process the record with two tests", async () => {
    LambdaService.invoke = jest
      .fn()
      .mockReturnValue(Promise.resolve("test value"));
    mockProcessRecord.mockReturnValue(JSON.parse(event.Records[0].body));
    expect.assertions(2);
    const resp = await updateTechRecord(event as any);
    expect(resp).toEqual(["test value", "test value"]);
    expect(LambdaService.invoke).toHaveBeenCalledTimes(2);
  });

  it("should show an error if the lambda call is not successful", async () => {
    LambdaService.invoke = jest
      .fn()
      .mockReturnValue(Promise.reject("error value"));
    mockProcessRecord.mockReturnValue(JSON.parse(event.Records[0].body));
    await expect(updateTechRecord(event as any)).rejects.toEqual("error value");
  });
});

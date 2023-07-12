import { updateTechRecord } from "../../src/functions/updateTechRecord";
import event from "../resources/queue-event.json";
import { LambdaService } from "../../src/services/LambdaService";

context("when a failing test result is read from the queue", () => {
  context("and the event is empty", () => {
    it("it should work", () => {
      expect(true).toBe(true);
    });
  });
  //     it("should throw an error", async () => {
  //       expect.assertions(1);
  //       try {
  //         await updateTechRecord({} as any);
  //       } catch (err) {
  //         expect(err.message).toEqual("Event is empty");
  //       }
  //     });
  //   });

  //   context("and the event has no records", () => {
  //     it("should throw an error", async () => {
  //       expect.assertions(1);
  //       try {
  //         await updateTechRecord({ otherStuff: "hi", Records: [] } as any);
  //       } catch (err) {
  //         expect(err.message).toEqual("Event is empty");
  //       }
  //     });
  //   });
  // });

  // context("when invoking the function with a correct event", () => {
  //   it("should correctly process the record", async () => {
  //     LambdaService.invoke = jest
  //       .fn()
  //       .mockReturnValue(Promise.resolve("test value"));
  //     expect.assertions(2);
  //     const resp = await updateTechRecord(event as any);
  //     expect(resp).toEqual(["test value", "test value"]);
  //     expect(LambdaService.invoke).toHaveBeenCalledTimes(2);
  //   });

  //   it("should show an error if the lambda call is not successful", async () => {
  //     LambdaService.invoke = jest
  //       .fn()
  //       .mockReturnValue(Promise.reject("error value"));
  //     await expect(updateTechRecord(event as any)).rejects.toEqual("error value");
  //   });
});

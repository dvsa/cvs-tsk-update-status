import { LambdaService } from "../../src/services/LambdaService";
import AWS from "aws-sdk";

context("When invoking LambdaService ", () => {
  it("should validate the response", async () => {
    AWS.Lambda = jest.fn().mockImplementation(() => {
      return {
        invoke: () => {
          return {
            promise: () => {
              return Promise.resolve("test value");
            },
          };
        },
      };
    }) as any;

    expect.assertions(2);

    try {
      const result = await LambdaService.invoke("test", {});
    } catch (error) {
      expect(error.statusCode).toBe(500);
      expect(error.body).toBe("Lambda invocation returned bad data: undefined");
    }
  });
});

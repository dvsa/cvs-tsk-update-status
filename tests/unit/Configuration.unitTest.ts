import { Configuration } from "../../src/utils/Configuration";

describe("The configuration service", () => {
  context("with good config file", () => {
    it("should return remote versions of the config by default", () => {
      process.env.BRANCH = "CVSB-XXX";
      const configService = Configuration.getInstance();
      const endpoints = configService.getEndpoints();
      expect(endpoints.functions.updateTechRecordStatus.name).toEqual(
        "technical-records-CVSB-XXX"
      );
    });

    it("should return local versions of the config if branch is set to local-global", () => {
      process.env.BRANCH = "local-global";
      const configService = Configuration.getInstance();
      const endpoints = configService.getEndpoints();
      expect(endpoints.functions.updateTechRecordStatus.name).toEqual(
        "cvs-svc-global-dev-updateTechRecordStatus"
      );
    });
  });
});

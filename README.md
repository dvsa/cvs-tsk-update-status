# cvs-tsk-update-status

### Prerequisites

- NodeJS 8.10
- Typescript - `npm install -g typescript`
- Serverless - `npm install -g serverless`

### Installing

- Install dependencies - `npm install`

### Building

- Building the docker image - `npm run build:docker`
- Building with source maps - `npm run build:dev`
- Building without source maps - `npm run build`

### Running

- The app can be started by running `npm run start`

### Configuration

The configuration file can be found under `src/config/config.yml`.
Environment variable injection is possible with the syntax:
`${BRANCH}`, or you can specify a default value: `${BRANCH:local}`.

#### Security

Please install and run the following securiy programs as part of your testing process:

https://github.com/awslabs/git-secrets

- After installing, do a one-time set up with `git secrets --register-aws`. Run with `git secrets --scan`.

https://github.com/UKHomeOffice/repo-security-scanner

- After installing, run with `git log -p | scanrepo`.

These will be run as part of prepush so please make sure you set up the git hook above so you don't accidentally introduce any new security vulnerabilities.

### Testing

In order to test, you need to run the following:

- `npm run test` for unit tests

### Environmental variables

- The `BRANCH` environment variable indicates in which environment is this application running. Not setting this variable will result in defaulting to `local`.

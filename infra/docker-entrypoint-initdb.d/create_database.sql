CREATE DATABASE taskger;

CREATE USER "taskger.dev";

ALTER USER "taskger.dev" WITH password '_TaskgerDev1';

GRANT ALL PRIVILEGES ON DATABASE taskger TO "taskger.dev";

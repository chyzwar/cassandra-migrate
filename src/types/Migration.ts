import Run from "./Run";

interface Migration {
  filename: string;
  up: Run;
  down: Run;
  content: string;
  timestamp?: number;
  version?: number;
}

export default Migration;

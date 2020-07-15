
interface Migration {
  filename: string;
  content: string
  timestamp: number;
  version: string;
}

export default Migration;

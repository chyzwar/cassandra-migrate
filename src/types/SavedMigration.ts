
interface PersistedMigration {
  filename: string;
  content: string
  timestamp: number;
  version: number;
}

export default PersistedMigration;

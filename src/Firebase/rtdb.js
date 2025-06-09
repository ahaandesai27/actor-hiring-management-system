import { getDatabase } from "firebase/database";
import app from './index';

const db = getDatabase(app);
export default db;


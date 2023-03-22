import path from "path";
import url from 'url';

const __srcpath = path.resolve(path.join(url.fileURLToPath(new URL('.', import.meta.url)), ".."));

export default __srcpath;
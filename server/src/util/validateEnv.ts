
import { cleanEnv, port, str } from "envalid";


export default cleanEnv(process.env, {
    Mongo: str(),
    Port: port()
})
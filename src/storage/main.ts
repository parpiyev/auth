import { OTPStorage } from './mongo/otp'
import { UserStorage } from "./mongo/user"

interface IStorage {
    otp: OTPStorage
    user: UserStorage
}

export let storage: IStorage = {
    otp: new OTPStorage(),
    user: new UserStorage(),
}

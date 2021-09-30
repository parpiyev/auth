import { OTPStorage } from './mongo/otp'
import { UserStorage } from "./mongo/user"
import { SampleStorage } from "./mongo/sample"

interface IStorage {
    otp: OTPStorage
    user: UserStorage
    sample: SampleStorage
}

export let storage: IStorage = {
    otp: new OTPStorage(),
    user: new UserStorage(),
    sample: new SampleStorage(),
}

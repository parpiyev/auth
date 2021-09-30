import { OTPRepo } from '../repo/otp'
import OTP, { IOTP } from '../../models/OTP'
import { logger } from '../../config/logger'

export class OTPStorage implements OTPRepo {
    private scope = 'storage.otp'

    async create(payload: IOTP): Promise<IOTP> {
        try {
            const otp = await OTP.create(payload)

            return otp
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IOTP> {
        try {
            const otps: any = await OTP.findOne(query)

            return otps
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }
}

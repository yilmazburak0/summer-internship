import mongoose from 'mongoose';
import { VehicleType, VehicleStatus } from 'enums/vehicle';

const { ObjectId } = mongoose.Schema.Types;


const VehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: Object.keys(VehicleType).map((el) => VehicleType[el]),
        required: true
    },
    plate: {
        type: String,
    },
    volume: {
        type: Number,
    },
    weightCapacity: {
        type: Number,
    },
    status: {
        type: String,
        enum: Object.keys(VehicleStatus).map((el) => VehicleStatus[el]),
        default: 'active',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    creatorUser: {
        type: ObjectId,
        ref: 'User',
    },
    modifiedAt: {
        type: Date,
        default: Date.now,
    },
    modifierUser: {
        type: ObjectId,
        ref: 'User',
    }
});
const Vehicle = mongoose.model("Vehicle",VehicleSchema);
export default Vehicle;

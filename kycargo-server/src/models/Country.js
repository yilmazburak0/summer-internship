import mongoose from 'mongoose';
import ShortId from 'shortid';

const { ObjectId } = mongoose.Schema.Types;

const CountrySchema = new mongoose.Schema({
  countryId: {
    type: Number
  },
  name: {
    type: String
  },
  iso3: {
    type: String
  },
  iso2: {
    type: String
  },
  numeric_code: {
    type: String
  },
  phone_code: {
    type: String
  },
  capital: {
    type: String
  },
  currency: {
    type: String
  },
  currency_name: {
    type: String
  },
  currency_symbol: {
    type: String
  },
  tld: {
    type: String
  },
  native: {
    type: String
  },
  region: {
    type: String
  },
  subregion: {
    type: String
  },
  timezones: [
    {
      zoneName: String,
      gmtOffset: Number,
      gmtOffsetName: String,
      abbreviation: String,
      tzName: String
    }
  ],
  translations: {
    type: Object
  },
  latitude: {
    type: String
  },
  longitude: {
    type: String
  },
  emoji: {
    type: String
  },
  emojiU: {
    type: String
  },
  states: [Object
    /*{
      id: Number,
      name: String,
      state_code: String,
      latitude: String,
      longitude: String,
      type: String,
      cities: [
        {
          id: Number,
          name: String,
          latitude: Number,
          longitude: Number
        }
      ]
    }*/
  ],
  euMember: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creatorUser: {
    type: ObjectId,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
  modifierUser: {
    type: ObjectId,
  },
});

export default CountrySchema;

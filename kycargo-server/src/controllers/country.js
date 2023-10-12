import Country from 'models/Country';
import { search } from 'helpers/filterParser';
import ErrorResponse from 'helpers/errorResponse';
import errors from 'enums/errors';
import countrystatescities from '../../public/countrystatescities.json'
import fs from 'fs'
import { registerModel } from 'middleware/databaseAdapter';
const searchTextFields = ['name', 'code2', 'code3', 'numericCode'];
const adminFields = [];
const defaultProjection = ['shortId', 'name', 'code2', 'code3', 'numericCode', 'createdAt', 'modifiedAt', ...adminFields];


export const getCountry = async (req, res, next) => {

  const { id } = req.params;
  const country = await Country.findById({ _id: id }).lean();
  res.send(country);
};
export const getEUCountries = async (req, res, next) => {
  const Country = registerModel(req.dbName, 'Country')
  const foundCountries = await Country.find({ euMember: true }, ['name', 'iso2', 'states'])

  res.send(foundCountries);
};
export const searchCountry = async (req, res) => {
  const filter = req.body.filter || {};

  res.send(await search(req.user, Country, searchTextFields, filter, defaultProjection, adminFields));
};

export const initCountry = async (req, res) => {
  /*  console.log('country yükeleme');
   let x = 0;
 
   for (x = 0; x < countrystatescities.length; x++) {
    
     const newCountry = new Country(countrystatescities[x]);
     let result = await newCountry.save();
     console.log('result', result);
   }
   //fs.writeFileSync("data.json", JSON.stringify(countrystatescities))
   res.send('OK'); */
};

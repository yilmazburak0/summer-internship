import Log from 'models/Log';

/**
 *
 * @param { any } mongoose.Model
 * @param { any } reqUser
 * @param { any } data
 * @returns
 */
export const insertDocument = async (Model, reqUser, data) => {
  data.creatorUser = reqUser?._id;
  data.modifierUser = reqUser?._id;

  // data.volume = ((data.width || 0) * (data.length || 0) * (data.height || 0)) / (1000 * 1000 * 1000);

  const result = await Model.create(data);
  await Log.create({
    logId: result._id,
    tableName: Model.collection.collectionName,
    type: 'C',
    oldData: null,
    newData: result,
    creatorUser: reqUser?._id,
  });
  return result;
};

export const updateDocumentById = async (Model, reqUser, _id, data) => {
  data.creatorUser = reqUser?._id;
  data.modifierUser = reqUser?._id;
  data.modifiedAt = Date.now();
  // data.volume = ((data.width || 0) * (data.length || 0) * (data.height || 0)) / (1000 * 1000 * 1000);

  const oldResult = await Model.findById(_id).lean();
  const result = await Model.findByIdAndUpdate(_id, data, { new: true }).lean();
  await Log.create({
    logId: result._id,
    tableName: Model.collection.collectionName,
    type: 'U',
    oldData: oldResult,
    newData: result,
    creatorUser: reqUser?._id,
  });

  return result;
};

export const updateDocumentOne = async (Model, reqUser, where, data) => {
  data.creatorUser = reqUser?._id;
  data.modifierUser = reqUser?._id;
  data.modifiedAt = Date.now();

  //   data.volume = ((data.width || 0) * (data.length || 0) * (data.height || 0)) / (1000 * 1000 * 1000);

  const oldResult = await Model.findOne(where).lean();
  const result = await Model.findOneAndUpdate(where, data, { new: true }).lean();
  await Log.create({
    logId: result._id,
    tableName: Model.collection.collectionName,
    type: 'U',
    oldData: oldResult,
    newData: result,
    creatorUser: reqUser?._id,
  });

  return result;
};

export const deleteDocumentById = async (Model, reqUser, _id) => {
  const oldResult = await Model.findById(_id).lean();
  const result = await Model.findByIdAndDelete({ _id: _id }).lean();
  await Log.create({
    logId: result._id,
    tableName: Model.collection.collectionName,
    type: 'D',
    oldData: oldResult,
    newData: result,
    creatorUser: reqUser?._id,
  });

  return result;
};

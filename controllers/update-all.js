
const updateAll = async (mongoClient, databaseName, requestBody) => {

  try {

    const { collectionName, selectorObj, updateData } = requestBody;

    await mongoClient.connect();
    const database = mongoClient.db(databaseName);
    const collection = database.collection(collectionName);

    const data = await collection.updateMany(selectorObj, { $set: updateData });
    
    return {
      fail: false,
      data
    };

  } catch (error) {

    return {
      fail: true,
      data: error
    };
    
  } finally {

    await mongoClient.close();

  }

};

module.exports = updateAll;

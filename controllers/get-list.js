
const getList = async (mongoClient, databaseName, requestBody) => {

  try {

    const { collectionName, selectorObj, modifierObj } = requestBody;

    await mongoClient.connect();
    const database = mongoClient.db(databaseName);
    const collection = database.collection(collectionName);

    const data = await collection.find(selectorObj, modifierObj).toArray();

    return {
      data
    };

  } catch (error) {

    return {
      error
    };
    
  } finally {

    await mongoClient.close();

  }

};

module.exports = getList;

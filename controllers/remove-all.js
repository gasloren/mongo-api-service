
const removeAll = async (mongoClient, databaseName, requestBody) => {

  try {

    const { collectionName, selectorObj } = requestBody;

    await mongoClient.connect();
    const database = mongoClient.db(databaseName);
    const collection = database.collection(collectionName);

    const data = await collection.deleteMany(selectorObj);
    
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

module.exports = removeAll;

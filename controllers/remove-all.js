
const removeAll = async (mongoClient, databaseName, requestBody) => {

  try {

    const { collectionName, selectorObj } = requestBody;

    await mongoClient.connect();
    const database = mongoClient.db(databaseName);
    const collection = database.collection(collectionName);

    const data = await collection.deleteMany(selectorObj);
    
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

module.exports = removeAll;

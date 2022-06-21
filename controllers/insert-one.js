
const insertOne = async (mongoClient, databaseName, requestBody) => {

  try {

    const { collectionName, insertData } = requestBody;

    await mongoClient.connect();
    const database = mongoClient.db(databaseName);
    const collection = database.collection(collectionName);

    const data = await collection.insertOne({ ...insertData });
    
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

module.exports = insertOne;

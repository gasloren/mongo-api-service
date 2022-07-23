const { server } = require('../main');
const postData = require('./postData');

const collection = 'registros';

// -------------------------------------------------------

describe('all tests', () => {

  let newId = null;

  beforeAll(async () => {
    const params = {
      collection,
      filters: {}
    };
    // remove al data from collection
    await postData('/remove/all', params);
  })

  afterAll(() => {
    server.closeListener();
  })

  test('Test Insert One - Registro', async () => {

    const params = {
      collection,
      document: {
        type: 'TEST',
        email: 'test1@gmail.com'
      }
    };

    const { data, error } = await postData('/insert/one', params);

    expect(error).toBeUndefined();

    console.log(data);

    const { acknowledged, insertedId } = data;
    newId = insertedId;

    expect(acknowledged).toBeTruthy();
    expect(typeof(insertedId)).toBe('string');

  })


  test('Test Empty Collection', async () => {

    const params = {
      collection,
      filters: {
        type: 'TEST'
      },
      options: {}
    };

    const { data, error } = await postData('/get/list', params);

    expect(error).toBeUndefined();
    expect(data.length).toStrictEqual(1);
    expect(data[0]._id).toStrictEqual(newId);

  })




})



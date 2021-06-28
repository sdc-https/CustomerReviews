import 'babel-polyfill';
import axios from 'axios';

beforeAll(async() => {
  jest.setTimeout(100000);
})

describe('GET Route Testing', () => {

  it('GET Request Working', async () => {
    await axios.get('http://localhost:3004/reviews/5')
      .then((response) => {
        expect(response.status).toBe(200);
      })
      .catch((err) => {
        console.log('Error in GET TEST', err)
      })
  });
});

describe('POST Route Testing', () => {

    it('POST Request Working', async () => {
    await axios.post('http://localhost:3004/reviews', {
      productId: 101
     })
      .then((response) => {
        expect(response.status).toBe(200);
      })
      .catch((err) => {
        console.log('Error in POST TEST', err)
      })
  });
});

describe('PUT Route Testing', () => {

  it ('PUT Request Working', async () => {
     await axios.put('http://localhost:3004/reviews/5', {
      reviewBody: 'New Review!'
    })
    .then((response) => {
      expect(response.status).toBe(200);
    })
    .catch((err) => {
      console.log('Error in PUT TEST', err)
    })
  });
});

describe('DELETE Route Testing', () => {

  it ('DELETE Request Working', async () => {
    await axios.delete('http://localhost:3004/reviews/97')
    .then((response) => {
      expect(response.status).toBe(200);
    })
    .catch((err) => {
      console.log('Error in DELETE TEST', err)
    })
  });
});
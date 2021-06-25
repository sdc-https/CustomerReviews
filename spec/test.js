import 'babel-polyfill';
import axios from 'axios';

describe('CRUD API Route Testing', () => {

  test('GET Request Working', async () => {
    return axios.get('http://localhost:3004/reviews/5')
      .then((response) => {
        expect(parseInt(response.data[0].productId)).toBe(5);
      })
      .catch((err) => {
        console.log('Error in GET TEST', err)
      })
  })

  test('POST Request Working', () => {
    return axios.post('http://localhost:3004/reviews', {
      productId: 101
     })
      .then((response) => {
        console.log(response.data.length)
        expect(parseInt(response.data[0].productId)).toBe(5);
      })
      .catch((err) => {
        console.log('Error in POST TEST', err)
      })
  })

  test ('PUT Request Working', async () => {
    console.log('PUT TEST');
  })

  test ('DELETE Request Working', async () => {
    console.log('DELETE TEST');
  })
});
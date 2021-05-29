import React from 'react';
import { render } from '@testing-library/react';
import Reviews from './Reviews.jsx'

const reviews = [
  {
  _id: "609b4b3a25d763486833bf7c",
  productId: "1",
  userName: "Daryl.Kutch78",
  rating: 0,
  title: "soluta et explicabo",
  location: "Eritrea",
  reviewDate: "2020-10-03T17:10:18.197Z",
  reviewBody: "Hic autem non qui aut molestias. Dolore iure eum voluptatem sed numquam perferendis. Minus blanditiis autem excepturi veritatis. Occaecati aut dolorum. Vero possimus excepturi eum optio. Quis numquam qui natus autem cumque vitae excepturi.",
  helpfulCount: 1987,
  abuseReported: true,
  __v: 0
  }]

test("renders the reviews component to the dom", () => {
  const { getByTestId, getByText } = render(<Reviews reviews = {reviews}/>);
  expect(getByTestId("helpful-button")).toBeTruthy()
  expect(getByText('Reviewed', {exact: false})).toBeInTheDocument
})
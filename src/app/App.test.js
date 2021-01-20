import React from 'react';
import { render, unmountComponentAtNode } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import App from './App';
import renderer from 'react-test-renderer';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with or without a name", () => {
  act(() => {
    renderer.create(<App />, container);
  });
  expect(container.textContent).toBe("Hey, stranger"); 
})


// test('total cases does render', () => {
//   const { map } = render(<App />);
//   console.log(map.this.state)
//   expect(map.this.state.total).toBe(0)
// });

import React from 'react';
import ReactDOM from 'react-dom';
import WelcomeScreen from '../index';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import renderer from 'react-test-renderer';

afterEach(cleanup);

it("renders without crashing", () =>{
    const div = document.createElement("div");
    ReactDOM.render(<WelcomeScreen></WelcomeScreen>, div)
})

it("renders box correctly", () =>{
    const {getByTestId} = render(<WelcomeScreen></WelcomeScreen>)
    expect(getByTestId('welcomeUser')).toHaveTextContent("Hello friend, tell me your name...")
})

it("matches snapshot", () =>{
   const tree = renderer.create(<WelcomeScreen></WelcomeScreen>).toJSON();
   expect(tree).toMatchSnapshot();
})
import React from 'react';
import ReactDOM from 'react-dom';
import GameScreen from '../index';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import renderer from 'react-test-renderer';

afterEach(cleanup);

it("matches snapshot", () =>{
   const tree = renderer.create(<GameScreen></GameScreen>).toJSON();
   expect(tree).toMatchSnapshot();
})
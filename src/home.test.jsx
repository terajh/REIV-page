import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {getHost} from './lib/host' // frontend host 함수
var bgetHost = require('../../back_end/lib/host'); // backend host 함수


configure({ adapter: new Adapter() });

describe('host test', () => {
  it(`backend 의 host와 frontend 의 호스트가 동일해야 합니다.
      Front Host : ${getHost()}
      Back Host  : ${bgetHost()}`, () => {
    expect(getHost()).toBe(bgetHost());
  });
});
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

describe('TextField 엘리먼트 테스트', () => {
  it('className prop 으로 설정한 css class 가 적용된다', async () => {
    await render(<TextField className="my-class" />);
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    screen.debug();

    expect(textInput).toHaveClass('my-class');
  });

  describe('placeholder 테스트', () => {
    it('기본 placeholder "텍스트를 입력해 주세요."가 노출된다.', async () => {
      await render(<TextField className="my-class" />);
      const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

      expect(textInput).toBeInTheDocument();
    });

    it('placeholder prop 에 따라 placeholder 가 변경된다.', async () => {
      await render(
        <TextField
          className="my-class"
          placeholder={'상품명을 입력해 주세요.'}
        />,
      );
      const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

      expect(textInput).toBeInTheDocument();
    });
  });
});

it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn(); // 스파이 함수

  const { user } = await render(<TextField onChange={spy} />);
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  // test 라는 글자를 입력한다.
  await user.type(textInput, 'test');

  // test 가 호출된다. -> 스파이 함수를 통해 알 수 있음
  expect(spy).toHaveBeenCalled('test');
});

it('엔터키를 입력하면 onEnter prop 으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn();

  const { user } = await render(<TextField onEnter={spy} />);
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  // test 라는 글자를 입력한다.
  await user.type(textInput, 'test{Enter}');

  // test 가 호출된다. -> 스파이 함수를 통해 알 수 있음
  expect(spy).toHaveBeenCalled('test');
});

it('focus 가 활성화되면 onFocus prop 으로 등록한 함수를 호출한다.', async () => {
  const spy = vi.fn();
  // 포커스 활성화 방법
  //   탭키로 인풋 요소로 이동
  //   인풋 요소를 클릭 (가장 보편적)
  //   textInput.focus() API 를 직접 호출

  await render(<TextField onFocus={spy} />);
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await userEvent.click(textInput);

  expect(spy).toHaveBeenCalled();
});

it('focus 가 활성화되면 border 스타일을 변경한다.', async () => {
  await render(<TextField />);
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await userEvent.click(textInput);

  expect(textInput).toHaveStyle({
    borderWidth: 2,
    borderColor: 'rgb(25, 118, 210)',
  });
});

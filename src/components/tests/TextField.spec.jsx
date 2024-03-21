import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

// 매번 my-class 란 class 가 적용된 컴포넌트를 렌더링
beforeEach(async () => {
  await render(<TextField className="my-class" />);
});

describe('TextField 엘리먼트 테스트', () => {
  it('className prop 으로 설정한 css class 가 적용된다', async () => {
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    screen.debug();

    expect(textInput).toHaveClass('my-class');
  });

  describe('placeholder 테스트', () => {
    it('기본 placeholder "텍스트를 입력해 주세요."가 노출된다.', async () => {
      const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

      expect(textInput).toBeInTheDocument();
    });

    it('placeholder prop 에 따라 placeholder 가 변경된다.', async () => {
      const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

      expect(textInput).toBeInTheDocument();
    });
  });
});

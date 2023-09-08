import { Close } from '@/styles/icons/Icons32';
import Google from '@/styles/svg/Google';
import Kakao from '@/styles/svg/Kakao';
import Logo from '@/styles/svg/Logo';
import React from 'react';

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center absolute top-0 left-0 w-full h-screen bg-[#44444444]">
      <div className="flex justify-center items-center w-full sm:w-1/2 h-max-[600px] xl:w-[35%]">
        <form
          className=" bg-white rounded-2xl py-[50px] border border-[#ccc] w-full h-full relative flex flex-col items-center justify-center"
          action=""
          style={{ maxWidth: '600px' }}
        >
          <Close width={24} height={24} className="absolute top-3 right-3" />
          <Logo className="mb-6 lg:hidden" />
          <Logo className="hidden mb-6 lg:block" width={250} height={100} />
          <h1 className="text-neutral-800 text-lg font-bold mb-4 lg:text-2xl ">로그인</h1>
          <div className="w-full flex flex-col items-center gap-4 mb-4">
            <div className="w-[80%] max-w-[350px] flex flex-col gap-2">
              <label htmlFor="email" className="text-neutral-800 font-semibold">
                이메일
              </label>
              <input
                name="email"
                className="px-5 py-2 bg-white rounded-xl border border-zinc-300"
                type="email"
                required
              />
            </div>
            <div className="w-[80%] max-w-[350px] flex flex-col gap-2">
              <label htmlFor="email" className="text-neutral-800 font-semibold">
                비밀번호
              </label>
              <input
                name="email"
                className="px-5 py-2 bg-white rounded-xl border border-zinc-300"
                type="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                required
              />
            </div>
          </div>

          <div className="w-[80%] max-w-[350px] flex justify-end text-sm gap-2 mb-4">
            <input type="checkbox" name="save-id" id="save-id" />
            <label htmlFor="save-id">이메일 저장 </label>
          </div>

          <div className="flex gap-3 mb-5">
            <button className="px-3 py-0.5 text-neutral-800 border border-[#4b4e5b] rounded-lg" type="button">
              취소
            </button>
            <button
              className="px-3 py-1 border border-[#4b4e5b] rounded-lg disabled:bg-[#d0d2d8] disabled:border-[#dbdde1] text-white bg-GreyScaleBlack"
              type="submit"
            >
              로그인
            </button>
          </div>
          <div className="w-[80%] max-w-[350px] flex gap-2 justify-center items-center mb-5">
            <div className="w-[25%] h-px bg-gray-200"></div>
            <span className="px-3 text-neutral-800 text-sm">간편 로그인</span>
            <div className="w-[25%] h-px bg-gray-200"></div>
          </div>
          <div className="flex w-[80%] max-w-[350px] justify-center items-center gap-4">
            <Kakao />
            <Google />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;

'use client';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Close } from '@/styles/icons/Icons32';
import Google from '@/styles/svg/Google';
import Kakao from '@/styles/svg/Kakao';
import Logo from '@/styles/svg/Logo';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { message } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

interface Data {
  error: boolean;
  message: string;
}

const NewSignnIn = () => {
  const router = useRouter();
  const path = usePathname();

  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [captchaToken, setCaptchaToken] = useState<any>();
  const saveEmailCheckboxRef = useRef<HTMLInputElement>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const captchaRef = useRef<any>(null);

  const [shouldDisable, setShouldDisable] = useState<boolean>(true);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [showPasswordFormatError, setShowPasswordFormatError] = useState<boolean>(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('saved_email');
    if (savedEmail) {
      saveEmailCheckboxRef.current!.checked = true;
      setEmailValue(savedEmail);
    }
  }, []);

  useEffect(() => {
    if (passwordValue.length < 6) {
      setShouldDisable(true);
    }
    if (emailValue.length > 6 && passwordValue.length > 6) {
      setShouldDisable(false);
    }
  }, [emailValue, passwordValue]);

  useEffect(() => {
    const signInHandler = async () => {
      const formData = new FormData();
      formData.append('email', emailValue);
      formData.append('password', passwordValue);
      formData.append('captchaToken', captchaToken);

      const res = await fetch('/auth/sign-in', { method: 'post', body: formData });

      const { error, message } = (await res.json()) as Data;

      if (error) {
        if (message.includes('captcha 오류')) {
          messageApi.open({
            type: 'error',
            content: 'captcha오류입니다. 다시 시도해주세요.'
          });
          // setMessage('captcha오류입니다. 다시 시도해주세요.');
        }
        if (message.includes('틀립니다')) {
          messageApi.open({
            type: 'error',
            content: '이메일이나 비밀번호가 틀립니다.'
          });
        }
        if (message.includes('에러가')) {
          messageApi.open({
            type: 'error',
            content: '에러가 발생했습니다. 다시 시도해주세요.'
          });
        }
      } else {
        if (saveEmailCheckboxRef.current!.checked) {
          localStorage.setItem('saved_email', emailValue);
        }
        router.refresh();
        router.replace(path);
        messageApi.open({
          type: 'success',
          content: '로그인 완료!'
        });
      }
    };
    if (captchaToken) {
      signInHandler();
    }
  }, [captchaToken]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPasswordValue(newPassword);

    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(newPassword)) {
      setPasswordError('비밀번호는 최소 8자 이상이어야 하며, 최소 하나의 대문자, 소문자, 숫자가 포함되어야 합니다.');
    } else {
      setPasswordError(null);
    }
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await captchaRef.current.execute();
  };

  return (
    <>
      {contextHolder}
      {isClicked && <LoadingSpinner />}
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            router.push(path);
          }
        }}
        className="z-50 flex justify-center items-center absolute top-0 left-0 w-full h-screen bg-[#44444444]"
      >
        <div className="flex justify-center items-center w-full sm:w-1/2 h-max-[600px] xl:w-[35%]">
          <form
            onSubmit={onSubmitHandler}
            className=" bg-white rounded-2xl py-[50px] border border-[#ccc] w-full h-full relative flex flex-col items-center justify-center"
            style={{ maxWidth: '600px' }}
          >
            <HCaptcha
              ref={captchaRef}
              sitekey="6c9d3095-7348-4fe3-bf72-1f2b2b7ef34d"
              size="invisible"
              onVerify={(token) => setCaptchaToken(token)}
              onError={() => captchaRef.current.reset()}
              onExpire={() => captchaRef.current.reset()}
            />
            <Close
              onClick={() => router.push(path)}
              width={24}
              height={24}
              className="absolute top-3 right-3 cursor-pointer"
            />
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
                  placeholder="이메일 주소"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
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
                  placeholder="비밀번호"
                  value={passwordValue}
                  onChange={(e) => handlePasswordChange(e)}
                  required
                />
              </div>
            </div>

            <div className="w-[80%] max-w-[350px] flex justify-between text-sm gap-2 mb-4">
              <button
                type="button"
                onClick={() => router.replace('?sign-in=true&forgot-password=true')}
                className="text-sm"
              >
                비밀번호 찾기
              </button>
              <div className="flex gap-1 items-center">
                <input ref={saveEmailCheckboxRef} type="checkbox" name="save-id" id="save-id" />
                <label htmlFor="save-id">이메일 저장 </label>
              </div>
            </div>

            <div className="flex gap-3 mb-5">
              <button
                className="px-3 py-0.5 text-neutral-800 border border-[#4b4e5b] rounded-lg"
                type="button"
                onClick={() => router.push(path)}
              >
                취소
              </button>
              <button
                className="px-3 py-1 border border-[#4b4e5b] rounded-lg disabled:bg-[#d0d2d8] disabled:border-[#dbdde1] text-white bg-GreyScaleBlack"
                type="submit"
                disabled={shouldDisable}
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
    </>
  );
};

export default NewSignnIn;

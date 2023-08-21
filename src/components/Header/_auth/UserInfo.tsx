'use client';
import useUserInfoStore, { SavedUserInfo } from '@/app/(store)/saveCurrentUserData';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';

interface Props {
  session: Session;
}

const UserInfo = ({ session }: Props) => {
  const signedInUser = session.user;
  const supabase = createClientComponentClient();
  const { userInfo, saveUserInfo } = useUserInfoStore();
  const [isUserHasUsername, setIsUserHasUsername] = useState<boolean>(true);

  useEffect(() => {
    const getUserInfo = async () => {
      const { error, data } = await supabase.from('users').select().eq('id', signedInUser.id);
      if (error) {
        console.log('getUserInfo함수 에러 발생, components/Header/_auth/Userinfo.tsx 확인 요망');
        return;
      }
      saveUserInfo(data[0]); // zustand store에 유저 정보 저장
    };
    getUserInfo();
  }, [signedInUser.id, supabase, saveUserInfo]);

  useEffect(() => {
    const getUsername = async () => {
      const { data } = await supabase.from('users').select('username').eq('id', signedInUser.id);
      if (data && !data[0].username) {
        setIsUserHasUsername(false);
      }
    };
    getUsername();
  }, [signedInUser.id, supabase]);

  // ! 해당 컴포넌트는 구글 회원가입할 때 username을 받지 못하기 때문에, 로그인했을 때 username이 없으면 추가하는 로직입니다.
  const RequestUsername = () => {
    const [usernameValue, setUsernameValue] = useState<string>('');

    const clickHandler = async () => {
      const { error, data } = await supabase
        .from('users')
        .update({ username: usernameValue })
        .eq('id', signedInUser.id)
        .select();
      setIsUserHasUsername(true);
      if (error) {
        alert('에러가 발생했습니다. 잠시 후에 다시 시도해주세요.');
      }
      alert('업데이트 완료!');
    };

    return (
      <>
        {!isUserHasUsername && (
          <div className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] shadow-md shadow-slate-400 p-5 rounded-md flex flex-col gap-2 items-center">
            <h1>{signedInUser.user_metadata.name}님, 환영합니다!</h1>
            {
              <div>
                <h2 className="mb-3 text-center">유저이름을 생성해주세요.</h2>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="username"
                    required
                    maxLength={15}
                    value={usernameValue}
                    onChange={(e) => setUsernameValue(e.target.value)}
                    className="text-center border border-slate-400 rounded-sm"
                  />
                  <button className="text-center bg-slate-400 text-white p-1 rounded-sm" onClick={clickHandler}>
                    만들기
                  </button>
                </div>
              </div>
            }
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <RequestUsername />
    </>
  );
};

export default UserInfo;

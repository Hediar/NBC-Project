'use client';

import useUserInfoStore from '@/store/saveCurrentUserData';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
interface Props {
  session: Session;
}

// 세션은 AuthButtons에서 받습니다.
const UserInfo = ({ session }: Props) => {
  const signedInUser = session.user;
  const supabase = createClientComponentClient<Database>();
  const { userInfo, saveUserInfo } = useUserInfoStore();
  const [isUserHasUsername, setIsUserHasUsername] = useState<boolean>(true);

  // 유저 정보 zustand 스토어에 저장
  useEffect(() => {
    const getUserInfo = async () => {
      const { error, data } = await supabase.from('users').select().eq('id', signedInUser.id).single();
      if (error) {
        console.log('getUserInfo함수 에러 발생, components/Header/_auth/Userinfo.tsx 확인 요망');
        return;
      }
      saveUserInfo(data); // zustand store에 유저 정보 저장
    };
    getUserInfo();
  }, [signedInUser.id, supabase, saveUserInfo]);

  // 로그인한 유저가 username이 있는지 확인
  useEffect(() => {
    const getUsername = async () => {
      const { data } = await supabase.from('users').select('username').eq('id', signedInUser.id);
      if (data && !data[0].username) {
        setIsUserHasUsername(false);
      }
    };
    getUsername();
  }, [signedInUser.id, supabase]);

  // 로그인한 유저가 username이 없으면 추가하기
  const RequestUsername = () => {
    const { userInfo, saveUserInfo } = useUserInfoStore();
    const [usernameValue, setUsernameValue] = useState<string>('');
    const router = useRouter();
    const updateUsername = async () => {
      const { data: usernames } = await supabase.from('users').select('username');

      if (usernames?.some((user) => user.username === usernameValue)) {
        alert('이미 등록된 유저이름입니다. 다른 유저이름을 만들어 주세요.');
        return;
      }

      const { error, data } = await supabase
        .from('users')
        .update({ username: usernameValue })
        .eq('id', signedInUser.id)
        .select();
      setIsUserHasUsername(true);
      if (error) {
        alert('에러가 발생했습니다. 잠시 후에 다시 시도해주세요.');
      }
      router.refresh();
      saveUserInfo({ ...userInfo, username: usernameValue });
      alert('업데이트 완료!');
    };

    const clickHandler = debounce(() => updateUsername(), 300);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      // 특수문자와 스페이스바를 제외한다
      const sanitizedValue = newValue.replace(/[^\w\dㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
      setUsernameValue(sanitizedValue);
    };

    return (
      <>
        {!isUserHasUsername && (
          <div className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] shadow-md shadow-slate-400 p-5 rounded-md flex flex-col gap-2 items-center bg-slate-50">
            <h1>{signedInUser.user_metadata.name && `${signedInUser.user_metadata.name} 님, `}환영합니다!</h1>
            {
              <div>
                <h2 className="mb-3 text-center">유저이름을 생성해주세요.</h2>
                <p className="mb-3 text-center text-sm text-gray-600">
                  특수문자나 띄어쓰기는 허용되지 않습니다.(최대 15자)
                </p>
                <form
                  className="flex flex-col gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    clickHandler();
                  }}
                >
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="username"
                    required
                    maxLength={15}
                    value={usernameValue}
                    onChange={(e) => handleChange(e)}
                    className="text-center border border-slate-400 rounded-sm"
                  />
                  <button
                    className="text-center bg-slate-800 text-white p-1 rounded-sm disabled:bg-slate-300"
                    disabled={usernameValue.length === 0}
                  >
                    만들기
                  </button>
                </form>
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

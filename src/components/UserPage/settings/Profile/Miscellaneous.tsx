import changeFormat from '@/api/formatTime';
import { User } from '@supabase/supabase-js';

const Miscellaneous = ({ user }: { user: User }) => {
  console.log(user);

  const createdAt = changeFormat(user.created_at);
  const lastConnected = changeFormat(user.last_sign_in_at!);

  return (
    <div className="flex flex-col gap-2 w-2/6">
      <div className="flex flex-col">
        <h4 className="font-semibold">계정 생성일</h4>
        <p className="text-sm text-gray-700">{createdAt}</p>
      </div>
      <div className="flex flex-col">
        <h4 className="font-semibold">마지막 접속 시간</h4>
        <p className="text-sm text-gray-700">{lastConnected}</p>
      </div>
    </div>
  );
};

export default Miscellaneous;

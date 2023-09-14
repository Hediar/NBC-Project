import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';

interface Props {
  params: string;
}

const UserPageSemiHeader = async ({ params: pageUsername }: Props) => {
  const supabase = createClientComponentClient();
  const { data: avatar_url } = await supabase.from('users').select('avatar_url').eq('username', pageUsername).single();

  return (
    <div className="mt-[50px] w-full bg-[#f0743f] bg-opacity-90 h-[100px] xl:h-[70px] rounded-xl p-5 animate-300">
      <div className="h-full flex gap-7 items-center ml-5">
        <Image
          width={40}
          height={40}
          className="rounded-full w-12 h-12 sm:w-16 sm:h-16 xl:w-10 xl:h-10"
          src={avatar_url?.avatar_url}
          alt="user profile"
        />
        <span className="sr-only">Avatar Photo</span>
        <span className="text-lg sm:text-2xl xl:text-xl text-white font-bold text-center">{pageUsername}</span>
      </div>
    </div>
  );
};

export default UserPageSemiHeader;

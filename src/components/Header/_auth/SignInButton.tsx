import Link from 'next/link';

const SignInButton = () => {
  return (
    <>
      <Link
        href={'?sign-in=true'}
        className="h-full py-2 px-3 rounded-md shadow-sm shadow-gray-700 bg-slate-700 text-white active:bg-slate-600 text-sm flex items-center"
      >
        로그인
      </Link>
    </>
  );
};

export default SignInButton;

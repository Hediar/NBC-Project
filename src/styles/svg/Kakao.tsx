/* eslint-disable @next/next/no-img-element */

type Props = {
  handleOAuthSignIn: (provider: 'google' | 'kakao', queryParams?: {}) => Promise<void>;
};

const Kakao = ({ handleOAuthSignIn }: Props) => (
  <div
    className="animate-300 hover:scale-105 cursor-pointer w-12 h-12 flex justify-center items-center rounded-full overflow-hidden"
    style={{ background: '#f9e000' }}
    onClick={() => handleOAuthSignIn('kakao')}
  >
    <img className="w-10 h-10 " src="/kakaotalk.png" alt="kakao" />
  </div>
);
export default Kakao;

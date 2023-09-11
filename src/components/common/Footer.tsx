import GithubFooter from '@/styles/svg/GitHubFooter';
import LogoWhite from '@/styles/svg/LogoWhite';

const Footer = () => {
  return (
    <div className="w-full h-[300px] bg-[#3C3C3C] flex justify-center items-center flex-col gap-4 sm:gap-10 text-white">
      <LogoWhite className="lg:hidden" />
      <LogoWhite className="hidden lg:block" width={500} height={60} />
      <div className="flex flex-col gap-3 items-center">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 items-center">
          <div className="flex gap-3 items-center">
            <h6 className="text-zinc-300 text-base font-normal">리더</h6>
            <div className="w-px h-2.5 bg-zinc-300"></div>
            <span className="font-bold text-base">이세령</span>
          </div>
          <div className="flex gap-3 items-center">
            <h6 className="text-zinc-300 text-base font-normal">팀원</h6>
            <div className="w-px h-2.5 bg-zinc-300"></div>
            <div className="font-bold text-base flex gap-2.5">
              <span>김환훈</span>
              <span>서경모</span>
              <span>이지영</span>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <h6 className="text-zinc-300 text-base font-normal">디자이너</h6>
            <div className="w-px h-2.5 bg-zinc-300"></div>
            <span className="font-bold text-base">조아라</span>
          </div>
        </div>
        <p className="text-center text-[#888] text-base font-normal">
          Copyright 2023. A조 챌린지팀 all rights reserved.
        </p>
      </div>
      <GithubFooter className="lg:hidden" />
      <GithubFooter className="hidden lg:block" width={300} height={30} />
    </div>
  );
};

export default Footer;

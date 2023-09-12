import { StarLine } from '@/styles/icons/Icons24';
import { SVGTalkEndPoint, SVGTalkStartPoint } from '@/styles/icons/IconsETC';

const KeyInfomationSuspense = () => {
  const DUMMY_NUMBER = 9;
  const lists = new Array(DUMMY_NUMBER).fill(0);

  return (
    <div>
      <main className="animate-pulse h-[440px] py-[40px] relative bg-slate-100">
        <div className="flex w-full sm:w-4/5 mx-auto relative">
          <section className="w-1/3 absolute top-24 sm:top-auto sm:relative">
            <div className="w-[240px] h-[360px] rounded-[10px] bg-slate-200" />
          </section>
          <section
            id="detail-cont"
            className="w-2/3 absolute right-0 sm:relative sm:w-[1267px] mx-auto flex flex-col gap-10 px-4 py-2 opacity-70 "
          >
            <div className="text-sm h-[300px] flex relative">
              <div
                className="w-[47px] h-[30px] self-end bg-slate-200"
                style={{ clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)' }}
              ></div>
              <div className="w-[1220px] flex justify-center items-center bg-slate-200 rounded-tl-[60px] rounded-tr-[60px] rounded-br-[60px] border-none custom_mobile_suit sm:text-[24px] sm:leading-[30px] px-5 py-20 ">
                <div className="h-full flex flex-col gap-1 items-center overflow-auto"></div>
                <div className="absolute left-16 top-5 px-5">
                  <SVGTalkStartPoint />
                </div>
                <div className="absolute bottom-5 right-5 sm:top-5 px-5">
                  <SVGTalkEndPoint />
                </div>
              </div>
            </div>
            <div>
              <span className="font-bold text-base text-white flex">
                평균 별점
                <StarLine fill="white" />
              </span>
            </div>
          </section>
        </div>
      </main>

      <div className="animate-pulse w-4/5 mx-auto">
        <p className="font-bold text-2xl flex items-center mt-20">
          출연<span style={{ fontSize: '0.5px' }}>●</span>제작
        </p>

        {/* <div className='flex'> */}
        <div className="relative bg-slate-200">
          <div
            className="w-full h-full absolute right-0"
            style={{ boxShadow: '-39px 0px 29px -14px rgba(240,240,240,0.85) inset' }}
          ></div>
          <div className="flex items-center p-10 gap-2 sm:gap-0 overflow-auto relative mb-10">
            {lists.map((_, idx) => {
              return (
                <div key={idx} className="flex gap-2 min-w-[300px]">
                  <div className={`${Style.profileImgDiv}`}>
                    <div className="rounded-full w-[80px] h-[80px] bg-slate-300" />
                  </div>

                  <div className="m-2">
                    <span className={`${Style.name}`}></span>
                    <p className={`${Style.otherInfo}`}></p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative bg-slate-200">
          <div
            className="w-full h-full absolute right-0"
            style={{ boxShadow: '-39px 0px 29px -14px rgba(240,240,240,0.85) inset' }}
          ></div>
          <div className="flex items-center p-10 gap-2 sm:gap-0 overflow-auto relative">
            {lists.map((_, idx) => {
              return (
                <div key={idx} className="flex gap-2 min-w-[300px]">
                  <div className={`${Style.profileImgDiv}`}>
                    <div className="rounded-full w-[80px] h-[80px] bg-slate-300" />
                  </div>

                  <div className="m-2">
                    <span className={`${Style.name}`}></span>
                    <p className={`${Style.otherInfo}`}></p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-20"></div>
      </div>

      <div className="border-b"></div>
    </div>
  );
};

export default KeyInfomationSuspense;

const Style = {
  infoDiv: 'w-1/2 flex flex-col gap-5',
  profileImgDiv: 'min-w-[80px] h-[80px] flex bg-zinc-300 rounded-full shadow1 bg-slate-200',
  name: 'text-neutral-800 text-xl font-bold leading-normal bg-slate-200',
  otherInfo: 'text-neutral-800 text-sm font-normal leading-snug bg-slate-200'
};

import { optionMark } from '@/static/optionMark';

interface OptionProps {
  option: DiscussionOption;
  selected: boolean;
  votedOption: DiscussionUser | undefined;
  sumCount: number;
  settingNum: number;
  onClick: () => void;
}

const Option = ({ option, selected, votedOption, sumCount, settingNum, onClick }: OptionProps) => {
  const getColorByIndex = (idx: number) => {
    const colors = ['#FFCF1F', '#C670F2', '#4461FA', '#F0743F', '#ACEE48'];

    return colors[idx % 5];
  };
  const getPercentageColorByIndex = (idx: number) => {
    const colors = ['#FFF8DE', '#FAF0FF', '#ECEFFF', '#FFEDE5', '#EFF6E4'];

    return colors[idx % 5];
  };
  const calculatePercentage = (count: number, sumCount: number) => {
    return `${((count / sumCount) * 100).toFixed(1)}%`;
  };

  const percentage = calculatePercentage(option.count, sumCount);
  const bgColor = getColorByIndex(settingNum);
  const percentageColor = getPercentageColorByIndex(settingNum);

  return (
    <div
      className={`w-full h-[4rem] flex gap-5 items-center rounded-xl py-10 px-5 relative overflow-hidden 
      ${
        votedOption?.option_id === option.option_id
          ? 'border-2 border-black'
          : selected
          ? 'border-2 border-black'
          : 'border-2 border-[#EBEBEB]'
      }`}
      onClick={onClick}
    >
      <div
        className={`w-8 h-8 p-2 rounded-full flex items-center justify-center`}
        style={{ backgroundColor: `${bgColor}` }}
      >
        <span className="font-bold text-white">{optionMark[settingNum]}</span>
      </div>
      <div className="w-3/5 flex whitespace-nowrap break-all overflow-auto">
        <p>{option.content}</p>
      </div>
      {votedOption && (
        <>
          <div className="w-full h-full absolute top-0 left-0 -z-10">
            <div className="h-full" style={{ width: percentage, backgroundColor: `${percentageColor}` }}></div>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="font-bold">{option.count}명</span>
            <span className="font-bold text-gray-400">{percentage}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Option;

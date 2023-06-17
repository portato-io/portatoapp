import { Progress } from 'antd';

function ProgressBar({ progress = 0 }: any) {
  return (
    <Progress
      percent={progress}
      showInfo={false}
      strokeColor={'#1677FF'}
      className="progress-bar-indicator"
    ></Progress>
  );
}
export default ProgressBar;

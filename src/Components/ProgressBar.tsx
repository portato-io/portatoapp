import { Progress } from 'antd';

function ProgressBar({ progress = 0 }: any) {
  return (
    <Progress
      percent={progress}
      showInfo={false}
      strokeColor={'#60a353'}
      className="progress-bar-indicator"
    ></Progress>
  );
}
export default ProgressBar;

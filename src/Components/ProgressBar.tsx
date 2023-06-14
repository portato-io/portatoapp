import { Progress } from 'antd';

function ProgressBar({ progress = 0 }: any) {
  return (
    <Progress
      percent={progress}
      showInfo={false}
      className="progress-bar-indicator"
    ></Progress>
  );
}
export default ProgressBar;

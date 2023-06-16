import { Progress } from 'antd';

function ProgressBar({ progress = 0 }: any) {
  return (
    <Progress
      percent={progress}
      showInfo={false}
      strokeColor={'#1677FF'}
      style={{
        position: 'absolute',
        top: '2vh',
        left: '10vw',
        width: '80vw',
        height: '10vh',
      }}
    ></Progress>
  );
}
export default ProgressBar;

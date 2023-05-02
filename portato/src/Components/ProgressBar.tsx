import { Progress } from "antd";

function ProgressBar({ progress = 0 }: any) {
  return (
    <Progress
      percent={progress}
      showInfo={false}
      style={{ position: "absolute", top: "2%", left: "10%", width: "80%" }}
    ></Progress>
  );
}
export default ProgressBar;
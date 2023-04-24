import React from "react";
import { Progress } from "antd";
import { UploadFile } from "antd/lib/upload/interface";

interface ImageWithProgressProps {
  file: UploadFile;
}

const ImageWithProgress: React.FC<ImageWithProgressProps> = ({ file }) => {
  return (
    <div style={{ position: "relative" }}>
      <img
        src={file.url || file.preview}
        alt={file.name}
        style={{ width: "100%", height: "100%" }}
      />
      {file.status === "uploading" && file.percent && (
        <Progress
          type="circle"
          percent={file.percent}
          width={40}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </div>
  );
};

export default ImageWithProgress;

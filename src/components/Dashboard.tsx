import React from "react";
import { RecordWebcam, useRecordWebcam, CAMERA_STATUS} from "react-record-webcam";
import type { WebcamRenderProps, RecordWebcamOptions, RecordWebcamHook} from "react-record-webcam";
import "./Dashboard.css";
import Button from "./UI/Button";
import Card from "./UI/Card";

const OPTIONS: RecordWebcamOptions = {
  filename: "test-filename",
  fileType: "mp4",
  width: 1920,
  height: 1080
};

export const App = () => {
  const recordWebcam: RecordWebcamHook = useRecordWebcam(OPTIONS);

  const getRecordingFileHooks = async () => {
    const blob = await recordWebcam.getRecording();
    console.log({ blob });
  };

  const getRecordingFileRenderProp = async (blob: Blob | undefined) => {
    console.log({ blob });
  };

  return (
    <div> 
      <Card>
        <RecordWebcam
          options={OPTIONS}
          render={(props: WebcamRenderProps) => {
            const showOpenCamera =
              props.status !== CAMERA_STATUS.OPEN &&
              props.status !== CAMERA_STATUS.RECORDING &&
              props.status !== CAMERA_STATUS.PREVIEW;
            const showCloseCamera =
              props.status === CAMERA_STATUS.OPEN || CAMERA_STATUS.RECORDING;
            const showStart = props.status === CAMERA_STATUS.OPEN;
            const showStop = props.status === CAMERA_STATUS.RECORDING;
            const showRetake = props.status === CAMERA_STATUS.PREVIEW;
            const showDownload = props.status === CAMERA_STATUS.PREVIEW;

            return (
              <div>
                <h1>Component render prop demo</h1>
                <p>Camera status: {props.status}</p>
                <div>
                  <Button disabled={!showOpenCamera} onClick={props.openCamera}>
                    Open camera
                  </Button>
                  <Button
                    disabled={showOpenCamera || showRetake || !showCloseCamera}
                    onClick={props.closeCamera}
                  >
                    Close camera
                  </Button>

                  <Button disabled={!showStart} onClick={props.start}>
                    Start recording
                  </Button>
                  <Button disabled={!showStop} onClick={props.stop}>
                    Stop recording
                  </Button>
                  <Button disabled={!showRetake} onClick={props.retake}>
                    Retake
                  </Button>
                  <Button disabled={!showDownload} onClick={props.download}>
                    Download
                  </Button>
                  <Button
                    disabled={!showDownload}
                    onClick={async () => {
                      const blob = await props.getRecording();
                      getRecordingFileRenderProp(blob);
                    }}
                  >
                    Get recording blob
                  </Button>
                </div>
              </div>
            );
          }}
        />
      </Card>
    </div>
  );
};

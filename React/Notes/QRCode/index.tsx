import React from 'react';
import QR from 'qrcode';

const initialState = {};

interface IQRCodeProps {
  text: string;
  size: number;
}

type IQRCodeState = typeof initialState;

export default class QRCode extends React.Component<IQRCodeProps, IQRCodeState> {
  private qrCodeRef = React.createRef<HTMLCanvasElement>();

  constructor(props: IQRCodeProps) {
    super(props);
    this.state = initialState;
  }

  private generateQRCode = () => {
    QR.toCanvas(
      this.qrCodeRef.current,
      this.props.text,
      { width: this.props.size, margin: 0, color: { light: '#ffffff00' } },
      (error) => {
        if (error) {
          console.error(error);
        }
      },
    );
  };

  componentDidMount() {
    this.generateQRCode();
  }

  componentDidUpdate(prevProps: IQRCodeProps) {
    if (prevProps.text !== this.props.text) {
      this.generateQRCode();
    }
  }

  render() {
    return <canvas ref={this.qrCodeRef} onClick={(e) => e.stopPropagation()} />;
  }
}

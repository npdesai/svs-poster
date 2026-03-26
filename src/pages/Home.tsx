import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Input, Layout, Row, Upload, UploadFile } from "antd";
import ImgCrop from "antd-img-crop";
import { RcFile, UploadProps } from "antd/es/upload/interface";
import { RootLayout } from "components";
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import "../styles/index.scss";

const Home: React.FC = () => {
  const { Header, Footer, Content } = Layout;

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageUrl, setImageUrl] = useState<string>();
  const [personName, setPersonName] = useState<string>();
  const [mobileNumber, setMobileNumber] = useState<string>();
  const [schoolName, setSchoolName] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onPreview = async (file: UploadFile) => {
    try {
      let src = file.url as string;
      if (!src) {
        src = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("Failed to read file"));
          reader.readAsDataURL(file.originFileObj as RcFile);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      if (imgWindow) {
        imgWindow.document.write(image.outerHTML);
      }
    } catch (error) {
      console.error("Error previewing image:", error);
    }
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    if (newFileList.length > 0) {
      getBase64(newFileList[0].originFileObj as RcFile, (url) => {
        setImageUrl(url);
      });
    } else {
      setImageUrl("");
    }

    setFileList(newFileList);
  };

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const divToCapture = useRef<HTMLDivElement>(null);

  const captureImage = async () => {
    const element = divToCapture.current;
    if (!element) {
      return;
    }

    try {
      setIsLoading(true);
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      downloadImage(imgData);
    } catch (error) {
      console.error("Error capturing image:", error);
      setIsLoading(false);
    }
  };

  const downloadImage = (data: string) => {
    try {
      const filename = personName?.replace(/\s+/g, "_") || "poster";
      saveAs(data, `${filename}.png`);
      setIsLoading(false);
    } catch (error) {
      console.error("Error downloading image:", error);
      setIsLoading(false);
    }
  };

  const handleLocation = () => {
    window.open(process.env.REACT_APP_GOOGLE_MAPS_LOCATION, "_blank");
  };

  const openCellNumbers = () => {
    var mobileNumber = prompt(
      `Select a mobile number to call:\n\n1. ${process.env.REACT_APP_PHONE1}\n2. ${process.env.REACT_APP_PHONE2}`,
    );
    if (mobileNumber) {
      window.location.href = "tel:" + mobileNumber;
    }
  };

  const handleEmail = () => {
    window.location.href = `mailto:${process.env.REACT_APP_EMAIL}`;
  };

  return (
    <RootLayout
      title="Free Poster Generator - શ્રીકર વિદ્યા સંકુલ (Shreekar Vidhya Sankul) | BIGELEMENT INFOTECH"
      description="Create custom posters for શ્રીકર વિદ્યા સંકુલ (Shreekar Vidhya Sankul). Upload your photo, add your name, mobile number, and school name to generate and download your personalized poster instantly. Free poster generator tool for students and schools."
      keywords="poster generator, custom poster, school poster, student poster, શ્રીકર વિદ્યા સંકુલ (Shreekar Vidhya Sankul), poster maker, free poster creator, download poster, personalized poster, BIGELEMENT INFOTECH, create poster online, school poster maker, student poster generator"
    >
      <Layout>
        <Header className="headerstyle">
          <Row justify="center">
            <Col xs={24}>
              <div className="pagetitle">Create Your Poster</div>
              <div className="pagesubtitle">તમારુ પોસ્ટર બનાવો.</div>
            </Col>
          </Row>
        </Header>
        <Content className="contentstyle">
          <Row align="middle">
            <Col
              xs={{ span: 24, order: 2 }}
              sm={{ span: 24, order: 2 }}
              md={{ span: 12, order: 2 }}
              lg={{ span: 10, order: 1, offset: 2 }}
            >
              <Row justify="center" align="middle">
                <Col span={24}>
                  <div className="img-poster" ref={divToCapture}>
                    <div>
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="previewposter"
                          className="personimage"
                        />
                      ) : (
                        ""
                      )}
                      <img
                        src="images/poster.png"
                        alt="poster"
                        className="mainposter"
                      />
                      {personName ? (
                        <span className="personname">{personName}</span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col
              xs={{ span: 24, order: 1 }}
              sm={{ span: 24, order: 1 }}
              md={{ span: 12, order: 2 }}
              lg={{ span: 12, order: 2 }}
              className="input-content-space"
            >
              <Row justify="center">
                <Col xs={24} sm={24} md={24} lg={24}>
                  <Row
                    gutter={[
                      { xs: 0, md: 0, lg: 0 },
                      { xs: 25, md: 5, lg: 25 },
                    ]}
                    justify="center"
                  >
                    <Col
                      xs={24}
                      md={24}
                      lg={24}
                      xl={18}
                      className="photosection"
                    >
                      <Row align="middle">
                        <Col xs={24} sm={19} md={18}>
                          <div>
                            <h1>Upload Your Picture</h1>
                            <h2>આપનો ફોટો અપલોડ કરો.</h2>
                            <h3>
                              Click on the box to upload your picture.
                              {/* આપનો ફોટો અપલોડ કરવા માટે બોક્સ પર ક્લિક કરો. */}
                            </h3>
                          </div>
                        </Col>
                        <Col
                          xs={{ span: 12, offset: 7 }}
                          sm={{ span: 5, offset: 0 }}
                          md={6}
                        >
                          <div>
                            <ImgCrop rotationSlider showReset>
                              <Upload
                                maxCount={1}
                                accept="image/*"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                              >
                                {uploadButton}
                              </Upload>
                            </ImgCrop>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={24} className="infotext">
                          <div>
                            <h3>
                              (You can repeat this step to choose another
                              picture.)
                              {/* અન્ય ચિત્ર પસંદ કરવા માટે તમે આ પગલાનું પુનરાવર્તન કરી શકો છો. */}
                            </h3>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      xs={24}
                      md={24}
                      lg={24}
                      xl={18}
                      className="namesection"
                    >
                      <Row>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div>
                            <h1>Please enter your name here</h1>
                            <h2>આપનું નામ અહીં લખો.</h2>
                            <Input
                              placeholder="Name / નામ"
                              maxLength={15}
                              allowClear
                              onChange={(e) => setPersonName(e.target.value)}
                            />
                          </div>
                          <div>
                            <h1>Please enter your mobile number here</h1>
                            <h2>આપનો મોબાઈલ નંબર અહીં લખો.</h2>
                            <Input
                              placeholder="Mobile No. / મોબાઈલ નંબર"
                              minLength={10}
                              maxLength={10}
                              type="number"
                              allowClear
                              onChange={(e) =>
                                e.target.value.length === 10
                                  ? setMobileNumber(e.target.value)
                                  : setMobileNumber("")
                              }
                            />
                          </div>
                          <div className="mb-10">
                            <h1>Please enter your current school name here</h1>
                            <h2>આપની હાલની શાળાનું નામ અહીં લખો.</h2>
                            <Input
                              placeholder="School Name / શાળાનું નામ"
                              allowClear
                              onChange={(e) => setSchoolName(e.target.value)}
                            />
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      xs={24}
                      md={24}
                      lg={24}
                      xl={18}
                      className="buttonsection"
                    >
                      <Row justify="center" align="middle">
                        <Col xs={24}>
                          <Button
                            type="primary"
                            icon={<DownloadOutlined />}
                            size="large"
                            disabled={
                              !imageUrl ||
                              !personName ||
                              !mobileNumber ||
                              !schoolName ||
                              isLoading
                            }
                            onClick={captureImage}
                            loading={isLoading}
                          >
                            Download
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
        <Footer className="footerstyle">
          <Row justify="center" align="bottom">
            <Col xs={24}>
              <div className="pagefootertitle">
                <div>
                  <img
                    src="images/bigelement-logo.svg"
                    alt="poster"
                    className="logo"
                  />
                </div>
                <div>
                  <div className="footerdetails">
                    <div className="text-left">
                      <strong>Address:</strong>
                      <span className="footer-address" onClick={handleLocation}>
                        B 712-713, 7th Floor, IT Park, Opp. Gajera International{" "}
                        School, Uttran, Surat - 394105, Gujarat, India
                      </span>
                    </div>
                    <div className="text-left">
                      <strong>Phone:</strong>
                      <span className="footer-phone" onClick={openCellNumbers}>
                        {process.env.REACT_APP_PHONE1} /{" "}
                        {process.env.REACT_APP_PHONE2}
                      </span>
                    </div>
                    <div>
                      <strong>Email:</strong>
                      <span className="footer-email" onClick={handleEmail}>
                        {process.env.REACT_APP_EMAIL}
                      </span>
                    </div>
                  </div>
                  <div className="copyright">
                    <p className="text">
                      Copyright &copy; 2026&nbsp;All Rights Reserved.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Footer>
      </Layout>
    </RootLayout>
  );
};

export default Home;

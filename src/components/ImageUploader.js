import React from "react";
// import { Button } from "@sketchpixy/rubix";
import { Button } from "react-bootstrap";
import Cropper from "react-cropper";
import { resizeDataURL } from "../utils/ImageUtils";
import { IMAGE_URL } from "../constants/index";

export default class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: props.limit ? parseInt(props.limit) : 5,
      file: "",
      imagePreviewUrl: "",
      images: props.images ? props.images : [],
    };
  }

  handleImageChange(e) {
    e.preventDefault();
    if (e.target.files.length > 0) {
      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
        });
      };

      reader.readAsDataURL(file);
    } else {
      console.log("No file selected");
    }
  }

  addImage(e) {
    // if (typeof this.cropper.getCroppedCanvas() === "undefined") {
    //   return;
    // }
    resizeDataURL(
      // this.cropper.getCroppedCanvas().toDataURL(),
      (resizeImage) => {
        const previousState = this.state;

        var images = previousState.images;
        images.push({ Base64String: resizeImage });
        this.setState({
          file: "",
          imagePreviewUrl: "",
          images: images,
        });
        this.refs.inputFileImage.value = "";
      },
    );
  }

  getImages() {
    return this.state.images;
  }

  renderImages() {
    let { images } = this.state;
    return images.map((image, index) => {
      return (
        <div key={index}>
          <img
            src={
              !!image.Base64String ? image.Base64String : "IMAGE_URL" + image
            }
            style={{
              marginTop: 5,
              marginBottom: 5,
              width: 200,
              overflow: "hidden",
            }}
          />
          <Button
            bsStyle="danger"
            onClick={(e) => {
              this.removeImage(index);
            }}
          >
            X
          </Button>
        </div>
      );
    });
  }

  removeImage(index) {
    let { images } = this.state;
    images.splice(index, 1);
    this.setState({
      ...this.state,
      images: images,
    });
  }

  render() {
    let { imagePreviewUrl, file, images, limit } = this.state;
    // console.log("imagePreviewUrl", imagePreviewUrl);
    // console.log("images", images);
    // console.log("limit", limit);
    if (this.props.onImagesChange) {
      this.props.onImagesChange(images);
    }
    let isOverLimit = images.length >= limit;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = [
        <img
          ref={(cropper) => {
            this.cropper = cropper;
          }}
          style={{
            marginTop: 5,
            marginBottom: 5,
            width: 200,
            // overflow: "hidden",
          }}
          src={imagePreviewUrl}
          // style={{ height: 400, width: 400 }}
          // aspectRatio={1 / 1}
          guides={false}
          key="Cropper"
        />,
        <Button
          key="CropperBtn"
          bsStyle="primary"
          onClick={(e) => this.addImage(e)}
        >
          Add Image
        </Button>,
      ];
    } else if (!isOverLimit) {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    } else {
      $imagePreview = <div />;
    }

    let $fileInput = isOverLimit ? (
      <div />
    ) : (
      <input
        className="fileInput"
        type="file"
        onChange={(e) => this.handleImageChange(e)}
        ref="inputFileImage"
      />
    );

    return (
      <div className="previewComponent">
        {$fileInput}

        <div className="cropPreview">{$imagePreview}</div>

        {this.renderImages()}
      </div>
    );
  }
}

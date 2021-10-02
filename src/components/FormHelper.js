import React from "react";
import Select from "react-select";
import { Form, Row, Col, Button } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Upload } from "../../antd/lib/index";
import { PlusOutlined } from "@ant-design/icons";
import ShowImgWrapper from "../components/ShowImg_Wraper";
import { toBase64 } from "../utils/FileUtils";
// Field
export const renderFieldWithTopLabel = ({
  input,
  controlId,
  label,
  type = "text",
  disabled,
  placeholder,
  isRequire = false,
  meta: { touched, error },
}) => (
  <Form.Group controlId={controlId} style={{ marginTop: 10 }}>
    <Form.Label>
      {label}
      <span className="text-error" hidden={!isRequire}>
        *
      </span>
    </Form.Label>
    <Form.Control
      {...input}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      isInvalid={touched && !!error}
    />
    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
  </Form.Group>
);

export const renderColFieldWithButton = ({
  input,
  controlId,
  label,
  buttonLabel,
  buttonIcon,
  type = "text",
  disabled,
  placeholder,
  isRequire = false,
  leftCol = 3,
  rightCol = 5,
  buttonCol = 4,
  meta: { touched, error },
}) => (
  <Form.Group controlId={controlId} as={Row}>
    <Form.Label column sm={leftCol}>
      {label}
      <span className="text-error" hidden={!isRequire}>
        *
      </span>
    </Form.Label>
    <Col sm={rightCol}>
      <Form.Control
        {...input}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        isInvalid={touched && !!error}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Col>
    <Col sm={buttonCol}>
      <Button variant="primary" type="submit">
        {buttonIcon} {buttonLabel}
      </Button>
    </Col>
  </Form.Group>
);

export const renderColSelectWithButton = ({
  input,
  controlId,
  label,
  buttonLabel,
  buttonIcon,
  list,
  disabled,
  placeholder,
  isRequire = false,
  leftCol = 3,
  rightCol = 5,
  buttonCol = 4,
  meta: { touched, error },
}) => (
  <Form.Group controlId={controlId} as={Row}>
    <Form.Label column sm={leftCol}>
      {label}
      <span className="text-error" hidden={!isRequire}>
        *
      </span>
    </Form.Label>
    <Col sm={rightCol}>
      <Form.Control
        as="select"
        custom
        {...input}
        disabled={disabled}
        isInvalid={touched && !!error}
      >
        <option key="" value="">
          {placeholder}
        </option>
        {list.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </Form.Control>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Col>
    <Col sm={buttonCol}>
      <Button variant="primary" type="submit">
        {buttonIcon} {buttonLabel}
      </Button>
    </Col>
  </Form.Group>
);

const adaptFileEventToValue = (delegate) => (e) => {
  delegate(e.target.files[0]);
};
export const renderColUploadFileWithButton = ({
  rest,
  input,
  controlId,
  label,
  buttonLabel,
  buttonIcon,
  disabled,
  placeholder,
  isRequire = false,
  leftCol = 3,
  rightCol = 5,
  buttonCol = 4,
  meta: { touched, error },
}) => (
  <Form.Group controlId={controlId} as={Row}>
    <Form.Label column sm={leftCol}>
      {label}
      <span className="text-error" hidden={!isRequire}>
        *
      </span>
    </Form.Label>
    <Col sm={rightCol}>
      <Form.File
        {...rest}
        id={label}
        label={!!input.value ? input.value.name : placeholder}
        disabled={disabled}
        isInvalid={!!error}
        multiple={false}
        onChange={adaptFileEventToValue(input.onChange)}
        data-browse="เลือกไฟล์"
        custom
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Col>
    <Col sm={buttonCol}>
      <Button variant="primary" type="submit">
        {buttonIcon} {buttonLabel}
      </Button>
    </Col>
  </Form.Group>
);

export const renderColField = ({
  input,
  controlId,
  label,
  type = "text",
  disabled,
  placeholder,
  isRequire = false,
  leftCol = 3,
  rightCol = 9,
  meta: { touched, error },
}) => {
  return (
    <Form.Group controlId={controlId} as={Row}>
      <Form.Label column sm={leftCol}>
        {label}
        <span className="text-error" hidden={!isRequire}>
          *
        </span>
      </Form.Label>
      <Col sm={rightCol}>
        <Form.Control
          {...input}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          isInvalid={touched && !!error}
        />

        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
};

export const renderColTextareaField = ({
  input,
  controlId,
  label,
  rows = 3,
  disabled,
  placeholder,
  isRequire = false,
  leftCol = 3,
  rightCol = 9,
  meta: { touched, error },
}) => (
  <Form.Group controlId={controlId} as={Row}>
    <Form.Label column sm={leftCol}>
      {label}
      <span className="text-error" hidden={!isRequire}>
        *
      </span>
    </Form.Label>
    <Col sm={rightCol}>
      <Form.Control
        {...input}
        as="textarea"
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        isInvalid={touched && !!error}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Col>
  </Form.Group>
);

export const renderColSelect = ({
  input,
  controlId,
  label,
  list,
  disabled,
  placeholder,
  isRequire = false,
  isPleaseSelect = true,
  leftCol = 3,
  rightCol = 9,
  meta: { touched, error },
}) => (
  <Form.Group controlId={controlId} as={Row}>
    <Form.Label column sm={leftCol}>
      {label}
      <span className="text-error" hidden={!isRequire}>
        *
      </span>
    </Form.Label>
    <Col sm={rightCol}>
      <Form.Control
        as="select"
        custom
        {...input}
        disabled={disabled}
        isInvalid={touched && !!error}
      >
        {isPleaseSelect && (
          <option key="" value="" style={{ color: "gray" }}>
            {placeholder}
          </option>
        )}
        {list.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </Form.Control>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Col>
  </Form.Group>
);

export const renderColSelectMulti = ({
  name,
  input,
  controlId,
  label,
  list,
  disabled,
  placeholder,
  isRequire = false,
  isPleaseSelect = true,
  leftCol = 3,
  rightCol = 9,
  meta: { touched, error },
}) => {
  return (
    <Form.Group controlId={controlId} as={Row}>
      <Form.Label column sm={leftCol}>
        {label}
        <span className="text-error" hidden={!isRequire}>
          *
        </span>
      </Form.Label>

      <Col sm={rightCol}>
        {/* elementType */}

        <Select
          //  defaultValue={[colourOptions[2], colourOptions[3]]}
          {...input}
          id={controlId}
          name={name}
          isMulti
          options={list}
          className="basic-multi-select"
          classNamePrefix="select"
          value={input.value}
          onChange={(value) => input.onChange(value)}
          onBlur={() => input.onBlur(input.value)}
        />

        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
};

export const renderColRadio = ({
  input,
  controlId,
  label,
  list,
  disabled,
  isRequire = false,
  leftCol = 3,
  rightCol = 9,
  meta: { touched, error },
}) => (
  <Form.Group controlId={controlId} as={Row}>
    <Form.Label column sm={leftCol}>
      {label}
      <span className="text-error" hidden={!isRequire}>
        *
      </span>
    </Form.Label>
    <Col sm={rightCol}>
      {list.map((item, index) => {
        return (
          <Form.Check
            id={`${controlId}_${item.value}`}
            key={item.label}
            {...input}
            inline
            disabled={disabled}
            type="radio"
            value={item.value}
            label={item.label}
            isInvalid={touched && !!error}
            checked={input.value == item.value}
          />
        );
      })}
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Col>
  </Form.Group>
);

export const renderColUploadFile = ({
  rest,
  input,
  controlId,
  label,
  disabled,
  placeholder,
  isRequire = false,
  leftCol = 3,
  rightCol = 9,
  meta: { touched, error },
}) => {
  return (
    <Form.Group controlId={controlId} as={Row}>
      <Form.Label column sm={leftCol}>
        {label}
        <span className="text-error" hidden={!isRequire}>
          *
        </span>
      </Form.Label>
      <Col sm={rightCol}>
        <Form.File
          {...rest}
          id={label}
          label={!!input.value ? input.value.name : placeholder}
          disabled={disabled}
          isInvalid={!!error}
          multiple={false}
          onChange={adaptFileEventToValue(input.onChange)}
          data-browse="เลือกไฟล์"
          accept={".doc,.docx,.pdf,.xls, .xlsx,.txt"}
          custom
        />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
};
export const renderColUploadFilePDFonly = ({
  rest,
  input,
  controlId,
  label,
  disabled,
  placeholder,
  isRequire = false,
  leftCol = 3,
  rightCol = 9,
  meta: { touched, error },
}) => {
  return (
    <Form.Group controlId={controlId} as={Row}>
      <Form.Label column sm={leftCol}>
        {label}
        <span className="text-error" hidden={!isRequire}>
          *
        </span>
      </Form.Label>
      <Col sm={rightCol}>
        <Form.File
          {...rest}
          id={label}
          label={!!input.value ? input.value.name : placeholder}
          disabled={disabled}
          isInvalid={!!error}
          multiple={false}
          onChange={adaptFileEventToValue(input.onChange)}
          data-browse="เลือกไฟล์"
          accept={".pdf"}
          custom
        />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
};

export const renderColUploadImg = ({
  rest,
  input,
  controlId,
  label,
  disabled,
  placeholder,
  isRequire = false,
  leftCol = 3,
  rightCol = 9,
  meta: { touched, error },
}) => {
  return (
    <Form.Group controlId={controlId} as={Row}>
      <Form.Label column sm={leftCol}>
        {label}
        <span className="text-error" hidden={!isRequire}>
          *
        </span>
      </Form.Label>
      <Col sm={rightCol}>
        <Form.File
          {...rest}
          id={label}
          label={!!input.value ? input.value.name : placeholder}
          disabled={disabled}
          isInvalid={!!error}
          multiple={false}
          onChange={adaptFileEventToValue(input.onChange)}
          data-browse="เลือกไฟล์"
          accept={"image/png, image/jpeg,image/jpg"}
          custom
        />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
};
export const renderColUploadFileAntd = ({
  rest,
  input,
  controlId,
  label,
  disabled,
  placeholder,
  isRequire = false,
  leftCol = 3,
  rightCol = 9,
  name,
  meta: { touched, error },
}) => {
  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const handleChange = ({ fileList }) => {
    ///// แปลงเป็น Base64 ก่อน ยิง API
    var arr = [];
    fileList.map(async (item) => {
      let res = await toBase64(item.originFileObj);
      arr.push(res);
      input.onChange(arr);
    });
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Form.Group controlId={controlId}>
        <Row>
          <Col xs={3}>{label}</Col>

          <Col xs={7}>
            <Upload
              {...input}
              id={controlId}
              name={name}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              multiple={true}
              // fileList={input.value}
              onChange={handleChange}
              customRequest={dummyRequest}
              accept={"image/png, image/jpeg,image/jpg"}
            >
              {uploadButton}
            </Upload>
          </Col>
        </Row>
      </Form.Group>
    </>
  );
};

export const renderImgAntd = ({
  rest,
  input,
  controlId,
  label,
  disabled,
  placeholder,
  isRequire = false,
  leftCol = 3,
  rightCol = 9,
  isBase64,
  name,
  meta: { touched, error },
}) => {
  const onDelete = (index) => {
    let newTodos = [...input.value];
    newTodos.splice(index, 1);
    input.onChange(newTodos);
  };
// console.log(">>>",input.value)
  return (
    <>
      <Form.Group {...input} controlId={controlId} name={name}>
        <Row>
          <Col xs={3}></Col>
          <Col xs={7}>
            <ShowImgWrapper
              {...input}
              id={controlId}
              name={name}
              del={onDelete}
              isBase64={isBase64}
            >
              {!!input.value && input.value.map((item) => item)}
            </ShowImgWrapper>
          </Col>
        </Row>
      </Form.Group>
    </>
  );
};

// Checkbox
export const renderColCheckbox = ({
  input,
  controlId,
  label,
  list,
  disabled,
  isRequire = false,
  leftCol = 3,
  rightCol = 9,
  meta: { touched, error },
}) => (
  <Form.Group controlId={controlId} as={Row}>
    <Form.Label column sm={leftCol}>
      {label}
      <span className="text-error" hidden={!isRequire}>
        *
      </span>
    </Form.Label>
    <Col sm={rightCol}>
      {list.map((item, index) => {
        return (
          <Form.Check
            {...input}
            id={input.name}
            key={index}
            inline
            disabled={disabled}
            type="checkbox"
            label={item.label}
            isInvalid={touched && !!error}
            checked={input.value}
          />
        );
      })}
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Col>
  </Form.Group>
);

export const renderCheckbox = ({
  input,
  label,
  disabled,
  meta: { touched, error },
}) => (
  <Form.Check
    {...input}
    id={input.name}
    inline
    disabled={disabled}
    type="checkbox"
    label={label}
    isInvalid={touched && !!error}
    checked={input.value}
  />
);

export const renderColSwitch = ({
  input,
  controlId,
  label,
  list,
  disabled,
  isRequire = false,
  leftCol = 3,
  rightCol = 9,
  meta: { touched, error },
}) => (
  <Form.Group controlId={controlId} as={Row}>
    <Form.Label column sm={leftCol}>
      {label}
      <span className="text-error" hidden={!isRequire}>
        *
      </span>
    </Form.Label>
    <Col sm={rightCol}>
      {list.map((item, index) => {
        return (
          <Form.Check
            {...input}
            id={input.name}
            key={index}
            inline
            disabled={disabled}
            type="switch"
            label={item.label}
            isInvalid={touched && !!error}
            checked={input.value}
          />
        );
      })}

      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Col>
  </Form.Group>
);

// Help
export function checkIsChecked(value, list) {
  if (list.length == 0) {
    return false;
  } else {
    return list.indexOf(value) > -1;
  }
}

export function getArrayFromCheckbox(input) {
  var output = [];
  var keys = Object.keys(input);
  for (var key of keys) {
    if (input[key]) output.push(key);
  }

  return output;
}

export const renderColHTMLEditor = ({
  input,
  controlId,
  label,
  isRequire = false,
  leftCol = 3,
  rightCol = 9,
  t,
  meta: { touched, error },
}) => {
  return (
    <Form.Group controlId={controlId} as={Row}>
      <Form.Label column sm={leftCol}>
        {label}
        <span className="text-error" hidden={!isRequire}>
          *
        </span>
      </Form.Label>
      <Col sm={rightCol}>
        <CKEditor
          {...input}
          editor={ClassicEditor}
          data={input.value}
          config={{
            ckfinder: {
              // Upload the images to the server using the CKFinder QuickUpload command.
              uploadUrl: "/upload",
            },
            toolbar: [
              "heading",
              "|",
              // 'fontfamily', 'fontsize', '|',
              // 'alignment', '|',
              // 'fontColor', 'fontBackgroundColor', '|',
              "bold",
              "italic",
              "|", //'strikethrough', 'underline', 'subscript', 'superscript', '|',
              "outdent",
              "indent",
              "|",
              "bulletedList",
              "numberedList",
              "|",
              // "uploadImage",
              "insertTable",
              "|",
              "undo",
              "redo",
            ],
          }}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            // console.log( 'Editor is ready to use!', editor );
          }}
          onChange={(event, editor) => {
            const data = editor.getData();

            input.onChange(data);
          }}
          onBlur={(event, editor) => {
            // console.log( 'Blur.', editor );
          }}
          onFocus={(event, editor) => {
            // console.log( 'Focus.', editor );
          }}
        />

        <Form.Control.Feedback type="invalid">
          {!!t ? t(error) : error}
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
};

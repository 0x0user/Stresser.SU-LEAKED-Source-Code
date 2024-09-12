import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImageAction, {
  SUBMIT_UPLOAD_IMAGE,
} from "../../requests/Support/UploadImg";
import Notif from "../Alert/Notif";
import { SUBMIT_REQUEST_CLEAN_STATE } from "../../store/SubmitRequest/types";

export default function uploadImage() {
  const [file, setFile] = useState(null);
  const [imgLink, setImgLink] = useState(null);
  const fileRef = useRef();

  const allowedExt = ["image/jpg", "image/png", "image/jpeg", "image/gif"];

  const dispatch = useDispatch();
  const submit = useSelector((state) => state.submit);

  const handleFileRef = () => {
    fileRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (!file) return;
    if (!allowedExt.includes(file.type)) {
      Notif({ success: false, response: "The file isn't an image." });
      setFile(null);
      return;
    }
    if (file.size > 5242880) {
      Notif({ success: false, response: "Image can't exceed 5 MB." });
      setFile(null);
      return;
    }
    dispatch(UploadImageAction(file));
    setFile(null);
  }, [file, dispatch, allowedExt]);

  useEffect(() => {
    if (!submit.submitted || !submit.response) return;
    if (submit.name !== SUBMIT_UPLOAD_IMAGE) return;
    if (submit.response.success) {
      setImgLink(submit.response.response);
    } else {
      Notif(submit.response);
    }
    dispatch({ type: SUBMIT_REQUEST_CLEAN_STATE });
  }, [submit, dispatch]);

  return {
    fileRef: fileRef,
    handleFileRef: handleFileRef,
    handleFileChange: handleFileChange,
    imgLink: imgLink,
    setImgLink: setImgLink,
  };
}

import React from "react";
import Button from "component/Button";
import { FaTimes, FaCheck } from "react-icons/fa";
import Fade from "../Fade";

import { useDispatch } from "store/hook";

import style from "./index.module.scss";

export default () => {
  const { management } = useDispatch();

  return (
    <Fade className={style._}>
      <Button ripple green onClick={management.confirmTask}>
        <FaCheck />
      </Button>
      <Button ripple red onClick={management.back}>
        <FaTimes />
      </Button>
    </Fade>
  );
};

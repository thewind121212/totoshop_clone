"use client";
import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/app/redux/reduxHook";
import { toogleSnackBar } from "@/app/redux/Features/UI/snackBar.slice";
import classes from "./snackBar.styles.module.css";

const dummy = {
  name: "sai ten dang nhap",
  state: "error",
};

function SnackBar() {
  const snackBarRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const snackBar = useAppSelector((state) => state.snackBarStatus);

  useEffect(() => {
    clearTimeout(snackBarRef.current);

    if (snackBar.show) {
      snackBarRef.current = setTimeout(() => {
        dispatch(toogleSnackBar({ show: false, notificationStack: snackBar.notificationStack}));
      }, 2500);
    }

    return () => {
      clearTimeout(snackBarRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snackBar]);

  return (
    <div className={`${classes.snackBarRoot} ${              snackBar.show ? classes.show : ""} `}>
      {snackBar.notificationStack.map((notification: any) => {
        return (
          <div
            className={classes.snackBar}
            key={Math.random()}
            style={{
              backgroundColor: `${
                notification.type === "error" ? "rgb(211, 47, 47)" : "green"
              }`,
            }}
          >
            <div className={classes.snackBarWrap}>
              <div className={classes.snackBarStatus}>
                {notification.type === "error" && (
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                    <path
                      d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,
        6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,
        13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
                    ></path>
                  </svg>
                )}
                {notification.type === "success" && (
                  <svg
                    fill="#000000"
                    viewBox="0 0 24 24"
                    id="d9090658-f907-4d85-8bc1-743b70378e93"
                    data-name="Livello 1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <title>prime</title>
                      <path
                        id="70fa6808-131f-4233-9c3a-fc089fd0c1c4"
                        data-name="done circle"
                        d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0ZM11.52,17L6,12.79l1.83-2.37L11.14,13l4.51-5.08,2.24,2Z"
                      ></path>
                    </g>
                  </svg>
                )}
              </div>
              <div className={classes.snackBarContent}>
                <p> {notification.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SnackBar;

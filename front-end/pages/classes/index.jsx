import React from "react";
import Classes from "../../components/classes/Classes";
const DUMMY_DATA1 = {
  header: "전공필수",
  classes: [
    { id: 1, subject: "네트워크" },
    { id: 2, subject: "네트워크" },
    { id: 3, subject: "네트워크" },
    { id: 4, subject: "네트워크" },
    { id: 5, subject: "네트워크" },
    { id: 6, subject: "네트워크" },
  ],
};
const DUMMY_DATA2 = {
  header: "전공일반",
  classes: [
    { id: 1, subject: "네트워크" },
    { id: 2, subject: "네트워크" },
    { id: 3, subject: "네트워크" },
    { id: 4, subject: "네트워크" },
    { id: 5, subject: "네트워크" },
    { id: 6, subject: "네트워크" },
  ],
};

const index = () => {
  return (
    <div>
      <Classes data={DUMMY_DATA1} />
      <Classes data={DUMMY_DATA2} />
    </div>
  );
};

export default index;

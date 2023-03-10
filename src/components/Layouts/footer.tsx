// import * as React from "react";
// import Box from '@mui/material/Box';
import { useEffect } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import { useRouter } from "next/router";

import NewIcon from "@mui/icons-material/FiberNew";

const actions = [
  { icon: <NewIcon sx={{ fontSize: 50 }} />, name: "New Game" },
  // { icon: <SaveIcon />, name: 'Save' },
  // { icon: <PrintIcon />, name: 'Print' },
  // { icon: <ShareIcon />, name: 'Share' },
];

export default function Footer() {
  const router = useRouter();

  useEffect(()=>{
    console.log(router)
  },[router])



  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "absolute", bottom: 16, left: 16 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
}

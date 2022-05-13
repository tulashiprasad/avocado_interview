import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { ACTION } from "../../reducer";
const Tableitem = ({
  layout,
  name,
  capacity,
  status,
  image,
  id,
  dispatch,
}) => {
  return (
    <table>
      <tr>
        <td>
          <img
            src={image}
            alt="image"
            style={{ height: "60px", widhth: "60px" }}
          />
        </td>
        <td>{status}</td>
        <td>{capacity}</td>
        <td>{name}</td>
        <td>{layout}</td>
        <td
          style={{
            display: "flex",
            width: "200px",
            justifyContent: "space-evenly",
          }}
        >
          <DeleteOutlineIcon
            style={{cursor:'pointer'}}
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: ACTION.DELETE, payload: id });
            }}
          />
        </td>
      </tr>
    </table>
  );
};

export default Tableitem;

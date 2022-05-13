import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import axios from "axios";
import { Button } from "@mui/material";

import "../components/json.css";
const URL = "https://jsonplaceholder.typicode.com/posts";
export default function JsonData() {
  const [data, setData] = useState([]);
  const [userid, setUserid] = useState();
  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [updateHandle, setUpdateHandle] = useState();
  const [formFlag, setFormFlag] = useState(false);
  const [addFlag, setAddFlag] = useState(true);

  useEffect(() => {
    axios.get(URL).then((response) => {
      setData(response.data);
    });
  }, []);
  const post = {
    id: id,
    title: title,
    body: body,
    userId: userid,
  };
  const addPost = () => {
    axios.post(URL, post);
    setData([post, ...data]);
    setFormFlag(false);
  };
  const updatePost = (postData) => {
    postData.title = title;
    postData.body = body;
    axios.put(URL + "/" + postData.id);
    const copyPost = [...data];
    const index = copyPost.indexOf(post);

    copyPost[index] = { ...postData };
    setData(copyPost);
    setFormFlag(false);
  };
  const deletePost = (postData) => {
    axios.delete(URL + "/" + postData.id + postData);
    setData(data.filter((oldVal) => oldVal.id !== postData.id));
  };
  return (
    <>
      {formFlag ? (
        <form action="">
          {addFlag && (
            <>
              <label htmlFor="userid">
                user Id
                <input
                  type="text"
                  id="userid"
                  onChange={(e) => setUserid(e.target.value)}
                />
              </label>
              <label htmlFor="id">
                id
                <input
                  type="text"
                  id="id"
                  onChange={(e) => setId(e.target.value)}
                />
              </label>
            </>
          )}

          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="body">
            Body
            <input
              type="text"
              id="body"
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
          <div>
            {!addFlag && (
              <Button
              style={{ color: "green" }}
              onClick={() => updatePost(updateHandle)}
            >
              update
            </Button>
            )}

            {addFlag && (
              <Button style={{ color: "blue", }} onClick={addPost}>
                Add
              </Button>
            )}

            <Button style={{ color: "red" }}>Cancel</Button>
          </div>
        </form>
      ) : (
        <>
          <h1 style={{ textAlgn: "center", margin: "50px" }}>JOSN Data</h1>
          <Button onClick={() => setFormFlag(true)} style = {{backgroundColor:'blue', color:'white', padding:'.5rem'}}> Add Post</Button>

          <TableContainer component={Paper} style={{ width: "1151px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">User ID</TableCell>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Body</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align="left">{item.userId}</TableCell>
                    <TableCell align="left">{item.id}</TableCell>
                    <TableCell align="left">{item.title}</TableCell>
                    <TableCell align="left">{item.body}</TableCell>
                    <TableCell align="left">
                      <Button
                        style={{ color: "green" }}
                        onClick={() => {
                          setFormFlag(true);
                          setUpdateHandle(item);
                          setAddFlag(false);
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        style={{ color: "red" }}
                        onClick={() => deletePost(item)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}

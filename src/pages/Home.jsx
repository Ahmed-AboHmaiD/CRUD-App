import React, { useEffect } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../state/postSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { records, loading, error } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th style={{ width: "70%" }}>Title</th>
          <th style={{ width: "10%" }}></th>
        </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <tr key={record.id}>
            <td>{record.id}</td>
            <td>{record.title}</td>
            <td>
              <ButtonGroup aria-label="Basic example">
                <Button variant="success">Edit</Button>
                <Button variant="danger">Delete</Button>
              </ButtonGroup>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Home;

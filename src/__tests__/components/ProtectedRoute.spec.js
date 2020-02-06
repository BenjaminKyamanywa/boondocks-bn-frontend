import React from "react";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { shallow } from "enzyme";
import localStorage from "../../helpers/localStorageMock";

const setUp = (props = {}) => shallow(<ProtectedRoute {...props} />);
describe("\"ProtectedRoute\"", () => {
  let wrapper;
  it("should render without error", function() {
    global.localStorage = localStorage;
    global.localStorage.setItem("bn_user_data", `{
    "email":"requestero@user.com",
      "name":"Requester",
      "userId":2,
      "verified":true,
      "role":"requester",
      "lineManagerId":7,
      "iat":1578472431,
      "exp":1578558831
  }`);
    const props = {
      setAuthState: jest.fn(),
      Component: null,
      location: {
        pathname: "/profile",
        search: "?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdpbGRuaXkwNUBnbWFpbC5jb20iLCJuYW1lIjoiR2lsZGFzIiwidXNlcklkIjoxLCJ2ZXJpZmllZCI6dHJ1ZSwicm9sZSI6InJlcXVlc3RlciIsImxpbmVNYW5hZ2VySWQiOm51bGwsImlhdCI6MTU3ODU3MTM0OSwiZXhwIjoxNTc4NjU3NzQ5fQ.SmBRYQ-zYgEl08jObfqrtFjrJTCU33-DsMGCRC2RZuc",
      }
    };
    wrapper = setUp(props);
    const component = wrapper.find(`[data-test='protected-route']`);
    expect(component.length).toBe(1);
  });
});

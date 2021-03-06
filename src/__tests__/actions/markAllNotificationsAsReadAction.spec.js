import moxios from "moxios";
import apiCall from "../../utils/api";
import {
  MARKED_AS_READ_FAILURE,
  MARKED_AS_READ_SUCCESS
} from "../../store/actions/types";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import actionFunc from "../../utils/actionFunc";
import markAllNotificationsAsRead
  from "../../store/actions/notifications/markAllNotificationsAsReadAction";
import localStorage from "../../__mocks__/LocalStorage";

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("\"markAllNotificationsAsReadAction\" - WITHOUT ANY TOKEN", () => {
  beforeEach(() => moxios.install(apiCall));

  afterEach(() => moxios.uninstall(apiCall));

  it("should dispatch error when no token is present 2", async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        response: {
          data: {
            status: "error",
            message: "unable to fetch",
          }
        },
        status: 400
      });
    });

    const expectedActions = [
      actionFunc(MARKED_AS_READ_FAILURE, {
        message: "unable to fetch",
        status: "error"
      }),
    ];

    store = mockStore({});
    await store.dispatch(markAllNotificationsAsRead()).then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe("\"markAllNotificationsAsReadAction\" - WITH TOKEN", () => {
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

  beforeEach(() => moxios.install(apiCall));

  afterEach(() => moxios.uninstall(apiCall));

  it("should dispatch success when token is present", async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        response: {
          status: "success",
          message: "All notifications marked as read",
          data: {}
        },
        status: 200
      });
    });

    const expectedActions = [
      actionFunc(MARKED_AS_READ_SUCCESS, true),
    ];

    store = mockStore({});
    await store.dispatch(markAllNotificationsAsRead()).then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

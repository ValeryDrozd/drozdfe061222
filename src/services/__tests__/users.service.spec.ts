/* eslint-disable */
import User from "../../interfaces/User.interface";
import { getUsers } from "../users.service";

const testApiUsers: User[] = [
  {
    phone: "902-738-3242",
    name: "Geordan Aaryn",
    nickname: "@geordanaaryn",
    email: "geordan.aaryn@fallinhay.com",
    position: "Chief Executive Officer",
    photo: "1.jpg",
  },
  {
    phone: "902-782-3286",
    name: "Brazil Izair",
    nickname: "@brazilizair",
    email: "brazil.izair@fallinhay.com",
    position: "Managing Director",
    photo: "2.jpg",
  },
];

const fetchMock = jest.fn();
// @ts-ignore
global.fetch = fetchMock;

describe("Users Service", () => {
  describe("Get users", () => {
    it("Users are fetched successfully", async () => {
      fetchMock.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(testApiUsers),
          ok: true,
        })
      );

      const result = await getUsers();
      expect(result).toMatchObject(testApiUsers);
      expect(fetchMock).toHaveBeenCalledWith(`/initData.json`);
    });
  });
});

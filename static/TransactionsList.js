import { faker } from "@faker-js/faker/locale/en_IN";

const transactionsList = [
  {
    _id: "615a7ea6f7fcde1f72d2d6f2",
    user_id: "e5f6g7h8i9j0a1b2c3d4",
    user_name: faker.person.fullName(),
    user_email: faker.internet.email(),
    user_phone: Math.floor(10000000000 - 1000000000 * Math.random()),
    fundraiser_id: "f6g7h8i9j0a1b2c3d4e5",
    amount: 200,
    transaction_date: "2021-12-10T15:45:00Z",
    status: "pending",
  },
  {
    _id: "615a7ea6f7fcde1f72d2d6f3",
    user_id: "e5f6g7h8i9j0a1b2c3d4",
    user_name: faker.person.fullName(),
    user_email: faker.internet.email(),
    user_phone: Math.floor(10000000000 - 1000000000 * Math.random()),
    fundraiser_id: "h8i9j0a1b2c3d4e5f6g7",
    amount: 50,
    transaction_date: "2022-01-20T09:00:00Z",
    status: "completed",
  },
  {
    _id: "615a7ea6f7fcde1f72d2d6f4",
    user_id: "e5f6g7h8i9j0a1b2c3d4",
    user_name: faker.person.fullName(),
    user_email: faker.internet.email(),
    user_phone: Math.floor(10000000000 - 1000000000 * Math.random()),
    fundraiser_id: "j0a1b2c3d4e5f6g7h8i9",
    amount: 75,
    transaction_date: "2022-02-15T18:20:00Z",
    status: "failed",
  },
  {
    _id: "615a7ea6f7fcde1f72d2d6f5",
    user_id: "e5f6g7h8i9j0a1b2c3d4",
    user_name: faker.person.fullName(),
    user_email: faker.internet.email(),
    user_phone: Math.floor(10000000000 - 1000000000 * Math.random()),
    fundraiser_id: "b2c3d4e5f6g7h8i9j0a1",
    amount: 120,
    transaction_date: "2022-03-05T11:10:00Z",
    status: "completed",
  },
  {
    _id: "615a7ea6f7fcde1f72d2d6f6",
    user_id: "e5f6g7h8i9j0a1b2c3d4",
    user_name: faker.person.fullName(),
    user_email: faker.internet.email(),
    user_phone: Math.floor(10000000000 - 1000000000 * Math.random()),
    fundraiser_id: "d4e5f6g7h8i9j0a1b2c3",
    amount: 85,
    transaction_date: "2022-04-18T14:30:00Z",
    status: "completed",
  },
  {
    _id: "615a7ea6f7fcde1f72d2d6f7",
    user_id: "e5f6g7h8i9j0a1b2c3d4",
    user_name: faker.person.fullName(),
    user_email: faker.internet.email(),
    user_phone: Math.floor(10000000000 - 1000000000 * Math.random()),
    fundraiser_id: "f6g7h8i9j0a1b2c3d4e5",
    amount: 200,
    transaction_date: "2022-05-10T15:45:00Z",
    status: "completed",
  },
  {
    _id: "615a7ea6f7fcde1f72d2d6f8",
    user_id: "e5f6g7h8i9j0a1b2c3d4",
    user_name: faker.person.fullName(),
    user_email: faker.internet.email(),
    user_phone: Math.floor(10000000000 - 1000000000 * Math.random()),
    fundraiser_id: "h8i9j0a1b2c3d4e5f6g7",
    amount: 50,
    transaction_date: "2022-06-20T09:00:00Z",
    status: "completed",
  },
  {
    _id: "615a7ea6f7fcde1f72d2d6f9",
    user_id: "e5f6g7h8i9j0a1b2c3d4",
    user_name: faker.person.fullName(),
    user_email: faker.internet.email(),
    user_phone: Math.floor(10000000000 - 1000000000 * Math.random()),
    fundraiser_id: "j0a1b2c3d4e5f6g7h8i9",
    amount: 75,
    transaction_date: "2022-07-15T18:20:00Z",
    status: "completed",
  },
  {
    _id: "615a7ea6f7fcde1f72d2d6fa",
    user_id: "e5f6g7h8i9j0a1b2c3d4",
    user_name: faker.person.fullName(),
    user_email: faker.internet.email(),
    user_phone: Math.floor(10000000000 - 1000000000 * Math.random()),
    fundraiser_id: "b2c3d4e5f6g7h8i9j0a1",
    amount: 120,
    transaction_date: "2022-08-05T11:10:00Z",
    status: "completed",
  },
  {
    _id: "615a7ea6f7fcde1f72d2d6fb",
    user_id: "e5f6g7h8i9j0a1b2c3d4",
    user_name: faker.person.fullName(),
    user_email: faker.internet.email(),
    user_phone: Math.floor(10000000000 - 1000000000 * Math.random()),
    fundraiser_id: "d4e5f6g7h8i9j0a1b2c3",
    amount: 85,
    transaction_date: "2022-09-18T14:30:00Z",
    status: "completed",
  },
  {
    _id: "615a7ea6f7fcde1f72d2d6fc",
    user_id: "e5f6g7h8i9j0a1b2c3d4",
    user_name: faker.person.fullName(),
    user_email: faker.internet.email(),
    user_phone: Math.floor(10000000000 - 1000000000 * Math.random()),
    fundraiser_id: "f6g7h8i9j0a1b2c3d4e5",
    amount: 300,
    transaction_date: "2022-10-12T11:45:00Z",
    status: "completed",
  },
  {
    _id: "615a7ea6f7fcde1f72d2d6fd",
    user_id: "e5f6g7h8i9j0a1b2c3d4",
    user_name: faker.person.fullName(),
    user_email: faker.internet.email(),
    user_phone: Math.floor(10000000000 - 1000000000 * Math.random()),
    fundraiser_id: "h8i9j0a1b2c3d4e5f6g7",
    amount: 70,
    transaction_date: "2022-11-25T17:30:00Z",
    status: "completed",
  },
  {
    _id: "615a7ea6f7fcde1f72d2d6fe",
    user_id: "e5f6g7h8i9j0a1b2c3d4",
    user_name: faker.person.fullName(),
    user_email: faker.internet.email(),
    user_phone: Math.floor(10000000000 - 1000000000 * Math.random()),
    fundraiser_id: "j0a1b2c3d4e5f6g7h8i9",
    amount: 90,
    transaction_date: "2022-12-08T10:20:00Z",
    status: "completed",
  },
  {
    _id: "615a7ea6f7fcde1f72d2d6ff",
    user_id: "e5f6g7h8i9j0a1b2c3d4",
    user_name: faker.person.fullName(),
    user_email: faker.internet.email(),
    user_phone: Math.floor(10000000000 - 1000000000 * Math.random()),
    fundraiser_id: "b2c3d4e5f6g7h8i9j0a1",
    amount: 150,
    transaction_date: "2023-01-14T14:15:00Z",
    status: "completed",
  },
  {
    _id: "615a7ea6f7fcde1f72d2d700",
    user_id: "e5f6g7h8i9j0a1b2c3d4",
    user_name: faker.person.fullName(),
    user_email: faker.internet.email(),
    user_phone: Math.floor(10000000000 - 1000000000 * Math.random()),
    fundraiser_id: "d4e5f6g7h8i9j0a1b2c3",
    amount: 110,
    transaction_date: "2023-02-22T09:30:00Z",
    status: "completed",
  },
];

export { transactionsList };
import jwt from 'jwt-simple';

const nonExpiredToken = jwt.encode(
  {
    sub: 'b6569469-11ca-4fb2-b889-64871ccdc0ab',
    identityId: 'test_jzsbefi_user@tfbnw.net',
    exp: new Date().getTime() / 1000 + 500,
  },
  'xxx'
);

export default {
  access_token: nonExpiredToken,
  refresh_token:
    'eyJraWQiOiIxIiwiYWxnIjoiUlM1MTIifQ.eyJzY29wZXMiOlsiUk9MRV9SRUZSRVNIX1RPS0VOIl0sImp0aSI6ImMyOGQzNTg1LWVlODEtNGQxYS04N2UxLWEwYWI4MDQ3OTUwNCIsImF0aSI6ImFkZjk2ODkwLTkxNWYtNGNmNi04ZWM1LTliM2IyZDEwOTQ3NSIsInN1YiI6ImI2NTY5NDY5LTExY2EtNGZiMi1iODg5LTY0ODcxY2NkYzBhYiIsImlkZW50aXR5SWQiOiJ0ZXN0X2p6c2JlZmlfdXNlcm9uZUB0ZmJudy5uZXQiLCJkZXZpY2VzIjo0LCJ0eXBlIjoicmVnaXN0ZXJlZCIsImNvbmN1cnJlbnQiOjIsImV4cCI6MTUzODAxNzc3MX0.jehkJisxZi9iOMcuJBOFPgy6oxyEQhchrnmI9zF9FhHQdiqUgdjE_JYNaT6wzX8B0PjoA2NJ-jGLdZ7982CTPNit_oErW8KRsUKQJfIumz-n8Q-rxCzNFhWqCHCYgOjV0QJojN0wzuaqj8kIn9dp3fJO2huKTTXeVhjSsXesfLeuxmB5jRc0HK4Zk39qZpA5QkHsgf0TuXFPVcK-BkQLvo6lxAg6gbkDp8IYsQo-PJ6bU9V3887rgAW2HtOi_4Q3nNW5LfVrOJD3OUSGAMVdKemx5wyM2r-9lCmgt4-XLq4ahSjg4R6cUYPFefC43K9z2UWzkU54jWfi-juM60ixew',
  externalId: 'b6569469-11ca-4fb2-b889-64871ccdc0ab',
  isNew: false,
  memberData: {
    id: '101540237469525',
    first_name: 'Test',
    last_name: 'User',
    email: 'test_jzsbefi_user@tfbnw.net',
    name: 'Test User',
    gender: 'male',
    avatarUrl: 'https://graph.facebook.com/101540237469525/picture',
  },
  language: 'en',
  isVip: false,
};

const UserFactory = require("../../src/utils/userFactory");

test("createUser should return Mongoose User model with hashed password", async () => {
    let userInfo = { firstName: "John", lastName: "Smith", email: "john@smith.email.com", password: "password" }
    let user = await UserFactory.createUser(userInfo);

    expect(user).not.toBeNull();
    expect(user.firstName).toBe(userInfo.firstName);
    expect(user.lastName).toBe(userInfo.lastName);
    expect(user.email).toBe(userInfo.email);
    expect(user.password).toEqual(userInfo.password);
})
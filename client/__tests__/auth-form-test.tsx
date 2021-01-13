import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";

import {AuthForm} from "../components/auth-form";

const testProps = {
  name: 'testname',
  displayName: 'display Test Name',
  handleSubmit: () => null,
  error: ''
}

function renderAuthForm(props) {
  return render(<AuthForm />);
}


describe("<AuthForm />", () => {
  test("should have email and password form values", async () => {
    const { findByTestId } = renderAuthForm(testProps);

    const authForm = await findByTestId("auth-form");

 expect(authForm).toHaveFormValues({
   email: "",
   password: "",
  });
});

test("should allow entering an email", async () => {
  const onEmailChange = jest.fn();
  const { findByTestId } = renderAuthForm({ onEmailChange });
  const email = await findByTestId("email");

  fireEvent.change(email, { target: { value: "test" } });

  expect(onEmailChange).toHaveBeenCalledWith("test");
});

test("should allow entering a password", async () => {
  const onPasswordChange = jest.fn();
  const { findByTestId } = renderAuthForm({ onPasswordChange });
  const username = await findByTestId("password");

  fireEvent.change(username, { target: { value: "password" } });

  expect(onPasswordChange).toHaveBeenCalledWith("password");
});

}

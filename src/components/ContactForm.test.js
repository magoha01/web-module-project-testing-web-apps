import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', ()=> {
    render(<ContactForm />);
});

test('renders the contact form header', () => {
    render(<ContactForm />);

    const header = screen.queryByText(/Contact Form/i);
        
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).not.toBeNull();
    
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/First Name*/);
    userEvent.type(firstName, "four");

    const firstNameError = await screen.findAllByTestId("error");
    expect(firstNameError).toHaveLength(1);

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    //firstName
    const firstName = screen.getByLabelText(/First Name*/);
    userEvent.type(firstName, '');
    //lastName
    const lastName = screen.getByLabelText(/Last Name*/);
    userEvent.type(lastName, '');
    //email
    const email = screen.getByLabelText(/Email*/);
    userEvent.type(email, '');

    const submit = screen.getByRole("button");
    userEvent.click(submit);

    const errors = await screen.findAllByTestId("error");
    expect(errors).toHaveLength(3);
});
 
test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    //firstName
    const firstName = screen.getByLabelText(/First Name*/);
    userEvent.type(firstName, "valid");
    //lastName
    const lastName = screen.getByLabelText(/Last Name*/);
    userEvent.type(lastName, "stillvalid");
    //email
    const email = screen.getByLabelText(/Email*/);
    userEvent.type(email, null);

    const submit = screen.getByRole("button");
    userEvent.click(submit);

    const errors = await screen.findAllByTestId("error");
    expect(errors).toHaveLength(1);

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

    render(<ContactForm/>);
    const email = screen.getByLabelText(/Email*/);
    userEvent.type(email, "emailatemaildotcom");
    const emailError = await screen.findByText(/email must be a valid email address/);
    expect(emailError).toBeInTheDocument();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);

    const firstName = screen.getByLabelText(/First Name*/);
    userEvent.type(firstName, "firstName");

    const lastName = screen.getByLabelText(/Last Name*/);
    userEvent.type(lastName, null);

    const email = screen.getByLabelText(/Email*/);
    userEvent.type(email, "email@email.com");

    const submit = screen.getByRole("button");
    userEvent.click(submit);

    const lastNameError = await screen.queryByText(/lastName is a required field/);
    expect(lastNameError).toBeInTheDocument();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/First Name*/);
    userEvent.type(firstName, "firstName");

    const email = screen.getByLabelText(/Email*/);
    userEvent.type(email, "email@email.com");

    const lastName = screen.getByLabelText(/Last Name*/);
    userEvent.type(lastName, "lastName");

    const message = screen.getByLabelText(/Message/);
    userEvent.type(message, '');

    const submit = screen.getByRole("button");
    userEvent.click(submit);


    waitFor(async ()=> {
        const firstNameOutput = screen.queryByText("firstName");
        const lastNameOutput = screen.queryByText("lastName");
        const emailOutput = screen.queryByText("email@email.com");
        const messageOutput = screen.queryByText(message);

        expect(firstNameOutput).toBeInTheDocument();
        expect(firstNameOutput).toBeTruthy();
        expect(firstNameOutput).not.toBeNull();


        expect(lastNameOutput).toBeInTheDocument();
        expect(lastNameOutput).toBeTruthy();
        expect(lastNameOutput).not.toBeNull();

        expect(emailOutput).toBeInTheDocument();
        expect(emailOutput).toBeTruthy();
        expect(emailOutput).not.toBeNull();

        expect(messageOutput).not.toBeInTheDocument();
        expect(messageOutput).not.toBeTruthy();
        expect(messageOutput).toBeNull();
    });
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);

    const firstName = screen.getByLabelText(/First Name*/);
    userEvent.type(firstName, "firstName");

    const email = screen.getByLabelText(/Email*/);
    userEvent.type(email, "email@email.com");

    const lastName = screen.getByLabelText(/Last Name*/);
    userEvent.type(lastName, "lastName");

    const message = screen.getByLabelText(/Message/);
    userEvent.type(message, "this is a message");


    const button = screen.getByRole("button");
    userEvent.click(button);

    waitFor(async ()=> {

        const firstNameOutput = screen.queryByText('firstName');
        const lastNameOutput = screen.queryByText('lastName');
        const emailOutput = screen.queryByText("email@email.com");
        const messageOutput = screen.queryByText('this is a message');

        expect(firstNameOutput).toBeInTheDocument();
        expect(firstNameOutput).toBeTruthy();
        expect(firstNameOutput).not.toBeNull();

        expect(lastNameOutput).toBeInTheDocument();
        expect(lastNameOutput).toBeTruthy();
        expect(lastNameOutput).not.toBeNull();

        expect(emailOutput).toBeInTheDocument();
        expect(emailOutput).toBeTruthy();
        expect(emailOutput).not.toBeNull();

        expect(messageOutput).toBeInTheDocument();
        expect(messageOutput).toBeTruthy();
        expect(messageOutput).not.toBeNull();
});

});
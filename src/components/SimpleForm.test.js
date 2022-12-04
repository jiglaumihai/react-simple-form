import { render, fireEvent, screen } from '@testing-library/react';
import SimpleForm from './SimpleForm';

test("Testing submitting form", () => {
    render(<SimpleForm />);

    const nameInput = screen.getByTestId('name');
    const ageInput = screen.getByTestId('age');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, {target: {value: 'John'}});
    fireEvent.change(ageInput, {target: {value: '20'}});
    fireEvent.click(submitButton);

    const nameResult = screen.getByTestId('name-result');
    const ageResult = screen.getByTestId('age-result');

    expect(nameResult).toHaveTextContent('John');
    expect(ageResult).toHaveTextContent('20');

});

test("Testing reset form button", () => {
    render(<SimpleForm />);

    const nameInput = screen.getByTestId('name');
    const ageInput = screen.getByTestId('age');
    const resetButton = screen.getByTestId('reset-button');

    fireEvent.change(nameInput, {target: {value: 'John'}});
    fireEvent.change(ageInput, {target: {value: '20'}});
    fireEvent.click(resetButton);

    expect(nameInput).toHaveTextContent('');
    expect(ageInput).toHaveTextContent('');
});

test("Testing autofill form", () => {
    render(<SimpleForm />);

    const nameInput = screen.getByTestId('name');
    const ageInput = screen.getByTestId('age');
    const autofill = screen.getByTestId('autofill-button');

    fireEvent.click(autofill);

    expect(nameInput.value).toBe('George');
    expect(ageInput.value).toBe('22');
});
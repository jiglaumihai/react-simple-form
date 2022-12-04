import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

import './SimpleForm.css';


function getFormattedDate(date) {
    const dayFormat = date.getDate() < 10 ? `0${date.getDate()}`:date.getDate();
    const monthFormat = date.getMonth() < 10 ? `0${date.getMonth()}`: date.getMonth();
    return [date.getFullYear(), monthFormat, dayFormat].join('-');
}

const SimpleForm = () => {
    const [enteredName, setEnteredName] = useState('');
    const [enteredNameTouched, setEnteredNameTouched] = useState(false);

    const [enteredAge, setEnteredAge] = useState(0);

    const formattedDate = getFormattedDate(new Date())

    const [enteredBirthday, setEnteredBirthday] = useState(formattedDate);

    const [ageOrBirthday, setAgeOrBirthday] = useState("age");
    const [formSubmitted, setFormSubmitted] = useState(false);

    const enteredNameIsValid = enteredName.trim() !== '';
    const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

    let ageOrBirthdayContent;

    const nameInputChangedHandler = event => {
        setEnteredName(event.target.value);
    }

    const nameInputBlurHandler = event => {
        setEnteredNameTouched(true);
    }

    const ageInputChangedHandler = event => {
        setEnteredAge(event.target.value);
    }

    const birthdayInputChangedHandler = event => {
        setEnteredAge(event.target.value);
    }

    function dummyDataHandler() {
        setEnteredName('George');
        setEnteredAge(22);
        setEnteredBirthday('2000-11-11');
    }

    const formSubmitHandler = event => {
        event.preventDefault();

        setEnteredNameTouched(true);

        if(!enteredNameIsValid) {
            return;
        }

        setFormSubmitted(true);
    }

    const ageOrBirthdayChangeHandler = event => {
        setAgeOrBirthday(event.target.value);
        console.log(event.target.value);
    }

    function resetHandler() {
        setEnteredName('');
        setEnteredAge(0);
        setEnteredBirthday(formattedDate);
        setEnteredNameTouched(false);
        setFormSubmitted(false);
    }

    if(ageOrBirthday === 'age') {
        ageOrBirthdayContent =
            <span>
                <label id="name">Age</label>
                <input
                    type="number"
                    data-testid="age"
                    className="form-control mt-1"
                    placeholder="Enter your age"
                    onChange={ageInputChangedHandler}
                    value={enteredAge}
                    required
                />
            </span>;
    } else if (ageOrBirthday === 'birthday') {
        ageOrBirthdayContent =
            <span>
                <label id="name">Birthday</label>
                <Form.Control
                    type="date"
                    data-testid="birthday"
                    className="form-control mt-1"
                    placeholder="Enter your birthday"
                    onChange={birthdayInputChangedHandler}
                    value={enteredBirthday}
                    required
                />
            </span>;
    }

    return (
        <div className="form-container">
            <form className="form" onSubmit={formSubmitHandler}>
                <div className="form-content">
                    <h3 className="form-title">Simple Form</h3>
                    <div className="form-group mt-3">
                        <label id="name">Full Name</label>
                        <input
                            type="text"
                            data-testid="name"
                            className="form-control mt-1"
                            placeholder="Enter your name"
                            onChange={nameInputChangedHandler}
                            onBlur={nameInputBlurHandler}
                            value={enteredName}
                            required
                        />
                        {nameInputIsInvalid && <p className="error-text">Name must not be empty</p>}
                    </div>
                    <div className="form-group mt-3">
                        <Form.Group controlId="ageOrBirthday">
                            <Form.Check
                                inline
                                value="age"
                                label="Age"
                                name="ageOrBirthday"
                                type="radio"
                                onChange={ageOrBirthdayChangeHandler}
                                checked={ageOrBirthday === "age"}
                            />
                            <Form.Check
                                inline
                                value="birthday"
                                label="Birthday"
                                name="ageOrBirthday"
                                type="radio"
                                onChange={ageOrBirthdayChangeHandler}
                                checked={ageOrBirthday === "birthday"}
                            />
                        </Form.Group>
                    </div>
                    <div className="form-group mt-3">
                        {ageOrBirthdayContent}
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <div className="form-inline form-buttons">
                            <button id="submit-button" type="submit" data-testid="submit-button" className="btn btn-primary">
                                Submit
                            </button>
                            <button id="reset-button" data-testid="reset-button"  onClick={resetHandler} type="button" className="btn btn-danger ml-2">
                                Reset
                            </button>
                            <button id="autofill-button" data-testid="autofill-button" onClick={dummyDataHandler} type="button" className="btn btn-info ml-2">
                                Autofill
                            </button>
                        </div>
                    </div>
                    {formSubmitted && <div className="row">
                        <div className="col-12 mt-4">
                            <h5>Form results</h5>
                            <div className="form-group row">
                                    <p className="col-sm-3">NAME: </p>
                                    <span data-testid="name-result" className="col-sm-3">{enteredName}</span>
                            </div>
                            <div className="form-group row">
                                <p className="col-sm-3">{ageOrBirthday.toLocaleUpperCase()}</p>
                                {ageOrBirthday === 'age' &&<span data-testid="age-result" className="col-sm-3">{enteredAge}</span>}
                                {ageOrBirthday === 'birthday' &&<span className="col-sm-3">{enteredBirthday}</span>}
                            </div>
                        </div>
                    </div>}
                </div>
            </form>
        </div>
    );
}

export default SimpleForm;
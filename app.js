let personData = {
    firstName: NaN,
    lastName: NaN,
    eMail: NaN,
    password: NaN,
};

const createError = (cell_name) => {
    const cellElement = document.querySelector(`.${cell_name}`);
    cellElement.classList.add("empty_cell");
    cellElement.placeholder = "";
};

const createEmpty = (emptyCell, nextCell) => {
    const errorMsg = document.createElement("div");
    errorMsg.classList.add("empty");

    if (emptyCell === "first_name") {
        errorMsg.innerText = "First name cannot be empty";
    } else if (emptyCell === "last_name") {
        errorMsg.innerText = "Last name cannot be empty";
    } else if (emptyCell === "address_e-mail") {
        errorMsg.innerText = "Address email cannot be empty";
    } else if (emptyCell === "password") {
        errorMsg.innerText = "Password cannot be empty";
    }

    const personalForm = document.querySelector("form");
    const nextElement = document.querySelector(`.${nextCell}`);
    const element = personalForm.insertBefore(errorMsg, nextElement);

    createError(`${emptyCell}`);
};

const removeErrors = () => {
    document.querySelectorAll(".empty").forEach((errorDiv) => {
        errorDiv.remove();
    });
    document.querySelectorAll(".empty_cell").forEach((cell) => {
        cell.classList.remove("empty_cell");
    });

    const emailCell = document.querySelector(".address_e-mail");
    emailCell.classList.remove("not_valid_email");
};

const createNotValidEmail = () => {
    const errorMsg = document.createElement("div");
    errorMsg.classList.add("empty");

    errorMsg.innerText = "Look like this is not an email!";

    const personalForm = document.querySelector("form");
    const nextElement = document.querySelector(".password");
    const element = personalForm.insertBefore(errorMsg, nextElement);

    createError("address_e-mail");
    const emailCell = document.querySelector(".address_e-mail");
    emailCell.classList.add("not_valid_email");
};

const validEmail = () => {
    const emailToValid = personData.eMail;
    const resault = emailToValid
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    if (resault === null) {
        createNotValidEmail();
    }
};

const createShortPassword = () => {
    const errorMsg = document.createElement("div");
    errorMsg.classList.add("empty");
    errorMsg.innerText = "Password too short! Minimum 8 signs";

    const personalForm = document.querySelector("form");
    const nextElement = document.querySelector(".submit_button");
    const element = personalForm.insertBefore(errorMsg, nextElement);

    createError("password");
};

const addDataToPerson = () => {
    removeErrors();

    let enteredFirstName = document.querySelector(".first_name");
    personData.firstName = enteredFirstName.value;

    let enteredLastName = document.querySelector(".last_name");
    personData.lastName = enteredLastName.value;

    let enteredEMail = document.querySelector(".address_e-mail");
    personData.eMail = enteredEMail.value;

    let enteredPassword = document.querySelector(".password");
    personData.password = enteredPassword.value;

    if (personData.firstName === "") {
        createEmpty("first_name", "last_name");
    }
    if (personData.lastName === "") {
        createEmpty("last_name", "address_e-mail");
    }
    if (personData.eMail === "") {
        createEmpty("address_e-mail", "password");
    } else {
        validEmail();
    }
    if (personData.password === "") {
        createEmpty("password", "submit_button");
    } else if (personData.password.length < 8) {
        createShortPassword();
    }
};

const submitButton = document.querySelector(".submit_button");
submitButton.addEventListener("click", addDataToPerson);

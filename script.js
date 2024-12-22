
const newBtn = document.getElementById("newBtn");

const popup = document.getElementById("popup");

const section = document.getElementById("section");

const API_URL = '/api/loans';

let RemainingAmount = 0;

function newPerson() {
    popup.classList.add("display");
    popup.style.display = "block";
}

//save function
document.getElementById("btn1").onclick = function() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const form = document.getElementById("form");
    const Name = document.getElementById("Name"); // Ensure the ID matches the form element
    const loanAmount = document.getElementById("loanAmount");
    if (Name.value == null || Name.value == "" || loanAmount.value == null || loanAmount.value == 0 || loanAmount.value == "" || loanAmount.value < 0) {
        window.alert("Enter the details");
    } else {
        Savefunction(Name.value.toUpperCase(), loanAmount.value);
        RemainingAmount = loanAmount.value;
        newDiv = document.createElement("div");
        newDiv.innerHTML = `<div class="viewpart"><h1>Name: ${(Name.value).toUpperCase()}</h1><br><h3>Loan Amount:${loanAmount.value}</h3><br><h2 class="Amount">Remaining Amount:${RemainingAmount}</h2><br><h3>Date:${day}/${month + 1}/${year}</h3><br><button class="repayBtn" onclick="Repay(event , EventHandler)">Repay</button><button class="deletebtn" onclick="Remove(event)">Delete</button><br><h3 id="hty">History</h3><br><div id="History"></div></div>`;
        section.append(newDiv);
        popup.style.display = "none";
        popup.classList.remove("display");
        form.reset();
    }
}

function cancel() {
    popup.style.display = "none";
    popup.classList.remove("display");
}

function Remove(event) {
    event.target.parentElement.remove();
    let parentdataForm = event.target.parentElement.textContent.slice(0, 20).split(":")[1].split("Loan")[0].trim();
    let parentName = `${parentdataForm}`;
    console.log(parentName);
    console.log(event.target.parentElement.textContent);
    Erase(parentName);
}
const RepayPopup = document.getElementById("RepayPopup");

function Repay(event, callback) {
    RepayName = event.target.parentElement.getElementsByTagName("h1")[0].textContent.split(":")[1].trim();
    console.log(event.target.parentElement.getElementsByTagName("h1")[0].textContent.split(":")[1].trim());
    RepayPopup.style.display = "block";
    //event.target.parentElement.getElementsByTagName("h2")[0];
    callback(event.target.parentElement.getElementsByTagName("h2")[0]);
    HistoryDiv = event.target.parentElement.getElementsByTagName("div")[0];
    console.log(HistoryDiv)
}
function EventHandler(event) {
    console.log(event);
    console.log(event.textContent.slice(17));
    eventValue = event;
}

function cancelRepay() {
    RepayPopup.style.display = "none";
}

const RepayAmount = document.getElementById("Repay");
const RepayForm = document.getElementById("RepayForm");

const Amount = document.querySelectorAll(".Amount");
const saveRepayBtn = document.getElementById("saveRepayBtn");


function saveRepay(event) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    let EVENtValue = eventValue.textContent.slice(17);
    oldValue = EVENtValue;
    //console.log(`oldValue${oldValue}`);
    EVENtValue -= RepayAmount.value;

    signCheck = Math.sign(EVENtValue);
    if (signCheck == -1) {
        window.alert("invalid data");
    }
    else {
        console.log(eventValue);
        eventValue.textContent = `Remaining Amount:${EVENtValue}`;
        NewValue = eventValue.textContent.split(":")[1];
        console.log(`NewValue ${NewValue}`);
        
        historyText = `Date:${day}/${month + 1}/${year} on ${RepayAmount.value} rupees Received,`;
        console.log(RepayName);
        updateLoanAmount(RepayName, NewValue , historyText);

        HistoryDiv.innerHTML += `Date:${day}/${month + 1}/${year} on ${RepayAmount.value} rupees Received<br><br>`;
        RepayForm.reset();
        RepayPopup.style.display = "none";
    }


}

const loanForm = document.getElementById('form');
const loanList = document.getElementById('load');

// API Base URL
const APIURL = '/api/loans';

// Fetch and display the count of loans
async function fetchLoanCount() {
    try {
        const response = await fetch(`${APIURL}/count`);
        const data = await response.json();
        count = data.count;
        console.log(`Total loans: ${data.count}`);
    } catch (error) {
        console.error('Error fetching loan count:', error);
    }
}

// Fetch and display all loans
async function fetchLoans() {
    loanList.innerHTML = 'Loading...';
    setTimeout(() => {
    loanList.innerHTML = '';
    },3000);
    try {
        const response = await fetch(APIURL);
        const loans = await response.json();
        console.log(count);
        let space = "    ";
        for (let i = 0; i < count; i++) {

            Newdiv = document.createElement("div");
            Newdiv.innerHTML = `<div class="viewpart"><h1>Name: ${(loans[i].name).toUpperCase()}</h1><br><h3>Loan Amount:${loans[i].loanAmount}</h3><br><h2 class="Amount">Remaining Amount:${loans[i].remainingAmount}</h2><br><h3>Date:${loans[i].dateValue}</h3><br><button class="repayBtn" onclick="Repay(event , EventHandler)">Repay</button><button class="deletebtn" onclick="Remove(event)">Delete</button><br><h3 id="hty">History</h3><br><div id="History">${loans[i].history},${space}</div></div>`

            section.append(Newdiv);
            //console.log(loans);
            //console.log(Newdiv.textContent);
        }
    }
    catch (error) {
        console.error('Error fetching loans:', error);
        loanList.innerHTML = 'Failed to load loans.';
        setTimeout(() => {
            loanList.innerHTML = '';
            },3000);

    }
}



async function Savefunction(name , loanAmount) {
    //e.preventDefault();
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    //const name = document.getElementById('Name');
    //const loanAmount = document.getElementById('loanAmount');

    console.log(name);
    console.log(loanAmount);

    let remainingAmount = loanAmount;
    let dateValue = `${day}/${month + 1}/${year}`;

    console.log(remainingAmount);
    if (name == null || name === "" || loanAmount == null || loanAmount === "" || loanAmount <= 0) {
        console.error('Invalid input values');
        return;
    }

    const loanData = { name, loanAmount, remainingAmount, dateValue, history: "" };

    try {
        const response = await fetch('/api/loans', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loanData)
        });
        if (response.ok) {
            document.getElementById('form').reset();
            //fetchLoans(); // Uncomment if you have a function to fetch and display loans
            fetchLoanCount();
        } else {
            console.error('Error adding loan:', await response.text());
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

async function Erase(name) {
    console.log(name);
    try {
        const response = await fetch(`/api/loans/${name}`, {
            method: 'DELETE'
        });
        if (response.ok) {


        } else {
            console.error('Error deleting loan:', await response.text());
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function updateLoanAmount(name, newLoanAmount, history) {
    if (!newLoanAmount || isNaN(newLoanAmount) || newLoanAmount <= 0) {
        console.error('Invalid loan amount');
        return;
    }

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dateValue = `${day}/${month + 1}/${year}`;

    try {
        const response = await fetch(`/api/loans/${name}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ remainingAmount: parseFloat(newLoanAmount), history, dateValue })
        });
        if (response.ok) {
            fetchLoanCount();

        } else {
            console.error('Error updating loan amount:', await response.text());
        }
    } catch (error) {
        console.error('Error:', error);
    }
}



// Initialize
document.addEventListener("DOMContentLoaded", () => {
    fetchLoanCount();
    fetchLoans();
});
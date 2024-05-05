"use strict";
let isNewUserNameValid = false;
let isNewUserEmailValid = false;
let isNewUserPasswordValid = false;
let isNewUserPhoneValid = false;
let currentLoggedInUser;
let cardNumberAutoIncrementID = 1000;
let travelAutoIncrementID = 2000;
let ticketAutoIncrementID = 3000;
class User {
    constructor(name, email, password, phone) {
        this.CardNumber = "CMRL" + (++cardNumberAutoIncrementID);
        this.Name = name;
        this.Email = email;
        this.Password = password;
        this.Phone = phone;
        this.WalletBalance = 0;
    }
    WalletRecharge(amount) {
        this.WalletBalance += amount;
    }
    WalletDeduct(amount) {
        this.WalletBalance -= amount;
    }
}
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["Booked"] = "Booked";
    BookingStatus["Cancelled"] = "Cancelled";
})(BookingStatus || (BookingStatus = {}));
class Travel {
    constructor(cardNumber, fromLocation, toLocation, date, cost, bookingStatus) {
        this.TravelID = "TID" + (++travelAutoIncrementID);
        this.CardNumber = cardNumber;
        this.FromLocation = fromLocation;
        this.ToLocation = toLocation;
        this.Date = date;
        this.Cost = cost;
        this.BookingStatus = bookingStatus;
    }
}
class TicketFair {
    constructor(fromLocation, toLocation, fair) {
        this.TicketID = "MR" + (++ticketAutoIncrementID);
        this.FromLocation = fromLocation;
        this.ToLocation = toLocation;
        this.Fair = fair;
    }
}
let userDetailsList = new Array();
let travelDetailsList = new Array();
let ticketFairDetailsList = new Array();
userDetailsList.push(new User("Ravi", "Ravi@gmail.com", "Ravi@123", 7539585395));
userDetailsList.push(new User("Baskaran", "Baskaran@gmail.com", "Baskaran@123", 8649709958));
travelDetailsList.push(new Travel("CMRL1001", "Airport", "Egmore", new Date(2023, 10, 10), 55, BookingStatus.Booked));
travelDetailsList.push(new Travel("CMRL1001", "Egmore", "Koyambedu", new Date(2023, 10, 10), 32, BookingStatus.Booked));
travelDetailsList.push(new Travel("CMRL1002", "Alandur", "Koyambedu", new Date(2023, 11, 10), 25, BookingStatus.Cancelled));
travelDetailsList.push(new Travel("CMRL1002", "Arumbakkam", "Egmore", new Date(2023, 11, 10), 25, BookingStatus.Booked));
ticketFairDetailsList.push(new TicketFair("Airport", "Egmore", 55));
ticketFairDetailsList.push(new TicketFair("Airport", "Koyambedu", 25));
ticketFairDetailsList.push(new TicketFair("Alandur", "Koyambedu", 25));
ticketFairDetailsList.push(new TicketFair("Koyambedu", "Egmore", 32));
ticketFairDetailsList.push(new TicketFair("Vadapalani", "Egmore", 45));
ticketFairDetailsList.push(new TicketFair("Arumbakkam", "Egmore", 25));
ticketFairDetailsList.push(new TicketFair("Vadapalani", "Koyambedu", 25));
ticketFairDetailsList.push(new TicketFair("Arumbakkam", "Koyambedu", 16));
function indexPage() {
    let indexPage = document.getElementById("indexPage");
    let signUpPage = document.getElementById("signUpPage");
    let loginPage = document.getElementById("loginPage");
    indexPage.style.display = "block";
    signUpPage.style.display = "none";
    loginPage.style.display = "none";
}
function signUpPage() {
    let indexPage = document.getElementById("indexPage");
    let signUpPage = document.getElementById("signUpPage");
    indexPage.style.display = "none";
    signUpPage.style.display = "block";
}
function signUp() {
    let newUserName = document.getElementById("newUserName");
    let newUserEmail = document.getElementById("newUserEmail");
    let newUserPhone = document.getElementById("newUserPhone");
    let newUserPassword = document.getElementById("newUserPassword");
    if (isNewUserNameValid && isNewUserEmailValid && isNewUserPasswordValid && isNewUserPhoneValid) {
        var user = new User(newUserName.value.trim(), newUserEmail.value.trim(), newUserPassword.value.trim(), parseInt(newUserPhone.value.trim()));
        userDetailsList.push(user);
        currentLoggedInUser = user;
        homePage();
    }
    else {
        alert("Please fill out the form completely");
    }
}
function loginPage() {
    let indexPage = document.getElementById("indexPage");
    let loginPage = document.getElementById("loginPage");
    indexPage.style.display = "none";
    loginPage.style.display = "block";
}
function login() {
    let userMail = document.getElementById("userMail");
    let userPassword = document.getElementById("userPassword");
    let isValidUser = true;
    userDetailsList.forEach(element => {
        if (element.Email === userMail.value.trim() && element.Password === userPassword.value.trim()) {
            isValidUser = false;
            currentLoggedInUser = element;
            homePage();
        }
    });
    if (isValidUser) {
        alert("Invalid Credentials");
    }
}
function homePage() {
    let indexPage = document.getElementById("indexPage");
    let loginPage = document.getElementById("loginPage");
    let signUpPage = document.getElementById("signUpPage");
    let homePage = document.getElementById("homePage");
    indexPage.style.display = "none";
    loginPage.style.display = "none";
    signUpPage.style.display = "none";
    homePage.style.display = "block";
    welcomePage();
}
function welcomePage() {
    let welcomePage = document.getElementById("welcomePage");
    let greet = document.getElementById("greet");
    let ticketFairPage = document.getElementById("ticketFairPage");
    let travelPage = document.getElementById("travelPage");
    let travelHistoryPage = document.getElementById("travelHistoryPage");
    let walletRechargePage = document.getElementById("walletRechargePage");
    let showBalancePage = document.getElementById("showBalancePage");
    let cancelPage = document.getElementById("cancelPage");
    greet.innerHTML = `Welcome ${currentLoggedInUser.Name} !`;
    ticketFairPage.style.display = "none";
    travelPage.style.display = "none";
    travelHistoryPage.style.display = "none";
    walletRechargePage.style.display = "none";
    showBalancePage.style.display = "none";
    cancelPage.style.display = "none";
    welcomePage.style.display = "block";
}
function ticketFairPage() {
    let welcomePage = document.getElementById("welcomePage");
    let ticketFairPage = document.getElementById("ticketFairPage");
    let travelHistoryPage = document.getElementById("travelHistoryPage");
    let travelPage = document.getElementById("travelPage");
    let walletRechargePage = document.getElementById("walletRechargePage");
    let showBalancePage = document.getElementById("showBalancePage");
    let cancelPage = document.getElementById("cancelPage");
    welcomePage.style.display = "none";
    travelHistoryPage.style.display = "none";
    travelPage.style.display = "none";
    walletRechargePage.style.display = "none";
    showBalancePage.style.display = "none";
    cancelPage.style.display = "none";
    ticketFairPage.style.display = "block";
    if (ticketFairDetailsList != null) {
        ticketFairPage.innerHTML = "null";
        ticketFairPage.innerHTML = `<h1>Ticket Fair Details</h1><table cellpadding=\"5px\" border=\"2px\" id=\"ticketFairTable\"><tr><th>From Location</th><th>To Location</th><th>Fair</th></tr></table>`;
        let ticketFairTable = document.getElementById("ticketFairTable");
        ticketFairDetailsList.forEach(element => {
            ticketFairTable.innerHTML += `<tr><td>${element.FromLocation}</td><td>${element.ToLocation}</td><td>${element.Fair}</td></tr>`;
        });
    }
    else {
        ticketFairPage.innerHTML = `<h1>No Tickets Available</h1>`;
    }
}
function travelPage() {
    let welcomePage = document.getElementById("welcomePage");
    let ticketFairPage = document.getElementById("ticketFairPage");
    let travelPage = document.getElementById("travelPage");
    let travelHistoryPage = document.getElementById("travelHistoryPage");
    let walletRechargePage = document.getElementById("walletRechargePage");
    let showBalancePage = document.getElementById("showBalancePage");
    let cancelPage = document.getElementById("cancelPage");
    welcomePage.style.display = "none";
    ticketFairPage.style.display = "none";
    travelHistoryPage.style.display = "none";
    walletRechargePage.style.display = "none";
    showBalancePage.style.display = "none";
    cancelPage.style.display = "none";
    travelPage.style.display = "block";
    if (ticketFairDetailsList != null) {
        travelPage.innerHTML = "null";
        travelPage.innerHTML = `<h1>Book Ticket to Travel</h1><br><table cellpadding=\"5px\" border=\"2px\" id=\"ticketBookTable\"><tr><th>From Location</th><th>To Location</th><th>Fair</th><th>Action</th></tr></table>`;
        let ticketBookTable = document.getElementById("ticketBookTable");
        ticketFairDetailsList.forEach(element => {
            ticketBookTable.innerHTML += `<tr><td>${element.FromLocation}</td><td>${element.ToLocation}</td><td>${element.Fair}</td><td><button onclick=\"travel('${element.TicketID}')\">Book</button></td></tr>`;
        });
    }
    else {
        travelPage.innerHTML = `<h1>No Tickets Available</h1>`;
    }
}
function travel(id) {
    let isWalletBalanceAvailable = true;
    ticketFairDetailsList.forEach(element => {
        if (element.TicketID === id) {
            if (currentLoggedInUser.WalletBalance >= element.Fair) {
                isWalletBalanceAvailable = false;
                currentLoggedInUser.WalletDeduct(element.Fair);
                travelDetailsList.push(new Travel(currentLoggedInUser.CardNumber, element.FromLocation, element.ToLocation, new Date(), element.Fair, BookingStatus.Booked));
                alert("Ticket Booked Happy Journey :)");
            }
        }
    });
    if (isWalletBalanceAvailable) {
        alert("Insufficient Balance Please Recharge your Wallet");
    }
}
function cancelPage() {
    let welcomePage = document.getElementById("welcomePage");
    let ticketFairPage = document.getElementById("ticketFairPage");
    let travelPage = document.getElementById("travelPage");
    let travelHistoryPage = document.getElementById("travelHistoryPage");
    let walletRechargePage = document.getElementById("walletRechargePage");
    let showBalancePage = document.getElementById("showBalancePage");
    let cancelPage = document.getElementById("cancelPage");
    welcomePage.style.display = "none";
    ticketFairPage.style.display = "none";
    travelHistoryPage.style.display = "none";
    travelPage.style.display = "none";
    walletRechargePage.style.display = "none";
    showBalancePage.style.display = "none";
    cancelPage.style.display = "block";
    let isUserTravelled = false;
    travelDetailsList.forEach(element => {
        if (element.CardNumber === currentLoggedInUser.CardNumber && element.BookingStatus === "Booked") {
            isUserTravelled = true;
        }
    });
    cancelPage.innerHTML = "null";
    if (isUserTravelled) {
        cancelPage.innerHTML = `<h1>Cancel Ticket</h1><table border=\"2px\" cellpadding=\"8px\" id=\"cancelTicketTable\"><tr><th>From Location</th><th>To Location</th><th>Date</th><th>Travel Cost</th><th>Booking Status</th><th>Action</th></tr></table>`;
        let cancelTicketTable = document.getElementById("cancelTicketTable");
        travelDetailsList.forEach(element => {
            if (element.CardNumber === currentLoggedInUser.CardNumber && element.BookingStatus === BookingStatus.Booked) {
                cancelTicketTable.innerHTML += `<tr><td>${element.FromLocation}</td><td>${element.ToLocation}</td><td>${element.Date.toLocaleDateString()}</td><td>${element.Cost}</td><td>${element.BookingStatus}</td><td><button onclick=\"cancel('${element.TravelID}')\">Cancel</button></td></tr>`;
            }
        });
    }
    else {
        cancelPage.innerHTML = `<h1>No Tickets Booked To Cancel</h1>`;
    }
}
function cancel(id) {
    travelDetailsList.forEach(element => {
        if (id === element.TravelID) {
            element.BookingStatus = BookingStatus.Cancelled;
            currentLoggedInUser.WalletRecharge(element.Cost);
            alert("Ticket Cancelled Successfully and Your Wallet Balance is Updated");
            cancelPage();
        }
    });
}
function travelHistoryPage() {
    let welcomePage = document.getElementById("welcomePage");
    let ticketFairPage = document.getElementById("ticketFairPage");
    let travelPage = document.getElementById("travelPage");
    let travelHistoryPage = document.getElementById("travelHistoryPage");
    let walletRechargePage = document.getElementById("walletRechargePage");
    let showBalancePage = document.getElementById("showBalancePage");
    let cancelPage = document.getElementById("cancelPage");
    welcomePage.style.display = "none";
    ticketFairPage.style.display = "none";
    travelPage.style.display = "none";
    walletRechargePage.style.display = "none";
    showBalancePage.style.display = "none";
    cancelPage.style.display = "none";
    travelHistoryPage.style.display = "block";
    let isUserTravelled = false;
    travelDetailsList.forEach(element => {
        if (element.CardNumber === currentLoggedInUser.CardNumber) {
            isUserTravelled = true;
        }
    });
    travelHistoryPage.innerHTML = "null";
    if (isUserTravelled) {
        travelHistoryPage.innerHTML = `<h1>Travel History</h1><table border=\"2px\" cellpadding=\"8px\" id=\"travelHistory\"><tr><th>From Location</th><th>To Location</th><th>Date</th><th>Travel Cost</th><th>Booking Status</th></tr></table>`;
        let travelHistory = document.getElementById("travelHistory");
        travelDetailsList.forEach(element => {
            if (element.CardNumber === currentLoggedInUser.CardNumber) {
                travelHistory.innerHTML += `<tr><td>${element.FromLocation}</td><td>${element.ToLocation}</td><td>${element.Date.toLocaleDateString()}</td><td>${element.Cost}</td><td>${element.BookingStatus}</td></tr>`;
            }
        });
    }
    else {
        travelHistoryPage.innerHTML = `<h1>No Travel History To Show</h1>`;
    }
}
function walletRechargePage() {
    let welcomePage = document.getElementById("welcomePage");
    let ticketFairPage = document.getElementById("ticketFairPage");
    let travelPage = document.getElementById("travelPage");
    let travelHistoryPage = document.getElementById("travelHistoryPage");
    let walletRechargePage = document.getElementById("walletRechargePage");
    let rechargeMessage = document.getElementById("rechargeMessage");
    let showBalancePage = document.getElementById("showBalancePage");
    let cancelPage = document.getElementById("cancelPage");
    welcomePage.style.display = "none";
    ticketFairPage.style.display = "none";
    travelHistoryPage.style.display = "none";
    travelPage.style.display = "none";
    showBalancePage.style.display = "none";
    rechargeMessage.style.display = "none";
    cancelPage.style.display = "none";
    walletRechargePage.style.display = "block";
    walletRechargePage.style.margin = "5em";
}
function recharge() {
    let amount = document.getElementById("amount");
    let rechargeMessage = document.getElementById("rechargeMessage");
    if (parseInt(amount.value) > 0) {
        currentLoggedInUser.WalletRecharge(parseInt(amount.value));
        rechargeMessage.style.display = "block";
        rechargeMessage.innerHTML = `<h1>Wallet Recharged with amount ${amount.value} ...</h1>`;
    }
    else {
        alert("Invalid Amount Please enter valid Amount");
    }
}
function showBalancePage() {
    let welcomePage = document.getElementById("welcomePage");
    let ticketFairPage = document.getElementById("ticketFairPage");
    let travelPage = document.getElementById("travelPage");
    let travelHistoryPage = document.getElementById("travelHistoryPage");
    let walletRechargePage = document.getElementById("walletRechargePage");
    let showBalancePage = document.getElementById("showBalancePage");
    let balanceMessage = document.getElementById("balanceMessage");
    let cancelPage = document.getElementById("cancelPage");
    welcomePage.style.display = "none";
    ticketFairPage.style.display = "none";
    travelHistoryPage.style.display = "none";
    travelPage.style.display = "none";
    walletRechargePage.style.display = "none";
    cancelPage.style.display = "none";
    showBalancePage.style.display = "block";
    balanceMessage.innerHTML = `Available Balance in Your Wallet is ${currentLoggedInUser.WalletBalance}`;
    balanceMessage.style.marginTop = "5em";
    balanceMessage.style.textAlign = "center";
}
function checkUserName(id) {
    let newUserName = document.getElementById(id);
    let newUserNameMessage = document.getElementById(id + "Message");
    if ((/^[a-zA-Z][^\d\W]{2,20}/).test(newUserName.value.trim())) {
        newUserNameMessage.style.visibility = "hidden";
        isNewUserNameValid = true;
    }
    else {
        newUserNameMessage.innerHTML = "Please enter a valid name";
        newUserNameMessage.style.visibility = "visible";
        newUserNameMessage.style.color = "red";
        newUserNameMessage.style.marginLeft = "1em";
        newUserNameMessage.style.fontSize = "20px";
        newUserNameMessage.style.verticalAlign = "middle";
    }
}
function checkUserEmail(id) {
    let newUserEmail = document.getElementById(id);
    let newUserEmailMessage = document.getElementById(id + "Message");
    if ((/^([\w\-\.]+)@([\w-]+\.)+[\w-]{2,}$/).test(newUserEmail.value.trim())) {
        newUserEmailMessage.style.visibility = "hidden";
        isNewUserEmailValid = true;
    }
    else {
        newUserEmailMessage.innerHTML = "Please enter a valid mail";
        newUserEmailMessage.style.visibility = "visible";
        newUserEmailMessage.style.color = "red";
        newUserEmailMessage.style.marginLeft = "1em";
        newUserEmailMessage.style.fontSize = "20px";
        newUserEmailMessage.style.verticalAlign = "middle";
    }
}
function checkUserPhone(id) {
    let newUserPhone = document.getElementById(id);
    let newUserPhoneMessage = document.getElementById(id + "Message");
    if ((/^[6789]\d{9}$/).test(newUserPhone.value.trim())) {
        newUserPhoneMessage.style.visibility = "hidden";
        isNewUserPhoneValid = true;
    }
    else {
        newUserPhoneMessage.innerHTML = "Please enter a valid Number";
        newUserPhoneMessage.style.visibility = "visible";
        newUserPhoneMessage.style.color = "red";
        newUserPhoneMessage.style.marginLeft = "1em";
        newUserPhoneMessage.style.fontSize = "20px";
        newUserPhoneMessage.style.verticalAlign = "middle";
    }
}
let userPassword = "";
function checkUserPassword(id) {
    let newUserPassword = document.getElementById(id);
    let newUserPasswordMessage = document.getElementById(id + "Message");
    if ((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(newUserPassword.value.trim())) {
        newUserPasswordMessage.style.visibility = "hidden";
        userPassword = newUserPassword.value;
    }
    else {
        newUserPasswordMessage.innerHTML = "Please Create min 8 character Strong password";
        newUserPasswordMessage.style.visibility = "visible";
        newUserPasswordMessage.style.color = "red";
        newUserPasswordMessage.style.marginLeft = "1em";
        newUserPasswordMessage.style.fontSize = "20px";
        newUserPasswordMessage.style.verticalAlign = "middle";
    }
}
function confirmPassword(id) {
    let confirmPassword = document.getElementById(id);
    let confirmPasswordMessage = document.getElementById(id + "Message");
    if (userPassword === confirmPassword.value.trim()) {
        confirmPasswordMessage.style.visibility = "hidden";
        isNewUserPasswordValid = true;
    }
    else {
        confirmPasswordMessage.innerHTML = "Wrong Password";
        confirmPasswordMessage.style.visibility = "visible";
        confirmPasswordMessage.style.color = "red";
        confirmPasswordMessage.style.marginLeft = "1em";
        confirmPasswordMessage.style.fontSize = "20px";
        confirmPasswordMessage.style.verticalAlign = "middle";
    }
}
//# sourceMappingURL=metroCard.js.map
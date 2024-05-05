let userIDAutoIncrement = 1000;
let medicineIDAutoIncrement = 100;
let orderIDAutoIncrement = 3000;

let currentLoggedInUser: User;

let isNewUserMailValid = false;
let isNewUserPasswordValid = false;
let isNewUserNameValid = false;

class User {
    readonly UserID: string;
    UserName: string
    UserMailID: string;
    UserPassword: string;
    WalletBalance: number;

    constructor(userName: string, userMailID: string, userPassword: string) {
        this.UserID = "UID" + (++userIDAutoIncrement);
        this.UserName = userName;
        this.UserMailID = userMailID;
        this.UserPassword = userPassword;
        this.WalletBalance = 0;
    }

    WalletRecharge(amount: number): void {
        this.WalletBalance += amount;
    }
}

class Medicine {
    readonly MedicineID: string;
    MedicineName: string;
    AvailableCount: number;
    Price: number;
    DateOfExpiry: Date;

    constructor(medicineName: string, availableCount: number, price: number, dateOfExpiry: Date) {
        this.MedicineID = "MD" + (++medicineIDAutoIncrement);
        this.MedicineName = medicineName;
        this.AvailableCount = availableCount;
        this.Price = price;
        this.DateOfExpiry = dateOfExpiry;
    }
}

enum OrderStatus { Purchased = "Ordered", Cancelled = "Cancelled" };
class Order {
    readonly OrderID: string;
    UserID: string;
    MedicineID: string;
    MedicineCount: number
    TotalPrice: number;
    OrderDate: Date;
    OrderStatus: OrderStatus;

    constructor(userID: string, medicineID: string, medicineCount: number, totalPrice: number, orderDate: Date, orderStatus: OrderStatus) {
        this.OrderID = "OID" + (++orderIDAutoIncrement);
        this.UserID = userID;
        this.MedicineID = medicineID;
        this.MedicineCount = medicineCount;
        this.TotalPrice = totalPrice;
        this.OrderDate = orderDate;
        this.OrderStatus = orderStatus;
    }
}

let UserDetailsList: Array<User> = new Array<User>();

UserDetailsList.push(new User("Ravi", "Ravi@gmail.com", "Ravi@123"));
UserDetailsList.push(new User("Baskaran", "Baskaran@gmail.com", "Baskaran@123"));

let MedicineDetailsList: Array<Medicine> = new Array<Medicine>();

MedicineDetailsList.push(new Medicine("Paracitamol", 40, 5, new Date(2024, 6, 30)));
MedicineDetailsList.push(new Medicine("Calpol", 10, 5, new Date(2024, 5, 30)));
MedicineDetailsList.push(new Medicine("Gelucil", 3, 40, new Date(2023, 4, 30)));
MedicineDetailsList.push(new Medicine("Metrogel", 5, 50, new Date(2024, 12, 30)));
MedicineDetailsList.push(new Medicine("Povidin Iodin", 10, 50, new Date(2024, 10, 30)));

let OrderDetailsList: Array<Order> = new Array<Order>();
OrderDetailsList.push(new Order("UID1001", "MD101", 3, 15, new Date(2022, 11, 13), OrderStatus.Purchased));
OrderDetailsList.push(new Order("UID1001", "MD102", 2, 10, new Date(2022, 11, 13), OrderStatus.Cancelled));
OrderDetailsList.push(new Order("UID1001", "MD104", 2, 100, new Date(2022, 11, 13), OrderStatus.Purchased));
OrderDetailsList.push(new Order("UID1002", "MD103", 3, 120, new Date(2022, 11, 15), OrderStatus.Cancelled));
OrderDetailsList.push(new Order("UID1002", "MD105", 5, 250, new Date(2022, 11, 15), OrderStatus.Purchased));
OrderDetailsList.push(new Order("UID1002", "MD102", 3, 15, new Date(2022, 11, 15), OrderStatus.Purchased));

function SignUpPage() {
    let indexPage = document.getElementById("home") as HTMLDivElement;
    indexPage.style.display = "none";

    let signUpPage = document.getElementById("signup") as HTMLDivElement;
    signUpPage.style.display = "block";
}

function SignUp() {
    let newUserName = document.getElementById("userName") as HTMLInputElement;
    let newUserMailID = document.getElementById("signupEmail") as HTMLInputElement;
    let newUserPassword = document.getElementById("signupConfirmPassword") as HTMLInputElement;

    if (isNewUserMailValid && isNewUserPasswordValid && isNewUserNameValid) {
        let user = new User(newUserName.value, newUserMailID.value, newUserPassword.value);
        UserDetailsList.push(user);
        currentLoggedInUser = user;
        HomePage();
    }
    else {
        alert("Please fill out the form fully");
    }

}
function SignInPage() {
    let indexPage = document.getElementById("home") as HTMLDivElement;
    indexPage.style.display = "none";

    let signInPage = document.getElementById("signin") as HTMLDivElement;
    signInPage.style.display = "block";
}

function SignIn() {
    let userMailID = document.getElementById("signinEmail") as HTMLInputElement;
    let userPassword = document.getElementById("signinPassword") as HTMLInputElement;

    let isValidUser = true;

    UserDetailsList.forEach(element => {
        if (userMailID.value === (element.UserMailID) && userPassword.value === (element.UserPassword)) {
            isValidUser = false;
            currentLoggedInUser = element;
            HomePage();
        }
    });

    if (isValidUser) {
        alert("Invalid Credentials");
    }
}

function HomePage() {
    let mainPage = document.getElementById("page") as HTMLDivElement;
    let homePage = document.getElementById("homePage") as HTMLDivElement;

    mainPage.style.display = "none";
    homePage.style.display = "block";
    WelcomePage();
}

function MedicineDetails() {
    let medicinesDiv = document.getElementById("medicinesDiv") as HTMLDivElement;
    medicinesDiv.style.display = "block";
    let welcomePage = document.getElementById("welcome") as HTMLDivElement;
    welcomePage.style.display = "none";
    let purchasePage = document.getElementById("purchase") as HTMLDivElement;
    purchasePage.style.display = "none";
    let walletRechargePage = document.getElementById("walletRechargePage") as HTMLDivElement;
    walletRechargePage.style.display = "none";
    let showBalancePage = document.getElementById("showWalletBalance") as HTMLDivElement;
    showBalancePage.style.display = "none";
    let orderHistoryPage = document.getElementById("orderHistoryPage") as HTMLDivElement;
    orderHistoryPage.style.display = "none";
    let cancelOrderPage = document.getElementById("cancelOrderPage") as HTMLDivElement;
    cancelOrderPage.style.display = "none";
    let editDiv = document.getElementById("editDiv") as HTMLDivElement;
    editDiv.style.display = "none";

    medicinesDiv.innerHTML = "null";
    medicinesDiv.innerHTML = "<br><button onclick=\"AddMedicineDiv()\" id=\"AddButton\" style=\"color:blue;width:7%;height:2em;margin-left:6em;\">Add Medicine</button><table border=\"2px\" id=\"medicineDetails\"><tr><th>Medicine Name</th><th>Available Count</th><th>Price</th><th>Date of Expiry</th><th>Action</th></tr></table>";

    let addButton=document.getElementById("AddButton") as HTMLButtonElement;
    addButton.style.display="block";
    let n = 1;
    let medicineTable = document.getElementById("medicineDetails") as HTMLTableElement;
    MedicineDetailsList.forEach(element => {
        medicineTable.innerHTML += `<tr><td>${element.MedicineName}</td><td>${element.AvailableCount}</td><td>${element.Price}</td><td>${element.DateOfExpiry.toLocaleDateString()}</td><td><button onclick=\"EditDiv(${n})\" style="color:blue;width:50%;height:2em;margin-bottom:1em;">Edit</button><br><button onclick=\"Delete(${n})\" style="color:red;width:50%;height:2em" >Delete</button></td></tr>`;
        n++;
    });
}

function CheckNewUserEmail(id: string) {
    let newUserMailID = document.getElementById(id) as HTMLInputElement;
    let newUserMailIDMessage = document.getElementById(id + "Message") as HTMLLabelElement;

    if ((/^([\w\-\.]+)@([\w-]+\.)+[\w-]{2,}$/).test(newUserMailID.value)) {
        newUserMailIDMessage.style.visibility = "hidden";
        isNewUserMailValid = true;
    }
    else {
        newUserMailIDMessage.innerHTML = "Please enter a Valid email";
        newUserMailIDMessage.style.color = "red";
        newUserMailIDMessage.style.visibility = "visible";
        newUserMailIDMessage.style.fontSize = "20px"
    }
}

function CheckNewUserName(id: string) {
    let newUserName = document.getElementById(id) as HTMLInputElement;
    let newUserNameMessage = document.getElementById(id + "Message") as HTMLLabelElement;

    if ((/[a-zA-Z]{2,25}$/).test(newUserName.value)) {
        newUserNameMessage.style.visibility = "hidden";
        isNewUserNameValid = true;
    }
    else {
        newUserNameMessage.innerHTML = "Please enter a Valid name";
        newUserNameMessage.style.color = "red";
        newUserNameMessage.style.visibility = "visible";
        newUserNameMessage.style.fontSize = "20px"
    }
}

function CheckNewUserPassword(id: string) {
    let newUserPassword = document.getElementById(id) as HTMLInputElement;
    let newUserPasswordMessage = document.getElementById(id + "Message") as HTMLLabelElement;

    if ((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(newUserPassword.value)) {
        newUserPasswordMessage.style.visibility = "hidden";
    }
    else {
        newUserPasswordMessage.innerHTML = "Please enter the strong password ";
        newUserPasswordMessage.style.color = "red";
        newUserPasswordMessage.style.visibility = "visible";
        newUserPasswordMessage.style.fontSize = "20px"
    }
}

function CheckNewUserConfirmPassword(id: string) {
    let newUserPassword = document.getElementById("signupPassword") as HTMLInputElement;
    let newUserConfirmPassword = document.getElementById("signupConfirmPassword") as HTMLInputElement;
    let newUserConfirmPasswordMessage = document.getElementById(id + "Message") as HTMLLabelElement;

    if (newUserPassword.value === newUserConfirmPassword.value) {
        newUserConfirmPasswordMessage.style.visibility = "hidden";
        isNewUserPasswordValid = true;
    }
    else {
        newUserConfirmPasswordMessage.innerHTML = "Password doesn't Match";
        newUserConfirmPasswordMessage.style.color = "red";
        newUserConfirmPasswordMessage.style.visibility = "visible";
        newUserConfirmPasswordMessage.style.fontSize = "20px"
    }
}

function Back(id: string) {
    let backToMainPage = document.getElementById(id) as HTMLDivElement;
    backToMainPage.style.display = "none";

    let mainPage = document.getElementById("home") as HTMLDivElement;
    mainPage.style.display = "block";
}

function PurchasePage() {
    let medicinesDiv = document.getElementById("medicinesDiv") as HTMLDivElement;
    medicinesDiv.style.display = "none";

    let welcomePage = document.getElementById("welcome") as HTMLDivElement;
    welcomePage.style.display = "none";

    let purchasePage = document.getElementById("purchase") as HTMLDivElement;
    purchasePage.style.display = "block";

    let showBalancePage = document.getElementById("showWalletBalance") as HTMLDivElement;
    showBalancePage.style.display = "none";

    let walletRechargePage = document.getElementById("walletRechargePage") as HTMLDivElement;
    walletRechargePage.style.display = "none";

    let orderHistoryPage = document.getElementById("orderHistoryPage") as HTMLDivElement;
    orderHistoryPage.style.display = "none";

    let cancelOrderPage = document.getElementById("cancelOrderPage") as HTMLDivElement;
    cancelOrderPage.style.display = "none";

    let editDiv = document.getElementById("editDiv") as HTMLDivElement;
    editDiv.style.display = "none";

    let count = document.getElementById("requiredCount") as HTMLDivElement;
    count.style.display="none";

    let medicineDetailsDiv = document.getElementById("purchaseDetails") as HTMLDivElement;
    medicineDetailsDiv.innerHTML = "null";
    medicineDetailsDiv.innerHTML = "<table style=\"width:80%;text-align:center;\"border=\"2px\" id=\"medicineTable\"><tr><th>Medicine Name</th><th>Available Count</th><th>Price</th><th>Date of Expiry</th><th>Action</th></tr></table>";

    let n = 1;;
    let medicinesTable = document.getElementById("medicineTable") as HTMLTableElement;
    MedicineDetailsList.forEach(element => {
        if (element.DateOfExpiry >= new Date() && element.AvailableCount > 0) {
            medicinesTable.innerHTML += `<tr><td>${element.MedicineName}</td><td>${element.AvailableCount}</td><td>${element.Price}</td><td>${element.DateOfExpiry.toLocaleDateString()}</td><td><button onclick=\"Buy(${n})\" style="color:blue;width:30%;height:2em">Buy</button></td></tr>`;
        }
        n++;
    });

}

function Buy(id: number) {
    let count = document.getElementById("requiredCount") as HTMLDivElement;
    count.style.display="block";
    count.style.visibility = "visible";
    count.style.fontSize="20px";
    count.style.marginLeft="4em";

    let purchaseButton = document.getElementById("purchaseButton") as HTMLDivElement;

    purchaseButton.innerHTML = `<button type=\"submit\" onclick=\"Purchase(${id})\">Purchase</button>`;
}
function Purchase(id: number) {
    let requiredCount = document.getElementById("count") as HTMLInputElement;
    let purchase = false;
    let n = 1;
    MedicineDetailsList.forEach(element => {
        if (n == id) {
            if (element.AvailableCount >= parseInt(requiredCount.value)) {
                if (currentLoggedInUser.WalletBalance >= element.Price * parseInt(requiredCount.value)) {
                    element.AvailableCount -= parseInt(requiredCount.value);
                    currentLoggedInUser.WalletBalance -= element.Price * parseInt(requiredCount.value);
                    OrderDetailsList.push(new Order(currentLoggedInUser.UserID, element.MedicineID, parseInt(requiredCount.value), element.Price * parseInt(requiredCount.value), new Date(), OrderStatus.Purchased));
                    alert(`${requiredCount.value} ${element.MedicineName} Purchased Successfully`);
                    PurchasePage();
                }
                else {
                    alert("Insufficient Balance Please recharge your wallet");
                }
            }
            else {
                purchase = confirm(`We have only ${element.AvailableCount} ${element.MedicineName} Do you want to Purchase ${element.AvailableCount} ${element.MedicineName} ? `)
                if (purchase) {
                    if (currentLoggedInUser.WalletBalance >= element.Price * parseInt(requiredCount.value)) {
                        currentLoggedInUser.WalletBalance -= element.Price * parseInt(requiredCount.value);
                        OrderDetailsList.push(new Order(currentLoggedInUser.UserID, element.MedicineID, element.AvailableCount, element.Price * parseInt(requiredCount.value), new Date(), OrderStatus.Purchased));
                        alert(`${element.AvailableCount} ${element.MedicineName} Purchased Successfully`);
                        element.AvailableCount = 0;
                        PurchasePage();
                    }
                    else {
                        alert("Insufficient Balance Please recharge your wallet");
                    }
                }
            }
        }
        n++;
    });
}
function WelcomePage() {
    let greet = document.getElementById("welcome") as HTMLDivElement;
    greet.innerHTML = `<h2 style="text-align:center;font-size:3rem;">Welcome ${currentLoggedInUser.UserName} !</h2>`

    let welcomePage = document.getElementById("welcome") as HTMLDivElement;
    welcomePage.style.display = "block";
    let purchasePage = document.getElementById("purchase") as HTMLDivElement;
    purchasePage.style.display = "none";
    let medicinesDiv = document.getElementById("medicinesDiv") as HTMLDivElement;
    medicinesDiv.style.display = "none";
    let walletRechargePage = document.getElementById("walletRechargePage") as HTMLDivElement;
    walletRechargePage.style.display = "none";
    let showBalancePage = document.getElementById("showWalletBalance") as HTMLDivElement;
    showBalancePage.style.display = "none";
    let orderHistoryPage = document.getElementById("orderHistoryPage") as HTMLDivElement;
    orderHistoryPage.style.display = "none";
    let cancelOrderPage = document.getElementById("cancelOrderPage") as HTMLDivElement;
    cancelOrderPage.style.display = "none";
    let editDiv = document.getElementById("editDiv") as HTMLDivElement;
    editDiv.style.display = "none";

}
function WalletRechargePage() {
    let welcomePage = document.getElementById("welcome") as HTMLDivElement;
    welcomePage.style.display = "none";
    let purchasePage = document.getElementById("purchase") as HTMLDivElement;
    purchasePage.style.display = "none";
    let medicinesDiv = document.getElementById("medicinesDiv") as HTMLDivElement;
    medicinesDiv.style.display = "none";
    let orderHistoryPage = document.getElementById("orderHistoryPage") as HTMLDivElement;
    orderHistoryPage.style.display = "none";
    let cancelOrderPage = document.getElementById("cancelOrderPage") as HTMLDivElement;
    cancelOrderPage.style.display = "none";
    let editDiv = document.getElementById("editDiv") as HTMLDivElement;
    editDiv.style.display = "none";

    let walletRechargePage = document.getElementById("walletRechargePage") as HTMLDivElement;
    walletRechargePage.style.display = "block";
    let walletRechargeMessage = document.getElementById("walletRechargeMessage") as HTMLDivElement;
    walletRechargeMessage.style.visibility = "hiiden";
    let showBalancePage = document.getElementById("showWalletBalance") as HTMLDivElement;
    showBalancePage.style.display = "none";
}
function WalletRecharge() {
    let amount = document.getElementById("amount") as HTMLInputElement;
    currentLoggedInUser.WalletRecharge(parseInt(amount.value));

    let walletRechargeMessage = document.getElementById("walletRechargeMessage") as HTMLDivElement;
    walletRechargeMessage.innerHTML = `<br><br><h2>Wallet Recharged and Your Wallet Balance is ${currentLoggedInUser.WalletBalance}</h2>`;
    WalletRechargePage();
}
function ShowBalance() {
    let welcomePage = document.getElementById("welcome") as HTMLDivElement;
    welcomePage.style.display = "none";
    let purchasePage = document.getElementById("purchase") as HTMLDivElement;
    purchasePage.style.display = "none";
    let medicinesDiv = document.getElementById("medicinesDiv") as HTMLDivElement;
    medicinesDiv.style.display = "none";
    let walletRechargePage = document.getElementById("walletRechargePage") as HTMLDivElement;
    walletRechargePage.style.display = "none";
    let orderHistoryPage = document.getElementById("orderHistoryPage") as HTMLDivElement;
    orderHistoryPage.style.display = "none";
    let cancelOrderPage = document.getElementById("cancelOrderPage") as HTMLDivElement;
    cancelOrderPage.style.display = "none";
    let editDiv = document.getElementById("editDiv") as HTMLDivElement;
    editDiv.style.display = "none";

    let showBalancePage = document.getElementById("showWalletBalance") as HTMLDivElement;
    showBalancePage.style.display = "block";
    showBalancePage.innerHTML = `<br><br><h1>Available Balance in your Wallet is ${currentLoggedInUser.WalletBalance}</h1>`;
}

function OrderHistoryPage() {
    let welcomePage = document.getElementById("welcome") as HTMLDivElement;
    welcomePage.style.display = "none";
    let purchasePage = document.getElementById("purchase") as HTMLDivElement;
    purchasePage.style.display = "none";
    let medicinesDiv = document.getElementById("medicinesDiv") as HTMLDivElement;
    medicinesDiv.style.display = "none";
    let walletRechargePage = document.getElementById("walletRechargePage") as HTMLDivElement;
    walletRechargePage.style.display = "none";
    let showBalancePage = document.getElementById("showWalletBalance") as HTMLDivElement;
    showBalancePage.style.display = "none";
    let cancelOrderPage = document.getElementById("cancelOrderPage") as HTMLDivElement;
    cancelOrderPage.style.display = "none";
    let editDiv = document.getElementById("editDiv") as HTMLDivElement;
    editDiv.style.display = "none";

    let orderHistoryPage = document.getElementById("orderHistoryPage") as HTMLDivElement;
    orderHistoryPage.style.display = "block";

    let isOrdered = false;
    OrderDetailsList.forEach(element => {
        if (currentLoggedInUser.UserID === element.UserID) {
            isOrdered = true;
        }
    });

    if (isOrdered) {
        orderHistoryPage.innerHTML = "null";
        orderHistoryPage.innerHTML = "<table style=\"width:80%;text-align:center;\"cellpadding:10px; border=\"2px\" id=\"orderHistory\"><tr><th>Order ID</th><th>Medicine ID</th><th>Purchased Count</th><th>Total Price</th><th>Ordered Date</th><th>Order Status</th></tr></table>";

        let orderHistoryTable = document.getElementById("orderHistory") as HTMLTableElement;
        OrderDetailsList.forEach(element => {
            if (currentLoggedInUser.UserID === element.UserID) {
                orderHistoryTable.innerHTML += `<tr><td>${element.OrderID}</td><td>${element.MedicineID}</td><td>${element.MedicineCount}</td><td>${element.TotalPrice}</td><td>${element.OrderDate.toLocaleDateString()}</td><td>${element.OrderStatus}</td></tr>`;
            }
        });
    }
    else {
        orderHistoryPage.innerHTML = "<br><br><h1>No Order History to Show</h1>";
    }
}

function CancelOrderPage() {
    let welcomePage = document.getElementById("welcome") as HTMLDivElement;
    welcomePage.style.display = "none";
    let purchasePage = document.getElementById("purchase") as HTMLDivElement;
    purchasePage.style.display = "none";
    let medicinesDiv = document.getElementById("medicinesDiv") as HTMLDivElement;
    medicinesDiv.style.display = "none";
    let walletRechargePage = document.getElementById("walletRechargePage") as HTMLDivElement;
    walletRechargePage.style.display = "none";
    let showBalancePage = document.getElementById("showWalletBalance") as HTMLDivElement;
    showBalancePage.style.display = "none";
    let orderHistoryPage = document.getElementById("orderHistoryPage") as HTMLDivElement;
    orderHistoryPage.style.display = "none";
    let editDiv = document.getElementById("editDiv") as HTMLDivElement;
    editDiv.style.display = "none";

    let cancelOrderPage = document.getElementById("cancelOrderPage") as HTMLDivElement;
    cancelOrderPage.style.display = "block";

    let isOrdered = true;
    OrderDetailsList.forEach(element => {
        if (currentLoggedInUser.UserID === element.UserID) {
            isOrdered = true;
        }
    });

    if (isOrdered) {
        cancelOrderPage.innerHTML = "null";
        cancelOrderPage.innerHTML = "<table style=\"width:80%;text-align:center;\"border=\"2px\" id=\"cancelOrder\"><tr><th>Order ID</th><th>Medicine ID</th><th>Purchased Count</th><th>Total Price</th><th>Ordered Date</th><th>Order Status</th><th>Action</th></tr>";

        let orderHistoryTable = document.getElementById("cancelOrder") as HTMLTableElement;

        let n = 1;
        OrderDetailsList.forEach(element => {
            if (currentLoggedInUser.UserID === element.UserID) {
                if (element.OrderStatus === "Ordered") {
                    isOrdered = false;
                    orderHistoryTable.innerHTML += `<tr><td>${element.OrderID}</td><td>${element.MedicineID}</td><td>${element.MedicineCount}</td><td>${element.TotalPrice}</td><td>${element.OrderDate.toLocaleDateString()}</td><td>${element.OrderStatus}</td><td><button style="color:red;width:60%;font-size:15px;margin:1em;height:2em" onclick=\"CancelOrder(${n})\">Cancel</button></td></tr>`;
                }
            }
            n++;
        });
    }
    else {
        cancelOrderPage.innerHTML = "<br><br><h1>No Order History to Show</h1>";
    }
}

function CancelOrder(id: number) {
    let n = 1;
    OrderDetailsList.forEach(element => {
        if (currentLoggedInUser.UserID == element.UserID) {
            if (n === id) {
                element.OrderStatus = OrderStatus.Cancelled;
                currentLoggedInUser.WalletRecharge(element.TotalPrice);
                MedicineDetailsList.forEach(medicine => {
                    if (element.MedicineID === medicine.MedicineID) {
                        medicine.AvailableCount += element.MedicineCount;
                        alert("Order Cancelled Succesfully");
                        CancelOrderPage();
                    }
                });
            }
        }
        n++;
    });
}

function CheckCount() {
    let count = document.getElementById("count") as HTMLInputElement;
    let countMessage = document.getElementById("countMessage") as HTMLLabelElement;

    if ((/^[0-9]{1,2}/).test(count.value)) {
        countMessage.style.visibility = "hidden";
    }
    else {
        countMessage.innerHTML = "Please enter a valid count"
        countMessage.style.visibility = "visible";
        countMessage.style.color = "red";
        countMessage.style.fontSize = "20px";
    }
}
function EditDiv(id: number) {
    let editDiv = document.getElementById("editDiv") as HTMLDivElement;
    editDiv.style.display = "block";

    let editButton = document.getElementById("editButton") as HTMLDivElement;
    editButton.innerHTML = `<button onclick=\"EditDetails(${id})\">submit</button>`;
    let medicineName = document.getElementById("medicineName") as HTMLInputElement;
    let availableCount = document.getElementById("availableCount") as HTMLInputElement;
    let price = document.getElementById("price") as HTMLInputElement;
    let expiryDate = document.getElementById("expiryDate") as HTMLInputElement;

    let n = 1;
    MedicineDetailsList.forEach(element => {
        if (n === id) {
            medicineName.value = element.MedicineName;
            availableCount.value = element.AvailableCount.toString();
            price.value = element.Price.toString();
            expiryDate.value = element.DateOfExpiry.toString();
        }
        n++;
    });
}

function EditDetails(id: number) {
    let medicineName = document.getElementById("medicineName") as HTMLInputElement;
    let availableCount = document.getElementById("availableCount") as HTMLInputElement;
    let price = document.getElementById("price") as HTMLInputElement;
    let expiryDate = document.getElementById("expiryDate") as HTMLInputElement;

    let n = 1;
    MedicineDetailsList.forEach(element => {
        if (n === id) {
            element.MedicineName = medicineName.value;
            element.AvailableCount = parseInt(availableCount.value);
            element.Price = parseInt(price.value);
            element.DateOfExpiry = new Date(expiryDate.value);
            alert("Details Edited");
            MedicineDetails();
        }
        n++;
    });
}

function Delete(id: number) {
    MedicineDetailsList.splice(id-1, 1);
    alert("Medicine Deleted");
    MedicineDetails();
}
function AddMedicineDiv()
{
    let editDiv = document.getElementById("editDiv") as HTMLDivElement;
    editDiv.style.display = "block";

    let editButton = document.getElementById("editButton") as HTMLDivElement;
    editButton.innerHTML = `<button onclick=\"AddMedicine()\">Add</button>`;
    
    let addButton=document.getElementById("AddButton") as HTMLButtonElement;
    addButton.style.display="none";
}
function AddMedicine()
{
    let medicineName = document.getElementById("medicineName") as HTMLInputElement;
    let availableCount = document.getElementById("availableCount") as HTMLInputElement;
    let price = document.getElementById("price") as HTMLInputElement;
    let expiryDate = document.getElementById("expiryDate") as HTMLInputElement;
    
    MedicineDetailsList.push(new Medicine(medicineName.value,parseInt(availableCount.value),parseInt(price.value),new Date(expiryDate.value)));
    alert("Medicine Added");
    MedicineDetails();
}
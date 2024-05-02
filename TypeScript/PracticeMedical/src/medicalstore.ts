let userIDAutoIncrement = 1000;
let medicineIDAutoIncrement = 100;
let orderIDAutoIncrement = 3000;

let currentLoggedInUser: User;

let isNewUserMailValid = false;
let isNewUserPasswordValid = false;

class User {
    readonly UserID: string;
    UserMailID: string;
    UserPassword: string;
    WalletBalance: number;

    constructor(userMailID: string, userPassword: string) {
        this.UserID = "UID" + (++userIDAutoIncrement);
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

enum OrderStatus { Purchased, Cancelled };
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

UserDetailsList.push(new User("Ravi", "Ravi@123"));
UserDetailsList.push(new User("Baskaran", "Baskaran@123"));

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
    let newUserMailID = document.getElementById("signupEmail") as HTMLInputElement;
    let newUserPassword = document.getElementById("signupConfirmPassword") as HTMLInputElement;

    if (isNewUserMailValid && isNewUserPasswordValid) {
        UserDetailsList.push(new User(newUserMailID.value, newUserPassword.value))
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
    let purchasePage = document.getElementById("purchase") as HTMLDivElement;
    purchasePage.style.display = "none";


    mainPage.style.display = "none";
    homePage.style.display = "block";
}

function MedicineDetails() {
    let medicineDetails = document.getElementById("medicineDetails") as HTMLDivElement;
    medicineDetails.style.display = "block";

    let purchasePage = document.getElementById("purchase") as HTMLDivElement;
    purchasePage.style.display = "none";

    let n = 1;
    MedicineDetailsList.forEach(element => {
        let row = document.getElementsByClassName("row" + n);
        row[0].innerHTML = element.MedicineID;
        row[1].innerHTML = element.MedicineName;
        row[2].innerHTML = element.AvailableCount.toString();
        row[3].innerHTML = element.Price.toString();
        row[4].innerHTML = element.DateOfExpiry.toLocaleString();
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

let isValidMedicineID = false;
function Purchase() {
    let medicinePage = document.getElementById("medicineDetails") as HTMLDivElement;
    medicinePage.style.display = "block";

    let purchasePage = document.getElementById("purchase") as HTMLDivElement;
    purchasePage.style.display = "block";

    if (isValidMedicineID) {
        let medicineID = document.getElementById("medicineID") as HTMLInputElement;
        MedicineDetailsList.forEach(element => {
            
        });
    }
    else {
        alert("Please enter the Medicine ID");
    }
}

function CheckMedicineID(id: string) {
    let medicineID = document.getElementById(id) as HTMLInputElement;
    let medicineIDMessage = document.getElementById(id + "Message") as HTMLLabelElement;

    if ((/^MD[1][0][1-6]$/).test(medicineID.value)) {
        medicineIDMessage.style.visibility = "hidden";
        isValidMedicineID = true;
    }
    else {
        medicineIDMessage.innerHTML = "Please enter Valid Medicine ID ";
        medicineIDMessage.style.color = "red";
        medicineIDMessage.style.visibility = "visible";
        medicineIDMessage.style.fontSize = "10px"
    }
}
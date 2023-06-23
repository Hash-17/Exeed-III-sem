let users = [];
function displayUsers() {
  let html1 = "";
  users.forEach((user) => {
    if (
      user.name &&
      user.email &&
      user.password &&
      user.dob &&
      user.phone &&
      user.photo &&
      user.terms
      //&& user.otp
    ) {
      html1 += "<tr>";
      html1 += `<td>${user.name}</td>`;
      html1 += `<td>${user.email}</td>`;
      html1 += `<td>${user.password}</td>`;
      html1 += `<td>${user.dob}</td>`;
      html1 += `<td>${user.phone}</td>`;
      html1 += `<td>${user.photo}</td>`;
      html1 += `<td>${user.terms}</td>`;
      // html1 += `<td>${user.otp}</td>`;
      html1 += "</tr>";
    }
  });
  console.log(html1);
  document.querySelector("#userTableBody").innerHTML = html1;
}
function calAge(date1) {
  const dob1 = new Date(date1);
  const diff1 = Date.now() - dob1.getTime();
  const age1 = new Date(diff1);
  return Math.abs(age1.getUTCFullYear() - 1970);
}
function handleSubmit(event) {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const dob = document.querySelector("#dob").value;
  const phone = document.querySelector("#phone").value;
  const photoInput = document.querySelector("#photo");
  const terms = document.querySelector("#terms").checked;
  //const photo = photoInput.files[0]; // Get the first file from the input
  //const formData = new FormData(); // Create a new FormData object
  //formData.append("photo", photo); // Add the photo file to the FormData object
  // const otp = document.querySelector("#otp").value;
  const age1 = calAge(dob);
  if (age1 < 18 || age1 > 55) {
    alert("You must be between 18 and 55 years old to register.");
    return;
  }
  const emailR = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailR.test(email)) {
    alert("Invalid email address format.");
    return;
  }
  if (!terms) {
    users.push({ name, email, password, dob, phone, photo, terms: "false" });
  } else {
    users.push({ name, email, password, dob, phone, photo, terms: "true" });
  }
  console.log(users);
  localStorage.setItem("users", JSON.stringify(users));
  document.querySelector("#registrationForm").reset();
  displayUsers();
}
document.addEventListener("DOMContentLoaded", () => {
  const storedUsers1 = localStorage.getItem("users");
  if (storedUsers1) {
    users = JSON.parse(storedUsers1);
    displayUsers();
  }
});
document
  .querySelector("#registrationForm")
  .addEventListener("submit", handleSubmit);
document.querySelector("#clearTableBtn").addEventListener("click", () => {
  users = [];
  localStorage.removeItem("users");
  displayUsers();
});
function validatePhoneNumber() {
  const phoneNumber = document.getElementById("phone").value;
  const regex = /^9\d{9}$/;
  if (!regex.test(phoneNumber)) {
    alert(
      "Invalid phone number! Please enter a valid phone number starting with 9 and consisting of 9 digits."
    );
    return false;
  }
  return true;
}
// function generateOTP() {
//   var digits = "0123456789";
//   var OTP = "";
//   for (let i = 0; i < 6; i++) {
//     OTP += digits[Math.floor(Math.random() * 10)];
//   }
//   return OTP;
// }

// function verifyOTP() {
//   var inputOTP = document.getElementById("otp").value;
//   var generatedOTP = sessionStorage.getItem("OTP");
//   if (inputOTP == generatedOTP) {
//     alert("OTP verified successfully!");
//   } else {
//     alert("Invalid OTP! Please try again.");
//   }
// }

// // Generate OTP when the page is loaded
// sessionStorage.setItem("OTP", generateOTP());

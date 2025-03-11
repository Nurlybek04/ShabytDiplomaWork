const inputs = document.querySelectorAll("input");
inputs.forEach(function (input) {
  input.addEventListener("focus", function () {
    const parentElement = input.parentElement.parentElement;
    parentElement.classList.add("box-animation");
  });
  input.addEventListener("blur", function () {
    const parentElement = input.parentElement.parentElement;
    parentElement.classList.remove("box-animation");
  });
});

const buttons = document.querySelectorAll("#multiple-btn button");
const form_container = document.getElementById('form_section')
buttons.forEach((button) => {
button.addEventListener("click", () => {
form_container.classList.toggle("left-right");

});
});

function validatePassword(password) {
  const minLength = 8;
  const hasLetter = /[a-zA-Z]/.test(password); // Проверка на наличие букв
  const hasNumber = /[0-9]/.test(password); // Проверка на наличие цифр
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Проверка на спецсимволы

  return password.length >= minLength && hasLetter && hasNumber && hasSpecialChar;
}

// Handle Sign Up button click
document.querySelector('.signUp-form .action-button button').addEventListener('click', async function () {
  // Get user inputs
  const fullName = document.querySelector('.signUp-form input[placeholder="Full Name"]').value;
  const email = document.querySelector('.signUp-form input[placeholder="Email"]').value;
  const mobile = document.querySelector('.signUp-form input[placeholder="Mobile No."]').value;
  const password = document.querySelector('.signUp-form input[placeholder="Password"]').value;
  const role = document.getElementById('role').value; // Get selected role

  // Validate inputs
  if (!fullName || !email || !mobile || !password) {
      alert('Барлық ақпараттарды толтырыңыз!');
      return;
  }
  if (!validatePassword(password)) {
    document.getElementById('password-error').style.display = 'block'; // Показываем сообщение об ошибке
    return;
} else {
    document.getElementById('password-error').style.display = 'none'; // Скрываем сообщение об ошибке
}

  // Store user data (you can replace this with an API call to your server)
  const userData = {
      fullName,
      email,
      mobile,
      password,
      role
  };

  console.log('User registered:', userData);


  try {
    const response = await fetch('http://localhost:8080/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    if (response.ok) {
      alert(`Тіркеу сәтті өтті! Сіз ${role} ретінде тіркелдіңіз.`);
    } else {
      alert(result.error || 'Тіркеу кезінде қате орын алды.');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    alert('Сервермен байланыс кезінде қате орын алды.');
  }

  // Save user data in localStorage (for demonstration purposes)
  localStorage.setItem('userRole', role);
  localStorage.setItem('userEmail', email); // Save email for login validation
  localStorage.setItem('userPassword', password); // Save password for login validation

  alert(`Тіркеу сәтті өтті! Сіз ${role} ретінде тіркелдіңіз.`);
});

// Handle Login button click
document.querySelector('.login-form .action-button button').addEventListener('click', function () {
  const email = document.querySelector('.login-form input[placeholder="Email"]').value;
  const password = document.querySelector('.login-form input[placeholder="Password"]').value;

  // Retrieve stored user data
  const storedEmail = localStorage.getItem('userEmail');
  const storedPassword = localStorage.getItem('userPassword');
  const userRole = localStorage.getItem('userRole');

  // Validate login credentials
  if (email === storedEmail && password === storedPassword) {
      if (userRole === 'student') {
          window.location.href = 'index.html';
      } else if (userRole === 'teacher') {
          window.location.href = 'teacher_dashboard.html';
      }
  } else {
      alert('Қате логин немесе пароль');
  }
});

document.getElementById('password').addEventListener('input', function () {
  const password = this.value;
  if (!validatePassword(password)) {
      document.getElementById('password-error').style.display = 'block';
  } else {
      document.getElementById('password-error').style.display = 'none';
  }
});

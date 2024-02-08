const lowercase = document.querySelector('#lowercase'),
	uppercase = document.querySelector('#uppercase'),
	numbers = document.querySelector('#number'),
	symbols = document.querySelector('#symbols'),
	passLength = document.querySelector('#password-length'),
	generateBtn = document.querySelector('.generate'),
	generatedPass = document.querySelector('#generated-pass'),
	copyBtn = document.querySelector('#copy'),
	tooltip = document.querySelector('.tooltip')

function generatePassword(
	passwordLength,
	includeLowercase,
	includeUppercase,
	includeNumbers,
	includeSymbols
) {
	const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
	const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	const numberChars = '0123456789'
	const symbolChars = '!~/@#$%&*:;?<>+=-_|'

	let allowedChars = ''
	let password = ''
	allowedChars += includeLowercase ? lowercaseChars : ''
	allowedChars += includeUppercase ? uppercaseChars : ''
	allowedChars += includeNumbers ? numberChars : ''
	allowedChars += includeSymbols ? symbolChars : ''

	//console.log(allowedChars)

	// if (passwordLength < 4) {
	// 	generatedPass.textContent = `password length need to be atleast 4`
	// }
	// if (allowedChars.length === 0) {
	// 	generatedPass.textContent = `atleast one set of character need to be selected`
	// }

	for (let i = 0; i < passwordLength; i++) {
		let randomIndex = Math.floor(Math.random() * allowedChars.length)
		password += allowedChars[randomIndex]
	}
	return password
}

generateBtn.addEventListener('click', function () {
	const passwordLength = passLength.value,
		includeLowercase = lowercase.checked,
		includeUppercase = uppercase.checked,
		includeNumbers = numbers.checked,
		includeSymbols = symbols.checked

	if (
		!includeLowercase &&
		!includeUppercase &&
		!includeNumbers &&
		!includeSymbols
	) {
		generatedPass.value = 'select at least one set of characters'
		return // Stop further execution
	} else if (Number(passwordLength) < 6) {
		generatedPass.value = 'too short password length'
	}
	const password = generatePassword(
		passwordLength,
		includeLowercase,
		includeUppercase,
		includeNumbers,
		includeSymbols
	)
	generatedPass.value = password
})

copyBtn.addEventListener('mouseover', () => {
	tooltip.style.visibility = 'visible'
	tooltip.style.transition = 'all .1s ease-in'
})

copyBtn.addEventListener('mouseout', () => {
	tooltip.style.visibility = 'hidden'
})

copyBtn.addEventListener('click', () => {
	if (generatedPass.value) {
		navigator.clipboard
			.writeText(generatedPass.value)
			.then(() => {
				tooltip.innerHTML = 'copied'

				setTimeout(() => {
					tooltip.innerHTML = 'copy'
				}, 500)
			})
			.catch(() => {
				console.log('something went wrong')
			})
	}
})

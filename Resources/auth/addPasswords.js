const Professional = require('../models/Professional');
const bcrypt = require('bcrypt');

async function generateRandomPassword(length = 10) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

async function addDummyPasswords() {
  const professionals = await Professional.findAll();
  for (const prof of professionals) {
    const plainPassword = await generateRandomPassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    await prof.update({ password: hashedPassword });
    console.log(`Updated ${prof.username} with password: ${plainPassword}`);
  }
  console.log('All professionals updated with dummy passwords.');
}

addDummyPasswords()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });